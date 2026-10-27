import { Container } from "@/components/ui/Container";
import { TRUST_LOGOS } from "@/lib/landing-content";

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white py-10">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Trusted by innovators and researchers worldwide
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {TRUST_LOGOS.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-semibold tracking-tight text-slate-500/70 grayscale transition-colors hover:text-slate-700"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
