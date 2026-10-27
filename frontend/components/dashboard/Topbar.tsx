"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  SearchIcon,
  BellIcon,
  HelpIcon,
  MenuIcon,
  UploadFileIcon,
  ClockIcon,
  EyeIcon,
  DownloadIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";

const SUBTITLES: Record<string, string> = {
  "/dashboard": "Welcome back, Dr. Emma Wilson",
  "/analytics": "Deep insights into your EEG data, models, and system performance.",
  "/datasets": "Manage, explore, and organize your EEG datasets.",
  "/settings": "Manage your account, preferences, and system configuration.",
  "/explainability": "Understand why the AI model made a specific prediction.",
  "/analysis": "Upload EEG data, configure analysis, and generate AI-driven insights.",
  "/models": "Manage, evaluate, and deploy AI models for EEG analysis.",
  "/about": "Learn about SynapseX and the technology behind it.",
  "/reports": "Generate, manage, and download analysis reports.",
  "/brain-visualization": "Explore 3D brain activity, region heatmaps, and channel overlays.",
  "/training": "Monitor training runs, metrics, and model checkpoints.",
  "/system-monitor": "Monitor backend health, inference queue, and resource utilization.",
};

// Per-page header actions (secondary upload + primary create).
const ACTIONS: Record<string, { upload?: string; primary: string; href?: string }> = {
  "/analytics": { upload: "Upload File", primary: "New Analysis", href: "/analysis" },
  "/datasets": { upload: "Upload Dataset", primary: "New Dataset" },
  "/analysis": { upload: "Upload File", primary: "New Analysis" },
  "/models": { upload: "Import Model", primary: "New Model" },
  "/reports": { primary: "Generate Report" },
  "/training": { primary: "New Training Run" },
};
const DEFAULT_ACTION = { primary: "New Analysis", href: "/analysis" };

// Pages with no standard header create/upload actions.
const NO_ACTIONS = new Set<string>(["/settings", "/explainability", "/about", "/brain-visualization", "/system-monitor"]);

// Pages with their own in-page search hide the global search bar.
const NO_SEARCH = new Set<string>([
  "/analytics",
  "/datasets",
  "/explainability",
  "/analysis",
  "/models",
  "/about",
  "/reports",
  "/brain-visualization",
  "/training",
  "/system-monitor",
]);

const SEARCH_PLACEHOLDER: Record<string, string> = {
  "/settings": "Search settings...",
};

function usePageMeta() {
  const pathname = usePathname();
  const match =
    DASHBOARD_NAV.find((n) =>
      n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href),
    ) ?? DASHBOARD_NAV[0];
  return { title: match.label, subtitle: SUBTITLES[match.href], pathname: match.href };
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { title, subtitle, pathname } = usePageMeta();
  const showSearch = !NO_SEARCH.has(pathname);
  const action = NO_ACTIONS.has(pathname) ? null : (ACTIONS[pathname] ?? DEFAULT_ACTION);
  const searchPlaceholder = SEARCH_PLACEHOLDER[pathname] ?? "Search anything...";
  const isExplain = pathname === "/explainability";

  return (
    <header className="flex h-[68px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open navigation"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-slate-700 lg:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <h1 className="truncate font-display text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle ? <p className="truncate text-xs text-slate-500">{subtitle}</p> : null}
      </div>

      {/* Center search */}
      {showSearch ? (
        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="global-search" className="sr-only">
            Search anything
          </label>
          <input
            id="global-search"
            type="search"
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:border-neural-blue focus:bg-white"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            ⌘K
          </kbd>
        </div>
      ) : null}

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {isExplain ? (
          <>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 lg:flex"
            >
              <ClockIcon className="h-4 w-4 text-slate-400" />
              May 28, 2024 · 10:24:36 AM
              <ChevronDownIcon className="h-3.5 w-3.5 text-slate-400" />
            </button>
            <Button variant="secondary" shape="rect" className="hidden sm:inline-flex">
              <EyeIcon className="h-4 w-4" />
              View Analysis
            </Button>
            <Button shape="rect" className="hidden sm:inline-flex">
              <DownloadIcon className="h-4 w-4" />
              Export Report
            </Button>
          </>
        ) : null}
        {action?.upload ? (
          <Button variant="secondary" shape="rect" className="hidden sm:inline-flex">
            <UploadFileIcon className="h-4 w-4" />
            {action.upload}
          </Button>
        ) : null}
        {action ? (
          <Button href={action.href} shape="rect" className="hidden sm:inline-flex">
            + {action.primary}
          </Button>
        ) : null}
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-md text-slate-600 hover:bg-slate-50"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-error" />
        </button>
        <button
          type="button"
          aria-label="Help"
          className="grid h-10 w-10 place-items-center rounded-md text-slate-600 hover:bg-slate-50"
        >
          <HelpIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
