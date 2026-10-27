import { cn } from "@/lib/utils";

/**
 * Spiking neural network mesh — layered nodes with firing connections.
 * Used in the "Spiking Neural Networks For Real-World Impact" section.
 */
export function NeuralMesh({ className }: { className?: string }) {
  const layers = [
    [60, 100, 140, 180],
    [80, 130, 180],
    [70, 110, 150, 190],
    [110, 150],
  ];
  const xs = [40, 130, 220, 300];

  const points = layers.flatMap((ys, li) =>
    ys.map((y) => ({ x: xs[li], y, li })),
  );

  const edges: Array<[{ x: number; y: number }, { x: number; y: number }]> = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const from = points.filter((p) => p.li === l);
    const to = points.filter((p) => p.li === l + 1);
    from.forEach((f) => to.forEach((t) => edges.push([f, t])));
  }

  return (
    <svg
      viewBox="0 0 340 260"
      className={cn("w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="meshEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="meshGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="340" height="260" fill="url(#meshGlow)" />

      <g stroke="url(#meshEdge)" strokeWidth="0.9" opacity="0.28">
        {edges.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>

      <g>
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4.2}
            fill={p.li % 2 === 0 ? "#2563eb" : "#7c3aed"}
            style={{
              animation: "var(--animate-pulse-soft)",
              animationDelay: `${(i % 6) * 0.3}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
