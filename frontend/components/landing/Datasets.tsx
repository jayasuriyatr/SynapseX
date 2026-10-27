import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { DatabaseIcon, ArrowRightIcon } from "@/components/ui/icons";
import { DATASETS } from "@/lib/landing-content";

export function Datasets() {
  return (
    <section id="datasets" className="bg-slate-50 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.5fr] lg:items-center">
        {/* Left — heading */}
        <div>
          <Eyebrow>Datasets</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Built On <span className="text-gradient">Open Science</span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-500">
            SynapseX is powered by high-quality public EEG datasets — promoting
            transparency, reproducibility, and innovation.
          </p>
          <Button className="mt-7">
            Explore Datasets
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Right — dataset cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DATASETS.map((ds) => (
            <article
              key={ds.name}
              className="surface-card flex flex-col rounded-lg p-5 transition-transform duration-250 ease-out-brand hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 place-items-center rounded-md bg-electric-cyan/10 text-electric-cyan">
                <DatabaseIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                {ds.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{ds.use}</p>
              <dl className="mt-4 space-y-1 border-t border-slate-200 pt-3 text-xs text-slate-500">
                <div className="flex justify-between">
                  <dt>Subjects</dt>
                  <dd className="font-medium text-slate-700">{ds.subjects}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Records</dt>
                  <dd className="font-medium text-slate-700">{ds.sessions}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>

      <Container className="mt-8 flex justify-end">
        <a
          href="#datasets"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neural-blue"
        >
          View All Datasets
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </a>
      </Container>
    </section>
  );
}
