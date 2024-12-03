import { useQuery } from "@tanstack/react-query";

import { getStreak } from "@/services/gamification";

const KEYS = {
  streak: "streak",
};

export const useGetStreakHistory = ({ startDate }: { startDate?: string }) => {
  return useQuery({
    queryKey: [KEYS.streak, startDate ?? ""],
    queryFn: () => getStreak(startDate ?? ""),
    staleTime: Infinity,
    retry: 3,
  });
};
