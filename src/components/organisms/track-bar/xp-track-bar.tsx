import { Trans, useTranslation } from "react-i18next";

import RankIcon from "@/components/molecules/rank-icon";
import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { EnumRank } from "@/lib/enums";
import { cn, formatNumber } from "@/lib/utils";

type XpTrackBarProps = {
  level?: number;
  currentXp?: number;
  levelXp?: number;
  rank?: EnumRank;
  className?: string;
};

const XpTrackBar = ({
  level = 1,
  currentXp = 0,
  levelXp = 100,
  rank = EnumRank.bronze,
  className,
}: XpTrackBarProps) => {
  const { t } = useTranslation("tooltip");

  return (
    <div
      className={cn(
        "flex flex-row justify-center items-center overflow-hidden space-x-2",
        className
      )}
    >
      <TooltipWrapper
        triggerNode={
          <div className="size-fit cursor-pointer">
            <RankIcon name={rank} className="size-5 shrink-0 hover:opacity-80" />
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
        className="col-span-1"
        asChild
      />
      <TooltipWrapper
        triggerNode={
          <div className="w-28 cursor-pointer hover:opacity-80 md:w-40">
            <div className="flex items-center justify-between text-nowrap">
              <span className="text-sm font-semibold text-blue-700 md:text-base">Lv. {level}</span>
              <span className="flex text-xs text-blue-700 md:hidden xl:flex">
                {formatNumber(currentXp)}/{formatNumber(levelXp)}
              </span>
            </div>
            <div className="mt-0.5 flex h-1.5 w-full rounded-full bg-neutral-50 sm:hidden md:flex">
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
        className="col-span-3"
        asChild
      />
    </div>
  );
};

export default XpTrackBar;
