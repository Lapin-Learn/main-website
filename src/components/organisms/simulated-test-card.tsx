import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { EnumSkill } from "@/lib/enums";

import TestSkillCard from "../mocules/simulated-test/test-skill-card";
import { Button, Separator } from "../ui";

export default function SimulatedTestCard() {
  const { t } = useTranslation("collection");
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="mb-4 truncate text-lg font-bold">IELTS Cambridge 19 - Test 1</p>
      <div className="flex flex-row items-center gap-8">
        <div className="flex max-w-60 flex-col justify-between gap-4">
          <div className="flex flex-row gap-3">
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
          <Button
            className="size-fit gap-2 p-0 text-primary hover:bg-transparent hover:text-primary-700"
            variant="ghost"
          >
            {t("viewHistory")}
            <ArrowRight size="16" />
          </Button>
        </div>
        <div className="flex flex-1 flex-wrap gap-3 xl:flex-nowrap">
          {Object.keys(EnumSkill)
            .filter((key) => key !== "allSkills")
            .map((skill) => (
              <TestSkillCard skill={skill} />
            ))}
        </div>
      </div>
    </div>
  );
}
