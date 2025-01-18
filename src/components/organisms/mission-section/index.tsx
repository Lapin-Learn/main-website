import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

import CarrotIcon from "@/assets/icons/carrot";
import DailyTestIcon from "@/assets/icons/daily-test";
import { Progress } from "@/components/ui/progress";
import { convertMissionNameCategory, formatRemainingToDateTime } from "@/lib/utils";

import { ProfileSection as Section } from "./section";
import { MissionProps, MissionSectionProps } from "./types";

export const MissionSection = ({ title, timeRemaining, missions }: MissionSectionProps) => {
  const { t } = useTranslation("practice");
  return (
    <Section className="rounded-2xl bg-white p-4">
      {title && timeRemaining && (
        <Section.Title
          label={title}
          className="flex items-end"
          textClassName="font-semibold text-body text-dark"
        >
          <div className="flex items-center gap-1 text-sm font-medium text-orange-400">
            <Clock size={16} color="#F17D53" />
            {t("mission.time_remaining", { time: formatRemainingToDateTime(timeRemaining) })}
          </div>
        </Section.Title>
      )}
      <Section.Group className="bg-white py-0">
        <ListMissions data={missions} />
      </Section.Group>
    </Section>
  );
};

export const ListMissions = ({ data = [] }: { data?: MissionProps[] }) => {
  return (
    <>
      {data.map((item, index) => {
        const progressValue = item.current / item.quantity;
        const isLastItem = index === data.length - 1;
        return (
          <div key={index} className={`${progressValue >= 1 ? "bg-yellow-100" : ""}`}>
            <Section.Item className="flex flex-1 items-center justify-between px-2 py-4">
              <div className="flex flex-1 items-center gap-1">
                <DailyTestIcon className="size-10" />
                <Section.Title
                  label={convertMissionNameCategory(item)}
                  textClassName="text-sm font-semibold"
                  className="flex flex-1 flex-col justify-start gap-1"
                >
                  <div className="w-full">
                    <Progress
                      className="h-3"
                      indicatorStyle={{ backgroundColor: "#F17D53" }}
                      value={progressValue * 100}
                      label={`${item.current}/${item.quantity}`}
                    />
                  </div>
                </Section.Title>
              </div>
              <div className="flex w-16 items-center justify-end gap-1">
                <p className="text-dark text-sm font-semibold">+{item.rewards}</p>
                <CarrotIcon className="size-5" />
              </div>
            </Section.Item>
            {!isLastItem && <div className="border-t border-neutral-100" />}
          </div>
        );
      })}
    </>
  );
};
