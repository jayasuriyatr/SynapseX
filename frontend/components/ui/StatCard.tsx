import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  delta,
  trend = "flat",
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: ReactNode;
}) {
  const trendClass =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-neural-blue"
        : "text-slate-500";

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        {icon ? (
          <span className="grid h-8 w-8 place-items-center rounded-md bg-neural-blue/8 text-neural-blue">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-slate-900">
        {value}
      </p>
      {delta ? (
        <p className={cn("mt-1 text-xs font-medium", trendClass)}>
          {trend === "up" ? "▲ " : trend === "down" ? "▼ " : ""}
          {delta} vs last period
        </p>
      ) : null}
    </Card>
  );
}
