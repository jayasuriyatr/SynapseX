import { LineChart } from "@/components/charts/LineChart";
import { Donut } from "@/components/charts/Donut";
import { BarChart } from "@/components/charts/BarChart";
import { Gauge } from "@/components/charts/Gauge";
import { Sparkline } from "@/components/charts/Sparkline";
import { Icon } from "@/components/ui/iconMap";
import { ChevronDownIcon, ArrowRightIcon, InfoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";

export default async function AnalyticsPage() {
  const data = await api.getAnalytics();

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Row 1 — stat cards */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {data.stats.map((s) => (
          <div key={s.label} className="surface-card overflow-hidden rounded-lg p-3.5">
            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-500">{s.label}</span>
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                  s.icon === "check" ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400",
                )}
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-1 font-display text-2xl font-bold leading-none text-slate-900">{s.value}</p>
            <p
              className={cn(
                "mt-1 text-[11px] font-medium",
                s.trend === "up" ? "text-success" : s.trend === "down" ? "text-neural-blue" : "text-slate-400",
              )}
            >
              {s.trend === "up" ? "↑ " : s.trend === "down" ? "↓ " : ""}
              {s.delta}
            </p>
            {s.spark && s.spark.length ? (
              <Sparkline data={s.spark} color={s.color} area className="mt-1 h-6" />
            ) : null}
          </div>
        ))}
      </div>

      {/* Row 2 — Analysis Trend + Task Performance */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Analysis Trend" info action={<MiniSelect value="Last 30 Days" />}>
          <div className="mb-1 flex gap-3 text-[10px] text-slate-500">
            <Legend color="var(--color-signal-violet)" label="Analyses" />
            <Legend color="var(--color-electric-cyan)" label="Predictions" />
          </div>
          <div className="min-h-0 flex-1">
            <LineChart
              fill
              series={[
                { data: data.trend.predictions, color: "var(--color-electric-cyan)", area: true },
                { data: data.trend.analyses, color: "var(--color-signal-violet)", area: true },
              ]}
            />
          </div>
          <div className="mt-1 flex justify-between pl-8 font-mono text-[8px] text-slate-400">
            {data.trend.dates.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1 border-t border-slate-100 pt-2">
            {data.trend.summary.map((m) => (
              <div key={m.label} className="flex flex-col items-center text-center">
                <Icon name={m.icon} className="h-3.5 w-3.5 text-neural-blue" />
                <span className="mt-0.5 text-xs font-bold text-slate-900">{m.value}</span>
                <span className="text-[9px] text-slate-400">{m.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Task Performance" action={<ViewLink>View Details</ViewLink>}>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="pb-1.5 font-medium">Task</th>
                  <th className="pb-1.5 font-medium">Accuracy</th>
                  <th className="pb-1.5 font-medium">Trend</th>
                  <th className="pb-1.5 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.taskPerformance.map((t) => (
                  <tr key={t.task} className="border-t border-slate-100">
                    <td className="py-1.5">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: t.color }} />
                        <span className="truncate">{t.task}</span>
                      </span>
                    </td>
                    <td className="py-1.5 tabular-nums text-slate-600">{t.acc}</td>
                    <td className="py-1.5">
                      <Sparkline data={t.spark} color={t.color} className="h-5 w-16" />
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-slate-600">{t.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* Row 3 — Data Volume + Model Accuracy + Prediction Distribution */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel
          title="Data Volume"
          action={<MiniSelect value="Last 30 Days" />}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-success">{data.dataVolume.deltaLabel}</span>
              <ViewLink>View Storage</ViewLink>
            </div>
          }
        >
          <div className="flex min-h-0 flex-1 items-center">
            <Donut slices={data.dataVolume.slices} centerValue={data.dataVolume.centerValue} centerLabel={data.dataVolume.centerLabel} />
          </div>
        </Panel>

        <Panel title="Model Accuracy Over Time" action={<MiniSelect value="Last 30 Days" />}>
          <div className="min-h-0 flex-1">
            <LineChart fill yMin={0} yMax={100} series={data.modelAccuracy} />
          </div>
          <div className="mt-1 flex flex-wrap justify-center gap-2 text-[9px] text-slate-500">
            {data.modelAccuracy.map((s) => (
              <Legend key={s.label} color={s.color} label={s.label} />
            ))}
          </div>
        </Panel>

        <Panel title="Prediction Distribution" footer={<ViewLink>View Breakdown</ViewLink>}>
          <div className="flex min-h-0 flex-1 items-center">
            <Donut slices={data.predictionDistribution.slices} centerValue={data.predictionDistribution.centerValue} centerLabel={data.predictionDistribution.centerLabel} />
          </div>
        </Panel>
      </div>

      {/* Row 4 — Inference Time + Top Subjects + System Utilization */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Inference Time Distribution" action={<MiniSelect value="Last 30 Days" />}>
          <div className="flex min-h-0 flex-1 gap-3">
            <div className="min-h-0 flex-1">
              <BarChart data={data.inferenceBuckets} highlightIndex={3} color="var(--color-signal-violet)" />
            </div>
            <div className="flex shrink-0 flex-col justify-center gap-1.5 border-l border-slate-100 pl-3">
              <MiniStat value={data.inferenceStats.average} label="Average" />
              <MiniStat value={data.inferenceStats.median} label="Median" />
              <MiniStat value={data.inferenceStats.min} label="Min" />
              <MiniStat value={data.inferenceStats.max} label="Max" />
            </div>
          </div>
        </Panel>

        <Panel title="Top Subjects" action={<ViewLink>View All</ViewLink>}>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="pb-1.5 font-medium">Subject ID</th>
                  <th className="pb-1.5 font-medium">Analyses</th>
                  <th className="pb-1.5 font-medium">Predictions</th>
                  <th className="pb-1.5 text-right font-medium">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {data.topSubjects.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="py-1.5 font-mono text-slate-600">{s.id}</td>
                    <td className="py-1.5 tabular-nums text-slate-600">{s.analyses}</td>
                    <td className="py-1.5 tabular-nums text-slate-600">{s.predictions}</td>
                    <td className="py-1.5 text-right tabular-nums font-medium text-success">{s.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="System Utilization" badge={<RealtimeBadge />}>
          <div className="grid grid-cols-4 gap-1">
            {data.utilization.map((g, i) => (
              <Gauge key={i} value={g.value} caption={g.caption} color={g.color} />
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-2">
            <div>
              <p className="text-[10px] text-slate-500">System Uptime</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{data.systemUptime.value}</span>
                <Sparkline data={data.systemUptime.spark} color="var(--color-success)" className="h-5 flex-1" />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Errors (24h)</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{data.errors.value}</span>
                <Sparkline data={data.errors.spark} color="var(--color-error)" className="h-5 flex-1" />
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ----------------------------- building blocks ----------------------------- */

function Panel({
  title,
  info,
  badge,
  action,
  footer,
  children,
}: {
  title: string;
  info?: boolean;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card flex min-h-0 flex-col rounded-lg p-3.5">
      <header className="mb-2 flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
          {title}
          {info ? <InfoIcon className="h-3.5 w-3.5 text-slate-300" /> : null}
          {badge}
        </h2>
        {action}
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      {footer ? <div className="mt-2 shrink-0">{footer}</div> : null}
    </section>
  );
}

function MiniSelect({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-50"
    >
      {value}
      <ChevronDownIcon className="h-3 w-3 text-slate-400" />
    </button>
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

function ViewLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-medium text-neural-blue">
      {children}
      <ArrowRightIcon className="h-3 w-3" />
    </a>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-right">
      <p className="font-display text-sm font-bold leading-none text-slate-900">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}

function RealtimeBadge() {
  return (
    <span className="flex items-center gap-1 rounded-pill bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      Real-time
    </span>
  );
}
