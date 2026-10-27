import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

/**
 * SynapseX logo lockup: neural-network "S" mark + wordmark.
 * The mark evokes synaptic transmission / information flow (brand logo rules).
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-8 w-auto" />
      {showWordmark ? (
        <span className="font-display text-lg font-bold tracking-tight text-slate-900">
          Synapse<span className="text-neural-blue">X</span>
        </span>
      ) : null}
    </span>
  );
}
