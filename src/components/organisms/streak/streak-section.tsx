import Lottie from "react-lottie";

import flame from "@/assets/lotties/streak-flame.json";
import CustomCalendar from "./custom-calendar";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

const StreakSection = () => {
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

  return (
    <div className="sticky top-8 rounded-2xl bg-[#e2f2ff] p-4">
      <div className="flex flex-row justify-between">
        {data && !isLoading ? (
          <div>
            <h1
              className={cn(
                "mb-2 text-5xl font-bold",
                data.streak.extended ? "text-blue" : "text-[#849EBC]"
              )}
            >
              {data.streak.current}
            </h1>
            <h2
              className={cn(
                "text-xl font-semibold",
                data.streak.extended ? "text-blue" : "text-[#849EBC]"
              )}
            >
              {t("streak.description", { context: String(data.streak.extended) })}
            </h2>
            <p className="mb-6 mt-1 font-medium">
              {t("streak.record", {
                context: String(data.streak.current === data.streak.record),
                record: data.streak.record,
              })}
            </p>
          </div>
        ) : (
          <div>
            <Skeleton className="mb-2 h-12 w-10 bg-blue-200/60" />
            <Skeleton className="h-7 w-60 bg-blue-200/60" />
            <Skeleton className="mb-6 mt-1 h-12 w-40 bg-blue-200/60" />
          </div>
        )}
        <Lottie options={defaultOptions} height={100} width={76} />
      </div>
      <CustomCalendar />
    </div>
  );
};
export default StreakSection;
