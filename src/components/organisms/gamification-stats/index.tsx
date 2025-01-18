import { useTranslation } from "react-i18next";

import StreakIcon from "@/assets/icons/streak";
import RankIcon from "@/components/molecules/rank-icon";
import { Separator } from "@/components/ui";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import { EnumRank } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";

type GamificationProps = {
  data: ReturnType<typeof useGetGamificationProfile>["data"];
};

export const GamificationStats = ({ data }: GamificationProps) => {
  const { t } = useTranslation("gamification");
  if (!data) return null;

  const rankTranslations = {
    [EnumRank.bronze]: "rank.bronze",
    [EnumRank.silver]: "rank.silver",
    [EnumRank.gold]: "rank.gold",
    [EnumRank.platinum]: "rank.platinum",
    [EnumRank.diamond]: "rank.diamond",
    [EnumRank.master]: "rank.master",
  };

  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-neutral-300">{t("level.label")}</p>
        <p className="font-semibold">{formatNumber(data.levelId)}</p>
      </div>
      <Separator orientation="vertical" className="flex h-full min-h-10" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-neutral-300">{t("streak.record")}</p>
        <div className="flex items-center gap-1">
          <p className="font-semibold">{formatNumber(data.streak.current)}</p>
          <StreakIcon className="size-6" />
        </div>
      </div>
      <Separator orientation="vertical" className="flex h-full min-h-10" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-neutral-300">{t("rank.current_rank")}</p>
        <div className="flex items-center gap-1">
          <p className="font-semibold">{t(rankTranslations[data.rank] || "")}</p>
          <RankIcon name={data.rank} className="size-6" />
        </div>
      </div>
    </div>
  );
};
