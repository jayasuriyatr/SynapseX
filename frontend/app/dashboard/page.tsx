import { LineChart } from "@/components/charts/LineChart";
import { Donut } from "@/components/charts/Donut";
import { EegWaveform } from "@/components/visuals/EegWaveform";
import { MultiTaskRadial } from "@/components/dashboard/MultiTaskRadial";
import { Icon } from "@/components/ui/iconMap";
import { CheckIcon, ChevronDownIcon, MoreIcon, ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";

const STATUS_TONE: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Processing: "bg-neural-blue/10 text-neural-blue",
  Failed: "bg-error/10 text-error",
};

export default async function DashboardPage() {
  const data = await api.getDashboard();

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Stat cards */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {data.stats.map((s) => (
          <div key={s.label} className="surface-card rounded-lg p-3.5">
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
            <p className="mt-1.5 font-display text-2xl font-bold leading-none text-slate-900">
              {s.value}
            </p>
            <p
              className={cn(
                "mt-1.5 text-[11px] font-medium",
                s.trend === "up" ? "text-success" : s.trend === "down" ? "text-neural-blue" : "text-slate-400",
              )}
            >
              {s.trend === "up" ? "↑ " : s.trend === "down" ? "↓ " : ""}
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Row A */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Live EEG Monitor */}
        <Panel title="Live EEG Monitor" badge={<LiveBadge />}>
          <div className="mb-2 flex gap-2">
            <MiniSelect label="Channel Group" value="All Channels" />
            <MiniSelect label="Time Scale" value="10 sec" />
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-between">
            {data.eegChannels.map((ch, i) => (
              <div key={ch} className="flex items-center gap-2">
                <span className="w-7 font-mono text-[10px] text-slate-400">{ch}</span>
                <div className="h-4 flex-1">
                  <EegWaveform
                    animate={false}
                    stroke={i % 2 ? "var(--color-electric-cyan)" : "var(--color-signal-violet)"}
                  />
                </div>
              </div>
            ))}
            <div className="mt-1 flex justify-between pl-9 font-mono text-[9px] text-slate-400">
              <span>10s</span><span>7.5s</span><span>5s</span><span>2.5s</span><span>0s</span>
            </div>
          </div>
        </Panel>

        {/* Multi-Task Prediction */}
        <Panel title="Multi-Task Prediction">
          <MultiTaskRadial tasks={data.multiTask} />
        </Panel>

        {/* Confidence Overview */}
        <Panel title="Confidence Overview" action={<MiniSelect value="All Tasks" />}>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              <LineChart
                fill
                yMin={0}
                yMax={100}
                series={data.confidenceSeries}
              />
            </div>
            <div className="mt-1 flex flex-wrap justify-center gap-3 text-[10px] text-slate-500">
              {data.confidenceSeries.map((s) => (
                <Legend key={s.label} color={s.color} label={s.label} />
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Row B */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Recent Analyses */}
        <Panel title="Recent Analyses" action={<ViewLink href="/reports">View All</ViewLink>}>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Subject</th>
                  <th className="pb-2 font-medium">Tasks</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Created At</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {data.recentAnalyses.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="py-2 font-mono text-slate-600">{r.id}</td>
                    <td className="py-2 text-slate-600">{r.subject}</td>
                    <td className="py-2">
                      <span className="flex gap-1 text-slate-300">
                        <Icon name="brain" className="h-3.5 w-3.5" />
                        <Icon name="emotion" className="h-3.5 w-3.5" />
                        <Icon name="cognition" className="h-3.5 w-3.5" />
                      </span>
                    </td>
                    <td className="py-2">
                      <span className={cn("rounded-pill px-2 py-0.5 text-[10px] font-medium", STATUS_TONE[r.status])}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 text-slate-400">{r.time}</td>
                    <td className="py-2 text-right">
                      <MoreIcon className="ml-auto h-4 w-4 text-slate-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Dataset Distribution */}
        <Panel title="Dataset Distribution" footer={<ViewLink href="/datasets">Explore Datasets</ViewLink>}>
          <div className="flex min-h-0 flex-1 items-center">
            <Donut slices={data.datasetDistribution} centerValue={String(data.datasetTotal)} centerLabel="Total Datasets" />
          </div>
        </Panel>

        {/* System Status + GPU */}
        <div className="grid min-h-0 grid-rows-2 gap-3">
          <Panel title="System Status">
            <ul className="flex min-h-0 flex-1 flex-col justify-around">
              {data.systemStatus.map((s) => (
                <li key={s.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-600">
                    <CheckIcon className="h-3.5 w-3.5 text-success" />
                    {s.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="GPU Utilization" action={<ViewLink href="/system-monitor">View Metrics</ViewLink>}>
            <div className="flex min-h-0 flex-1 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-signal-violet/10 text-signal-violet">
                <Icon name="cpu" className="h-5 w-5" />
              </span>
              <div className="shrink-0">
                <p className="font-display text-2xl font-bold leading-none text-slate-900">{data.gpu.usagePct}%</p>
                <p className="text-[10px] text-slate-500">Average Utilization</p>
              </div>
              <div className="min-w-0 flex-1">
                <LineChart
                  className="h-12"
                  height={48}
                  showGrid={false}
                  series={[{ data: data.gpu.spark, color: "var(--color-signal-violet)", area: true }]}
                />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ---------- local building blocks ---------- */

function Panel({
  title,
  badge,
  action,
  footer,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card flex min-h-0 flex-col rounded-lg p-4">
      <header className="mb-2 flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          {title}
          {badge}
        </h2>
        {action}
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      {footer ? <div className="mt-2 shrink-0">{footer}</div> : null}
    </section>
  );
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1 rounded-pill bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      Live
    </span>
  );
}

function MiniSelect({ label, value }: { label?: string; value: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-50"
    >
      {label ? <span className="text-slate-400">{label}:</span> : null}
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

function ViewLink({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-1 text-[11px] font-medium text-neural-blue">
      {children}
      <ArrowRightIcon className="h-3 w-3" />
    </a>
  );
}
