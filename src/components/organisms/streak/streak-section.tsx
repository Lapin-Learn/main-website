import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

import flame from "@/assets/lotties/streak-flame.json";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import useBreakPoint from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";

import CustomCalendar from "./custom-calendar";

type StreakSectionProps = {
  collapsible?: boolean;
};
const StreakSection = ({ collapsible = true }: StreakSectionProps) => {
  const { t } = useTranslation("gamification");
  const { data, isLoading } = useGetGamificationProfile();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: flame,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const breakpoint = useBreakPoint();

  return (
    <div className="rounded-lg bg-[#e2f2ff] p-3 md:rounded-2xl md:p-4">
      <div className="flex flex-row justify-between">
        {data && !isLoading ? (
          <div>
            <h1
              className={cn(
                "md:mb-2 text-3xl md:text-4xl font-bold",
                data.streak.extended ? "text-blue" : "text-[#849EBC]"
              )}
            >
              {data.streak.current}
            </h1>
            <h2
              className={cn(
                "text-lg md:text-xl font-semibold",
                data.streak.extended ? "text-blue" : "text-[#849EBC]"
              )}
            >
              {t("streak.description", { context: String(data.streak.extended) })}
            </h2>
            <p className="mb-3 text-sm font-medium md:mb-6 md:mt-1 md:text-base">
              {t("streak.record", {
                context: String(data.streak.current >= data.streak.record),
                record: Math.max(data.streak.record, data.streak.current),
              })}
            </p>
          </div>
        ) : (
          <div>
            <Skeleton className="mb-2 size-10 bg-blue-200/60 md:h-12" />
            <Skeleton className="h-6 w-60 bg-blue-200/60 md:h-7" />
            <Skeleton className="mb-6 mt-1 h-8 w-40 bg-blue-200/60 md:h-12" />
          </div>
        )}
        <Lottie
          options={defaultOptions}
          height={breakpoint !== "sm" ? 100 : 80}
          width={breakpoint !== "sm" ? 76 : 50}
        />
      </div>
      <CustomCalendar collapsible={collapsible} />
    </div>
  );
};
export default StreakSection;
