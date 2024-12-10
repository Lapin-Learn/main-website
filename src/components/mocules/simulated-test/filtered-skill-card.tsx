import { useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { Button } from "@/components/ui";
import { EnumSkill } from "@/lib/enums";

import { skillIconMap } from "./utils";

export default function FilteredSkillCard() {
  const { t } = useTranslation("collection");
  const location = useLocation();

  return (
    <div className="flex flex-row gap-4 rounded-2xl border bg-white p-5">
      <div className="flex max-w-64 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="truncate text-lg font-bold">
            Road to IELTS - Test 1 - <span className="capitalize">{location.search.skill}</span>
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
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
          <Button className="w-fit gap-2 px-0 text-primary hover:bg-transparent" variant="ghost">
            {t("viewHistory")}
            <ArrowRight size="16" />
          </Button>
        </div>
      </div>
      <AnimatedCircularProgressBar
        value={0}
        icon={skillIconMap[location.search.skill as EnumSkill]}
      />
    </div>
  );
}
