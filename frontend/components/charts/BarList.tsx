import { cn } from "@/lib/utils";

export interface BarItem {
  label: string;
  value: number; // 0..1 (ratio) or absolute if max provided
  hint?: string;
}

/**
 * Horizontal bar list — used for channel importance, region contribution, etc.
 * Accessible: each bar carries its numeric value as text.
 */
export function BarList({
  items,
  max = 1,
  color = "var(--color-neural-blue)",
  format = (v) => `${Math.round((v / max) * 100)}%`,
  className,
}: {
  items: BarItem[];
  max?: number;
  color?: string;
  format?: (v: number) => string;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{item.label}</span>
            <span className="tabular-nums text-slate-500">{format(item.value)}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-pill bg-slate-200">
            <div
              className="h-full rounded-pill"
              style={{
                width: `${Math.min(100, (item.value / max) * 100)}%`,
                background: color,
              }}
            />
          </div>
          {item.hint ? (
            <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
