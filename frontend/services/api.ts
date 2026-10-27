/**
 * SynapseX typed API surface.
 *
 * This is the ONLY place the frontend talks to the backend. Each method maps
 * to a REST endpoint and returns a typed contract from `@/types`. In mock mode
 * (NEXT_PUBLIC_USE_MOCK !== "false") it resolves mock data so the UI is fully
 * functional; otherwise it hits NEXT_PUBLIC_API_URL.
 *
 * The frontend never performs ML — it uploads EEG, polls processing, and
 * renders the predictions / explanations / reports the backend returns.
 */
import { resolve, http, openStream, API_BASE_URL, USE_MOCK, ApiError } from "./http";
import * as mock from "@/lib/mock-data";
import type { DashboardOverview, AnalyticsOverview } from "@/types";

export { API_BASE_URL, USE_MOCK, ApiError };

export const api = {
  // --- Dashboard (composite: GET /dashboard) ---
  getDashboard: (): Promise<DashboardOverview> =>
    resolve("/dashboard", mock.DASHBOARD_OVERVIEW),

  // --- Analytics (composite: GET /analytics) ---
  getAnalytics: (): Promise<AnalyticsOverview> =>
    resolve("/analytics", mock.ANALYTICS_OVERVIEW),

  // --- Dashboard (granular, still available) ---
  getSystemStats: () => resolve("/stats", mock.SYSTEM_STATS),
  getRecentAnalyses: () => resolve("/analyses/recent", mock.RECENT_ANALYSES),
  getActivityFeed: () => resolve("/activity", mock.ACTIVITY_FEED),
  getLiveInference: () => resolve("/metrics/inference", mock.LIVE_INFERENCE),
  getEngineStatus: () =>
    resolve("/engine/status", { status: "online" as const, model: mock.MODEL.version }),

  // --- Analysis ---
  getPredictions: (analysisId: string) =>
    resolve(`/analyses/${analysisId}/predictions`, mock.PREDICTIONS),

  // --- Explainability ---
  getChannelImportance: (analysisId: string) =>
    resolve(`/analyses/${analysisId}/channels`, mock.CHANNEL_IMPORTANCE),
  getBrainRegions: (analysisId: string) =>
    resolve(`/analyses/${analysisId}/regions`, mock.BRAIN_REGIONS),

  // --- Datasets ---
  getDatasets: () => resolve("/datasets", mock.DATASETS),

  // --- Models ---
  getModel: () => resolve("/models/current", mock.MODEL),

  // --- Training ---
  getTrainingRuns: () => resolve("/training/runs", mock.TRAINING_RUNS),
  getEpochCurve: (runId: string) => resolve(`/training/runs/${runId}/curve`, mock.EPOCH_CURVE),

  // --- Reports ---
  getReports: () => resolve("/reports", mock.REPORTS),

  // --- System Monitor ---
  getResources: () => resolve("/system/resources", mock.RESOURCES),
  getQueue: () => resolve("/system/queue", mock.QUEUE),
};

/**
 * Upload an EEG recording for analysis. Returns the created job id.
 * In mock mode this resolves a synthetic id without network access.
 */
export async function uploadEeg(
  file: File,
  config?: Record<string, unknown>,
): Promise<{ jobId: string }> {
  if (USE_MOCK) {
    return new Promise((r) => setTimeout(() => r({ jobId: `AN-${Date.now()}` }), 400));
  }
  const form = new FormData();
  form.append("file", file);
  if (config) form.append("config", JSON.stringify(config));
  return http.post<{ jobId: string }>("/analyses", form);
}

/** Stream live processing/inference updates for a job. */
export function openJobStream(jobId: string, onMessage: (data: unknown) => void): () => void {
  return openStream(`/ws/jobs/${jobId}`, { onMessage });
}
