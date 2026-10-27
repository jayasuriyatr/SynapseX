import type {
  ActivityEvent,
  AnalysisRecord,
  BrainRegion,
  ChannelImportance,
  DatasetInfo,
  EpochPoint,
  ModelInfo,
  Prediction,
  ReportItem,
  ResourceMetric,
  SeriesPoint,
  SystemStat,
  TrainingRun,
} from "@/types";

/**
 * Mock data standing in for FastAPI responses. Centralized so it can be
 * swapped for live endpoints without touching components.
 */

export const SYSTEM_STATS: SystemStat[] = [
  { label: "Analyses Today", value: "1,284", delta: "+12.4%", trend: "up" },
  { label: "Avg. Latency", value: "28 ms", delta: "-3 ms", trend: "down" },
  { label: "Active Models", value: "4", delta: "0", trend: "flat" },
  { label: "Mean Accuracy", value: "95.2%", delta: "+0.6%", trend: "up" },
];

export const RECENT_ANALYSES: AnalysisRecord[] = [
  { id: "AX-9013", fileName: "chb01_03.edf", createdAt: "2 min ago", status: "completed", durationSec: 31, topPrediction: "Seizure", confidence: 0.97 },
  { id: "AX-9012", fileName: "s12_trial4.bdf", createdAt: "18 min ago", status: "completed", durationSec: 44, topPrediction: "High Arousal", confidence: 0.83 },
  { id: "AX-9011", fileName: "subject_07.mat", createdAt: "41 min ago", status: "completed", durationSec: 27, topPrediction: "Focused", confidence: 0.78 },
  { id: "AX-9010", fileName: "deap_s05.npy", createdAt: "1 hr ago", status: "completed", durationSec: 52, topPrediction: "Low Valence", confidence: 0.71 },
  { id: "AX-9009", fileName: "tuh_eval_22.edf", createdAt: "2 hr ago", status: "failed", durationSec: 0, topPrediction: "—", confidence: 0 },
];

export const ACTIVITY_FEED: ActivityEvent[] = [
  { id: "e1", type: "analysis", message: "Analysis AX-9013 completed — seizure detected (97%)", timestamp: "2 min ago" },
  { id: "e2", type: "model", message: "Model v2.4.1 promoted to production", timestamp: "1 hr ago" },
  { id: "e3", type: "training", message: "Training run emotion-head-ft reached epoch 40/50", timestamp: "3 hr ago" },
  { id: "e4", type: "system", message: "Inference queue drained — 0 pending jobs", timestamp: "5 hr ago" },
  { id: "e5", type: "analysis", message: "Batch import of 24 CHB-MIT records finished", timestamp: "8 hr ago" },
];

export const LIVE_INFERENCE: SeriesPoint[] = Array.from({ length: 24 }, (_, i) => ({
  x: i,
  y: 24 + Math.round(10 * Math.sin(i / 2.2) + (i % 5) * 1.6),
}));

export const PREDICTIONS: Prediction[] = [
  { domain: "seizure", label: "Seizure Detected", confidence: 0.97, detail: "Focal onset, F3–T3, high-amplitude delta bursts" },
  { domain: "emotion", label: "High Arousal / Negative Valence", confidence: 0.81, detail: "Frontal asymmetry, elevated beta power" },
  { domain: "cognition", label: "Elevated Cognitive Load", confidence: 0.74, detail: "Theta/alpha ratio rising over parietal sites" },
];

export const CHANNEL_IMPORTANCE: ChannelImportance[] = [
  { channel: "F3", importance: 0.94 },
  { channel: "T3", importance: 0.88 },
  { channel: "C3", importance: 0.71 },
  { channel: "Fz", importance: 0.63 },
  { channel: "P3", importance: 0.52 },
  { channel: "O1", importance: 0.38 },
  { channel: "F4", importance: 0.31 },
  { channel: "T4", importance: 0.24 },
];

export const BRAIN_REGIONS: BrainRegion[] = [
  { id: "frontal", name: "Frontal Lobe", contribution: 0.86 },
  { id: "temporal", name: "Temporal Lobe", contribution: 0.79 },
  { id: "central", name: "Central / Motor", contribution: 0.54 },
  { id: "parietal", name: "Parietal Lobe", contribution: 0.41 },
  { id: "occipital", name: "Occipital Lobe", contribution: 0.27 },
];

export const DATASETS: DatasetInfo[] = [
  { id: "tuh", name: "TUH EEG", domain: "Clinical / Seizure", subjects: 10874, channels: 21, samplingRate: 250, records: "16,986 sessions", description: "The largest public clinical EEG corpus, with seizure and pathology annotations." },
  { id: "chbmit", name: "CHB-MIT", domain: "Pediatric Epilepsy", subjects: 22, channels: 23, samplingRate: 256, records: "686 hours", description: "Scalp EEG with 182 annotated seizures — the standard seizure-detection benchmark." },
  { id: "deap", name: "DEAP", domain: "Emotion", subjects: 32, channels: 32, samplingRate: 512, records: "40 trials/subject", description: "Affective video stimuli rated on valence, arousal, and dominance." },
  { id: "seed", name: "SEED", domain: "Emotion", subjects: 15, channels: 62, samplingRate: 200, records: "3 sessions", description: "Film-clip stimuli labelled across discrete emotional categories." },
  { id: "seediv", name: "SEED-IV", domain: "Emotion", subjects: 15, channels: 62, samplingRate: 200, records: "3 sessions", description: "Four-emotion extension of SEED with eye-tracking signals." },
  { id: "dreamer", name: "DREAMER", domain: "Emotion", subjects: 23, channels: 14, samplingRate: 128, records: "18 trials", description: "Portable-device EEG + ECG with valence/arousal ratings." },
  { id: "bci", name: "BCI Competition", domain: "Motor / Cognitive", subjects: 9, channels: 22, samplingRate: 250, records: "22 sessions", description: "Motor-imagery datasets used to benchmark decoding pipelines." },
];

export const MODEL: ModelInfo = {
  version: "v2.4.1",
  backboneParams: "3.8M",
  releasedAt: "2026-06-12",
  heads: [
    { id: "seizure", name: "Seizure Head", domain: "seizure", accuracy: 0.991, f1: 0.984, params: "0.4M" },
    { id: "emotion", name: "Emotion Head", domain: "emotion", accuracy: 0.842, f1: 0.831, params: "0.5M" },
    { id: "cognition", name: "Cognition Head", domain: "cognition", accuracy: 0.788, f1: 0.769, params: "0.4M" },
  ],
};

export const MODEL_HISTORY = [
  { version: "v2.4.1", date: "2026-06-12", note: "Recalibrated emotion head, +0.6% mean accuracy", status: "production" },
  { version: "v2.3.0", date: "2026-05-02", note: "Added cognition head, pruned backbone to 3.8M", status: "archived" },
  { version: "v2.2.0", date: "2026-03-18", note: "INT8 quantization, 30% latency reduction", status: "archived" },
  { version: "v2.1.0", date: "2026-02-04", note: "Surrogate-gradient retraining on TUH", status: "archived" },
] as const;

export const TRAINING_RUNS: TrainingRun[] = [
  { id: "run-emotion-ft", name: "emotion-head-ft", status: "running", epoch: 40, totalEpochs: 50, trainLoss: 0.31, valLoss: 0.38, valAccuracy: 0.842 },
  { id: "run-seizure-v3", name: "seizure-backbone-v3", status: "completed", epoch: 80, totalEpochs: 80, trainLoss: 0.06, valLoss: 0.09, valAccuracy: 0.991 },
  { id: "run-cog-base", name: "cognition-baseline", status: "failed", epoch: 12, totalEpochs: 60, trainLoss: 0.74, valLoss: 0.91, valAccuracy: 0.61 },
];

export const EPOCH_CURVE: EpochPoint[] = Array.from({ length: 40 }, (_, i) => {
  const e = i + 1;
  return {
    epoch: e,
    trainLoss: +(1.4 * Math.exp(-e / 12) + 0.05).toFixed(3),
    valLoss: +(1.5 * Math.exp(-e / 11) + 0.08 + (i % 7 === 0 ? 0.05 : 0)).toFixed(3),
    valAccuracy: +(0.5 + 0.35 * (1 - Math.exp(-e / 9))).toFixed(3),
  };
});

// 4-class confusion matrix (rows = actual, cols = predicted)
export const CONFUSION_MATRIX = {
  labels: ["Neutral", "Happy", "Sad", "Fear"],
  values: [
    [142, 6, 4, 3],
    [8, 151, 5, 2],
    [5, 4, 138, 9],
    [3, 3, 7, 129],
  ],
};

// ROC curve points (fpr, tpr)
export const ROC_CURVE: SeriesPoint[] = [
  { x: 0, y: 0 }, { x: 0.02, y: 0.62 }, { x: 0.05, y: 0.81 }, { x: 0.1, y: 0.9 },
  { x: 0.2, y: 0.95 }, { x: 0.4, y: 0.98 }, { x: 0.7, y: 0.995 }, { x: 1, y: 1 },
];

export const REPORTS: ReportItem[] = [
  { id: "rep-301", title: "Seizure Analysis — chb01_03", createdAt: "Today, 14:22", format: "PDF", sizeKb: 842 },
  { id: "rep-300", title: "Emotion Summary — deap_s05", createdAt: "Today, 11:08", format: "JSON", sizeKb: 36 },
  { id: "rep-299", title: "Cognitive Load Batch — 24 records", createdAt: "Yesterday", format: "CSV", sizeKb: 128 },
  { id: "rep-298", title: "Model Evaluation — v2.4.1", createdAt: "2 days ago", format: "PDF", sizeKb: 1310 },
];

export const ANALYTICS_TREND: SeriesPoint[] = Array.from({ length: 30 }, (_, i) => ({
  x: i + 1,
  y: 600 + Math.round(180 * Math.sin(i / 4) + i * 12),
}));

export const PREDICTION_DISTRIBUTION = [
  { label: "Seizure", value: 38, color: "#2563eb" },
  { label: "Emotion", value: 34, color: "#06b6d4" },
  { label: "Cognition", value: 28, color: "#7c3aed" },
];

export const LATENCY_TREND: SeriesPoint[] = Array.from({ length: 24 }, (_, i) => ({
  x: i,
  y: 22 + Math.round(8 * Math.abs(Math.sin(i / 3))),
}));

export const RESOURCES: ResourceMetric[] = [
  { label: "CPU", used: 42, detail: "16 cores · 42% utilised" },
  { label: "GPU", used: 67, detail: "NVIDIA A10 · 67% utilised" },
  { label: "Memory", used: 58, detail: "37.1 / 64 GB" },
  { label: "Storage", used: 31, detail: "620 GB / 2 TB" },
];

export const QUEUE = {
  pending: 0,
  running: 1,
  completedToday: 1284,
};

/* ============================================================
   Dashboard overview (composite — maps to GET /dashboard)
   ============================================================ */
import type { DashboardOverview } from "@/types";

export const DASHBOARD_OVERVIEW: DashboardOverview = {
  engine: { status: "online", model: "v2.4.1" },
  stats: [
    { label: "Total Analyses", value: "1,248", delta: "18.6% this month", trend: "up", icon: "activity" },
    { label: "Datasets Used", value: "24", delta: "3 new this month", trend: "up", icon: "database" },
    { label: "Accuracy (Avg.)", value: "94.7%", delta: "2.3% vs last month", trend: "up", icon: "target" },
    { label: "Inference Time (Avg.)", value: "78ms", delta: "15ms vs last month", trend: "down", icon: "bolt" },
    { label: "Active Models", value: "6", delta: "All systems operational", trend: "ok", icon: "check" },
  ],
  confidenceSeries: [
    { label: "Seizure Detection", color: "var(--color-neural-blue)", data: [62, 70, 66, 74, 71, 78, 73, 80, 76, 82, 79, 85] },
    { label: "Emotion Recognition", color: "var(--color-electric-cyan)", data: [48, 54, 50, 58, 55, 60, 57, 63, 59, 66, 62, 68] },
    { label: "Cognitive State", color: "var(--color-signal-violet)", data: [30, 36, 33, 40, 37, 44, 41, 47, 43, 50, 46, 52] },
  ],
  multiTask: [
    { icon: "brain", label: "Seizure Detection", state: "Low Risk", value: 12, tone: "success", position: "top" },
    { icon: "emotion", label: "Emotion Recognition", state: "Calm", value: 72, tone: "info", position: "left" },
    { icon: "cognition", label: "Cognitive State", state: "Focused", value: 81, tone: "violet", position: "right" },
  ],
  recentAnalyses: [
    { id: "AN-2024-1250", subject: "SUB-042", status: "Completed", time: "2 mins ago" },
    { id: "AN-2024-1249", subject: "SUB-017", status: "Completed", time: "15 mins ago" },
    { id: "AN-2024-1248", subject: "SUB-033", status: "Processing", time: "26 mins ago" },
    { id: "AN-2024-1247", subject: "SUB-008", status: "Completed", time: "1 hour ago" },
    { id: "AN-2024-1246", subject: "SUB-021", status: "Failed", time: "2 hours ago" },
  ],
  datasetDistribution: [
    { label: "TUH EEG", value: 35, color: "#2563eb" },
    { label: "CHB-MIT", value: 20, color: "#06b6d4" },
    { label: "DEAP", value: 15, color: "#7c3aed" },
    { label: "SEED", value: 15, color: "#8b5cf6" },
    { label: "DREAMER", value: 10, color: "#22d3ee" },
    { label: "Others", value: 5, color: "#cbd5e1" },
  ],
  datasetTotal: 24,
  systemStatus: [
    { name: "Data Pipeline", status: "Operational" },
    { name: "SNN Inference Engine", status: "Operational" },
    { name: "Storage Service", status: "Operational" },
    { name: "API Gateway", status: "Operational" },
  ],
  gpu: { usagePct: 34, spark: [28, 32, 30, 36, 33, 40, 35, 42, 38, 34, 37, 31, 35, 33] },
  eegChannels: ["Fz", "Cz", "Pz", "Oz", "Fp1", "Fp2", "T7", "T8"],
};

/* ============================================================
   Analytics overview (maps to GET /analytics)
   ============================================================ */
import type { AnalyticsOverview } from "@/types";

export const ANALYTICS_OVERVIEW: AnalyticsOverview = {
  stats: [
    { label: "Total Analyses", value: "1,248", delta: "18.6% vs last month", trend: "up", icon: "activity", spark: [4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11], color: "var(--color-signal-violet)" },
    { label: "Total Predictions", value: "24,532", delta: "21.4% vs last month", trend: "up", icon: "insight", spark: [5, 7, 6, 8, 9, 8, 10, 9, 11, 10, 12, 13], color: "var(--color-electric-cyan)" },
    { label: "Average Accuracy", value: "94.7%", delta: "2.3% vs last month", trend: "up", icon: "target", spark: [88, 89, 90, 91, 90, 92, 93, 92, 94, 93, 94, 95], color: "var(--color-neural-blue)" },
    { label: "Avg. Inference Time", value: "78ms", delta: "15ms vs last month", trend: "down", icon: "bolt", spark: [95, 92, 90, 88, 85, 86, 83, 81, 80, 79, 78, 78], color: "var(--color-signal-violet)" },
    { label: "Active Models", value: "6", delta: "All systems operational", trend: "ok", icon: "check" },
  ],
  trend: {
    analyses: [600, 720, 680, 820, 900, 850, 980, 1040, 990, 1120, 1080, 1180, 1240, 1248],
    predictions: [820, 980, 920, 1100, 1240, 1180, 1320, 1420, 1360, 1520, 1460, 1600, 1680, 1720],
    dates: ["May 6", "May 10", "May 14", "May 18", "May 22", "May 25", "May 30", "Jun 3"],
    summary: [
      { icon: "activity", value: "1,248", label: "Total Analyses" },
      { icon: "insight", value: "24,532", label: "Total Predictions" },
      { icon: "target", value: "94.7%", label: "Avg. Accuracy" },
      { icon: "bolt", value: "78ms", label: "Avg. Inference" },
      { icon: "check", value: "98.9%", label: "Uptime" },
    ],
  },
  taskPerformance: [
    { task: "Seizure Detection", acc: "96.2%", total: "8,452", color: "#2563eb", spark: [90, 92, 91, 94, 93, 95, 96] },
    { task: "Emotion Recognition", acc: "93.1%", total: "6,783", color: "#06b6d4", spark: [88, 90, 89, 91, 92, 91, 93] },
    { task: "Cognitive State", acc: "92.4%", total: "5,921", color: "#7c3aed", spark: [86, 88, 90, 89, 91, 92, 92] },
    { task: "Sleep Stage Classification", acc: "95.3%", total: "3,876", color: "#8b5cf6", spark: [91, 92, 94, 93, 95, 94, 95] },
    { task: "Anomaly Detection", acc: "91.7%", total: "2,345", color: "#10b981", spark: [85, 87, 86, 89, 88, 90, 91] },
    { task: "Other Tasks", acc: "89.6%", total: "1,155", color: "#64748b", spark: [82, 84, 83, 86, 87, 88, 89] },
  ],
  dataVolume: {
    slices: [
      { label: "EEG Recordings", value: 112, detail: "112 GB", color: "#2563eb" },
      { label: "Processed Data", value: 69, detail: "69 GB", color: "#06b6d4" },
      { label: "Model Outputs", value: 40, detail: "40 GB", color: "#7c3aed" },
      { label: "Reports", value: 28, detail: "28 GB", color: "#8b5cf6" },
    ],
    centerValue: "248",
    centerLabel: "GB Total",
    deltaLabel: "↑ 18.2% vs last month",
  },
  modelAccuracy: [
    { label: "NeuroNet v3", color: "var(--color-neural-blue)", data: [88, 90, 89, 91, 92, 91, 93, 92, 94, 93, 95, 94] },
    { label: "CHB-MIT Model", color: "var(--color-electric-cyan)", data: [82, 84, 83, 85, 86, 85, 87, 86, 88, 87, 89, 88] },
    { label: "DeepEEG", color: "var(--color-signal-violet)", data: [78, 80, 79, 81, 82, 81, 83, 82, 84, 83, 85, 84] },
    { label: "TransformerXL", color: "#6366f1", data: [72, 74, 73, 75, 76, 75, 77, 76, 78, 77, 79, 78] },
  ],
  predictionDistribution: {
    slices: [
      { label: "Normal", value: 12452, detail: "12,452", color: "#2563eb" },
      { label: "Abnormal", value: 6783, detail: "6,783", color: "#06b6d4" },
      { label: "Uncertain", value: 3921, detail: "3,921", color: "#7c3aed" },
      { label: "Other", value: 1376, detail: "1,376", color: "#cbd5e1" },
    ],
    centerValue: "24,532",
    centerLabel: "Total",
  },
  inferenceBuckets: [
    { label: "0-20", value: 2100 },
    { label: "20-40", value: 4200 },
    { label: "40-60", value: 6800 },
    { label: "60-80", value: 7842 },
    { label: "80-100", value: 5200 },
    { label: "100-150", value: 2600 },
    { label: "150+", value: 900 },
  ],
  inferenceStats: { average: "78ms", median: "45ms", min: "12ms", max: "235ms" },
  topSubjects: [
    { id: "SUB-042", analyses: 28, predictions: "1,246", accuracy: "96.3%" },
    { id: "SUB-017", analyses: 24, predictions: "1,102", accuracy: "95.3%" },
    { id: "SUB-033", analyses: 22, predictions: "987", accuracy: "94.6%" },
    { id: "SUB-008", analyses: 20, predictions: "876", accuracy: "93.8%" },
    { id: "SUB-021", analyses: 18, predictions: "765", accuracy: "92.4%" },
  ],
  utilization: [
    { value: 34, caption: "of 16 Cores", color: "var(--color-neural-blue)" },
    { value: 62, caption: "of 2 GPUs", color: "var(--color-electric-cyan)" },
    { value: 48, caption: "of 64 GB", color: "var(--color-signal-violet)" },
    { value: 58, caption: "of 2 TB", color: "#6366f1" },
  ],
  systemUptime: { value: "98.9%", spark: [98.6, 98.8, 98.7, 99.0, 98.9, 99.1, 98.9, 99.0, 98.8, 98.9] },
  errors: { value: "3", spark: [2, 4, 1, 3, 5, 2, 6, 3, 1, 4, 2, 3] },
};
