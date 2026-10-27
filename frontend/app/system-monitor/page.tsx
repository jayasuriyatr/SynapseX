import { LineChart } from "@/components/charts/LineChart";
import { Gauge } from "@/components/charts/Gauge";
import { ProgressBar } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/iconMap";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { LIVE_INFERENCE, LATENCY_TREND } from "@/lib/mock-data";

const STATS = [
  { label: "System Status", value: "Operational", icon: "check", tone: "success" },
  { label: "Uptime (30d)", value: "99.98%", icon: "activity", tone: "info" },
  { label: "Inference Queue", value: "0 pending", icon: "process", tone: "plain" },
  { label: "Requests / min", value: "940", icon: "bolt", tone: "plain" },
  { label: "Error Rate", value: "0.02%", icon: "shield", tone: "plain" },
];

const SERVICES = [
  { name: "API Gateway", latency: "12 ms", status: "Operational" },
  { name: "SNN Inference Engine", latency: "28 ms", status: "Operational" },
  { name: "Data Pipeline", latency: "41 ms", status: "Operational" },
  { name: "Storage Service", latency: "9 ms", status: "Operational" },
  { name: "Database", latency: "6 ms", status: "Operational" },
];

const EVENTS = [
  { msg: "Inference queue drained — 0 pending jobs", time: "2 min ago", tone: "success" },
  { msg: "Model server reloaded checkpoint best.pt", time: "26 min ago", tone: "info" },
  { msg: "GPU utilization peaked at 84%", time: "1 hr ago", tone: "warning" },
  { msg: "Auto-scaled inference workers 2 → 3", time: "2 hr ago", tone: "info" },
  { msg: "Nightly backup completed (620 GB)", time: "6 hr ago", tone: "success" },
];

const EVENT_DOT: Record<string, string> = {
  success: "bg-success",
  info: "bg-neural-blue",
  warning: "bg-warning",
};

const GAUGE_COLOR = ["var(--color-neural-blue)", "var(--color-electric-cyan)", "var(--color-signal-violet)", "#6366f1"];

export default async function SystemMonitorPage() {
  const [resources, queue] = await Promise.all([api.getResources(), api.getQueue()]);

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
            <p className={cn("mt-1.5 font-display text-lg font-bold leading-none", s.tone === "success" ? "text-success" : "text-slate-900")}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Row 2 — gauges + throughput + service health */}
      <div className="grid min-h-0 flex-[1.1] grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1.2fr_1fr]">
        <Panel title="Resource Utilization">
          <div className="grid min-h-0 flex-1 grid-cols-2 place-items-center gap-2">
            {resources.map((r, i) => (
              <div key={r.label} className="flex flex-col items-center text-center">
                <Gauge value={r.used} caption={r.label} color={GAUGE_COLOR[i % GAUGE_COLOR.length]} />
                <p className="text-[9px] text-slate-400">{r.detail}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Inference Throughput" subtitle="requests / 5 min">
          <div className="min-h-0 flex-1">
            <LineChart fill series={[{ data: LIVE_INFERENCE.map((p) => p.y), color: "var(--color-neural-blue)", area: true }]} />
          </div>
        </Panel>

        <Panel title="Service Health">
          <ul className="flex min-h-0 flex-1 flex-col justify-around">
            {SERVICES.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600">
                  <Icon name="check" className="h-3.5 w-3.5 text-success" />
                  {s.name}
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">{s.latency}</span>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {s.status}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Row 3 — latency + queue + events */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Request Latency" subtitle="ms · last 24h">
          <div className="min-h-0 flex-1">
            <LineChart fill yMin={0} series={[{ data: LATENCY_TREND.map((p) => p.y), color: "var(--color-signal-violet)", area: true }]} />
          </div>
        </Panel>

        <Panel title="Inference Queue">
          <div className="grid grid-cols-3 gap-2">
            <QueueStat value={`${queue.pending}`} label="Pending" tone="plain" />
            <QueueStat value={`${queue.running}`} label="Running" tone="info" />
            <QueueStat value={queue.completedToday.toLocaleString()} label="Done Today" tone="success" />
          </div>
          <div className="mt-3 space-y-2.5">
            <Meter label="Queue Saturation" value={6} tone="info" />
            <Meter label="Worker Capacity" value={64} tone="success" />
            <Meter label="Avg. Wait Time" value={12} display="0.3s" tone="info" />
          </div>
        </Panel>

        <Panel title="Recent Events">
          <ol className="min-h-0 flex-1 space-y-2.5 overflow-y-auto">
            {EVENTS.map((e, i) => (
              <li key={i} className="flex gap-2.5">
                <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", EVENT_DOT[e.tone])} />
                <div className="min-w-0">
                  <p className="text-[11px] leading-snug text-slate-700">{e.msg}</p>
                  <p className="text-[10px] text-slate-400">{e.time}</p>
                </div>
              </li>
            ))}
          </ol>
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

function QueueStat({ value, label, tone }: { value: string; label: string; tone: "plain" | "info" | "success" }) {
  return (
    <div className="rounded-lg border border-slate-200 p-2 text-center">
      <p className={cn("font-display text-lg font-bold leading-none", tone === "info" ? "text-neural-blue" : tone === "success" ? "text-success" : "text-slate-900")}>
        {value}
      </p>
      <p className="mt-0.5 text-[10px] text-slate-400">{label}</p>
    </div>
  );
}

function Meter({ label, value, display, tone }: { label: string; value: number; display?: string; tone: "info" | "success" }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-slate-500">{label}</span>
        <span className="font-medium tabular-nums text-slate-600">{display ?? `${value}%`}</span>
      </div>
      <ProgressBar value={value} tone={tone} />
    </div>
  );
}
