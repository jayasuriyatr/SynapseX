import { LogoMark } from "@/components/ui/LogoMark";
import { Icon } from "@/components/ui/iconMap";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "20+", label: "Public Datasets" },
  { value: "3", label: "Task Domains" },
  { value: "95%+", label: "Accuracy" },
  { value: "28ms", label: "Avg. Latency" },
];

const PILLARS = [
  { icon: "neural", title: "Spiking Neural Networks", body: "Bio-inspired, event-driven models that process EEG as spike trains for power-efficient inference.", tone: "info" },
  { icon: "target", title: "Multi-task Decoding", body: "A shared backbone with task heads for seizure detection, emotion, and cognitive state.", tone: "cyan" },
  { icon: "insight", title: "Explainable by Design", body: "Channel importance, region attribution, spike rasters, and calibrated confidence per result.", tone: "violet" },
  { icon: "shield", title: "Private & Reproducible", body: "Software-only, built on public datasets, with anonymized exports and reproducible pipelines.", tone: "success" },
];

const PILLAR_TONE: Record<string, string> = {
  info: "bg-neural-blue/10 text-neural-blue",
  cyan: "bg-electric-cyan/10 text-electric-cyan",
  violet: "bg-signal-violet/10 text-signal-violet",
  success: "bg-success/10 text-success",
};

const DETAILS = [
  { label: "Version", value: "v2.4.1" },
  { label: "Active Model", value: "NeuroNet v3.2" },
  { label: "Released", value: "June 12, 2026" },
  { label: "License", value: "Open Research" },
  { label: "Status", value: "Operational", tone: "success" },
];

const RESOURCES = ["Documentation", "API Reference", "Research Papers", "Changelog"];

const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "PyTorch", "snnTorch", "MNE-Python", "ONNX"];

export default function AboutPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Hero */}
        <section className="surface-card relative shrink-0 overflow-hidden rounded-lg p-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-signal-violet/10 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-intelligence-gradient">
                <LogoMark className="h-9 w-auto" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                  Synapse<span className="text-neural-blue">X</span>
                </h2>
                <p className="text-sm text-slate-500">Neurological Intelligence, Redefined.</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-xl font-bold text-slate-900">{s.value}</p>
                  <p className="text-[10px] text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
          {/* Left: about + pillars */}
          <div className="flex min-h-0 flex-col gap-4">
            <section className="surface-card shrink-0 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-900">What is SynapseX?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                SynapseX is a Neurological Intelligence Platform that decodes EEG activity into
                actionable insights using Spiking Neural Networks. It performs advanced EEG analysis
                entirely in software — combining scientific rigor with explainable, efficient
                intelligence. The frontend is a presentation layer; all inference runs in the
                Python/FastAPI backend.
              </p>
            </section>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <section key={p.title} className="surface-card flex flex-col rounded-lg p-4">
                  <span className={cn("grid h-10 w-10 place-items-center rounded-md", PILLAR_TONE[p.tone])}>
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h4 className="mt-3 text-sm font-semibold text-slate-900">{p.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.body}</p>
                </section>
              ))}
            </div>
          </div>

          {/* Right: details + mission/vision + resources */}
          <div className="flex min-h-0 flex-col gap-4">
            <section className="surface-card shrink-0 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-900">Platform Details</h3>
              <ul className="mt-3 space-y-2">
                {DETAILS.map((d) => (
                  <li key={d.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{d.label}</span>
                    <span className={cn("font-medium", d.tone === "success" ? "text-success" : "text-slate-700")}>
                      {d.tone === "success" ? <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success align-middle" /> : null}
                      {d.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-card shrink-0 rounded-lg bg-intelligence-gradient p-4 text-white">
              <h3 className="text-sm font-semibold">Mission</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/85">
                Unlock the language of the brain through biologically inspired intelligence.
              </p>
              <h3 className="mt-3 text-sm font-semibold">Vision</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/85">
                Become the foundational operating system for neurological intelligence.
              </p>
            </section>

            <section className="surface-card flex min-h-0 flex-1 flex-col rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-900">Resources</h3>
              <ul className="mt-2 min-h-0 flex-1 space-y-1">
                {RESOURCES.map((r) => (
                  <li key={r}>
                    <a href="#" className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                      {r}
                      <ArrowRightIcon className="h-3.5 w-3.5 text-slate-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Technology stack */}
        <section className="surface-card shrink-0 rounded-lg p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-900">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {STACK.map((t) => (
              <span key={t} className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 px-5 py-2.5 text-[11px] text-slate-400">
        <span>© 2024 SynapseX. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-neural-blue">Privacy Policy</a>
          <a href="#" className="hover:text-neural-blue">Terms of Service</a>
          <a href="#" className="hover:text-neural-blue">Contact Support</a>
          <span>v2.4.1</span>
        </div>
      </footer>
    </div>
  );
}
