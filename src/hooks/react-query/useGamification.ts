import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getGamificationProfile,
  getMissions,
  getStreak,
  receiveMissionReward,
} from "@/services/gamification";

export const gamificationKeys = {
  gamificationProfile: ["gamificationProfile"] as const,
  streak: () => [...gamificationKeys.gamificationProfile, "streak"] as const,
  missions: () => [...gamificationKeys.gamificationProfile, "missions"] as const,
};

export const useGetGamificationProfile = () => {
  return useQuery({
    queryKey: gamificationKeys.gamificationProfile,
    queryFn: getGamificationProfile,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
};

export const useGetStreakHistory = ({ startDate }: { startDate?: string }) => {
  return useQuery({
    queryKey: [...gamificationKeys.streak(), startDate ?? ""],
    queryFn: () => getStreak(startDate ?? ""),
    staleTime: Infinity,
    retry: 3,
  });
};

export const useMissions = () => {
  return useQuery({
    queryKey: gamificationKeys.missions(),
    queryFn: getMissions,
    staleTime: Infinity,
  });
};

export const useReceiveMissionReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: receiveMissionReward,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: gamificationKeys.missions(),
      });
      queryClient.invalidateQueries({
        queryKey: gamificationKeys.gamificationProfile,
        exact: true,
      });
    },
  });
};
