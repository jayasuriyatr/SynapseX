import { cn } from "@/lib/utils";

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
  detail?: string; // optional absolute value shown in legend (e.g. "112 GB")
}

/**
 * Donut chart for distribution breakdowns, with an optional center label.
 * The ring is fixed on the left and scales to the container height; the
 * legend fills the remaining width on the right (labels left-aligned,
 * values right-aligned) so the two never overlap.
 */
export function Donut({
  slices,
  centerValue,
  centerLabel,
  showPercent = true,
  className,
}: {
  slices: DonutSlice[];
  centerValue?: string;
  centerLabel?: string;
  showPercent?: boolean;
  className?: string;
}) {
  const total = slices.reduce((s, d) => s + d.value, 0) || 1;
  const radius = 60;
  const circ = 2 * Math.PI * radius;

  const segments = slices.reduce<
    { label: string; color: string; detail?: string; dash: number; offset: number; pct: number }[]
  >((acc, s) => {
    const dash = (s.value / total) * circ;
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    return [...acc, { label: s.label, color: s.color, detail: s.detail, dash, offset, pct: (s.value / total) * 100 }];
  }, []);

  return (
    <div className={cn("flex h-full min-h-0 w-full items-center gap-4", className)}>
      <div className="relative aspect-square h-full max-h-[2000px] min-h-[90px] shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" role="img" aria-label="Distribution">
          {segments.map((s) => (
            <circle
              key={s.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="18"
              strokeDasharray={`${s.dash} ${circ - s.dash}`}
              strokeDashoffset={-s.offset}
            />
          ))}
          <circle cx="80" cy="80" r="44" fill="white" />
        </svg>
        {centerValue ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-display text-lg font-bold leading-none text-slate-900">{centerValue}</span>
            {centerLabel ? <span className="mt-0.5 text-[10px] text-slate-500">{centerLabel}</span> : null}
          </div>
        ) : null}
      </div>

      <ul className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1 overflow-hidden text-[11px] leading-tight">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.color }} />
            <span className="truncate text-slate-600">{s.label}</span>
            <span className="ml-auto shrink-0 whitespace-nowrap font-medium tabular-nums text-slate-500">
              {showPercent ? (
                <>
                  {s.detail ? `${s.detail} · ` : ""}
                  {s.pct.toFixed(1)}%
                </>
              ) : (
                s.detail ?? `${s.pct.toFixed(1)}%`
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
