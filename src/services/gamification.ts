import { EnumMissionCategory } from "@/lib/enums";
import { FetchingData } from "@/lib/types";
import { GamificationProfile, StreakHistory } from "@/lib/types/gamification";
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

const checkMissionEnum = (category: EnumMissionCategory) => {
  return (
    category === EnumMissionCategory.TOTAL_DURATION_OF_LEARN_DAILY_LESSON ||
    category === EnumMissionCategory.COMPLETE_LESSON_WITH_DIFFERENT_SKILLS
  );
};

export const getMissions = async () => {
  try {
    const response = await api.get(`missions`).json<FetchingData<Mission[]>>();
    return response.data.map((mission) => ({
      ...mission,
      current: checkMissionEnum(mission.category) ? Math.min(1, mission.current) : mission.current,
      quantity: checkMissionEnum(mission.category) ? 1 : mission.quantity,
    }));
  } catch (error) {
    console.error("Error fetching question types:", error);
    throw error;
  }
};
