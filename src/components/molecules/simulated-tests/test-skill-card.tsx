import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { MAPPED_SKILL_ICON } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { SkillTest } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

type TestSkillCardProps = {
  isComingSoon: boolean;
  onClick?: () => void;
  numberOfQuestions?: number;
  skillTest?: SkillTest;
};
export default function TestSkillCard({
  isComingSoon,
  onClick,
  numberOfQuestions,
  skillTest,
}: TestSkillCardProps) {
  const { t } = useTranslation("collection");
  return (
    <button
      key={skillTest?.skill}
      className="flex h-28 w-full flex-row items-center justify-between rounded-lg border border-neutral-100 p-3"
      disabled={isComingSoon}
      onClick={onClick}
    >
      <div className="flex flex-col items-start gap-2">
        <span className="text-base font-semibold capitalize">{skillTest?.skill}</span>
        <div className="flex flex-col items-start">
          <div className="text-start text-xs text-supporting-text">
            {isComingSoon
              ? `${t("comingSoon")}...`
              : `${t("correctAnswer", { context: skillTest?.skill })}:`}
          </div>
          {!isComingSoon && (
            <div className="font-semibold">
              {skillTest?.submittedAnswers}/{numberOfQuestions}
            </div>
          )}
        </div>
      </div>
      <AnimatedCircularProgressBar
        max={
          skillTest?.estimatedBandScore ??
          (skillTest?.status === EnumSimulatedTestSessionStatus.IN_PROGRESS ? numberOfQuestions : 0)
        }
        value={
          skillTest?.estimatedBandScore ??
          (skillTest?.status === EnumSimulatedTestSessionStatus.IN_PROGRESS
            ? skillTest.submittedAnswers
            : 0)
        }
        className={cn(
          skillTest?.estimatedBandScore && "rounded-full bg-[#FCE3B4] text-primary-700"
        )}
        icon={MAPPED_SKILL_ICON[skillTest?.skill as EnumSkill]}
      />
    </button>
  );
}
