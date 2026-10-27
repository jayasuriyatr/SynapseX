/**
 * HTTP core for the SynapseX API integration layer.
 *
 * The frontend never performs ML — it only talks to the FastAPI backend
 * through this module. Until the backend is live, `resolve()` returns mock
 * data so the UI is fully functional. Flip the env switch to go live:
 *
 *   NEXT_PUBLIC_USE_MOCK=false
 *   NEXT_PUBLIC_API_URL=https://api.synapsex.example
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Mock mode is ON unless explicitly disabled. */
export const USE_MOCK =
  (process.env.NEXT_PUBLIC_USE_MOCK ?? "true").toLowerCase() !== "false";

const DEFAULT_TIMEOUT_MS = 15000;

/** Normalized API error surfaced to callers. */
export class ApiError extends Error {
  readonly status: number;
  readonly path: string;
  readonly details?: unknown;

  constructor(message: string, status: number, path: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.path = path;
    this.details = details;
  }
}

export type Query = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** JSON body (objects are serialized) or a FormData / BodyInit for uploads. */
  body?: unknown;
  headers?: Record<string, string>;
  query?: Query;
  signal?: AbortSignal;
  timeoutMs?: number;
}

function buildUrl(path: string, query?: Query): string {
  const url = new URL(path.startsWith("http") ? path : `${API_BASE_URL}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

/** Low-level typed request with timeout + error normalization. */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, query, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  if (signal) signal.addEventListener("abort", () => controller.abort(), { once: true });

  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const init: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      ...(isForm ? {} : body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
    signal: controller.signal,
  };

  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), init);
  } catch (err) {
    clearTimeout(timeout);
    const aborted = err instanceof DOMException && err.name === "AbortError";
    throw new ApiError(aborted ? "Request timed out" : "Network error", 0, path, err);
  }
  clearTimeout(timeout);

  if (!res.ok) {
    let details: unknown;
    try {
      details = await res.json();
    } catch {
      details = await res.text().catch(() => undefined);
    }
    const message =
      (details && typeof details === "object" && "detail" in details
        ? String((details as { detail: unknown }).detail)
        : undefined) ?? `Request failed (${res.status})`;
    throw new ApiError(message, res.status, path, details);
  }

  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const http = {
  get: <T>(path: string, query?: Query, signal?: AbortSignal) =>
    request<T>(path, { method: "GET", query, signal }),
  post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    request<T>(path, { method: "POST", body, signal }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: "PUT", body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

/** Simulated latency for mock responses. */
export function mockDelay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredCloneSafe(value)), ms));
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(value);
    } catch {
      /* fall through */
    }
  }
  return value;
}

/**
 * Resolve a GET endpoint: returns mock data in mock mode, otherwise hits the
 * real API. This is the primary helper used by the typed `api` surface.
 */
export function resolve<T>(path: string, mockValue: T, query?: Query): Promise<T> {
  return USE_MOCK ? mockDelay(mockValue) : http.get<T>(path, query);
}

/**
 * Open a WebSocket stream (e.g. live processing/inference updates).
 * Returns an unsubscribe function. No-op in mock mode.
 */
export function openStream(
  path: string,
  handlers: { onMessage: (data: unknown) => void; onError?: (e: Event) => void; onOpen?: () => void },
): () => void {
  if (USE_MOCK || typeof WebSocket === "undefined") return () => {};
  const wsUrl = buildUrl(path).replace(/^http/, "ws");
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => handlers.onOpen?.();
  ws.onerror = (e) => handlers.onError?.(e);
  ws.onmessage = (e) => {
    try {
      handlers.onMessage(JSON.parse(e.data));
    } catch {
      handlers.onMessage(e.data);
    }
  };
  return () => ws.close();
}
