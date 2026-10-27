/**
 * SynapseX domain types — the shapes the FastAPI backend is expected to
 * return. The frontend only renders these; it never computes them.
 */

export type TaskDomain = "seizure" | "emotion" | "cognition";

export type EngineStatus = "online" | "degraded" | "offline";

export interface SystemStat {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}

export interface AnalysisRecord {
  id: string;
  fileName: string;
  createdAt: string;
  status: "queued" | "processing" | "completed" | "failed";
  durationSec: number;
  topPrediction: string;
  confidence: number; // 0..1
}

export interface ActivityEvent {
  id: string;
  type: "analysis" | "model" | "training" | "system";
  message: string;
  timestamp: string;
}

export interface Prediction {
  domain: TaskDomain;
  label: string;
  confidence: number; // 0..1
  detail: string;
}

export type EegFormat = "EDF" | "BDF" | "CSV" | "MAT" | "NumPy";

export interface PipelineStage {
  key: string;
  label: string;
  status: "pending" | "running" | "done";
}

export interface ChannelImportance {
  channel: string;
  importance: number; // 0..1
}

export interface BrainRegion {
  id: string;
  name: string;
  contribution: number; // 0..1
}

export interface DatasetInfo {
  id: string;
  name: string;
  domain: string;
  subjects: number;
  channels: number;
  samplingRate: number;
  records: string;
  description: string;
}

export interface ModelHead {
  id: string;
  name: string;
  domain: TaskDomain;
  accuracy: number; // 0..1
  f1: number; // 0..1
  params: string;
}

export interface ModelInfo {
  version: string;
  backboneParams: string;
  releasedAt: string;
  heads: ModelHead[];
}

export interface TrainingRun {
  id: string;
  name: string;
  status: "running" | "completed" | "failed";
  epoch: number;
  totalEpochs: number;
  trainLoss: number;
  valLoss: number;
  valAccuracy: number;
}

export interface EpochPoint {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  valAccuracy: number;
}

export interface ReportItem {
  id: string;
  title: string;
  createdAt: string;
  format: "PDF" | "JSON" | "CSV";
  sizeKb: number;
}

export interface ResourceMetric {
  label: string;
  used: number; // 0..100
  detail: string;
}

export interface SeriesPoint {
  x: number | string;
  y: number;
}

/* ============================================================
   Shared presentation contracts (returned by the API, rendered as-is)
   ============================================================ */

export type Trend = "up" | "down" | "flat" | "ok";

/** A KPI stat card. `icon` is a key into the frontend ICON_MAP. */
export interface KpiStat {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  icon: string;
  accent?: boolean;
  spark?: number[];
  color?: string;
}

/** A named numeric series for multi-line charts. */
export interface NamedSeries {
  label: string;
  color: string;
  data: number[];
}

/** A slice for donut / distribution charts. */
export interface DistributionSlice {
  label: string;
  value: number;
  detail?: string;
  color: string;
}

export interface ServiceStatus {
  name: string;
  status: "Operational" | "Degraded" | "Down";
  latency?: string;
}

/* ============================================================
   Dashboard
   ============================================================ */

export interface MultiTaskItem {
  icon: string;
  label: string;
  state: string;
  value: number; // 0..100
  tone: "success" | "info" | "violet";
  position: "top" | "left" | "right";
}

export interface DashboardAnalysisRow {
  id: string;
  subject: string;
  status: "Completed" | "Processing" | "Failed";
  time: string;
}

export interface DashboardOverview {
  engine: { status: EngineStatus; model: string };
  stats: KpiStat[];
  confidenceSeries: NamedSeries[];
  multiTask: MultiTaskItem[];
  recentAnalyses: DashboardAnalysisRow[];
  datasetDistribution: DistributionSlice[];
  datasetTotal: number;
  systemStatus: ServiceStatus[];
  gpu: { usagePct: number; spark: number[] };
  eegChannels: string[];
}

/* ============================================================
   Analytics
   ============================================================ */

export interface TrendSummaryItem {
  icon: string;
  value: string;
  label: string;
}

export interface TaskPerfRow {
  task: string;
  acc: string;
  total: string;
  color: string;
  spark: number[];
}

export interface TopSubjectRow {
  id: string;
  analyses: number;
  predictions: string;
  accuracy: string;
}

export interface Bucket {
  label: string;
  value: number;
}

export interface UtilizationGauge {
  value: number; // 0..100
  caption: string;
  color: string;
}

export interface AnalyticsOverview {
  stats: KpiStat[];
  trend: {
    analyses: number[];
    predictions: number[];
    dates: string[];
    summary: TrendSummaryItem[];
  };
  taskPerformance: TaskPerfRow[];
  dataVolume: { slices: DistributionSlice[]; centerValue: string; centerLabel: string; deltaLabel: string };
  modelAccuracy: NamedSeries[];
  predictionDistribution: { slices: DistributionSlice[]; centerValue: string; centerLabel: string };
  inferenceBuckets: Bucket[];
  inferenceStats: { average: string; median: string; min: string; max: string };
  topSubjects: TopSubjectRow[];
  utilization: UtilizationGauge[];
  systemUptime: { value: string; spark: number[] };
  errors: { value: string; spark: number[] };
}

/* ============================================================
   Datasets (management page)
   ============================================================ */

export interface DatasetRow {
  name: string;
  sub: string;
  access: "Public" | "Private";
  type: string;
  subjects: string;
  recordings: string;
  size: string;
  date: string;
  quality: string;
  status: "Ready" | "Processing" | "Failed";
  color: string;
  icon: string;
}

export interface DatasetActivity {
  id: string;
  name: string;
  action: string;
  by: string;
  time: string;
}

export interface DatasetTag {
  label: string;
  count: number;
  tone: string;
}

export interface DatasetsOverview {
  stats: KpiStat[];
  datasets: DatasetRow[];
  distribution: DistributionSlice[];
  distributionTotal: number;
  quality: { avg: number[]; min: number[]; dates: string[] };
  activity: DatasetActivity[];
  tags: DatasetTag[];
  storage: { usedLabel: string; usedPct: number; totalLabel: string };
}
