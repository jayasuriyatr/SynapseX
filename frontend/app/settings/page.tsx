"use client";

import { useState } from "react";
import { Donut } from "@/components/charts/Donut";
import {
  UsersIcon,
  LayersIcon,
  ShieldIcon,
  BellIcon,
  KeyIcon,
  DatabaseIcon,
  EyeIcon,
  SlidersIcon,
  CardIcon,
  ClockIcon,
  WaveIcon,
  BrainIcon,
  ActivityIcon,
  DocumentIcon,
  BoltIcon,
  InfoIcon,
  TargetIcon,
  DownloadIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  ChevronDownIcon,
  CopyIcon,
  MoreIcon,
  TrashIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "profile", label: "Profile", sub: "Manage your personal information", icon: UsersIcon },
  { id: "workspace", label: "Workspace", sub: "Manage workspace settings", icon: LayersIcon },
  { id: "security", label: "Security", sub: "Password, 2FA, and security", icon: ShieldIcon },
  { id: "notifications", label: "Notifications", sub: "Configure alerts and updates", icon: BellIcon },
  { id: "api", label: "API & Integrations", sub: "API keys and integrations", icon: KeyIcon },
  { id: "data", label: "Data & Storage", sub: "Data management preferences", icon: DatabaseIcon },
  { id: "appearance", label: "Appearance", sub: "Theme, language, and display", icon: EyeIcon },
  { id: "preferences", label: "Preferences", sub: "General application settings", icon: SlidersIcon },
  { id: "billing", label: "Billing", sub: "Subscription and billing info", icon: CardIcon },
];

const FIELDS = [
  { icon: ClockIcon, title: "Default Time Range", sub: "Set the default time range for charts and analytics.", value: "Last 30 Days" },
  { icon: WaveIcon, title: "Default Sampling Rate", sub: "Set the default EEG sampling rate for uploads.", value: "256 Hz" },
  { icon: BrainIcon, title: "Default Channel Montage", sub: "Choose the default channel montage.", value: "19 Channels (Common)" },
  { icon: ActivityIcon, title: "Results Refresh Rate", sub: "Set auto-refresh interval for live data.", value: "30 Seconds" },
  { icon: ClockIcon, title: "Timezone", sub: "Set your local timezone.", value: "(UTC+05:30) India Standard Time" },
  { icon: DocumentIcon, title: "Date Format", sub: "Choose your preferred date format.", value: "May 28, 2024 (MMM DD, YYYY)" },
];

const APP_PREFS = [
  { icon: DownloadIcon, title: "Auto Save", sub: "Automatically save your analysis configurations.", on: true },
  { icon: ShieldIcon, title: "Enable Data Anonymization", sub: "Automatically anonymize data in reports and exports.", on: true },
  { icon: InfoIcon, title: "Show Tooltips", sub: "Display helpful tips across the application.", on: true },
  { icon: BellIcon, title: "Email Notifications", sub: "Receive email notifications for important updates.", on: true },
  { icon: BoltIcon, title: "High Performance Mode", sub: "Optimize performance for large datasets and analyses.", on: false },
  { icon: TargetIcon, title: "Beta Features", sub: "Enable experimental features and improvements.", on: false },
];

const STORAGE = [
  { label: "Datasets", value: 68.4, detail: "68.4 GB", color: "#2563eb" },
  { label: "Analyses", value: 32.1, detail: "32.1 GB", color: "#06b6d4" },
  { label: "Models", value: 18.7, detail: "18.7 GB", color: "#7c3aed" },
  { label: "Reports", value: 9.4, detail: "9.4 GB", color: "#8b5cf6" },
];

const API_KEYS = [
  { name: "Production API Key", masked: "••••••••••••••2f2" },
  { name: "Development API Key", masked: "••••••••••••••9c3" },
  { name: "Read Only API Key", masked: "••••••••••••••1d4" },
];

const THEMES = [
  { id: "light", label: "Light", icon: SunIcon },
  { id: "dark", label: "Dark", icon: MoonIcon },
  { id: "system", label: "System", icon: MonitorIcon },
];

export default function SettingsPage() {
  const [active, setActive] = useState("preferences");
  const [theme, setTheme] = useState("light");
  const [toggles, setToggles] = useState(() => APP_PREFS.map((p) => p.on));

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 gap-4 p-4 sm:p-5">
        {/* Left region: nav + preferences + application preferences */}
        <div className="surface-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg">
          <div className="flex min-h-0 flex-1">
            {/* Settings nav */}
            <nav className="w-52 shrink-0 overflow-y-auto border-r border-slate-200 p-3" aria-label="Settings sections">
              <ul className="space-y-0.5">
                {NAV.map((n) => {
                  const on = active === n.id;
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => setActive(n.id)}
                        aria-current={on ? "true" : undefined}
                        className={cn(
                          "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                          on ? "bg-neural-blue/8" : "hover:bg-slate-50",
                        )}
                      >
                        <n.icon className={cn("mt-0.5 h-4 w-4 shrink-0", on ? "text-neural-blue" : "text-slate-400")} />
                        <span className="min-w-0">
                          <span className={cn("block text-xs font-medium", on ? "text-neural-blue" : "text-slate-700")}>
                            {n.label}
                          </span>
                          <span className="block truncate text-[10px] text-slate-400">{n.sub}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Preferences content */}
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <h2 className="text-sm font-semibold text-slate-900">Preferences</h2>
              <p className="text-xs text-slate-500">Customize your experience and default behavior.</p>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                {FIELDS.map((f) => (
                  <Field key={f.title} icon={f.icon} title={f.title} sub={f.sub}>
                    <SelectBox icon={f.icon} value={f.value} />
                  </Field>
                ))}

                {/* Theme */}
                <Field icon={SunIcon} title="Theme" sub="Choose your preferred theme.">
                  <div className="grid grid-cols-3 gap-2">
                    {THEMES.map((t) => {
                      const on = theme === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTheme(t.id)}
                          className={cn(
                            "flex flex-col items-center gap-1 rounded-lg border py-2.5 text-xs transition-colors",
                            on ? "border-neural-blue bg-neural-blue/5 text-neural-blue" : "border-slate-200 text-slate-500 hover:bg-slate-50",
                          )}
                        >
                          <t.icon className="h-4 w-4" />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Language */}
                <Field icon={DocumentIcon} title="Language" sub="Choose your preferred language.">
                  <SelectBox value="English" />
                </Field>
              </div>
            </div>
          </div>

          {/* Application Preferences */}
          <div className="shrink-0 border-t border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Application Preferences</h2>
            <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
              {APP_PREFS.map((p, i) => (
                <div key={p.title} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-500">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-700">{p.title}</p>
                    <p className="truncate text-[10px] text-slate-400">{p.sub}</p>
                  </div>
                  <Toggle
                    on={toggles[i]}
                    onToggle={() => setToggles((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                    label={p.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex w-72 shrink-0 flex-col gap-4">
          {/* Storage Overview */}
          <section className="surface-card flex min-h-0 flex-1 flex-col rounded-lg p-4">
            <h2 className="text-sm font-semibold text-slate-900">Storage Overview</h2>
            <p className="text-[11px] text-slate-500">Manage your storage and data usage.</p>
            <div className="mt-2 flex min-h-0 flex-1 items-center">
              <Donut slices={STORAGE} centerValue="128.6 GB" centerLabel="of 250 GB used" showPercent={false} />
            </div>
            <a href="#" className="mt-2 flex items-center justify-center gap-1 border-t border-slate-100 pt-2 text-xs font-medium text-neural-blue">
              Manage Storage
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </section>

          {/* API Keys */}
          <section className="surface-card flex flex-col rounded-lg p-4">
            <h2 className="text-sm font-semibold text-slate-900">API Keys</h2>
            <p className="text-[11px] text-slate-500">Manage your API keys and access.</p>
            <ul className="mt-3 space-y-2.5">
              {API_KEYS.map((k) => (
                <li key={k.name} className="flex items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-700">{k.name}</p>
                    <p className="truncate font-mono text-[11px] text-slate-400">{k.masked}</p>
                  </div>
                  <button aria-label="Copy key" className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100">
                    <CopyIcon className="h-3.5 w-3.5" />
                  </button>
                  <button aria-label="More" className="grid h-7 w-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100">
                    <MoreIcon className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-neural-blue">
              Manage API Keys
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </section>

          {/* Danger Zone */}
          <section className="surface-card flex flex-col rounded-lg p-4">
            <h2 className="text-sm font-semibold text-error">Danger Zone</h2>
            <p className="text-[11px] text-slate-500">Irreversible and destructive actions.</p>
            <button
              type="button"
              className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-error/40 text-sm font-medium text-error transition-colors hover:bg-error/5"
            >
              <TrashIcon className="h-4 w-4" />
              Delete Workspace
            </button>
            <p className="mt-2 text-[10px] text-slate-400">
              Permanently delete this workspace and all associated data.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 px-5 py-2.5 text-[11px] text-slate-400">
        <span>© 2024 SynapseX. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-neural-blue">Privacy Policy</a>
          <a href="#" className="hover:text-neural-blue">Terms of Service</a>
          <a href="#" className="hover:text-neural-blue">Contact Support</a>
          <span>v2.4.1</span>
        </div>
      </footer>
    </div>
  );
}

/* ----------------------------- building blocks ----------------------------- */

function Field({
  icon: Icon,
  title,
  sub,
  children,
}: {
  icon: (p: { className?: string }) => React.ReactElement;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-700">{title}</p>
          <p className="truncate text-[10px] text-slate-400">{sub}</p>
        </div>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function SelectBox({
  icon: Icon,
  value,
}: {
  icon?: (p: { className?: string }) => React.ReactElement;
  value: string;
}) {
  return (
    <button
      type="button"
      className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 hover:border-slate-300"
    >
      <span className="flex min-w-0 items-center gap-2">
        {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" /> : null}
        <span className="truncate">{value}</span>
      </span>
      <ChevronDownIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
    </button>
  );
}

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-pill transition-colors",
        on ? "bg-neural-blue" : "bg-slate-200",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
          on ? "translate-x-[18px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
