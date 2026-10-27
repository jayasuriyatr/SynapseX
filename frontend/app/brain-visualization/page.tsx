import { Donut } from "@/components/charts/Donut";
import { BarList } from "@/components/charts/BarList";
import { InteractiveBrain } from "@/components/dashboard/InteractiveBrain";
import { TimelinePlayback } from "@/components/dashboard/TimelinePlayback";
import { Icon } from "@/components/ui/iconMap";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";

const VIEWS = ["3D Brain", "Topographic", "Time Series"];

const SUMMARY = [
  { label: "Peak Activation", value: "Frontal · 86%", icon: "brain" },
  { label: "Active Channels", value: "12 / 19", icon: "wave" },
  { label: "Dominant Band", value: "Delta (1-4 Hz)", icon: "activity" },
  { label: "Hemisphere Focus", value: "Left", icon: "target" },
];

const BANDS = [
  { label: "Delta (0.5-4 Hz)", value: 28, color: "#2563eb" },
  { label: "Theta (4-8 Hz)", value: 22, color: "#06b6d4" },
  { label: "Alpha (8-13 Hz)", value: 20, color: "#7c3aed" },
  { label: "Beta (13-30 Hz)", value: 18, color: "#8b5cf6" },
  { label: "Gamma (30-45 Hz)", value: 12, color: "#22d3ee" },
];

const TOP_INFO = [
  { label: "Analysis", value: "AX-9013", icon: "insight" },
  { label: "Recording", value: "02:14:36", icon: "clock" },
  { label: "Channels", value: "19", icon: "layers" },
  { label: "Peak Region", value: "Frontal Lobe", icon: "brain" },
];

export default async function BrainVisualizationPage() {
  const [regions, channels] = await Promise.all([
    api.getBrainRegions("AX-9013"),
    api.getChannelImportance("AX-9013"),
  ]);

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Top info strip */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-4">
        {TOP_INFO.map((t) => (
          <div key={t.label} className="surface-card flex items-center gap-2.5 rounded-lg p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-neural-blue/10 text-neural-blue">
              <Icon name={t.icon} className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400">{t.label}</p>
              <p className="truncate text-sm font-semibold text-slate-900">{t.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_1.9fr_1fr]">
        {/* Left column */}
        <div className="grid min-h-0 grid-rows-2 gap-3">
          <Panel title="Region Contribution" subtitle="Heatmap intensity">
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <BarList items={regions.map((r) => ({ label: r.name, value: r.contribution }))} color="var(--color-signal-violet)" className="space-y-2" />
            </div>
          </Panel>

          <Panel title="Channel Overlays" subtitle="Top contributing electrodes">
            <div className="flex flex-wrap content-start gap-1.5">
              {channels.map((c) => (
                <span
                  key={c.channel}
                  className="rounded-md border border-slate-200 px-2 py-1 font-mono text-[11px] text-slate-700"
                  style={{ background: `color-mix(in srgb, var(--color-neural-blue) ${Math.round(c.importance * 28)}%, white)` }}
                >
                  {c.channel}
                </span>
              ))}
            </div>
          </Panel>
        </div>

        {/* Center: 3D brain */}
        <Panel
          title="3D Brain Activation Map"
          subtitle="Time: 00:01:12"
          action={
            <div className="flex overflow-hidden rounded-md border border-slate-200 text-[11px]">
              {VIEWS.map((v, i) => (
                <span key={v} className={cn("px-2.5 py-1", i === 0 ? "bg-neural-blue/10 text-neural-blue" : "text-slate-500")}>
                  {v}
                </span>
              ))}
            </div>
          }
        >
          <div className="relative flex min-h-0 flex-1">
            <InteractiveBrain regions={regions} compact className="flex-1" />
            <ColorScale className="absolute right-1 top-1/2 -translate-y-1/2" />
          </div>
          <div className="mt-2 shrink-0 border-t border-slate-100 pt-2">
            <TimelinePlayback durationSec={134} />
          </div>
        </Panel>

        {/* Right column */}
        <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
          <Panel title="Activity Summary">
            <ul className="space-y-2">
              {SUMMARY.map((s) => (
                <li key={s.label} className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-500">
                    <Icon name={s.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400">{s.label}</p>
                    <p className="truncate text-xs font-semibold text-slate-700">{s.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Frequency Power" subtitle="Relative">
            <div className="flex min-h-0 flex-1 items-center">
              <Donut slices={BANDS} centerValue="18.7" centerLabel="µV²" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- building blocks ----------------------------- */

function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card flex min-h-0 flex-col overflow-hidden rounded-lg p-3">
      <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
          {title}
          {subtitle ? <span className="text-[10px] font-normal text-slate-400">{subtitle}</span> : null}
        </h2>
        {action}
      </header>
      {children}
    </section>
  );
}

function ColorScale({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className="text-[8px] text-slate-400">High</span>
      <span
        className="w-1.5 rounded-pill"
        style={{ minHeight: 70, background: "linear-gradient(to bottom, #ef4444, #eab308, #22d3ee, #2563eb)" }}
      />
      <span className="text-[8px] text-slate-400">Low</span>
    </div>
  );
}
