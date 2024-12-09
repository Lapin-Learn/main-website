import { useQuery } from "@tanstack/react-query";

import { getGamificationProfile, getStreak } from "@/services/gamification";

const KEYS = {
  gamificationProfile: ["gamificationProfile"] as const,
  streak: "streak",
};

export const useGetGamificationProfile = () => {
  return useQuery({
    queryKey: KEYS.gamificationProfile,
    queryFn: getGamificationProfile,
    staleTime: Infinity,
  });
};

export const useGetStreakHistory = ({ startDate }: { startDate?: string }) => {
  return useQuery({
    queryKey: [KEYS.streak, startDate ?? ""],
    queryFn: () => getStreak(startDate ?? ""),
    staleTime: Infinity,
    retry: 3,
  });
};
