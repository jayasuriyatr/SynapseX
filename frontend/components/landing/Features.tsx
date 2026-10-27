import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/iconMap";
import { ArrowRightIcon } from "@/components/ui/icons";
import { FEATURES } from "@/lib/landing-content";

export function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <Container>
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          One Platform. Many Possibilities.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="surface-card group flex flex-col rounded-lg p-6 transition-transform duration-250 ease-out-brand hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 place-items-center rounded-md bg-neural-blue/8 text-neural-blue transition-colors group-hover:bg-neural-blue/12">
                <Icon name={feature.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
              <a
                href="#technology"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neural-blue"
              >
                Learn more
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
