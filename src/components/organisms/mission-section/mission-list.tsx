import { CheckCircle } from "lucide-react";

import CarrotIcon from "@/assets/icons/carrot";
import DailyTestIcon from "@/assets/icons/daily-test";
import { Progress } from "@/components/ui/progress";
import { EnumMissionStatus } from "@/lib/enums";
import { Mission } from "@/lib/types/mission.type";
import { cn, convertMissionNameCategory } from "@/lib/utils";

import { Section } from "./section";

type MissionListProps = {
  data?: Mission[];
  className?: string;
};

export const MissionList = ({ data = [], className }: MissionListProps) => {
  return (
    <div className={cn("flex-flex-col", className)}>
      {data.map((item, index) => {
        const progressValue = item.current / item.quantity;
        const isLastItem = index === data.length - 1;
        return (
          <div
            key={index}
            className={`${item.status == EnumMissionStatus.COMPLETED ? "bg-yellow-100/70" : ""}`}
          >
            <Section.Item className="flex flex-1 items-center justify-between px-2 py-4">
              <div className="flex flex-1 items-center gap-1">
                <DailyTestIcon className="size-9" />
                <Section.Title
                  label={convertMissionNameCategory(item)}
                  textClassName="text-sm font-medium"
                  className="flex flex-1 flex-col justify-start gap-1"
                >
                  <div className="w-full">
                    <Progress
                      className="h-3"
                      value={progressValue * 100}
                      label={`${item.current}/${item.quantity}`}
                    />
                  </div>
                </Section.Title>
              </div>
              <div className="flex w-14 items-center justify-end gap-1">
                {item.status !== EnumMissionStatus.RECEIVED ? (
                  <>
                    <p className="text-dark text-sm font-medium">+{item.rewards}</p>
                    <CarrotIcon className="size-5" />
                  </>
                ) : (
                  <CheckCircle className="size-5 text-green-500" />
                )}
              </div>
            </Section.Item>
            {!isLastItem && <div className="border-t border-neutral-100" />}
          </div>
        );
      })}
    </div>
  );
};
