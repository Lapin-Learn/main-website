import { Trans, useTranslation } from "react-i18next";

import StreakIcon from "@/assets/icons/streak";
import RankIcon from "@/components/molecules/rank-icon";
import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { Separator } from "@/components/ui";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import { EnumRank } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";

type GamificationProps = {
  data: ReturnType<typeof useGetGamificationProfile>["data"];
};

export const GamificationStats = ({ data }: GamificationProps) => {
  const { t } = useTranslation(["tooltip", "gamification"]);
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
      <TooltipWrapper
        triggerNode={
          <div className="flex flex-col items-center gap-2 hover:opacity-80">
            <p className="text-xs text-neutral-300">{t("level.label", { ns: "gamification" })}</p>
            <p className="font-semibold">{formatNumber(data.levelId)}</p>
          </div>
        }
        contentNode={
          <span>
            <Trans i18nKey="tooltip:gamification.level" components={{ bold: <strong /> }} />
          </span>
        }
        className="flex max-w-80 flex-col gap-1 bg-neutral-300"
      />
      <Separator orientation="vertical" className="flex h-full min-h-10" />
      <TooltipWrapper
        triggerNode={
          <div className="flex flex-col items-center gap-2 hover:opacity-80">
            <p className="text-xs text-neutral-300">{t("streak.record", { ns: "gamification" })}</p>
            <div className="flex items-center gap-1">
              <p className="font-semibold">{formatNumber(data.streak.current)}</p>
              <StreakIcon className="size-6" />
            </div>
          </div>
        }
        contentNode={<Trans i18nKey="tooltip:gamification.streak_record" />}
        className="flex max-w-80 flex-col gap-1 bg-neutral-300"
      />
      <Separator orientation="vertical" className="flex h-full min-h-10" />
      <TooltipWrapper
        triggerNode={
          <div className="flex flex-col items-center gap-2 hover:opacity-80">
            <p className="text-xs text-neutral-300">
              {t("rank.current_rank", { ns: "gamification" })}
            </p>
            <div className="flex items-center gap-1">
              <p className="font-semibold">
                {t(rankTranslations[data.rank] || "", { ns: "gamification" })}
              </p>
              <RankIcon name={data.rank} className="size-6" />
            </div>
          </div>
        }
        contentNode={
          <>
            <span>
              <Trans
                i18nKey={"tooltip:gamification.rank.description"}
                components={{ bold: <strong /> }}
              />
            </span>
            <ul className="list-disc pl-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <li key={index} className="pb-1">
                  {t(`gamification.rank.ranks.${index}.value`, { ns: "tooltip" })}
                </li>
              ))}
            </ul>
          </>
        }
        className="flex max-w-80 flex-col gap-1 bg-neutral-300"
      />
    </div>
  );
};
