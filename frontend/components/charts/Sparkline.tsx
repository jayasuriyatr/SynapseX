import { cn } from "@/lib/utils";

/** Minimal axis-less sparkline (line + optional area). Pure SVG. */
export function Sparkline({
  data,
  color = "var(--color-neural-blue)",
  area = false,
  className,
}: {
  data: number[];
  color?: string;
  area?: boolean;
  className?: string;
}) {
  const W = 100;
  const H = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const n = Math.max(data.length, 2);
  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => H - ((v - min) / span) * (H - 4) - 2;

  const line = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const fill = `${line} L ${W} ${H} L 0 ${H} Z`;
  const gid = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={cn("h-8 w-full", className)} aria-hidden="true">
      {area ? (
        <>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fill} fill={`url(#${gid})`} />
        </>
      ) : null}
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
