import { Trans, useTranslation } from "react-i18next";

import RankIcon from "@/components/molecules/rank-icon";
import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { EnumRank } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";

type XpTrackBarProps = {
  level?: number;
  currentXp?: number;
  levelXp?: number;
  rank?: EnumRank;
};

const XpTrackBar = ({
  level = 1,
  currentXp = 0,
  levelXp = 100,
  rank = EnumRank.bronze,
}: XpTrackBarProps) => {
  const { t } = useTranslation("tooltip");

  return (
    <div className="flex items-center gap-2">
      <TooltipWrapper
        triggerNode={
          <div className="cursor-pointer">
            <RankIcon name={rank} className="size-5 md:size-6" />
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
                  {t(`gamification.rank.ranks.${index}.value`)}
                </li>
              ))}
            </ul>
          </>
        }
        className="flex max-w-80 flex-col gap-1 bg-neutral-300"
        asChild
      />
      <TooltipWrapper
        triggerNode={
          <div className="w-28 cursor-pointer md:w-40">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-700 md:text-base">Lv. {level}</span>
              <span className="text-xs text-blue-700">
                {formatNumber(currentXp)}/{formatNumber(levelXp)}
              </span>
            </div>
            <div className="mt-0.5 h-1.5 w-full rounded-full bg-neutral-50">
              <div
                className="h-1.5 rounded-full bg-blue-400"
                style={{ width: `${currentXp > levelXp ? 100 : (currentXp / levelXp) * 100}%` }}
              />
            </div>
          </div>
        }
        contentNode={
          <span>
            <Trans i18nKey="tooltip:gamification.level" components={{ bold: <strong /> }} />
          </span>
        }
        className="max-w-80 bg-neutral-300"
        asChild
      />
    </div>
  );
};

export default XpTrackBar;
