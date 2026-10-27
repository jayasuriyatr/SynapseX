/** Primary navigation for the authenticated SynapseX app (spec: IA). */
export interface NavItem {
  label: string;
  href: string;
  icon: string; // key into ICON_MAP
  hasMenu?: boolean;
}

export const DASHBOARD_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Analysis", href: "/analysis", icon: "upload" },
  { label: "Brain Visualization", href: "/brain-visualization", icon: "brain" },
  { label: "Explainability", href: "/explainability", icon: "insight" },
  { label: "Datasets", href: "/datasets", icon: "database" },
  { label: "Models", href: "/models", icon: "layers" },
  { label: "Training", href: "/training", icon: "target" },
  { label: "Reports", href: "/reports", icon: "document" },
  { label: "Analytics", href: "/analytics", icon: "analytics" },
  { label: "System Monitor", href: "/system-monitor", icon: "cpu" },
  { label: "Settings", href: "/settings", icon: "gear" },
  { label: "About", href: "/about", icon: "info" },
];
