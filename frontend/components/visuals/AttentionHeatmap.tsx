import { cn } from "@/lib/utils";

/** Maps 0..1 to a magma-like color (dark violet → magenta → orange → yellow). */
function magma(t: number) {
  const stops = [
    [12, 8, 38],
    [85, 15, 109],
    [187, 55, 84],
    [249, 142, 9],
    [252, 253, 191],
  ];
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

/**
 * Transformer attention heatmap: channels (rows) × time bins (cols),
 * coloured on a magma scale. Deterministic intensities.
 */
export function AttentionHeatmap({
  rows,
  cols = 16,
  className,
}: {
  rows: string[];
  cols?: number;
  className?: string;
}) {
  const intensity = (r: number, c: number) => {
    const base = Math.sin(r * 1.7 + c * 0.6) * 0.5 + 0.5;
    const focus = Math.exp(-(((c - cols * 0.55) / (cols * 0.22)) ** 2)); // hot mid-late window
    const rowFocus = r < 3 ? 1 : 0.6;
    return Math.max(0, Math.min(1, base * 0.4 + focus * 0.6 * rowFocus));
  };

  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <div className="flex min-h-0 flex-1 gap-1.5">
        <div className="flex shrink-0 flex-col justify-around py-0.5 font-mono text-[9px] text-slate-500">
          {rows.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        <div
          className="grid min-h-0 flex-1 gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows.length}, 1fr)`,
          }}
        >
          {rows.map((r, ri) =>
            Array.from({ length: cols }).map((_, ci) => (
              <div
                key={`${ri}-${ci}`}
                className="rounded-[2px]"
                style={{ background: magma(intensity(ri, ci)) }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
