"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuActivity,
  LuBrain,
  LuLightbulb,
  LuDatabase,
  LuBoxes,
  LuGraduationCap,
  LuFileText,
  LuTrendingUp,
  LuServer,
  LuSettings,
  LuInfo,
  LuPanelLeft,
  LuPanelLeftClose,
  LuEllipsisVertical,
} from "react-icons/lu";
import { LogoMark } from "@/components/ui/LogoMark";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

type IconType = ComponentType<{ className?: string }>;

// Modern Lucide icons keyed by route.
const NAV_ICONS: Record<string, IconType> = {
  "/dashboard": LuLayoutDashboard,
  "/analysis": LuActivity,
  "/brain-visualization": LuBrain,
  "/explainability": LuLightbulb,
  "/datasets": LuDatabase,
  "/models": LuBoxes,
  "/training": LuGraduationCap,
  "/reports": LuFileText,
  "/analytics": LuTrendingUp,
  "/system-monitor": LuServer,
  "/settings": LuSettings,
  "/about": LuInfo,
};

export function Sidebar({
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-900 to-slate-950 font-sidebar text-slate-300">
      {/* Brand */}
      <div className={cn("flex h-[68px] items-center border-b border-white/10", collapsed ? "justify-center px-2" : "gap-2.5 px-5")}>
        <Link href="/" aria-label="SynapseX home" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-auto" />
          {!collapsed ? (
            <span className="leading-tight">
              <span className="block text-base font-bold tracking-tight text-white">
                Synapse<span className="text-electric-cyan">X</span>
              </span>
              <span className="block text-[10px] font-medium tracking-wide text-slate-400">
                Neurological Intelligence Platform
              </span>
            </span>
          ) : null}
        </Link>
      </div>

      {/* Nav */}
      <nav className={cn("flex-1 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")} aria-label="Primary">
        <ul className="space-y-1">
          {DASHBOARD_NAV.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const ItemIcon = NAV_ICONS[item.href] ?? LuLayoutDashboard;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-md text-[13px] font-medium tracking-tight transition-colors",
                    collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5",
                    active
                      ? "bg-intelligence-gradient text-white shadow-[0_8px_20px_-10px_rgba(124,58,237,0.8)]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <ItemIcon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed ? <span className="flex-1">{item.label}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer: collapse toggle + profile */}
      <div className={cn("space-y-2 border-t border-white/10", collapsed ? "p-2" : "p-3")}>
        {onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex w-full items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10"
          >
            {collapsed ? <LuPanelLeft className="h-4 w-4 shrink-0" /> : <LuPanelLeftClose className="h-4 w-4 shrink-0" />}
          </button>
        ) : null}

        <div className={cn("flex items-center rounded-md", collapsed ? "justify-center py-1.5" : "gap-2.5 px-2 py-1.5")}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-intelligence-gradient text-xs font-semibold text-white">
            EW
          </span>
          {!collapsed ? (
            <>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-sm font-medium text-white">Dr. Kamaleshwaran P</span>
                <span className="block text-xs text-slate-400">Researcher</span>
              </span>
              <button
                type="button"
                aria-label="Account menu"
                className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-white/10"
              >
                <LuEllipsisVertical className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
