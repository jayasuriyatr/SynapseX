import { cn } from "@/lib/utils";

export interface BarDatum {
  label: string;
  value: number;
}

/** Vertical bar chart / histogram with optional highlighted bar. */
export function BarChart({
  data,
  color = "var(--color-signal-violet)",
  highlightIndex,
  className,
}: {
  data: BarDatum[];
  color?: string;
  highlightIndex?: number;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex min-h-0 flex-1 items-end gap-1.5">
        {data.map((d, i) => {
          const h = (d.value / max) * 100;
          const active = i === highlightIndex;
          return (
            <div key={d.label} className="flex h-full flex-1 items-end">
              <div
                className="w-full rounded-t-sm transition-all"
                style={{
                  height: `${h}%`,
                  background: active ? color : `color-mix(in srgb, ${color} 45%, white)`,
                }}
                title={`${d.label}: ${d.value.toLocaleString()}`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex gap-1.5">
        {data.map((d) => (
          <span key={d.label} className="flex-1 truncate text-center text-[8px] text-slate-400">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
