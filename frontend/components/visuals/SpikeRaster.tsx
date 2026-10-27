import { cn } from "@/lib/utils";

/**
 * Spike raster plot — deterministic pseudo-random spikes per neuron row,
 * illustrating the event-driven SNN activity behind a prediction.
 */
export function SpikeRaster({
  rows = 12,
  cols = 48,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  // deterministic spike pattern (seeded) so SSR == CSR
  const spike = (r: number, c: number) => {
    const v = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
    return v - Math.floor(v) > 0.72;
  };

  const cellW = 100 / cols;
  const cellH = 100 / rows;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      role="img"
      aria-label="Spike raster plot"
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) =>
          spike(r, c) ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellW}
              y={r * cellH + cellH * 0.2}
              width={cellW * 0.5}
              height={cellH * 0.6}
              rx={0.4}
              fill={r % 3 === 0 ? "var(--color-signal-violet)" : "var(--color-neural-blue)"}
              opacity={0.85}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
