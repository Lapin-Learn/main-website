import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { useGetGamificationProfile, useMissions } from "@/hooks/react-query/useGamification";
import useCountdown from "@/hooks/use-countdown";

import GlobalMissionDialog from "../organisms/global-mission-dialog";
import { LatestTestSection } from "../organisms/latest-test-section";
import { MissionSection } from "../organisms/mission-section";
import { StreakSection } from "../organisms/streak";
import TrackBar from "../organisms/track-bar";

type DashboardLayoutProps = {
  banner?: ReactNode;
  children: ReactNode;
};

export default function DashboardLayout({ banner, children }: DashboardLayoutProps) {
  const { data: gamificationProfile } = useGetGamificationProfile();

  return (
    <div className="flex flex-col-reverse px-4 md:grid md:grid-cols-12 md:gap-6 md:px-8">
      <div className="col-span-8 flex h-screen w-full flex-col justify-start gap-9 pt-8">
        {banner}
        {children}
      </div>
      <div className="col-span-4 flex flex-col gap-6 pt-4 md:sticky md:top-8 md:pt-8">
        <TrackBar data={gamificationProfile} />
        <StreakSection />
        <LatestTestSection />
        <MissionLayout />
        <GlobalMissionDialog />
      </div>
    </div>
  );
}

export const MissionLayout = ({ border = false }: { border?: boolean }) => {
  const { t } = useTranslation("practice");

  const { data: missionData, isFetching: isFetchingMissionData } = useMissions();

  const monthIndex = new Date().getMonth();
  const NewDate = new Date().setHours(24, 0, 0, 0);
  const NewMonth = new Date().setMonth(monthIndex + 1, 0);

  const remainingDailyTime = useCountdown(NewDate);
  const remainingMonthlyTime = useCountdown(NewMonth);

  const dailyMissions = missionData?.filter((item) => item.interval === "daily") || [];
  const monthlyMissions = missionData?.filter((item) => item.interval === "monthly") || [];

  if (isFetchingMissionData) return null;
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {dailyMissions?.length > 0 && (
        <MissionSection
          title={t("mission.types.daily")}
          type="daily_mission"
          timeRemaining={remainingDailyTime.timeLeft}
          missions={dailyMissions}
          className={border ? "border" : ""}
        />
      )}
      {monthlyMissions?.length > 0 && (
        <MissionSection
          title={t("mission.types.monthly")}
          type="monthly_mission"
          timeRemaining={remainingMonthlyTime.timeLeft}
          missions={monthlyMissions}
          className={border ? "border" : ""}
        />
      )}
    </div>
  );
};
