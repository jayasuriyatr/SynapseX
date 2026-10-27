import { Icon } from "@/components/ui/iconMap";
import { cn } from "@/lib/utils";
import type { MultiTaskItem } from "@/types";

type TaskReadout = Pick<MultiTaskItem, "icon" | "label" | "state" | "value" | "tone">;

const DEFAULT_TASKS: MultiTaskItem[] = [
  { icon: "brain", label: "Seizure Detection", state: "Low Risk", value: 12, tone: "success", position: "top" },
  { icon: "emotion", label: "Emotion Recognition", state: "Calm", value: 72, tone: "info", position: "left" },
  { icon: "cognition", label: "Cognitive State", state: "Focused", value: 81, tone: "violet", position: "right" },
];

const TONE_TEXT = {
  success: "text-success",
  info: "text-neural-blue",
  violet: "text-signal-violet",
};

function Readout({ task, className }: { task: TaskReadout; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200">
        <Icon name={task.icon} className="h-4 w-4" />
      </span>
      <p className="mt-1 text-[11px] font-medium text-slate-500">{task.label}</p>
      <p className={cn("text-xs font-semibold", TONE_TEXT[task.tone])}>{task.state}</p>
      <p className="font-display text-base font-bold text-slate-900">{task.value}%</p>
    </div>
  );
}

export function MultiTaskRadial({
  tasks = DEFAULT_TASKS,
  generatedAt = "2.4s ago",
}: {
  tasks?: MultiTaskItem[];
  generatedAt?: string;
}) {
  const top = tasks.find((t) => t.position === "top");
  const left = tasks.find((t) => t.position === "left");
  const right = tasks.find((t) => t.position === "right");

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex flex-1 items-center justify-center">
        {/* dashed ring */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 mx-auto my-auto h-full max-h-[200px]" aria-hidden="true">
          <circle cx="100" cy="100" r="78" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 5" />
          <defs>
            <radialGradient id="mtr-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="46" fill="url(#mtr-glow)" />
        </svg>

        {/* center brain */}
        <svg viewBox="0 0 80 80" className="relative h-20 w-20" aria-hidden="true">
          <defs>
            <linearGradient id="mtr-brain" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path
            d="M26 22 C32 14 48 14 54 22 C62 22 66 30 60 38 C64 46 56 54 48 52 C44 58 34 58 30 52 C22 54 16 46 20 38 C14 30 18 22 26 22 Z"
            fill="url(#mtr-brain)"
          />
          <g stroke="#c4b5fd" strokeWidth="1.4" fill="none" opacity="0.7">
            <path d="M40 18 C40 30 38 40 38 52" />
            <path d="M30 26 C36 30 34 38 40 40" />
            <path d="M50 26 C44 30 46 38 40 40" />
          </g>
        </svg>

        {/* top */}
        {top ? <Readout task={top} className="absolute left-1/2 top-0 -translate-x-1/2" /> : null}
        {/* bottom-left */}
        {left ? <Readout task={left} className="absolute bottom-0 left-0" /> : null}
        {/* bottom-right */}
        {right ? <Readout task={right} className="absolute bottom-0 right-0" /> : null}
      </div>

      <p className="mt-1 text-center text-[11px] text-slate-400">
        All predictions generated {generatedAt}
      </p>
    </div>
  );
}
