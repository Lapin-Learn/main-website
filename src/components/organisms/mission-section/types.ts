import { EnumMissionCategory } from "@/lib/enums";

export type IMission = {
  interval: "daily" | "monthly";
  name: string;
  description: string;
  rewards: number;
  current: number;
  quantity: number;
  requirements: number;
  category: EnumMissionCategory;
};

export type MissionProps = IMission;

export type MissionSectionProps = {
  title?: string;
  timeRemaining?: number;
  missions: IMission[];
};
