import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { EnumSkill } from "@/lib/enums";

import { skillIconMap } from "./utils";

export default function TestSkillCard({ skill }: { skill: string }) {
  const { t } = useTranslation("collection");
  return (
    <div
      key={skill}
      className="flex h-fit w-full flex-row justify-between rounded-lg border border-neutral-100 p-3"
    >
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold capitalize">{skill}</span>
        <div>
          <div className="text-xs text-neutral-100">{t("correctAnswer")}:</div>
          <div className="font-semibold">--/40</div>
        </div>
      </div>
      <AnimatedCircularProgressBar value={0} icon={skillIconMap[skill as EnumSkill]} />
    </div>
  );
}
