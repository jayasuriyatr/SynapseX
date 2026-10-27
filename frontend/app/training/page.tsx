import { LineChart } from "@/components/charts/LineChart";
import { ConfusionMatrix } from "@/components/charts/Heatmap";
import { RocCurve } from "@/components/charts/RocCurve";
import { StatusBadge, ProgressBar } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/iconMap";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { CONFUSION_MATRIX, ROC_CURVE } from "@/lib/mock-data";

const STATS = [
  { label: "Active Runs", value: "1", delta: "running now", icon: "activity", tone: "info" },
  { label: "Completed Runs", value: "12", delta: "3 this week", icon: "check", tone: "success" },
  { label: "Best Val Accuracy", value: "99.1%", delta: "seizure-backbone-v3", icon: "target" },
  { label: "Avg. Epoch Time", value: "42s", delta: "1.2x real-time", icon: "bolt" },
  { label: "GPU Hours (30d)", value: "128", delta: "A10 · 67% avg", icon: "cpu" },
];

export default async function TrainingPage() {
  const [runs, curve] = await Promise.all([api.getTrainingRuns(), api.getEpochCurve("run-emotion-ft")]);

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Stats */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="surface-card rounded-lg p-3">
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-slate-500">{s.label}</span>
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", s.tone === "success" ? "bg-success/10 text-success" : s.tone === "info" ? "bg-neural-blue/10 text-neural-blue" : "bg-slate-100 text-slate-400")}>
                <Icon name={s.icon} className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-1 font-display text-xl font-bold leading-none text-slate-900">{s.value}</p>
            <p className="mt-1 truncate text-[10px] font-medium text-slate-400">{s.delta}</p>
          </div>
        ))}
      </div>

      {/* Row 2 — runs + loss + accuracy */}
      <div className="grid min-h-0 flex-[1.1] grid-cols-1 gap-3 lg:grid-cols-[1.3fr_1fr_1fr]">
        <Panel title="Training Runs">
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            {runs.map((r) => (
              <li key={r.id} className="rounded-lg border border-slate-200 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-[11px] font-medium text-slate-800">{r.name}</span>
                  <StatusBadge tone={r.status === "running" ? "info" : r.status === "completed" ? "success" : "error"} dot={r.status === "running"}>
                    {r.status}
                  </StatusBadge>
                </div>
                <div className="mt-2">
                  <ProgressBar
                    value={(r.epoch / r.totalEpochs) * 100}
                    tone={r.status === "failed" ? "error" : r.status === "completed" ? "success" : "info"}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
                  <span>epoch {r.epoch}/{r.totalEpochs}</span>
                  <span>train {r.trainLoss} · val {r.valLoss}</span>
                  <span className="font-medium text-slate-600">{(r.valAccuracy * 100).toFixed(1)}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Loss Curves" subtitle="emotion-head-ft">
          <div className="min-h-0 flex-1">
            <LineChart
              fill
              series={[
                { data: curve.map((p) => p.trainLoss), color: "var(--color-neural-blue)" },
                { data: curve.map((p) => p.valLoss), color: "var(--color-signal-violet)" },
              ]}
            />
          </div>
          <div className="mt-1 flex shrink-0 justify-center gap-3 text-[9px] text-slate-500">
            <Legend color="var(--color-neural-blue)" label="Train loss" />
            <Legend color="var(--color-signal-violet)" label="Validation loss" />
          </div>
        </Panel>

        <Panel title="Validation Accuracy" subtitle="per epoch">
          <div className="min-h-0 flex-1">
            <LineChart fill yMin={40} yMax={100} series={[{ data: curve.map((p) => p.valAccuracy * 100), color: "var(--color-success)", area: true }]} />
          </div>
        </Panel>
      </div>

      {/* Row 3 — confusion / roc / checkpoints */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Confusion Matrix" subtitle="Emotion head · validation">
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto">
            <ConfusionMatrix labels={CONFUSION_MATRIX.labels} values={CONFUSION_MATRIX.values} />
          </div>
        </Panel>

        <Panel title="ROC Curve" subtitle="Seizure · AUC 0.99">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <RocCurve points={ROC_CURVE} auc={0.99} />
          </div>
        </Panel>

        <Panel title="Checkpoints">
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto">
            {[
              { name: "best.pt", meta: "epoch 80 · 84 MB", best: true },
              { name: "epoch_40.pt", meta: "epoch 40 · 84 MB" },
              { name: "epoch_30.pt", meta: "epoch 30 · 84 MB" },
              { name: "epoch_20.pt", meta: "epoch 20 · 84 MB" },
            ].map((c) => (
              <li key={c.name} className="flex items-center gap-2.5 rounded-lg border border-slate-200 p-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-neural-blue/10 text-neural-blue">
                  <Icon name="layers" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-700">
                    {c.name}
                    {c.best ? <span className="rounded bg-success/10 px-1.5 py-0.5 text-[9px] font-medium text-success">Best</span> : null}
                  </p>
                  <p className="text-[10px] text-slate-400">{c.meta}</p>
                </div>
                <Icon name="download" className="h-4 w-4 shrink-0 text-slate-400" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ----------------------------- building blocks ----------------------------- */

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card flex min-h-0 flex-col overflow-hidden rounded-lg p-3">
      <header className="mb-2 flex shrink-0 items-center gap-1.5">
        <h2 className="text-[13px] font-semibold text-slate-900">{title}</h2>
        {subtitle ? <span className="text-[10px] font-normal text-slate-400">{subtitle}</span> : null}
      </header>
      {children}
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
