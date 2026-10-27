import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/iconMap";
import { ArrowRightIcon, PlayIcon, SynapseIcon } from "@/components/ui/icons";
import { BrainVisual } from "@/components/visuals/BrainVisual";
import { EegWaveform } from "@/components/visuals/EegWaveform";
import { HERO_TAGS } from "@/lib/landing-content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* soft aurora background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-signal-violet/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-electric-cyan/10 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        {/* Left — copy */}
        <div className="animate-[fade-up_0.6s_var(--ease-out-brand)_both]">
          <Badge icon={<SynapseIcon className="h-3.5 w-3.5" />}>
            Neurological Intelligence Platform
          </Badge>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
            Neurological
            <br />
            Intelligence,
            <br />
            <span className="text-gradient">Redefined.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500">
            SynapseX leverages Spiking Neural Networks to decode brain signals
            with unmatched intelligence — enabling real-time analysis for
            seizure detection, emotion recognition, and cognitive-state
            estimation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" href="/dashboard">
              Explore Platform
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary">
              <PlayIcon className="h-4 w-4 text-neural-blue" />
              View Use Cases
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {HERO_TAGS.map((tag) => (
              <li
                key={tag.label}
                className="inline-flex items-center gap-2 text-sm text-slate-500"
              >
                <Icon name={tag.icon} className="h-4 w-4 text-neural-blue" />
                {tag.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — brain visual + floating live card */}
        <div className="relative">
          <div className="animate-[float_6s_ease-in-out_infinite]">
            <BrainVisual className="mx-auto max-w-md" />
          </div>

          <div className="surface-card absolute -bottom-2 right-0 w-56 rounded-lg p-4 sm:right-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Real-time Analysis
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Live
              </span>
            </div>
            <div className="mt-3 h-12">
              <EegWaveform stroke="var(--color-neural-blue)" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
