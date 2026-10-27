import { Donut } from "@/components/charts/Donut";
import { BarList } from "@/components/charts/BarList";
import { EegWaveform } from "@/components/visuals/EegWaveform";
import { TopoMap } from "@/components/visuals/TopoMap";
import { Icon } from "@/components/ui/iconMap";
import {
  UploadIcon,
  DocumentIcon,
  CheckIcon,
  MoreIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  PlayIcon,
  ClockIcon,
  BoltIcon,
  NeuralIcon,
  CpuIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, title: "Upload Data", sub: "EEG file or folder" },
  { n: 2, title: "Configure Analysis", sub: "Select tasks & models" },
  { n: 3, title: "Processing", sub: "AI is analyzing data" },
  { n: 4, title: "Results Ready", sub: "View insights & reports" },
];

const TASKS = ["Seizure Detection", "Emotion Recognition", "Cognitive State", "Sleep Stage Classification"];

const OVERVIEW = [
  { icon: "users", label: "Subject ID", value: "SUB-042" },
  { icon: "clock", label: "Recording Duration", value: "02:14:36" },
  { icon: "wave", label: "Sampling Rate", value: "256 Hz" },
  { icon: "layers", label: "Channels", value: "19" },
  { icon: "shield", label: "Data Quality", value: "Good", tone: "success" },
  { icon: "activity", label: "Artifact Level", value: "Low (8.3%)", tone: "success" },
];

const PROC_STATS = [
  { icon: ClockIcon, label: "Estimated Time Left", value: "01:24" },
  { icon: BoltIcon, label: "Processing Speed", value: "1.2x Real-time" },
  { icon: NeuralIcon, label: "AI Model", value: "NeuroNet v3.2" },
  { icon: CpuIcon, label: "GPU Usage", value: "72%" },
];

const PREDICTIONS = [
  { icon: "brain", label: "Seizure Detection", state: "Low Risk", pct: "12%", tone: "success" },
  { icon: "emotion", label: "Emotion Recognition", state: "Calm", pct: "72%", tone: "info" },
  { icon: "cognition", label: "Cognitive State", state: "Focused", pct: "87%", tone: "violet" },
  { icon: "wave", label: "Sleep Stage", state: "N2", pct: "65%", tone: "info" },
  { icon: "shield", label: "Anomaly Detection", state: "Normal", pct: "93%", tone: "success" },
];

const PRED_TONE: Record<string, string> = {
  success: "bg-success/10 text-success",
  info: "bg-neural-blue/10 text-neural-blue",
  violet: "bg-signal-violet/10 text-signal-violet",
};

const EEG_CHANNELS = ["Fz", "Cz", "Pz", "O1", "T8", "P3"];

const BANDS = [
  { label: "Delta (0.5-4 Hz)", value: 22, color: "#2563eb" },
  { label: "Theta (4-8 Hz)", value: 18, color: "#06b6d4" },
  { label: "Alpha (8-13 Hz)", value: 23, color: "#7c3aed" },
  { label: "Beta (13-30 Hz)", value: 20, color: "#8b5cf6" },
  { label: "Gamma (30-45 Hz)", value: 17, color: "#22d3ee" },
];

const QUALITY = [
  { label: "Signal Quality", value: 92 },
  { label: "Noise Level", value: 8 },
  { label: "Artifact Ratio", value: 8.3 },
  { label: "Missing Data", value: 0.2 },
  { label: "Channel Consistency", value: 96 },
];

export default function AnalysisPage() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Stepper */}
      <ol className="grid shrink-0 grid-cols-2 gap-2 md:grid-cols-4">
        {STEPS.map((s) => {
          const active = s.n === 1;
          return (
            <li key={s.n} className="surface-card flex items-center gap-3 rounded-lg p-2.5">
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold",
                  active ? "bg-intelligence-gradient text-white" : "bg-slate-100 text-slate-400",
                )}
              >
                {s.n}
              </span>
              <div className="min-w-0">
                <p className={cn("text-xs font-semibold", active ? "text-slate-900" : "text-slate-500")}>{s.title}</p>
                <p className="truncate text-[10px] text-slate-400">{s.sub}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Row A */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_1.2fr_1fr]">
        {/* Upload */}
        <Panel title="Upload EEG Data">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-4 py-5 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-neural-blue/10 text-neural-blue">
                <UploadIcon className="h-5 w-5" />
              </span>
              <p className="mt-2 text-xs font-medium text-slate-600">Drag and drop EEG file here</p>
              <p className="text-[10px] text-slate-400">or</p>
              <button className="mt-1 rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-neural-blue hover:bg-slate-50">
                Browse Files
              </button>
              <p className="mt-2 text-[10px] text-slate-400">Supported formats: .edf .bdf .mat .fif .csv</p>
            </div>

            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-slate-200 p-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-neural-blue/10 text-neural-blue">
                <DocumentIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-700">Subject_042_EEG.edf</p>
                <p className="text-[10px] text-slate-400">2.45 GB · Uploaded 2 mins ago</p>
              </div>
              <span className="flex items-center gap-1 rounded-pill bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
                <CheckIcon className="h-3 w-3" /> Ready
              </span>
              <MoreIcon className="h-4 w-4 text-slate-300" />
            </div>
          </div>
        </Panel>

        {/* Configuration */}
        <Panel title="Analysis Configuration">
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
            <div>
              <p className="mb-1.5 text-[11px] font-medium text-slate-500">Select Analysis Tasks</p>
              <div className="flex flex-wrap gap-1.5">
                {TASKS.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-md bg-neural-blue/10 px-2 py-1 text-[11px] font-medium text-neural-blue">
                    {t}
                    <span className="text-neural-blue/60">×</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select label="Select Model" value="NeuroNet v3.2 (Best Accuracy)" />
              <Select label="Confidence Threshold" value="80%" />
              <Select label="Time Range" value="Full Recording" />
              <Select label="Channels" value="All Channels (19)" />
            </div>

            <button className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              Advanced Options <ChevronDownIcon className="h-3 w-3" />
            </button>

            <button className="mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-intelligence-gradient text-sm font-medium text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.6)]">
              <PlayIcon className="h-4 w-4" /> Start Analysis
            </button>
          </div>
        </Panel>

        {/* Overview */}
        <Panel title="Analysis Overview">
          <div className="flex min-h-0 flex-1 gap-3">
            <ul className="min-w-0 flex-1 space-y-1.5">
              {OVERVIEW.map((o) => (
                <li key={o.label} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Icon name={o.icon} className="h-3.5 w-3.5 text-slate-400" />
                    {o.label}
                  </span>
                  <span className={cn("font-medium tabular-nums", o.tone === "success" ? "text-success" : "text-slate-700")}>
                    {o.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex w-28 shrink-0 flex-col items-center">
              <p className="text-[9px] text-slate-400">Overall Signal Quality</p>
              <p className="text-[11px] font-semibold text-success">Good</p>
              <div className="flex min-h-0 flex-1 items-center gap-1">
                <TopoMap className="max-h-24" />
                <span className="flex flex-col items-center gap-1 text-[8px] text-slate-400">
                  High
                  <span className="w-1 flex-1 rounded-pill" style={{ minHeight: 28, background: "linear-gradient(to bottom,#ef4444,#eab308,#22d3ee,#2563eb)" }} />
                  Low
                </span>
              </div>
            </div>
          </div>
          <button className="mt-2 shrink-0 rounded-md border border-slate-200 py-1.5 text-[11px] font-medium text-neural-blue hover:bg-slate-50">
            View Data Quality Report
          </button>
        </Panel>
      </div>

      {/* Processing Status */}
      <div className="surface-card grid shrink-0 grid-cols-1 items-center gap-4 rounded-lg p-3 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-neural-blue/10 text-neural-blue">
              <Icon name="process" className="h-4 w-4 animate-[pulse-soft_1.4s_ease-in-out_infinite]" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-800">Analysis in Progress...</p>
              <p className="text-[10px] text-slate-400">AI is analyzing your EEG data. This may take a few moments.</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-pill bg-slate-200">
              <div className="h-full w-[65%] rounded-pill bg-intelligence-gradient" />
            </div>
            <span className="text-[11px] font-semibold text-slate-600">65%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PROC_STATS.map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-500">
                <p.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[9px] text-slate-400">{p.label}</p>
                <p className="text-xs font-bold text-slate-800">{p.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row C */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-4">
        {/* Predictions */}
        <Panel title="AI Predictions (Live)">
          <ul className="flex min-h-0 flex-1 flex-col justify-around">
            {PREDICTIONS.map((p) => (
              <li key={p.label} className="flex items-center gap-2 text-[11px]">
                <Icon name={p.icon} className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="min-w-0 flex-1 truncate text-slate-700">{p.label}</span>
                <span className={cn("rounded-pill px-1.5 py-0.5 text-[10px] font-medium", PRED_TONE[p.tone])}>{p.state}</span>
                <span className="w-8 text-right font-semibold tabular-nums text-slate-700">{p.pct}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* EEG Preview */}
        <Panel title="EEG Signal Preview" action={<MiniSelect value="All Channels" />} footer={<ViewLink>View Full EEG</ViewLink>}>
          <div className="flex min-h-0 flex-1 flex-col justify-between">
            {EEG_CHANNELS.map((ch, i) => (
              <div key={ch} className="flex items-center gap-2">
                <span className="w-6 font-mono text-[9px] text-slate-400">{ch}</span>
                <div className="h-4 flex-1">
                  <EegWaveform animate={false} stroke={i % 2 ? "var(--color-electric-cyan)" : "var(--color-signal-violet)"} />
                </div>
              </div>
            ))}
            <div className="flex justify-between pl-8 font-mono text-[8px] text-slate-400">
              <span>10s</span><span>7.5s</span><span>5s</span><span>2.5s</span><span>0s</span>
            </div>
          </div>
        </Panel>

        {/* Frequency Band Power */}
        <Panel title="Frequency Band Power" action={<MiniSelect value="Relative Power" />} footer={<ViewLink>View Detailed Spectrum</ViewLink>}>
          <div className="flex min-h-0 flex-1 items-center">
            <Donut slices={BANDS} centerValue="18.7" centerLabel="µV² Total" />
          </div>
        </Panel>

        {/* Data Quality Metrics */}
        <Panel title="Data Quality Metrics" action={<MiniSelect value="All Channels" />} footer={<ViewLink>View Quality Report</ViewLink>}>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <BarList items={QUALITY} max={100} color="var(--color-neural-blue)" format={(v) => `${v}%`} className="space-y-2" />
          </div>
        </Panel>
      </div>

      {/* Recent Analyses */}
      <Panel title="Recent Analyses" action={<ViewLink>View All Analyses</ViewLink>} className="shrink-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                <th className="pb-1.5 font-medium">ID</th>
                <th className="pb-1.5 font-medium">File Name</th>
                <th className="pb-1.5 font-medium">Duration</th>
                <th className="pb-1.5 font-medium">Tasks</th>
                <th className="pb-1.5 font-medium">Model</th>
                <th className="pb-1.5 font-medium">Status</th>
                <th className="pb-1.5 font-medium">Created At</th>
                <th className="pb-1.5" />
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100">
                <td className="py-2 font-mono text-slate-500">AN-2024-1250</td>
                <td className="py-2 text-slate-700">Subject_042_EEG.edf</td>
                <td className="py-2 tabular-nums text-slate-600">02:14:36</td>
                <td className="py-2">
                  <span className="flex gap-1 text-slate-300">
                    <Icon name="brain" className="h-3.5 w-3.5" />
                    <Icon name="emotion" className="h-3.5 w-3.5" />
                    <Icon name="cognition" className="h-3.5 w-3.5" />
                  </span>
                </td>
                <td className="py-2 text-slate-600">NeuroNet v3.2</td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-1 rounded-pill bg-neural-blue/10 px-2 py-0.5 text-[10px] font-medium text-neural-blue">
                    <span className="h-1.5 w-1.5 rounded-full bg-neural-blue" /> Processing
                  </span>
                </td>
                <td className="py-2 text-slate-400">2 mins ago</td>
                <td className="py-2 text-right"><MoreIcon className="ml-auto h-4 w-4 text-slate-300" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
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
  title: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("surface-card flex min-h-0 flex-col overflow-hidden rounded-lg p-3", className)}>
      <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <h2 className="text-[13px] font-semibold text-slate-900">{title}</h2>
        {action}
      </header>
      {children}
      {footer ? <div className="mt-2 shrink-0 border-t border-slate-100 pt-1.5">{footer}</div> : null}
    </section>
  );
}

function Select({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] text-slate-500">{label}</span>
      <button className="flex h-8 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 hover:border-slate-300">
        <span className="truncate">{value}</span>
        <ChevronDownIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      </button>
    </label>
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

function ViewLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-medium text-neural-blue">
      {children}
      <ArrowRightIcon className="h-3 w-3" />
    </a>
  );
}
