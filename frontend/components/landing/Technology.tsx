import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Badge";
import { CheckIcon } from "@/components/ui/icons";
import { NeuralMesh } from "@/components/visuals/NeuralMesh";
import { EegWaveform } from "@/components/visuals/EegWaveform";
import { TECH_HIGHLIGHTS } from "@/lib/landing-content";

export function Technology() {
  return (
    <section id="technology" className="bg-white py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left — narrative + neural mesh */}
        <div>
          <Eyebrow>Our Technology</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Spiking Neural Networks
            <br />
            For <span className="text-gradient">Real-World Impact</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500">
            Bio-inspired and event-driven, SynapseX uses Spiking Neural
            Networks to process brain signals as spikes — mirroring how the
            brain itself works.
          </p>

          <ul className="mt-6 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            {TECH_HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-slate-700"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-success/12 text-success">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-lg bg-slate-50 p-4">
            <NeuralMesh className="max-h-52" />
          </div>
        </div>

        {/* Right — live EEG preview card */}
        <div className="surface-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Live EEG Analysis
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">
                Live EEG Preview
              </h3>
            </div>
            <span className="flex items-center gap-1.5 rounded-pill bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Live
            </span>
          </div>

          <div className="mt-3">
            <span className="inline-flex rounded-pill bg-signal-violet/10 px-2.5 py-1 font-mono text-[11px] text-signal-violet">
              Alpha Band (8–12 Hz)
            </span>
          </div>

          <div className="mt-4 h-36 rounded-lg bg-gradient-to-b from-slate-50 to-white p-3">
            <EegWaveform traces={3} stroke="var(--color-signal-violet)" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Metric label="Signal Quality" value="92%" tone="success" />
            <Metric label="Confidence" value="High" tone="info" />
            <Metric label="Latency" value="28ms" tone="violet" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "info" | "violet";
}) {
  const toneClass = {
    success: "text-success",
    info: "text-neural-blue",
    violet: "text-signal-violet",
  }[tone];

  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2.5">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className={`mt-0.5 text-sm font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}
