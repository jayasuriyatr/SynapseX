import { cn } from "@/lib/utils";

export interface LineSeries {
  data: number[];
  color: string;
  area?: boolean;
  label?: string;
}

function fmt(v: number) {
  if (Math.abs(v) >= 1000) {
    const k = v / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return `${Math.round(v)}`;
}

/**
 * Responsive line / area chart. Renders crisp HTML y-axis labels alongside a
 * stretched SVG plot (preserveAspectRatio="none" + non-scaling strokes) so it
 * fills its container exactly without overflowing or distorting.
 *
 * - `fill`: fill the parent's height (use inside flex layouts).
 * - otherwise a fixed pixel `height` is used.
 */
export function LineChart({
  series,
  height = 240,
  fill = false,
  yMin,
  yMax,
  showGrid = true,
  className,
}: {
  series: LineSeries[];
  height?: number;
  fill?: boolean;
  yMin?: number;
  yMax?: number;
  showGrid?: boolean;
  className?: string;
}) {
  const W = 600;
  const H = 240;
  const all = series.flatMap((s) => s.data);
  const min = yMin ?? Math.min(...all);
  const max = yMax ?? Math.max(...all);
  const span = max - min || 1;
  const n = Math.max(...series.map((s) => s.data.length), 2);

  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => H - ((v - min) / span) * H;

  const gridLines = 4;
  const labels = Array.from({ length: gridLines + 1 }, (_, i) => max - (i / gridLines) * span);

  return (
    <div
      className={cn("relative flex w-full", fill ? "h-full" : "", className)}
      style={fill ? undefined : { height }}
    >
      {showGrid ? (
        <div className="flex w-8 shrink-0 flex-col justify-between py-0 text-right text-[9px] leading-none text-slate-400">
          {labels.map((l, i) => (
            <span key={i} className="pr-1">{fmt(l)}</span>
          ))}
        </div>
      ) : null}

      <div className="relative min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Line chart"
        >
          {showGrid
            ? Array.from({ length: gridLines + 1 }).map((_, i) => {
                const gy = (i / gridLines) * H;
                return (
                  <line
                    key={i}
                    x1={0}
                    y1={gy}
                    x2={W}
                    y2={gy}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })
            : null}

          {series.map((s, si) => {
            const line = s.data
              .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
              .join(" ");
            const areaPath = `${line} L ${x(s.data.length - 1)} ${H} L ${x(0)} ${H} Z`;
            return (
              <g key={si}>
                {s.area ? (
                  <>
                    <defs>
                      <linearGradient id={`area-${si}-${s.color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                        <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={areaPath} fill={`url(#area-${si}-${s.color.replace(/[^a-z0-9]/gi, "")})`} />
                  </>
                ) : null}
                <path
                  d={line}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
