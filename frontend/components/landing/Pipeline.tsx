import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/iconMap";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PIPELINE_STEPS } from "@/lib/landing-content";

export function Pipeline() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
        {/* Left — heading */}
        <div>
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            From Brain Signals
            <br />
            To <span className="text-gradient">Intelligent Insights</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-500">
            SynapseX transforms raw EEG data into actionable insights using a
            fully software-based, event-driven pipeline.
          </p>
          <Button variant="secondary" className="mt-7">
            See Technical Details
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Right — pipeline steps */}
        <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-2">
          {PIPELINE_STEPS.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="relative grid h-14 w-14 place-items-center rounded-full border border-slate-200 bg-white text-neural-blue shadow-[0_8px_20px_-14px_rgba(37,99,235,0.6)]">
                <Icon name={step.icon} className="h-6 w-6" />
                {i < PIPELINE_STEPS.length - 1 ? (
                  <ArrowRightIcon className="absolute -right-4 hidden h-4 w-4 text-slate-200 lg:block" />
                ) : null}
              </span>
              <span className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-neural-blue">
                Step {i + 1}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
