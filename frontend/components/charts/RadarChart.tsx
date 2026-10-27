import { cn } from "@/lib/utils";

export interface RadarAxis {
  label: string;
  best: number; // 0..100
  avg: number; // 0..100
}

/**
 * Radar / spider chart comparing two series (e.g. best vs average model)
 * across several metrics. Pure SVG, dependency-free.
 */
export function RadarChart({ axes, className }: { axes: RadarAxis[]; className?: string }) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 78;
  const n = axes.length;
  const levels = 3;

  const point = (i: number, value: number) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const r = (value / 100) * maxR;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  const polygon = (key: "best" | "avg") =>
    axes.map((a, i) => point(i, a[key]).join(",")).join(" ");

  const gridPolygon = (level: number) =>
    axes.map((_, i) => point(i, (level / levels) * 100).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={cn("h-full w-full", className)} role="img" aria-label="Model performance radar">
      {/* grid rings */}
      {Array.from({ length: levels }).map((_, l) => (
        <polygon key={l} points={gridPolygon(l + 1)} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {/* spokes + labels */}
      {axes.map((a, i) => {
        const [ex, ey] = point(i, 100);
        const [lx, ly] = point(i, 122);
        const anchor = lx < cx - 4 ? "end" : lx > cx + 4 ? "start" : "middle";
        return (
          <g key={a.label}>
            <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#e2e8f0" strokeWidth="1" />
            <text x={lx} y={ly - 3} textAnchor={anchor} fontSize="8" className="fill-slate-500" fontWeight="600">
              {a.label}
            </text>
            <text x={lx} y={ly + 6} textAnchor={anchor} fontSize="8" className="fill-slate-400">
              {a.best.toFixed(1)}%
            </text>
          </g>
        );
      })}
      {/* average polygon */}
      <polygon points={polygon("avg")} fill="var(--color-electric-cyan)" fillOpacity="0.15" stroke="var(--color-electric-cyan)" strokeWidth="1.5" />
      {/* best polygon */}
      <polygon points={polygon("best")} fill="var(--color-neural-blue)" fillOpacity="0.18" stroke="var(--color-neural-blue)" strokeWidth="2" />
    </svg>
  );
}
