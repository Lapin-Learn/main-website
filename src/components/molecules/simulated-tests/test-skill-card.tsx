import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import { Button } from "@/components/ui";
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

  const mappingProgress = {
    max:
      skillTest?.estimatedBandScore ??
      (skillTest?.status === EnumSimulatedTestSessionStatus.IN_PROGRESS ? numberOfQuestions : 0),
    value:
      skillTest?.estimatedBandScore ??
      (skillTest?.status === EnumSimulatedTestSessionStatus.IN_PROGRESS
        ? skillTest.submittedAnswers
        : 0),
  };

  const score =
    skillTest?.status === EnumSimulatedTestSessionStatus.IN_PROGRESS ||
    skillTest?.skill === EnumSkill.writing ||
    skillTest?.skill === EnumSkill.speaking
      ? `${skillTest?.submittedAnswers}`
      : `${skillTest?.correctAnswers}`;

  return (
    <Button
      variant="ghost"
      key={skillTest?.skill}
      className="flex h-28 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-neutral-100 p-3"
      disabled={isComingSoon}
      onClick={onClick}
    >
      <div className="flex flex-col items-start gap-2">
        <span className="text-base font-semibold capitalize">{skillTest?.skill}</span>
        <div className="flex flex-col items-start">
          <div className="text-start text-xs text-supporting-text">
            {isComingSoon
              ? `${t("comingSoon")}...`
              : `${t([`correctAnswer_${skillTest?.skill}_${skillTest?.status}`, `correctAnswer_${skillTest?.skill}`])}:`}
          </div>
          {!isComingSoon && (
            <div className="font-semibold">
              {score}/{numberOfQuestions}
            </div>
          )}
        </div>
      </div>
      <AnimatedCircularProgressBar
        max={mappingProgress.max}
        value={mappingProgress.value}
        icon={MAPPED_SKILL_ICON[skillTest?.skill as EnumSkill]}
        className={cn(
          skillTest?.estimatedBandScore && "rounded-full bg-[#FCE3B4] text-primary-700"
        )}
      />
    </Button>
  );
}
