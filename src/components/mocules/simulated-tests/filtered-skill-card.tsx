import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import useSelectModeDialog from "@/components/organisms/select-mode-dialog/use-select-mode-dialog";
import { Button } from "@/components/ui";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTestSimple } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import { skillIconMap } from "./utils";

type FilteredSkillCardProps = {
  test: SimulatedTestSimple;
  skill: EnumSkill;
  isSupport: boolean;
};

export function FilteredSkillCard({ test, skill, isSupport }: FilteredSkillCardProps) {
  const { t } = useTranslation("collection");
  const { setData, setOpen } = useSelectModeDialog();

  return (
    <button
      className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-3 md:p-5"
      onClick={() => {
        if (isSupport) {
          setData({ skill, test });
          setOpen(true);
        }
      }}
    >
      <p className="w-full truncate text-start text-lg font-bold">{test.testName}</p>
      <div className={cn(`flex w-full flex-row justify-between ${!isSupport && "items-center"}`)}>
        <div className="flex max-w-64 flex-col gap-4">
          <div className="flex flex-col gap-2">
            {isSupport ? (
              <>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col items-start">
                    <div className="text-sm text-neutral-200">
                      {t("correctAnswer")}:{" "}
                      <span className="text-sm font-semibold text-neutral-950">--/40</span>
                    </div>
                    <div className="text-sm text-neutral-200">
                      {t("timeSpent")}:{" "}
                      <span className="text-sm font-semibold text-neutral-950">44:11</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-fit gap-2 px-0 text-primary hover:bg-transparent hover:text-primary-700"
                  variant="ghost"
                >
                  {t("viewHistory")}
                  <ArrowRight size="16" />
                </Button>
              </>
            ) : (
              <div className="text-start text-sm text-neutral-200">{t("comingSoon")}...</div>
            )}
          </div>
        </div>
        <AnimatedCircularProgressBar value={0} icon={skillIconMap[skill]} />
      </div>
    </button>
  );
}

export function SkeletonFilteredSkillCard() {
  return (
    <div className="flex h-40 animate-pulse flex-row justify-between gap-4 rounded-2xl border bg-white p-3 md:p-5">
      <div className="flex max-w-64 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="h-7 bg-neutral-50" />
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start">
              <div className="text-sm text-neutral-200">
                <div className="inline-block h-5 w-10 rounded bg-neutral-50" />
                <div className="inline-block h-5 w-8 rounded bg-neutral-50" />
              </div>
              <div className="text-sm text-neutral-200">
                <div className="inline-block h-5 w-10 rounded bg-neutral-50" />
                <div className="inline-block h-5 w-8 rounded bg-neutral-50" />
              </div>
            </div>
          </div>
          <div className="size-fit h-5 w-28 gap-2 bg-neutral-50 p-0" />
        </div>
      </div>
      <div className="size-12 bg-neutral-50" />
    </div>
  );
}
