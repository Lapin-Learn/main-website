import { Clock, Info } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { Mission } from "@/lib/types/mission.type";
import { cn, formatRemainingToDateTime } from "@/lib/utils";

import { MissionList } from "./mission-list";
import { Section } from "./section";

type MissionSectionProps = {
  title?: string;
  timeRemaining?: number;
  type: "daily_mission" | "monthly_mission";
  missions: Mission[];
  className?: string;
};

export const MissionSection = ({
  title,
  type,
  timeRemaining,
  missions,
  className,
}: MissionSectionProps) => {
  const { t } = useTranslation("practice");

  return (
    <Section className={cn("rounded-2xl bg-white p-4", className)}>
      {title && timeRemaining && (
        <Section.Title
          label={title}
          className="flex items-end"
          textClassName="font-semibold text-body text-dark"
          infoNode={
            <TooltipWrapper
              triggerNode={
                <Info className="size-4 text-blue-600 hover:cursor-pointer" strokeWidth={2} />
              }
              contentNode={
                <span>
                  <Trans
                    i18nKey={`tooltip:gamification.${type}`}
                    components={{ bold: <strong /> }}
                  />
                </span>
              }
              className="flex max-w-80 flex-col gap-1"
              sideOffset={4}
              asChild
            />
          }
        >
          <div className="flex items-center gap-1 text-sm font-medium text-orange-400">
            <Clock size={16} color="#F17D53" />
            {t("mission.time_remaining", { time: formatRemainingToDateTime(timeRemaining) })}
          </div>
        </Section.Title>
      )}
      <Section.Group className="bg-white py-0">
        <MissionList data={missions} />
      </Section.Group>
    </Section>
  );
};
