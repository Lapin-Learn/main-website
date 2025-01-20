import { EnumMissionCategory } from "@/lib/enums";

export type Mission = {
  interval: "daily" | "monthly";
  name: string;
  description: string;
  rewards: number;
  current: number;
  quantity: number;
  requirements: number;
  category: EnumMissionCategory;
};

export type MissionProps = Mission;

export type MissionSectionProps = {
  title?: string;
  timeRemaining?: number;
  type: "daily_mission" | "monthly_mission";
  missions: Mission[];
};
