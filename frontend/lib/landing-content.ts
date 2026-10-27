/**
 * Static content for the SynapseX marketing landing page.
 * Copy follows brand voice: scientific, clear, precise, human — no hype.
 */

export type NavLink = { label: string; href: string; hasMenu?: boolean };

export const NAV_LINKS: NavLink[] = [
  { label: "Product", href: "#features", hasMenu: true },
  { label: "Use Cases", href: "#features", hasMenu: true },
  { label: "Datasets", href: "#datasets" },
  { label: "Technology", href: "#technology", hasMenu: true },
  { label: "Pricing", href: "#cta" },
  { label: "Resources", href: "#footer", hasMenu: true },
];

export const HERO_TAGS = [
  { label: "Multi-task EEG Analysis", icon: "wave" },
  { label: "Spiking Neural Networks", icon: "neural" },
  { label: "100% Software Based", icon: "bolt" },
  { label: "Secure & Reliable", icon: "shield" },
] as const;

export const TRUST_LOGOS = [
  "MIT",
  "Stanford",
  "Berkeley",
  "ETH Zürich",
  "UCL",
  "Mayo Clinic",
] as const;

export const FEATURES = [
  {
    icon: "brain",
    title: "Seizure Detection",
    description:
      "Accurate, real-time detection of epileptic seizures from raw EEG signals.",
  },
  {
    icon: "emotion",
    title: "Emotion Recognition",
    description:
      "Decode emotional states from brain activity with high precision.",
  },
  {
    icon: "cognition",
    title: "Cognitive-State Estimation",
    description:
      "Estimate mental workload, attention, and cognitive states dynamically.",
  },
  {
    icon: "analytics",
    title: "Research & Analytics",
    description:
      "Built for researchers, with powerful tools and access to public datasets.",
  },
] as const;

export const PIPELINE_STEPS = [
  {
    icon: "wave",
    title: "EEG Signals",
    description: "Input from public datasets.",
  },
  {
    icon: "process",
    title: "Preprocessing",
    description: "Filtering, segmenting & normalization.",
  },
  {
    icon: "neural",
    title: "Spiking Neural Networks",
    description: "Event-driven processing.",
  },
  {
    icon: "target",
    title: "Multi-task Decoding",
    description: "Seizure, emotion & cognitive states.",
  },
  {
    icon: "insight",
    title: "Insights & Visualization",
    description: "Actionable insights in real time.",
  },
] as const;

export const TECH_HIGHLIGHTS = [
  "High temporal precision",
  "Live, event-driven inference",
  "Energy efficient",
  "Scalable & adaptable",
] as const;

export const DATASETS = [
  {
    name: "BCI Competition IV 2a",
    use: "EEG Signals",
    subjects: "9 Subjects",
    sessions: "22 Sessions",
  },
  {
    name: "CHB-MIT Scalp EEG",
    use: "Seizure Detection",
    subjects: "24 Subjects",
    sessions: "686 Hours",
  },
  {
    name: "DEAP Dataset",
    use: "Emotion Recognition",
    subjects: "32 Subjects",
    sessions: "40 Sessions",
  },
  {
    name: "SEED Dataset",
    use: "Emotion & Cognition",
    subjects: "15 Subjects",
    sessions: "3 Sessions",
  },
] as const;

export const STATS = [
  { value: "20+", label: "Public Datasets", icon: "database" },
  { value: "100%", label: "Software Based", icon: "bolt" },
  { value: "95%+", label: "Accuracy on Key Tasks", icon: "target" },
  { value: "Secure", label: "Privacy First, Anonymized", icon: "shield" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Overview", "Features", "Use Cases", "Pricing"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Blog"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Privacy Policy"],
  },
] as const;
