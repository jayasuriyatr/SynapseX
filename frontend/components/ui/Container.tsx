import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width container aligned to the brand layout system (XL 1440px). */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}
