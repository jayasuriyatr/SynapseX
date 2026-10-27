import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConditionalShell } from "@/components/dashboard/ConditionalShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SynapseX - Neurological Intelligence, Redefined",
  description:
    "SynapseX uses Spiking Neural Networks to decode EEG activity into actionable neurological insights — seizure detection, emotion recognition, and cognitive-state estimation.",
  keywords: [
    "EEG Analysis Platform",
    "Neurological Intelligence",
    "Spiking Neural Networks",
    "Brain Signal Analysis",
    "Neural Decoding",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
