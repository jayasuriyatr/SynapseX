import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Features } from "@/components/landing/Features";
import { Pipeline } from "@/components/landing/Pipeline";
import { Technology } from "@/components/landing/Technology";
import { Datasets } from "@/components/landing/Datasets";
import { StatsBanner } from "@/components/landing/StatsBanner";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Pipeline />
        <Technology />
        <Datasets />
        <StatsBanner />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
