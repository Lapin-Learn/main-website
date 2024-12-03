import { FetchingData } from "@/lib/types";
import { StreakHistory } from "@/lib/types/gamification";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

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
