import type { SVGProps } from "react";
import {
  BrainIcon,
  EmotionIcon,
  CognitionIcon,
  AnalyticsIcon,
  WaveIcon,
  NeuralIcon,
  ProcessIcon,
  InsightIcon,
  TargetIcon,
  ShieldIcon,
  BoltIcon,
  DatabaseIcon,
  GridIcon,
  UploadIcon,
  DocumentIcon,
  ActivityIcon,
  CpuIcon,
  GearIcon,
  InfoIcon,
  LayersIcon,
  ClockIcon,
  DownloadIcon,
  SearchIcon,
  BellIcon,
  CheckIcon,
  UsersIcon,
  EyeIcon,
} from "./icons";

/** Maps content string keys to icon components used across the app. */
export const ICON_MAP: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  brain: BrainIcon,
  emotion: EmotionIcon,
  cognition: CognitionIcon,
  analytics: AnalyticsIcon,
  wave: WaveIcon,
  neural: NeuralIcon,
  process: ProcessIcon,
  insight: InsightIcon,
  target: TargetIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  database: DatabaseIcon,
  grid: GridIcon,
  upload: UploadIcon,
  document: DocumentIcon,
  activity: ActivityIcon,
  cpu: CpuIcon,
  gear: GearIcon,
  info: InfoIcon,
  layers: LayersIcon,
  clock: ClockIcon,
  download: DownloadIcon,
  search: SearchIcon,
  bell: BellIcon,
  check: CheckIcon,
  users: UsersIcon,
  eye: EyeIcon,
};

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const Cmp = ICON_MAP[name] ?? BrainIcon;
  return <Cmp {...props} />;
}
