import { useLocation, useNavigate } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import { EnumRank } from "@/lib/enums";

import Carrots from "./carrots";
import Streak from "./streak";
import XpTrackBar from "./xp-track-bar";

type TrackBarProps = {
  data: ReturnType<typeof useGetGamificationProfile>["data"];
};

const TrackBar = ({ data }: TrackBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("tooltip");

  const handleNavigateToShop = () => {
    if (location.pathname !== "/shop") {
      navigate({ to: "/shop" });
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-around gap-2 rounded-2xl bg-white p-4">
      <TooltipWrapper
        triggerNode={
          <button>
            {data ? (
              <Streak className="hover:opacity-80" streak={data.streak} />
            ) : (
              <Skeleton className="h-4 w-14 rounded-md" />
            )}
          </button>
        }
        contentNode={<Trans i18nKey="tooltip:gamification.streak" />}
        className="flex flex-col gap-1"
        asChild
      />
      <TooltipWrapper
        triggerNode={
          <button onClick={handleNavigateToShop}>
            <Carrots
              className="cursor-pointer hover:opacity-80"
              carrots={data?.carrots ?? 0}
              size="base"
              textStyle="text-orange-400"
            />
          </button>
        }
        contentNode={
          <>
            <Trans i18nKey="tooltip:gamification.carrot.description" />
            <ul className="list-disc pl-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="pb-1">
                  {t(`gamification.carrot.ways.${index}`)}
                </li>
              ))}
            </ul>
          </>
        }
        className="flex flex-col gap-1"
        asChild
      />
      <XpTrackBar
        level={data?.level.id ?? 0}
        currentXp={data?.xp ?? 0}
        levelXp={data?.level.xp ?? 0}
        rank={data?.rank ?? EnumRank.bronze}
      />
    </div>
  );
};

export default TrackBar;
