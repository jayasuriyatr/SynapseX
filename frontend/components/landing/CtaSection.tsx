import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProfileHead } from "@/components/visuals/ProfileHead";

export function CtaSection() {
  return (
    <section id="cta" className="bg-white pb-20 pt-8 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-8 py-12 sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-neural-blue/8 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Ready to Unlock the Power of{" "}
                <span className="text-gradient">Brain Intelligence?</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-500">
                Join researchers, clinicians, and innovators building the future
                with SynapseX.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" href="/dashboard">
                  Get Started for Free
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="secondary">
                  Request a Demo
                </Button>
              </div>
            </div>

            <div className="hidden justify-center lg:flex">
              <ProfileHead className="max-w-[240px]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
