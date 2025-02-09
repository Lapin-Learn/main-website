import { EnumMissionCategory } from "@/lib/enums";
import { FetchingData } from "@/lib/types";
import { GamificationProfile, StreakHistory } from "@/lib/types/gamification.type";
import { Mission } from "@/lib/types/mission.type";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export const getGamificationProfile = async () => {
  return (await api.get("users/profile/gamification").json<FetchingData<GamificationProfile>>())
    .data;
};

export const getStreak = async (startDate: string) => {
  const searchParams = generateSearchParams({ start: startDate });
  return (
    await api
      .get(`streaks`, {
        searchParams,
      })
      .json<FetchingData<StreakHistory[]>>()
  ).data;
};

export const parseMission = (mission: Mission) => {
  switch (mission.category) {
    case EnumMissionCategory.TOTAL_DURATION_OF_LEARN_DAILY_LESSON:
      return {
        ...mission,
        current: Math.round(mission.current / 60),
        quantity: Math.round(mission.quantity / 60),
      };
    default:
      return mission;
  }
};

export const getMissions = async () => {
  const rawMissions = (await api.get("missions").json<FetchingData<Mission[]>>()).data;
  return rawMissions.map(parseMission);
};

export const receiveMissionReward = async () => {
  return await api.post("missions/receive").json();
};
