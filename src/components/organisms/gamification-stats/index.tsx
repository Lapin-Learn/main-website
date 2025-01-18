import i18next from "i18next";
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

function convertRankName(rank: EnumRank) {
  const { t } = i18next;
  switch (rank) {
    case EnumRank.bronze:
      return t("rank.bronze", { ns: "gamification" });
    case EnumRank.silver:
      return t("rank.silver", { ns: "gamification" });
    case EnumRank.gold:
      return t("rank.gold", { ns: "gamification" });
    case EnumRank.platinum:
      return t("rank.platinum", { ns: "gamification" });
    case EnumRank.diamond:
      return t("rank.diamond", { ns: "gamification" });
    case EnumRank.master:
      return t("rank.master", { ns: "gamification" });
    default:
      return "";
  }
}

export const GamificationStats = ({ data }: GamificationProps) => {
  const { t } = useTranslation("gamification");
  if (!data) return null;

  return (
    <div className="flex items-center gap-4">
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
          <p className="font-semibold">{convertRankName(data.rank)}</p>
          <RankIcon name={data.rank} className="size-6" />
        </div>
      </div>
    </div>
  );
};
