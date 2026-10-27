import { cn } from "@/lib/utils";

/**
 * Animated EEG-style multi-trace waveform (line view — brand-approved chart type).
 * Pure SVG, deterministic paths so server/client render identically.
 */
export function EegWaveform({
  className,
  traces = 1,
  stroke = "var(--color-signal-violet)",
  animate = true,
}: {
  className?: string;
  traces?: number;
  stroke?: string;
  animate?: boolean;
}) {
  const paths = [
    "M0 30 Q 15 10 30 30 T 60 30 Q 75 48 90 30 T 120 30 Q 135 14 150 30 T 180 30 Q 195 44 210 30 T 240 30 Q 255 12 270 30 T 300 30",
    "M0 30 Q 20 44 40 30 T 80 30 Q 100 16 120 30 T 160 30 Q 180 46 200 30 T 240 30 Q 260 18 280 30 T 300 30",
    "M0 30 Q 12 20 24 30 T 48 30 Q 60 40 72 30 T 96 30 Q 108 18 120 30 T 300 30",
  ];

  return (
    <svg
      viewBox="0 0 300 60"
      className={cn("h-full w-full", className)}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: traces }).map((_, i) => (
        <path
          key={i}
          d={paths[i % paths.length]}
          stroke={i === 0 ? stroke : "var(--color-electric-cyan)"}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={i === 0 ? 1 : 0.35}
          style={
            animate
              ? { strokeDasharray: 1000, animation: "var(--animate-dash)" }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
