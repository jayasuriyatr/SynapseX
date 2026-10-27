import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small eyebrow / pill label (e.g. "Neurological Intelligence Platform"). */
export function Badge({
  children,
  className,
  icon,
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-700 backdrop-blur",
        className,
      )}
    >
      {icon ? <span className="text-neural-blue">{icon}</span> : null}
      {children}
    </span>
  );
}

/** Uppercase section eyebrow (e.g. "OUR TECHNOLOGY"). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neural-blue">
      {children}
    </span>
  );
}
