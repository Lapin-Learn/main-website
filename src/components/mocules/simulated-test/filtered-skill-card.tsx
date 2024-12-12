import { useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { Button } from "@/components/ui";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTestSimple } from "@/lib/types/simulated-test.type";

import { skillIconMap } from "./utils";

type FilteredSkillCardProps = {
  onClick?: (skill: EnumSkill, test: SimulatedTestSimple) => void;
};

export default function FilteredSkillCard({ onClick }: FilteredSkillCardProps) {
  const { t } = useTranslation("collection");
  const location = useLocation();
  const skill = location.search.skill as EnumSkill;
  const test: SimulatedTestSimple = {
    id: 1,
    collectionId: 1,
    order: "1",
    testName: "Road to IELTS - Test 1",
  };

  return (
    <button
      className="flex flex-row gap-4 rounded-2xl border bg-white p-3 md:p-5"
      onClick={() => {
        if (onClick) onClick(skill, test);
      }}
    >
      <div className="flex max-w-64 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="truncate text-lg font-bold">
            {test.testName} - <span className="capitalize">{location.search.skill}</span>
          </p>
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
        </div>
      </div>
      <AnimatedCircularProgressBar value={0} icon={skillIconMap[skill]} />
    </button>
  );
}
