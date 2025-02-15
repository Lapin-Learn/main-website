import { useLocation, useNavigate } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";

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

  if (!data) return null;

  const handleNavigateToShop = () => {
    if (location.pathname !== "/shop") {
      navigate({ to: "/shop" });
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-around gap-2 rounded-2xl bg-white p-4">
      <TooltipWrapper
        triggerNode={
          <button onClick={() => {}}>
            <Streak className="hover:opacity-80" streak={data.streak} />
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
              carrots={data.carrots}
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
        level={data.level.id}
        currentXp={data.xp}
        levelXp={data.level.xp}
        rank={data.rank}
      />
    </div>
  );
};

export default TrackBar;
