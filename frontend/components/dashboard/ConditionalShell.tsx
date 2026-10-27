"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppShell } from "./AppShell";

/**
 * Renders the public landing page bare, and wraps every other route in the
 * authenticated AppShell (sidebar + topbar). Lets all pages live directly
 * under app/ without a route group while keeping the shared shell.
 */
const BARE_ROUTES = new Set<string>(["/"]);

export function ConditionalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (BARE_ROUTES.has(pathname)) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
