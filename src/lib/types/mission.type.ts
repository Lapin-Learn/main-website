import { EnumMissionCategory, EnumMissionStatus } from "@/lib/enums";

export type Mission = {
  interval: QuestType;
  rewards: number;
  current: number;
  quantity: number;
  requirements: number;
  category: EnumMissionCategory;
  status: EnumMissionStatus;
  missionId: string;
  questId: string;
};

export type QuestType = "daily" | "monthly";

export type Quest = {
  id: string;
  requirements: number;
  quantity: number;
  rewards: number;
  type: QuestType;
  category: EnumMissionCategory;
};
