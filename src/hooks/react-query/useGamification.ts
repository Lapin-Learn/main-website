import { useQuery } from "@tanstack/react-query";

import { getGamificationProfile, getMissions, getStreak } from "@/services/gamification";

export const gamificationKeys = {
  gamificationProfile: ["gamificationProfile"] as const,
  streak: "streak",
  missions: "missions",
};

export const useGetGamificationProfile = () => {
  return useQuery({
    queryKey: gamificationKeys.gamificationProfile,
    queryFn: getGamificationProfile,
    staleTime: Infinity,
  });
};

export const useGetStreakHistory = ({ startDate }: { startDate?: string }) => {
  return useQuery({
    queryKey: [gamificationKeys.streak, startDate ?? ""],
    queryFn: () => getStreak(startDate ?? ""),
    staleTime: Infinity,
    retry: 3,
  });
};
export const useMissions = () => {
  return useQuery({
    queryKey: [gamificationKeys.missions],
    queryFn: getMissions,
    staleTime: Infinity,
  });
};
