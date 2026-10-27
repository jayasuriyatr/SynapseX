import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/iconMap";
import { STATS } from "@/lib/landing-content";

export function StatsBanner() {
  return (
    <section className="bg-white py-12">
      <Container>
        <div className="bg-tri-gradient rounded-xl px-8 py-10">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <Icon name={stat.icon} className="h-6 w-6 text-white/80" />
                <dd className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm text-white/85">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
