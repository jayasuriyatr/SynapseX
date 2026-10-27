import { LineChart } from "@/components/charts/LineChart";
import { Donut } from "@/components/charts/Donut";
import { Gauge } from "@/components/charts/Gauge";
import { RadarChart } from "@/components/charts/RadarChart";
import { Icon } from "@/components/ui/iconMap";
import {
  SearchIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  GridIcon,
  ListIcon,
  DownloadIcon,
  MoreIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Models", value: "14", delta: "2 new this month", icon: "layers" },
  { label: "Active Models", value: "6", delta: "1 new this month", icon: "shield", accent: true },
  { label: "Average Accuracy", value: "94.7%", delta: "2.3% vs last month", icon: "target" },
  { label: "Total Deployments", value: "18", delta: "3 vs last month", icon: "upload" },
  { label: "Total Inferences", value: "254,812", delta: "21.8% vs last month", icon: "activity" },
  { label: "Model Efficiency (Avg.)", value: "78.3%", delta: "3.7% vs last month", icon: "bolt" },
];

const FILTERS = ["All Tasks", "All Status", "All Architectures", "All Tags"];

const MODELS = [
  { name: "NeuroNet v3.2", sub: "Advanced multi-task EEG model", best: true, tasks: ["Seizure", "Emotion", "Cognitive"], arch: "Transformer", version: "v3.2.1", acc: "94.7%", lat: "78ms", status: "Active", updated: "May 28, 2024", color: "#1e293b" },
  { name: "CHB-MIT Deep v2.1", sub: "Seizure detection model", tasks: ["Seizure"], arch: "CNN-LSTM", version: "v2.1.0", acc: "96.2%", lat: "65ms", status: "Active", updated: "May 25, 2024", color: "#2563eb" },
  { name: "EmotionAI EEG v1.8", sub: "Emotion recognition model", tasks: ["Emotion"], arch: "CNN-Transformer", version: "v1.8.3", acc: "93.1%", lat: "82ms", status: "Active", updated: "May 22, 2024", color: "#06b6d4" },
  { name: "Cognitive State Net v1.5", sub: "Cognitive state classification", tasks: ["Cognitive"], arch: "EEGNet", version: "v1.5.2", acc: "92.4%", lat: "74ms", status: "Active", updated: "May 20, 2024", color: "#7c3aed" },
  { name: "Sleep Stage Classifier v2.0", sub: "Sleep stage classification model", tasks: ["Sleep"], arch: "Transformer", version: "v2.0.0", acc: "95.3%", lat: "88ms", status: "Active", updated: "May 18, 2024", color: "#6366f1" },
  { name: "Anomaly Detection v1.2", sub: "EEG anomaly detection model", tasks: ["Anomaly"], arch: "Autoencoder", version: "v1.2.0", acc: "91.7%", lat: "67ms", status: "Inactive", updated: "May 15, 2024", color: "#8b5cf6" },
  { name: "Research Baseline v1.0", sub: "Baseline EEG classification model", tasks: ["Seizure"], arch: "CNN", version: "v1.0.0", acc: "89.6%", lat: "120ms", status: "Archived", updated: "May 10, 2024", color: "#64748b" },
];

const TASK_TONE: Record<string, string> = {
  Seizure: "bg-neural-blue/10 text-neural-blue",
  Emotion: "bg-electric-cyan/10 text-electric-cyan",
  Cognitive: "bg-signal-violet/10 text-signal-violet",
  Sleep: "bg-indigo-500/10 text-indigo-600",
  Anomaly: "bg-warning/10 text-warning",
};

const STATUS_TONE: Record<string, string> = {
  Active: "text-success",
  Inactive: "text-warning",
  Archived: "text-slate-400",
};

const RADAR = [
  { label: "Accuracy", best: 94.7, avg: 88 },
  { label: "Precision", best: 93.8, avg: 86 },
  { label: "Recall", best: 92.4, avg: 85 },
  { label: "F1 Score", best: 93.1, avg: 86 },
  { label: "Specificity", best: 94.2, avg: 87 },
  { label: "AUC-ROC", best: 95.3, avg: 89 },
];

const ACCURACY = {
  neuronet: [90, 91, 92, 91, 93, 92, 94, 93, 95, 94, 95, 94.7],
  chbmit: [93, 94, 93, 95, 94, 96, 95, 96, 95, 96, 95, 96.2],
  emotion: [88, 89, 90, 89, 91, 90, 92, 91, 93, 92, 93, 93.1],
  cognitive: [84, 85, 86, 85, 87, 88, 87, 89, 90, 91, 92, 92.4],
};

const BY_TASK = [
  { label: "Seizure Detection", value: 5, detail: "5", color: "#2563eb" },
  { label: "Emotion Recognition", value: 3, detail: "3", color: "#06b6d4" },
  { label: "Cognitive State", value: 2, detail: "2", color: "#7c3aed" },
  { label: "Sleep Analysis", value: 2, detail: "2", color: "#6366f1" },
  { label: "Anomaly Detection", value: 1, detail: "1", color: "#8b5cf6" },
  { label: "Others", value: 1, detail: "1", color: "#cbd5e1" },
];

export default function ModelsPage() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Stats */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="surface-card rounded-lg p-3">
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-slate-500">{s.label}</span>
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", s.accent ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400")}>
                <Icon name={s.icon} className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-1 font-display text-xl font-bold leading-none text-slate-900">{s.value}</p>
            <p className="mt-1 text-[10px] font-medium text-success">↑ {s.delta}</p>
          </div>
        ))}
      </div>

      {/* Row 2 — models table + radar */}
      <div className="grid min-h-0 flex-[1.35] grid-cols-1 gap-3 lg:grid-cols-[1.7fr_1fr]">
        <Panel>
          {/* toolbar */}
          <div className="mb-2 flex shrink-0 flex-wrap items-center gap-2">
            <div className="relative min-w-[160px] flex-1">
              <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input type="search" placeholder="Search models..." className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-neural-blue" />
            </div>
            {FILTERS.map((f) => (
              <FilterButton key={f} label={f} />
            ))}
            <div className="ml-auto flex items-center gap-2">
              <FilterButton label="Sort by: Latest Updated" />
              <div className="flex overflow-hidden rounded-md border border-slate-200">
                <button className="grid h-8 w-8 place-items-center bg-neural-blue/10 text-neural-blue" aria-label="Grid view"><GridIcon className="h-4 w-4" /></button>
                <button className="grid h-8 w-8 place-items-center text-slate-400 hover:bg-slate-50" aria-label="List view"><ListIcon className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="pb-2 font-medium">Model Name</th>
                  <th className="pb-2 font-medium">Task</th>
                  <th className="pb-2 font-medium">Architecture</th>
                  <th className="pb-2 font-medium">Version</th>
                  <th className="pb-2 font-medium">Accuracy</th>
                  <th className="pb-2 font-medium">Latency</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Last Updated</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m) => (
                  <tr key={m.name} className="border-t border-slate-100">
                    <td className="py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-white" style={{ background: m.color }}>
                          <Icon name="neural" className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate font-medium text-slate-800">{m.name}</span>
                            {m.best ? <span className="rounded bg-success/10 px-1.5 py-0.5 text-[9px] font-medium text-success">Best</span> : null}
                          </div>
                          <p className="truncate text-[10px] text-slate-400">{m.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-1">
                        {m.tasks.map((t) => (
                          <span key={t} className={cn("rounded px-1.5 py-0.5 text-[9px] font-medium", TASK_TONE[t] ?? "bg-slate-100 text-slate-500")}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 text-slate-600">{m.arch}</td>
                    <td className="py-2 font-mono text-slate-500">{m.version}</td>
                    <td className="py-2 tabular-nums text-slate-600">{m.acc}</td>
                    <td className="py-2 tabular-nums text-slate-600">{m.lat}</td>
                    <td className="py-2">
                      <span className={cn("flex items-center gap-1.5 font-medium", STATUS_TONE[m.status])}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", m.status === "Active" ? "bg-success" : m.status === "Inactive" ? "bg-warning" : "bg-slate-300")} />
                        {m.status}
                      </span>
                    </td>
                    <td className="py-2 text-slate-500">{m.updated}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-end gap-1.5 text-slate-400">
                        <DownloadIcon className="h-4 w-4 hover:text-neural-blue" />
                        <MoreIcon className="h-4 w-4 hover:text-neural-blue" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2 flex shrink-0 items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
            <span>Showing 1 to 7 of 14 models</span>
            <div className="flex items-center gap-1">
              <button className="grid h-6 w-6 place-items-center rounded border border-slate-200">‹</button>
              <button className="grid h-6 w-6 place-items-center rounded bg-neural-blue/10 text-neural-blue">1</button>
              <button className="grid h-6 w-6 place-items-center rounded border border-slate-200">2</button>
              <button className="grid h-6 w-6 place-items-center rounded border border-slate-200">›</button>
            </div>
          </div>
        </Panel>

        <Panel title="Model Performance Overview" action={<MiniSelect value="Last 30 Days" />} footer={<ViewLink>View Detailed Comparison</ViewLink>}>
          <div className="min-h-0 flex-1">
            <RadarChart axes={RADAR} />
          </div>
          <div className="flex shrink-0 justify-center gap-4 text-[10px] text-slate-500">
            <Legend color="var(--color-neural-blue)" label="Best Model" />
            <Legend color="var(--color-electric-cyan)" label="Average Model" />
          </div>
        </Panel>
      </div>

      {/* Row 3 — accuracy / by task / resources */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Model Accuracy Over Time" action={<MiniSelect value="Last 30 Days" />}>
          <div className="min-h-0 flex-1">
            <LineChart
              fill
              yMin={0}
              yMax={100}
              series={[
                { data: ACCURACY.neuronet, color: "var(--color-neural-blue)" },
                { data: ACCURACY.chbmit, color: "var(--color-electric-cyan)" },
                { data: ACCURACY.emotion, color: "var(--color-signal-violet)" },
                { data: ACCURACY.cognitive, color: "#6366f1" },
              ]}
            />
          </div>
          <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] text-slate-500">
            <Legend color="var(--color-neural-blue)" label="NeuroNet v3.2" />
            <Legend color="var(--color-electric-cyan)" label="CHB-MIT Deep v2.1" />
            <Legend color="var(--color-signal-violet)" label="EmotionAI EEG v1.8" />
            <Legend color="#6366f1" label="Cognitive State Net v1.5" />
          </div>
        </Panel>

        <Panel title="Models by Task" footer={<ViewLink>View All Models</ViewLink>}>
          <div className="flex min-h-0 flex-1 items-center">
            <Donut slices={BY_TASK} centerValue="14" centerLabel="Total Models" />
          </div>
        </Panel>

        <Panel title="Resource Utilization (Active Models)">
          <div className="grid shrink-0 grid-cols-3 gap-2">
            <ResourceGauge value={72} label="GPU Usage" sub="6.2 / 8 GB" color="var(--color-neural-blue)" />
            <ResourceGauge value={58} label="Memory Usage" sub="9.3 / 16 GB" color="var(--color-electric-cyan)" />
            <ResourceGauge value={41} label="CPU Usage" sub="4.7 / 10 Cores" color="var(--color-signal-violet)" />
          </div>
          <div className="mt-2 border-t border-slate-100 pt-2">
            <p className="mb-1.5 text-[11px] font-semibold text-slate-700">Inference Statistics (30 Days)</p>
            <div className="grid grid-cols-3 gap-2">
              <MiniStat value="254,812" label="Total Inferences" delta="21.8%" up />
              <MiniStat value="78ms" label="Avg. Inference Time" delta="8.3%" />
              <MiniStat value="3,245 / min" label="Throughput" delta="14.2%" up />
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
  action,
  footer,
  className,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("surface-card flex min-h-0 flex-col overflow-hidden rounded-lg p-3", className)}>
      {title || action ? (
        <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
          {title ? <h2 className="text-[13px] font-semibold text-slate-900">{title}</h2> : <span />}
          {action}
        </header>
      ) : null}
      {children}
      {footer ? <div className="mt-2 shrink-0 border-t border-slate-100 pt-1.5 text-center">{footer}</div> : null}
    </section>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-[11px] text-slate-600 hover:bg-slate-50">
      {label}
      <ChevronDownIcon className="h-3 w-3 text-slate-400" />
    </button>
  );
}

function MiniSelect({ value }: { value: string }) {
  return (
    <button className="flex items-center gap-1 rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600 hover:bg-slate-50">
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

function ResourceGauge({ value, label, sub, color }: { value: number; label: string; sub: string; color: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Gauge value={value} color={color} />
      <p className="mt-0.5 text-[10px] font-medium text-slate-600">{label}</p>
      <p className="text-[9px] text-slate-400">{sub}</p>
    </div>
  );
}

function MiniStat({ value, label, delta, up }: { value: string; label: string; delta: string; up?: boolean }) {
  return (
    <div>
      <p className="font-display text-sm font-bold leading-none text-slate-900">{value}</p>
      <p className="mt-0.5 truncate text-[9px] text-slate-400">{label}</p>
      <p className={cn("text-[9px] font-medium", up ? "text-success" : "text-neural-blue")}>{up ? "↑" : "↓"} {delta}</p>
    </div>
  );
}
