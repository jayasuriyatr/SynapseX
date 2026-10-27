import type { SeriesPoint } from "@/types";
import { cn } from "@/lib/utils";

/** ROC curve with the random-baseline diagonal. */
export function RocCurve({
  points,
  auc,
  className,
}: {
  points: SeriesPoint[];
  auc?: number;
  className?: string;
}) {
  const S = 240;
  const pad = 28;
  const inner = S - pad * 2;
  const px = (v: number) => pad + (v as number) * inner;
  const py = (v: number) => pad + inner - v * inner;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${px(Number(p.x)).toFixed(1)} ${py(p.y).toFixed(1)}`)
    .join(" ");
  const area = `${path} L ${px(1)} ${py(0)} Z`;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className={cn("w-full max-w-xs", className)} role="img" aria-label={`ROC curve${auc ? `, AUC ${auc}` : ""}`}>
      <defs>
        <linearGradient id="roc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-neural-blue)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-neural-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* axes */}
      <line x1={pad} y1={pad} x2={pad} y2={S - pad} stroke="#cbd5e1" />
      <line x1={pad} y1={S - pad} x2={S - pad} y2={S - pad} stroke="#cbd5e1" />
      {/* baseline */}
      <line x1={pad} y1={S - pad} x2={S - pad} y2={pad} stroke="#e2e8f0" strokeDasharray="4 4" />
      {/* curve */}
      <path d={area} fill="url(#roc-fill)" />
      <path d={path} fill="none" stroke="var(--color-neural-blue)" strokeWidth="2.5" strokeLinejoin="round" />
      <text x={S / 2} y={S - 6} textAnchor="middle" fontSize="9" className="fill-slate-500">
        False Positive Rate
      </text>
    </svg>
  );
}
