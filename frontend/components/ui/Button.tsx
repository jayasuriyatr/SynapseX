import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // Primary — gradient background (brand component library)
  primary:
    "bg-intelligence-gradient text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.6)] hover:shadow-[0_10px_30px_-8px_rgba(124,58,237,0.7)] hover:brightness-[1.05]",
  // Secondary — outlined
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-500/40 hover:bg-slate-50",
  // Tertiary — text only
  tertiary: "bg-transparent text-slate-700 hover:text-neural-blue",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out-brand focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const shapes = {
  pill: "rounded-pill",
  rect: "rounded-md",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: keyof typeof shapes;
  children: ReactNode;
  /** When provided, renders a Next.js link styled as a button. */
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  shape = "pill",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(baseClass, shapes[shape], variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
