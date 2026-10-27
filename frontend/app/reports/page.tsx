import { LineChart } from "@/components/charts/LineChart";
import { Donut } from "@/components/charts/Donut";
import { BarList } from "@/components/charts/BarList";
import { Icon } from "@/components/ui/iconMap";
import {
  SearchIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  DocumentIcon,
  DownloadIcon,
  EyeIcon,
  MoreIcon,
  ClockIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Reports", value: "312", delta: "18 this month", icon: "document" },
  { label: "Generated This Month", value: "48", delta: "12.4% vs last month", icon: "activity" },
  { label: "Scheduled", value: "6", delta: "2 upcoming", icon: "clock" },
  { label: "Avg. Generation Time", value: "3.2s", delta: "0.4s faster", icon: "bolt", down: true },
  { label: "Storage Used", value: "4.2 GB", delta: "of 50 GB", icon: "database", flat: true },
];

const FILTERS = ["All Types", "All Formats", "All Status"];

const REPORTS = [
  { name: "Seizure Analysis — chb01_03", sub: "Full clinical summary", type: "Clinical", format: "PDF", size: "842 KB", date: "Today, 14:22", status: "Ready", color: "#2563eb" },
  { name: "Emotion Summary — deap_s05", sub: "Valence / arousal breakdown", type: "Emotion", format: "JSON", size: "36 KB", date: "Today, 11:08", status: "Ready", color: "#06b6d4" },
  { name: "Cognitive Load Batch — 24 records", sub: "Aggregated cognitive metrics", type: "Batch", format: "CSV", size: "128 KB", date: "Yesterday", status: "Ready", color: "#7c3aed" },
  { name: "Model Evaluation — v2.4.1", sub: "Performance & confusion matrices", type: "Model", format: "PDF", size: "1.3 MB", date: "2 days ago", status: "Ready", color: "#6366f1" },
  { name: "Weekly Throughput", sub: "Inference volume & latency", type: "System", format: "PDF", size: "540 KB", date: "3 days ago", status: "Generating", color: "#8b5cf6" },
  { name: "Anomaly Digest — June", sub: "Flagged anomalies overview", type: "Anomaly", format: "CSV", size: "92 KB", date: "4 days ago", status: "Ready", color: "#22d3ee" },
];

const FORMAT_TONE: Record<string, string> = {
  PDF: "bg-error/10 text-error",
  JSON: "bg-neural-blue/10 text-neural-blue",
  CSV: "bg-success/10 text-success",
};

const DISTRIBUTION = [
  { label: "PDF", value: 182, detail: "182", color: "#ef4444" },
  { label: "JSON", value: 68, detail: "68", color: "#2563eb" },
  { label: "CSV", value: 62, detail: "62", color: "#10b981" },
];

const TREND = [12, 18, 14, 22, 19, 26, 21, 30, 27, 34, 31, 38, 36, 42, 40, 48];
const TREND_DATES = ["May 6", "May 12", "May 18", "May 24", "May 30", "Jun 2"];

const CATEGORIES = [
  { label: "Clinical", value: 124 },
  { label: "Emotion", value: 72 },
  { label: "Cognitive", value: 58 },
  { label: "Model", value: 34 },
  { label: "System", value: 24 },
];

const SCHEDULED = [
  { name: "Weekly Throughput", cadence: "Every Monday", next: "in 2 days", format: "PDF" },
  { name: "Monthly Summary", cadence: "1st of month", next: "in 6 days", format: "PDF" },
  { name: "Anomaly Digest", cadence: "Daily", next: "in 4 hours", format: "CSV" },
];

export default function ReportsPage() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Stats */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="surface-card rounded-lg p-3">
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-slate-500">{s.label}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400">
                <Icon name={s.icon} className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-1 font-display text-xl font-bold leading-none text-slate-900">{s.value}</p>
            <p className={cn("mt-1 text-[10px] font-medium", s.flat ? "text-slate-400" : s.down ? "text-neural-blue" : "text-success")}>
              {s.flat ? "" : s.down ? "↓ " : "↑ "}
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Row 2 — table + right column */}
      <div className="grid min-h-0 flex-[1.5] grid-cols-1 gap-3 lg:grid-cols-[1.8fr_1fr]">
        <Panel>
          <div className="mb-2 flex shrink-0 flex-wrap items-center gap-2">
            <div className="relative min-w-[160px] flex-1">
              <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input type="search" placeholder="Search reports..." className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-neural-blue" />
            </div>
            {FILTERS.map((f) => (
              <FilterButton key={f} label={f} />
            ))}
            <FilterButton label="Sort by: Newest" />
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="pb-2 font-medium">Report</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Format</th>
                  <th className="pb-2 font-medium">Size</th>
                  <th className="pb-2 font-medium">Generated</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {REPORTS.map((r) => (
                  <tr key={r.name} className="border-t border-slate-100">
                    <td className="py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-white" style={{ background: r.color }}>
                          <DocumentIcon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-800">{r.name}</p>
                          <p className="truncate text-[10px] text-slate-400">{r.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">{r.type}</span>
                    </td>
                    <td className="py-2">
                      <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", FORMAT_TONE[r.format])}>{r.format}</span>
                    </td>
                    <td className="py-2 tabular-nums text-slate-600">{r.size}</td>
                    <td className="py-2 text-slate-500">{r.date}</td>
                    <td className="py-2">
                      <span className={cn("flex items-center gap-1.5 font-medium", r.status === "Ready" ? "text-success" : "text-neural-blue")}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", r.status === "Ready" ? "bg-success" : "bg-neural-blue")} />
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center justify-end gap-1.5 text-slate-400">
                        <EyeIcon className="h-4 w-4 hover:text-neural-blue" />
                        <DownloadIcon className="h-4 w-4 hover:text-neural-blue" />
                        <MoreIcon className="h-4 w-4 hover:text-neural-blue" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
          <Panel title="Report Distribution" footer={<ViewLink>View Breakdown</ViewLink>}>
            <div className="flex min-h-0 flex-1 items-center">
              <Donut slices={DISTRIBUTION} centerValue="312" centerLabel="Total" />
            </div>
          </Panel>

          <Panel title="Quick Generate">
            <div className="grid grid-cols-3 gap-2">
              {(["PDF", "JSON", "CSV"] as const).map((f) => (
                <button key={f} className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 py-2.5 text-xs font-medium text-slate-600 hover:border-neural-blue/40 hover:bg-slate-50">
                  <span className={cn("grid h-8 w-8 place-items-center rounded-md", FORMAT_TONE[f])}>
                    <DocumentIcon className="h-4 w-4" />
                  </span>
                  {f}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Row 3 — trend / categories / scheduled */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Reports Over Time" action={<MiniSelect value="Last 30 Days" />}>
          <div className="min-h-0 flex-1">
            <LineChart fill series={[{ data: TREND, color: "var(--color-neural-blue)", area: true }]} />
          </div>
          <div className="mt-1 flex justify-between pl-8 font-mono text-[8px] text-slate-400">
            {TREND_DATES.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </Panel>

        <Panel title="Report Categories">
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <BarList items={CATEGORIES} max={124} color="var(--color-signal-violet)" format={(v) => `${v}`} className="space-y-2.5" />
          </div>
        </Panel>

        <Panel title="Scheduled Reports" action={<ViewLink>Manage</ViewLink>}>
          <ul className="flex min-h-0 flex-1 flex-col justify-around">
            {SCHEDULED.map((s) => (
              <li key={s.name} className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-neural-blue/10 text-neural-blue">
                  <ClockIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">{s.name}</p>
                  <p className="text-[10px] text-slate-400">{s.cadence} · next {s.next}</p>
                </div>
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", FORMAT_TONE[s.format])}>{s.format}</span>
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
  action,
  footer,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card flex min-h-0 flex-col overflow-hidden rounded-lg p-3">
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

function ViewLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-medium text-neural-blue">
      {children}
      <ArrowRightIcon className="h-3 w-3" />
    </a>
  );
}
