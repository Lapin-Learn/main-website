import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { EnumSkill } from "@/lib/enums";

import TestSkillCard from "../mocules/simulated-test/test-skill-card";
import { Button, Separator } from "../ui";

export default function SimulatedTestCard() {
  const { t } = useTranslation("collection");
  return (
    <div className="flex flex-row items-center gap-4 rounded-2xl border bg-white p-5">
      <div className="flex max-w-40 flex-col gap-4">
        <p className="truncate text-lg font-bold">Road to IELTS - Test 1</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-200">Band</span>
              <span className="text-sm font-semibold">--</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-200">{t("timeSpent")}</span>
              <span className="text-sm font-semibold">44:11</span>
            </div>
          </div>
          <Button className="w-fit gap-2 px-0 text-primary hover:bg-transparent" variant="ghost">
            {t("viewHistory")}
            <ArrowRight size="16" />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap gap-4 xl:flex-nowrap">
        {Object.keys(EnumSkill)
          .filter((key) => key !== "allSkills")
          .map((skill) => (
            <TestSkillCard skill={skill} />
          ))}
      </div>
    </div>
  );
}
