import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ArrowRightIcon } from "@/components/ui/icons";
import { FOOTER_COLUMNS } from "@/lib/landing-content";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-slate-200 bg-white py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Neurological Intelligence, Redefined. Decoding the language of the
              brain with Spiking Neural Networks.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-neural-blue"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Stay Updated</h3>
            <p className="mt-4 text-sm text-slate-500">
              Get the latest updates on features, research, and releases.
            </p>
            <form
              className="mt-4 flex items-center gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-500 focus:border-neural-blue"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-intelligence-gradient text-white"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SynapseX. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-neural-blue">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neural-blue">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
