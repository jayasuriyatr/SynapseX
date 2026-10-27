import { cn } from "@/lib/utils";

/**
 * SHAP beeswarm-style plot. For each feature row, dots are scattered along a
 * −1..1 SHAP-value axis and coloured by feature value (blue=low → red=high).
 * Deterministic positions so SSR and CSR match.
 */
export function ShapBeeswarm({
  features,
  className,
}: {
  features: string[];
  className?: string;
}) {
  const dotsPerRow = 22;

  const rand = (a: number, b: number) => {
    const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };

  return (
    <div className={cn("flex h-full w-full flex-col text-[10px] text-slate-400", className)}>
      <div className="flex min-h-0 flex-1 flex-col justify-around">
        {features.map((f, ri) => (
          <div key={f} className="flex items-center gap-2">
            <span className="w-14 shrink-0 truncate text-right font-mono text-slate-500">{f}</span>
            <div className="relative h-5 flex-1">
              {/* center line */}
              <span className="absolute left-1/2 top-0 h-full w-px bg-slate-200" />
              {Array.from({ length: dotsPerRow }).map((_, di) => {
                const spread = (rand(ri + 1, di + 1) - 0.5) * 2; // -1..1
                const skew = ri % 2 === 0 ? 0.25 : -0.15;
                const val = Math.max(-1, Math.min(1, spread + skew));
                const left = 50 + val * 48; // %
                const t = (val + 1) / 2; // 0..1 for color
                const color = `color-mix(in srgb, #ef4444 ${Math.round(t * 100)}%, #2563eb)`;
                const top = 2 + rand(di + 1, ri + 3) * 12;
                return (
                  <span
                    key={di}
                    className="absolute h-1.5 w-1.5 rounded-full"
                    style={{ left: `${left}%`, top, background: color, opacity: 0.8 }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between pl-16 font-mono">
        <span>-1.0</span>
        <span>0</span>
        <span>1.0</span>
      </div>
    </div>
  );
}
