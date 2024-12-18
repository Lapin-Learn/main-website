import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { EnumSkill } from "@/lib/enums";

import { skillIconMap } from "./utils";

type TestSkillCardProps = {
  skill: EnumSkill;
  isComingSoon: boolean;
};
export default function TestSkillCard({ skill, isComingSoon }: TestSkillCardProps) {
  const { t } = useTranslation("collection");

  return (
    <div
      key={skill}
      className="flex h-28 w-full flex-row justify-between rounded-lg border border-neutral-100 p-3"
    >
      <div className="flex h-full flex-col items-start justify-between gap-2">
        <span className="text-base font-semibold capitalize">{skill}</span>
        <div className="flex flex-col items-start">
          <div className="text-start text-xs text-supporting-text">
            {!isComingSoon ? `${t("correctAnswer")}:` : `${t("comingSoon")}...`}
          </div>
          {!isComingSoon && <div className="font-semibold">--/40</div>}
        </div>
      </div>
      <AnimatedCircularProgressBar value={0} icon={skillIconMap[skill as EnumSkill]} />
    </div>
  );
}
