import { cn } from "@/lib/utils";

/**
 * Confusion-matrix heatmap. Cells shaded by intensity (brand blue scale);
 * value labels always rendered so it never relies on color alone.
 */
export function ConfusionMatrix({
  labels,
  values,
  className,
}: {
  labels: string[];
  values: number[][];
  className?: string;
}) {
  const max = Math.max(...values.flat()) || 1;

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th className="p-2" />
            {labels.map((l) => (
              <th key={l} className="p-2 text-xs font-medium text-slate-500">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, r) => (
            <tr key={labels[r]}>
              <th className="p-2 text-right text-xs font-medium text-slate-500">
                {labels[r]}
              </th>
              {row.map((v, c) => {
                const intensity = v / max;
                const isDiag = r === c;
                return (
                  <td key={c} className="p-1">
                    <div
                      className="grid h-12 w-14 place-items-center rounded-md text-xs font-semibold"
                      style={{
                        background: isDiag
                          ? `color-mix(in srgb, var(--color-neural-blue) ${20 + intensity * 70}%, white)`
                          : `color-mix(in srgb, var(--color-slate-500) ${intensity * 55}%, white)`,
                        color: intensity > 0.6 ? "white" : "var(--color-slate-700)",
                      }}
                    >
                      {v}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
