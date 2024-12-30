import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { MAPPED_SKILL_ICON } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";

type TestSkillCardProps = {
  skill: EnumSkill;
  isComingSoon: boolean;
  onClick?: () => void;
};
export default function TestSkillCard({ skill, isComingSoon, onClick }: TestSkillCardProps) {
  const { t } = useTranslation("collection");

  return (
    <button
      key={skill}
      className="flex h-28 w-full flex-row items-center justify-between rounded-lg border border-neutral-100 p-3"
      disabled={isComingSoon}
      onClick={onClick}
    >
      <div className="flex flex-col items-start gap-2">
        <span className="text-base font-semibold capitalize">{skill}</span>
        <div className="flex flex-col items-start">
          <div className="text-start text-xs text-supporting-text">
            {!isComingSoon ? `${t("correctAnswer")}:` : `${t("comingSoon")}...`}
          </div>
          {!isComingSoon && <div className="font-semibold">--/40</div>}
        </div>
      </div>
      <AnimatedCircularProgressBar value={0} icon={MAPPED_SKILL_ICON[skill as EnumSkill]} />
    </button>
  );
}
