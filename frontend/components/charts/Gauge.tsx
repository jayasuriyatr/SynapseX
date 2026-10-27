import { cn } from "@/lib/utils";

/** Circular progress gauge with a center percentage and caption. */
export function Gauge({
  value, // 0..100
  caption,
  color = "var(--color-neural-blue)",
  className,
}: {
  value: number;
  caption?: string;
  color?: string;
  className?: string;
}) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--color-slate-200)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ - dash}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">
          {value}%
        </span>
      </div>
      {caption ? <span className="mt-1 text-[10px] text-slate-500">{caption}</span> : null}
    </div>
  );
}
