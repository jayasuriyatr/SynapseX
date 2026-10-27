"use client";

import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { BarList } from "@/components/charts/BarList";
import { BrainHeatmap } from "@/components/visuals/BrainHeatmap";
import { ShapBeeswarm } from "@/components/visuals/ShapBeeswarm";
import { AttentionHeatmap } from "@/components/visuals/AttentionHeatmap";
import {
  WaveIcon,
  BrainIcon,
  DocumentIcon,
  NeuralIcon,
  ActivityIcon,
  ClockIcon,
  ShieldIcon,
  InfoIcon,
  PlayIcon,
  ChevronDownIcon,
  CheckIcon,
  BoltIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Feature Importance", "Attention Map", "SHAP Analysis", "Counterfactuals", "Decision Path"];
const VIEWS = ["3D Brain", "Topographic", "Time Series"];

const REASONING = [
  { icon: BrainIcon, title: "Abnormal patterns detected", sub: "Irregular spike patterns in temporal and frontal lobes", t: "00:00:12" },
  { icon: WaveIcon, title: "Spike-wave activity identified", sub: "High amplitude spikes observed in F7, T7, T8 channels", t: "00:00:28" },
  { icon: ActivityIcon, title: "Frequency shift detected", sub: "Increase in delta (1-4 Hz) and theta (4-8 Hz) power", t: "00:00:44" },
  { icon: BoltIcon, title: "Seizure probability increased", sub: "Model confidence exceeded threshold (80%)", t: "00:01:02" },
  { icon: CheckIcon, title: "Final Prediction", sub: "Seizure Detected (96.2%)", t: "00:01:12" },
];

const CONTRIBUTION = [
  { label: "Seizure Detection", value: 0.684, pct: 68.4, color: "#7c3aed" },
  { label: "Emotion Recognition", value: 0.152, pct: 15.2, color: "#2563eb" },
  { label: "Cognitive State", value: 0.098, pct: 9.8, color: "#06b6d4" },
  { label: "Sleep Stage", value: 0.042, pct: 4.2, color: "#8b5cf6" },
  { label: "Anomaly Detection", value: 0.024, pct: 2.4, color: "#22d3ee" },
];

const CHANNELS = [
  { label: "F7", value: 0.387 },
  { label: "T7", value: 0.241 },
  { label: "T8", value: 0.188 },
  { label: "Fz", value: 0.142 },
  { label: "P3", value: 0.098 },
  { label: "O1", value: 0.067 },
  { label: "C4", value: 0.041 },
  { label: "F2", value: 0.038 },
  { label: "Pz", value: 0.012 },
  { label: "O2", value: 0.006 },
];

const SHAP_FEATURES = ["F7 (Delta)", "T7 (Theta)", "T8 (Delta)", "Fz (Theta)", "P3 (Theta)", "O1 (Alpha)"];
const ATT_ROWS = ["F7", "T7", "T8", "Fz", "Cz", "Pz", "O1"];

const CONFIDENCE_SERIES = [62, 70, 66, 74, 71, 78, 75, 82, 79, 85, 83, 88, 86, 90, 88, 92, 90, 94, 92, 95, 94, 96, 95, 96];

const INSIGHTS = [
  { icon: WaveIcon, title: "Temporal spikes in F7, T7, T8 channels", sub: "Most significant indicators for seizure", tone: "violet" },
  { icon: ActivityIcon, title: "Delta and Theta band dominance", sub: "Strong increase in low-frequency power", tone: "info" },
  { icon: BrainIcon, title: "Model relied on localized activity", sub: "Focus on left temporal regions", tone: "success" },
  { icon: ClockIcon, title: "High attention during 60s-120s", sub: "Critical window for prediction", tone: "warning" },
  { icon: ShieldIcon, title: "Explanation confidence", sub: "Very reliable (96.2%)", tone: "violet" },
];

const INSIGHT_TONE: Record<string, string> = {
  violet: "bg-signal-violet/10 text-signal-violet",
  info: "bg-neural-blue/10 text-neural-blue",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

export default function ExplainabilityPage() {
  const [tab, setTab] = useState("Overview");
  const [view, setView] = useState("3D Brain");

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-4 sm:p-5">
      {/* Sub-header info cards */}
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <InfoCard label="Prediction" icon={<WaveIcon className="h-4 w-4 text-error" />}>
          <span className="text-sm font-bold text-error">Seizure Detected</span>
          <span className="rounded-pill bg-error/10 px-1.5 py-0.5 text-[10px] font-medium text-error">High Risk</span>
        </InfoCard>

        <div className="surface-card flex items-center justify-between rounded-lg p-3">
          <div>
            <p className="text-[10px] text-slate-500">Confidence Score</p>
            <p className="font-display text-xl font-bold text-slate-900">96.2%</p>
          </div>
          <MiniRing value={96} />
        </div>

        <InfoCard label="Model Used" icon={<BrainIcon className="h-4 w-4 text-neural-blue" />}>
          <div>
            <p className="text-sm font-semibold text-slate-900">NeuroNet v3.2</p>
            <p className="text-[10px] text-slate-400">Transformer Model</p>
          </div>
        </InfoCard>

        <InfoCard label="Data Source" icon={<DocumentIcon className="h-4 w-4 text-electric-cyan" />}>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">Subject_042_EEG.edf</p>
            <p className="text-[10px] text-slate-400">19 Channels · 02:14:36</p>
          </div>
        </InfoCard>

        <InfoCard label="Explanation Type" icon={<NeuralIcon className="h-4 w-4 text-signal-violet" />}>
          <div>
            <p className="text-sm font-semibold text-slate-900">SHAP + Attention</p>
            <p className="text-[10px] text-slate-400">Hybrid Explainability</p>
          </div>
        </InfoCard>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "whitespace-nowrap border-b-2 px-3 py-2 text-xs font-medium transition-colors",
                tab === t ? "border-neural-blue text-neural-blue" : "border-transparent text-slate-500 hover:text-slate-800",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 items-center gap-2 pb-1.5 lg:flex">
          <div className="flex overflow-hidden rounded-md border border-slate-200 text-[11px]">
            {VIEWS.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn("px-2.5 py-1", view === v ? "bg-neural-blue/10 text-neural-blue" : "text-slate-500 hover:bg-slate-50")}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-50">
            <PlayIcon className="h-3 w-3" /> Play
          </button>
        </div>
      </div>

      {/* Row A */}
      <div className="grid min-h-0 flex-[1.25] grid-cols-1 gap-3 lg:grid-cols-[1fr_1.3fr_1fr]">
        {/* AI Reasoning */}
        <Panel title="AI Reasoning" badge={<Badge tone="success">High Confidence</Badge>}>
          <ol className="relative min-h-0 flex-1 space-y-2.5 overflow-y-auto pl-1">
            {REASONING.map((r, i) => (
              <li key={r.title} className="flex gap-2.5">
                <div className="flex flex-col items-center">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neural-blue/10 text-neural-blue">
                    <r.icon className="h-3.5 w-3.5" />
                  </span>
                  {i < REASONING.length - 1 ? <span className="my-0.5 w-px flex-1 bg-slate-200" /> : null}
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[11px] font-semibold text-slate-800">{r.title}</p>
                    <span className="shrink-0 font-mono text-[9px] text-slate-400">{r.t}</span>
                  </div>
                  <p className="text-[10px] leading-snug text-slate-400">{r.sub}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-1 shrink-0 text-[10px] text-slate-400">Explanation generated in 1.24s</p>
        </Panel>

        {/* 3D Brain Activation Map */}
        <Panel title="3D Brain Activation Map" subtitle="(Time: 00:01:12)">
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <BrainHeatmap className="max-h-full" />
            <span className="absolute left-1 top-1/2 text-[10px] font-medium text-slate-400">L</span>
            <span className="absolute right-1 top-1/2 text-[10px] font-medium text-slate-400">R</span>
            <ColorScale className="absolute right-0 top-1/2 -translate-y-1/2" />
          </div>
          <PlaybackBar className="mt-1 shrink-0" current="00:01:12" total="02:14:36" />
        </Panel>

        {/* Right stack: contribution + confidence */}
        <div className="grid min-h-0 grid-rows-[1.1fr_1fr] gap-3">
          <Panel title="Model Contribution Summary" action={<MiniSelect value="All Tasks" />}>
            <ul className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
              {CONTRIBUTION.map((c) => (
                <li key={c.label}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">{c.label}</span>
                    <span className="flex items-center gap-2 tabular-nums">
                      <span className="font-mono text-slate-500">{c.value.toFixed(3)}</span>
                      <span className="w-9 text-right text-slate-400">{c.pct}%</span>
                    </span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-pill bg-slate-100">
                    <div className="h-full rounded-pill" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                </li>
              ))}
              <li className="flex items-center justify-between border-t border-slate-100 pt-1.5 text-[11px] font-semibold text-slate-700">
                <span>Total Contribution</span>
                <span className="flex items-center gap-2 tabular-nums">
                  <span className="font-mono">1.000</span>
                  <span className="w-9 text-right">100%</span>
                </span>
              </li>
            </ul>
          </Panel>

          <Panel title="Prediction Confidence Over Time" action={<MiniSelect value="Last 5 min" />}>
            <div className="min-h-0 flex-1">
              <LineChart fill yMin={0} yMax={100} series={[{ data: CONFIDENCE_SERIES, color: "var(--color-neural-blue)", area: true }]} />
            </div>
          </Panel>
        </div>
      </div>

      {/* Row B */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        <Panel title="Channel Importance" subtitle="(Top 10)" action={<Toggle2 a="Absolute" b="Relative" />}>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <BarList
              items={CHANNELS}
              max={0.4}
              color="var(--color-neural-blue)"
              format={(v) => v.toFixed(3)}
              className="space-y-1.5"
            />
          </div>
        </Panel>

        <Panel title="SHAP Summary" subtitle="(Global Impact)" action={<MiniSelect value="Feature Impact" />}>
          <div className="flex min-h-0 flex-1 gap-2">
            <div className="min-h-0 flex-1">
              <ShapBeeswarm features={SHAP_FEATURES} />
            </div>
            <ColorScale className="shrink-0" />
          </div>
        </Panel>

        <Panel title="Attention Map" subtitle="(Transformer Layers)" action={<MiniSelect value="Layer 6" />}>
          <div className="flex min-h-0 flex-1 gap-2">
            <div className="min-h-0 flex-1">
              <AttentionHeatmap rows={ATT_ROWS} />
            </div>
            <ColorScale className="shrink-0" magma />
          </div>
          <PlaybackBar className="mt-1 shrink-0" current="240s" total="240s" />
        </Panel>
      </div>

      {/* Key Insights */}
      <div className="shrink-0">
        <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
          Key Insights
          <InfoIcon className="h-3.5 w-3.5 text-slate-300" />
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {INSIGHTS.map((ins) => (
            <div key={ins.title} className="surface-card flex items-start gap-2.5 rounded-lg p-3">
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-md", INSIGHT_TONE[ins.tone])}>
                <ins.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold leading-tight text-slate-800">{ins.title}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-slate-400">{ins.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- building blocks ----------------------------- */

function Panel({
  title,
  subtitle,
  badge,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card flex min-h-0 flex-col overflow-hidden rounded-lg p-3">
      <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
          {title}
          {subtitle ? <span className="text-[10px] font-normal text-slate-400">{subtitle}</span> : null}
          {badge}
        </h2>
        {action}
      </header>
      {children}
    </section>
  );
}

function InfoCard({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="surface-card rounded-lg p-3">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] text-slate-500">{label}</span>
      </div>
      <div className="mt-1 flex items-center gap-2">{children}</div>
    </div>
  );
}

function Badge({ children, tone = "success" }: { children: React.ReactNode; tone?: "success" }) {
  return (
    <span className={cn("rounded-pill px-1.5 py-0.5 text-[10px] font-medium", tone === "success" && "bg-success/10 text-success")}>
      {children}
    </span>
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

function Toggle2({ a, b }: { a: string; b: string }) {
  return (
    <div className="flex overflow-hidden rounded-md border border-slate-200 text-[10px]">
      <span className="bg-neural-blue/10 px-2 py-0.5 text-neural-blue">{a}</span>
      <span className="px-2 py-0.5 text-slate-500">{b}</span>
    </div>
  );
}

function MiniRing({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90" aria-hidden="true">
      <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-slate-200)" strokeWidth="4" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-signal-violet)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${dash} ${c - dash}`} />
    </svg>
  );
}

function ColorScale({ className, magma = false }: { className?: string; magma?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className="text-[8px] text-slate-400">High</span>
      <span
        className="w-1.5 flex-1 rounded-pill"
        style={{
          minHeight: 40,
          background: magma
            ? "linear-gradient(to bottom, #fcfdbf, #f98e09, #bb3754, #550f6d, #0c0826)"
            : "linear-gradient(to bottom, #ef4444, #eab308, #22d3ee, #2563eb)",
        }}
      />
      <span className="text-[8px] text-slate-400">Low</span>
    </div>
  );
}

function PlaybackBar({ current, total, className }: { current: string; total: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-intelligence-gradient text-white">
        <PlayIcon className="h-3 w-3" />
      </button>
      <span className="font-mono text-[9px] text-slate-500">{current}</span>
      <div className="relative h-1 flex-1 rounded-pill bg-slate-200">
        <div className="absolute inset-y-0 left-0 w-1/2 rounded-pill bg-neural-blue" />
      </div>
      <span className="font-mono text-[9px] text-slate-400">{total}</span>
    </div>
  );
}
