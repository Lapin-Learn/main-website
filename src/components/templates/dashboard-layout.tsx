import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { useGetGamificationProfile, useMissions } from "@/hooks/react-query/useGamification";
import useCountdown from "@/hooks/use-countdown";

import { MissionSection } from "../organisms/mission-section";
import { StreakSection } from "../organisms/streak";
import TrackBar from "../organisms/track-bar";

type DashboardLayoutProps = {
  heroImage: string;
  children: ReactNode;
};

export default function DashboardLayout({ heroImage, children }: DashboardLayoutProps) {
  const { t } = useTranslation("practice");

  const { data: missionData, isFetching: isFetchingMissionData } = useMissions();
  const { data: gamificationProfile, isFetching: isFetchingGamificationProfileData } =
    useGetGamificationProfile();

  const monthIndex = new Date().getMonth();
  const NewDate = new Date().setHours(24, 0, 0, 0);
  const NewMonth = new Date().setMonth(monthIndex + 1, 0);

  const remainingDailyTime = useCountdown(NewDate);
  const remainingMonthlyTime = useCountdown(NewMonth);

  const dailyMissions = missionData?.filter((item) => item.interval === "daily") || [];
  const monthlyMissions = missionData?.filter((item) => item.interval === "monthly") || [];

  if (isFetchingMissionData) {
    return <div className="size-screen grid place-items-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col-reverse px-8 md:grid md:grid-cols-12 md:gap-6">
      <div className="col-span-8 flex h-screen w-full flex-col justify-start gap-9 pt-8">
        <img src={heroImage} alt="hero" className="rounded-2xl object-cover" />
        {children}
      </div>
      <div className="col-span-4 flex flex-col gap-6 pt-8 md:sticky md:top-8">
        {isFetchingGamificationProfileData ? (
          <div className="size-screen grid place-items-center">Loading...</div>
        ) : (
          <TrackBar data={gamificationProfile} />
        )}
        <StreakSection />
        {isFetchingMissionData ? (
          <div className="size-screen grid place-items-center">Loading...</div>
        ) : (
          <>
            {dailyMissions?.length > 0 && (
              <MissionSection
                title={t("mission.types.daily")}
                timeRemaining={remainingDailyTime.timeLeft}
                missions={dailyMissions}
              />
            )}
            {monthlyMissions?.length > 0 && (
              <MissionSection
                title={t("mission.types.monthly")}
                timeRemaining={remainingMonthlyTime.timeLeft}
                missions={monthlyMissions}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
