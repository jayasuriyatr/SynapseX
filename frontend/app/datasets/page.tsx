import { LineChart } from "@/components/charts/LineChart";
import { Donut } from "@/components/charts/Donut";
import { Icon } from "@/components/ui/iconMap";
import {
  SearchIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  GridIcon,
  ListIcon,
  EyeIcon,
  DownloadIcon,
  MoreIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/* ----------------------------- data ----------------------------- */

const STATS = [
  { label: "Total Datasets", value: "24", delta: "2 new this month", icon: "database", accent: false },
  { label: "Total Size", value: "128.6 GB", delta: "18.6% vs last month", icon: "layers", accent: false },
  { label: "Total Recordings", value: "4,521", delta: "21.4% vs last month", icon: "activity", accent: false },
  { label: "Total Subjects", value: "1,248", delta: "15.3% vs last month", icon: "users", accent: false },
  { label: "Data Quality (Avg.)", value: "93.2%", delta: "2.1% vs last month", icon: "shield", accent: true },
];

const FILTERS = ["All Status", "All Data Types", "All Subjects", "All Tags"];

const DATASETS = [
  { name: "TUH EEG Corpus", sub: "Temple University Hospital EEG Corpus", access: "Public", type: "EEG", subjects: "500", recordings: "2,345", size: "68.4 GB", date: "May 28, 2024", quality: "94.6%", status: "Ready", color: "#2563eb", icon: "wave" },
  { name: "CHB-MIT Scalp EEG", sub: "Children's Hospital Boston EEG Dataset", access: "Public", type: "EEG", subjects: "198", recordings: "916", size: "24.7 GB", date: "May 20, 2024", quality: "92.1%", status: "Ready", color: "#7c3aed", icon: "brain" },
  { name: "Sleep-EDF Expanded", sub: "Sleep EEG Database Expanded", access: "Public", type: "Sleep-EEG", subjects: "153", recordings: "320", size: "16.2 GB", date: "May 15, 2024", quality: "93.8%", status: "Ready", color: "#06b6d4", icon: "wave" },
  { name: "Epilepsy Patients Study", sub: "Internal epilepsy patient recordings", access: "Private", type: "EEG", subjects: "120", recordings: "540", size: "12.3 GB", date: "May 10, 2024", quality: "95.4%", status: "Ready", color: "#2563eb", icon: "brain" },
  { name: "Cognitive Study 2024", sub: "Cognitive load EEG recordings", access: "Private", type: "EEG", subjects: "80", recordings: "280", size: "6.8 GB", date: "May 6, 2024", quality: "91.7%", status: "Processing", color: "#7c3aed", icon: "cognition" },
  { name: "Emotion Recognition Set", sub: "EEG recordings for emotion analysis", access: "Private", type: "EEG", subjects: "60", recordings: "120", size: "3.2 GB", date: "May 2, 2024", quality: "90.2%", status: "Ready", color: "#06b6d4", icon: "emotion" },
];

const DISTRIBUTION = [
  { label: "EEG", value: 15, detail: "15", color: "#2563eb" },
  { label: "Sleep EEG", value: 4, detail: "4", color: "#06b6d4" },
  { label: "iEEG", value: 2, detail: "2", color: "#7c3aed" },
  { label: "ECoG", value: 1, detail: "1", color: "#8b5cf6" },
  { label: "Others", value: 2, detail: "2", color: "#cbd5e1" },
];

const QUALITY_AVG = [92, 93, 92, 94, 93, 95, 93, 94, 92, 94, 93, 94];
const QUALITY_MIN = [83, 85, 84, 86, 85, 87, 85, 86, 84, 86, 85, 86];
const QUALITY_DATES = ["May 6", "May 12", "May 18", "May 24", "May 30", "Jun 2"];

const ACTIVITY = [
  { id: "DS-2024-024", name: "Epilepsy Patients Study", action: "Uploaded", by: "Dr. Emma Wilson", time: "2 mins ago" },
  { id: "DS-2024-023", name: "Cognitive Study 2024", action: "Processed", by: "System", time: "15 mins ago" },
  { id: "DS-2024-022", name: "Emotion Recognition Set", action: "Updated", by: "Dr. Emma Wilson", time: "1 hour ago" },
];

const TAGS = [
  { label: "Epilepsy", count: 6, tone: "info" },
  { label: "Sleep", count: 4, tone: "cyan" },
  { label: "Cognitive", count: 5, tone: "violet" },
  { label: "Emotion", count: 3, tone: "rose" },
  { label: "Healthy", count: 4, tone: "success" },
  { label: "Pediatric", count: 3, tone: "indigo" },
  { label: "Seizure", count: 6, tone: "warning" },
  { label: "Research", count: 8, tone: "teal" },
];

const TAG_TONES: Record<string, string> = {
  info: "bg-neural-blue/10 text-neural-blue",
  cyan: "bg-electric-cyan/10 text-electric-cyan",
  violet: "bg-signal-violet/10 text-signal-violet",
  rose: "bg-pink-500/10 text-pink-600",
  success: "bg-success/10 text-success",
  indigo: "bg-indigo-500/10 text-indigo-600",
  warning: "bg-warning/10 text-warning",
  teal: "bg-teal-500/10 text-teal-600",
};

/* ----------------------------- page ----------------------------- */

export default function DatasetsPage() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Row 1 — stats */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="surface-card rounded-lg p-3.5">
            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-500">{s.label}</span>
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                  s.accent ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400",
                )}
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-1 font-display text-2xl font-bold leading-none text-slate-900">{s.value}</p>
            <p className="mt-1 text-[11px] font-medium text-success">↑ {s.delta}</p>
          </div>
        ))}
      </div>

      {/* Row 2 — dataset table */}
      <Panel className="flex-[1.2]">
        {/* Toolbar */}
        <div className="mb-2 flex shrink-0 flex-wrap items-center gap-2">
          <div className="relative min-w-[180px] flex-1">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search datasets..."
              className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-neural-blue"
            />
          </div>
          {FILTERS.map((f) => (
            <FilterButton key={f} label={f} />
          ))}
          <div className="ml-auto flex items-center gap-2">
            <FilterButton label="Sort by: Newest" />
            <div className="flex overflow-hidden rounded-md border border-slate-200">
              <button className="grid h-8 w-8 place-items-center bg-neural-blue/10 text-neural-blue" aria-label="Grid view">
                <GridIcon className="h-4 w-4" />
              </button>
              <button className="grid h-8 w-8 place-items-center text-slate-400 hover:bg-slate-50" aria-label="List view">
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-white">
              <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                <th className="pb-2 font-medium">Dataset Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Subjects</th>
                <th className="pb-2 font-medium">Recordings</th>
                <th className="pb-2 font-medium">Size</th>
                <th className="pb-2 font-medium">Date Added</th>
                <th className="pb-2 font-medium">Quality</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DATASETS.map((d) => (
                <tr key={d.name} className="border-t border-slate-100">
                  <td className="py-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-white"
                        style={{ background: d.color }}
                      >
                        <Icon name={d.icon} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-medium text-slate-800">{d.name}</span>
                          <AccessBadge access={d.access} />
                        </div>
                        <p className="truncate text-[10px] text-slate-400">{d.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                        d.type === "Sleep-EEG" ? "bg-electric-cyan/10 text-electric-cyan" : "bg-neural-blue/10 text-neural-blue",
                      )}
                    >
                      {d.type}
                    </span>
                  </td>
                  <td className="py-2 tabular-nums text-slate-600">{d.subjects}</td>
                  <td className="py-2 tabular-nums text-slate-600">{d.recordings}</td>
                  <td className="py-2 tabular-nums text-slate-600">{d.size}</td>
                  <td className="py-2 text-slate-500">{d.date}</td>
                  <td className="py-2">
                    <span className="flex items-center gap-1.5 tabular-nums text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      {d.quality}
                    </span>
                  </td>
                  <td className="py-2">
                    <span
                      className={cn(
                        "rounded-pill px-2 py-0.5 text-[10px] font-medium",
                        d.status === "Ready" ? "bg-success/10 text-success" : "bg-neural-blue/10 text-neural-blue",
                      )}
                    >
                      {d.status}
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

      {/* Row 3 — distribution / storage / quality */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Dataset Distribution" footer={<ViewLink>View All Distribution</ViewLink>}>
          <div className="flex min-h-0 flex-1 items-center">
            <Donut slices={DISTRIBUTION} centerValue="24" centerLabel="Total" />
          </div>
        </Panel>

        <Panel title="Storage Usage" footer={<ViewLink>View Storage Details</ViewLink>}>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <StorageRing usedPct={50.2} />
          </div>
          <div className="mt-2 grid w-full shrink-0 grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-center">
            <div>
              <p className="text-sm font-bold text-slate-900">256 GB</p>
              <p className="text-[10px] text-slate-400">Total Storage</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">50.2%</p>
              <p className="text-[10px] text-slate-400">Used</p>
            </div>
          </div>
        </Panel>

        <Panel title="Data Quality Overview" action={<MiniSelect value="Last 30 Days" />} footer={<ViewLink>View Quality Report</ViewLink>}>
          <div className="min-h-0 flex-1">
            <LineChart
              fill
              yMin={0}
              yMax={100}
              series={[
                { data: QUALITY_AVG, color: "var(--color-signal-violet)", area: true },
                { data: QUALITY_MIN, color: "var(--color-electric-cyan)" },
              ]}
            />
          </div>
          <div className="mt-1 flex justify-between pl-8 font-mono text-[8px] text-slate-400">
            {QUALITY_DATES.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-1 flex justify-center gap-3 text-[9px] text-slate-500">
            <Legend color="var(--color-signal-violet)" label="Average Quality" />
            <Legend color="var(--color-electric-cyan)" label="Minimum Quality" />
          </div>
        </Panel>
      </div>

      {/* Row 4 — activity / tags */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Recent Dataset Activity" action={<ViewLink>View All Activity</ViewLink>}>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wide text-slate-400">
                  <th className="pb-1.5 font-medium">ID</th>
                  <th className="pb-1.5 font-medium">Dataset Name</th>
                  <th className="pb-1.5 font-medium">Action</th>
                  <th className="pb-1.5 font-medium">Performed By</th>
                  <th className="pb-1.5 text-right font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITY.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100">
                    <td className="py-2 font-mono text-slate-500">{a.id}</td>
                    <td className="py-2 text-slate-700">{a.name}</td>
                    <td className="py-2">
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                        {a.action}
                      </span>
                    </td>
                    <td className="py-2 text-slate-500">{a.by}</td>
                    <td className="py-2 text-right text-slate-400">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Data Tags" action={<a href="#" className="text-[11px] font-medium text-neural-blue">Manage Tags</a>}>
          <div className="flex flex-wrap content-start gap-2">
            {TAGS.map((t) => (
              <span
                key={t.label}
                className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium", TAG_TONES[t.tone])}
              >
                {t.label}
                <span className="rounded-full bg-white/60 px-1.5 text-[10px]">{t.count}</span>
              </span>
            ))}
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
        <header className="mb-1.5 flex shrink-0 items-center justify-between">
          {title ? <h2 className="text-[13px] font-semibold text-slate-900">{title}</h2> : <span />}
          {action}
        </header>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      {footer ? <div className="mt-1.5 shrink-0 border-t border-slate-100 pt-1.5">{footer}</div> : null}
    </section>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-[11px] text-slate-600 hover:bg-slate-50"
    >
      {label}
      <ChevronDownIcon className="h-3 w-3 text-slate-400" />
    </button>
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

function AccessBadge({ access }: { access: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium",
        access === "Public" ? "bg-slate-100 text-slate-500" : "bg-warning/10 text-warning",
      )}
    >
      {access}
    </span>
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

function StorageRing({ usedPct, size = 130 }: { usedPct: number; size?: number }) {
  const r = 54;
  const C = 2 * Math.PI * r;
  const dash = (usedPct / 100) * C;
  return (
    <div className="relative mx-auto aspect-square h-full min-h-[88px]" style={{ maxHeight: size }}>
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="storage-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-slate-200)" strokeWidth="14" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="url(#storage-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-base font-bold leading-none text-slate-900">128.6 GB</span>
        <span className="mt-0.5 text-[10px] text-slate-400">Total Used</span>
      </div>
    </div>
  );
}
