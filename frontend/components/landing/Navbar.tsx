"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronDownIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { NAV_LINKS } from "@/lib/landing-content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" aria-label="SynapseX home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-neural-blue"
            >
              {link.label}
              {link.hasMenu ? (
                <ChevronDownIcon className="h-3.5 w-3.5 text-slate-500" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#cta"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-neural-blue"
          >
            Log In
          </a>
          <Button href="/dashboard">Get Started</Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md text-slate-700 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="secondary">Log In</Button>
              <Button href="/dashboard">Get Started</Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
