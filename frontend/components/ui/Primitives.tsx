import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "error" | "info" | "violet" | "neutral";

const toneStyles: Record<Tone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-neural-blue/10 text-neural-blue",
  violet: "bg-signal-violet/10 text-signal-violet",
  neutral: "bg-slate-200/60 text-slate-700",
};

export function StatusBadge({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
}) {
  const dotColor: Record<Tone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-neural-blue",
    violet: "bg-signal-violet",
    neutral: "bg-slate-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium",
        toneStyles[tone],
      )}
    >
      {dot ? <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[tone])} /> : null}
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  tone = "info",
  className,
}: {
  value: number; // 0..100
  tone?: Tone;
  className?: string;
}) {
  const barColor: Record<Tone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-neural-blue",
    violet: "bg-signal-violet",
    neutral: "bg-slate-500",
  };
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-pill bg-slate-200", className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-pill transition-all", barColor[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function ConfidenceMeter({ value }: { value: number /* 0..1 */ }) {
  const pct = Math.round(value * 100);
  const tone: Tone = pct >= 80 ? "success" : pct >= 60 ? "info" : "warning";
  return (
    <div className="flex items-center gap-3">
      <ProgressBar value={pct} tone={tone} className="flex-1" />
      <span className="w-10 text-right text-sm font-semibold text-slate-700">
        {pct}%
      </span>
    </div>
  );
}
