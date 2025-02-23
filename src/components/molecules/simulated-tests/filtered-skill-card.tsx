import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AnimatedCircularProgressBar } from "@/components/organisms/circular-progress";
import useSelectModeDialog from "@/components/organisms/select-mode-dialog/use-select-mode-dialog";
import { buttonVariants } from "@/components/ui";
import { useGetSTSessionsHistoryByST } from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SKILL_ICON } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus, EnumSkill, ExtendEnumSkill } from "@/lib/enums";
import { SimulatedTest, SkillTest } from "@/lib/types/simulated-test.type";
import { cn, formatTime } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/practice/$collectionId";

type FilteredSkillCardProps = {
  test: SimulatedTest;
  skillTest: SkillTest;
  isSupport: boolean;
};

export function FilteredSkillCard({ test, skillTest, isSupport }: FilteredSkillCardProps) {
  const { skill } = Route.useSearch();
  const { t } = useTranslation("collection");
  const { setData } = useSelectModeDialog();
  const { data } = useGetSTSessionsHistoryByST(test?.id ?? 0, {
    offset: 0,
    limit: 10000,
    skill: skill !== ExtendEnumSkill.allSkills ? skill : undefined,
  });

  const numberOfQuestions =
    skillTest?.skill === EnumSkill.speaking
      ? skillTest?.partsDetail[skillTest?.partsDetail?.length - 1]?.part
      : skillTest?.partsDetail[skillTest?.partsDetail?.length - 1]?.endQuestionNo;

  const score =
    skillTest?.status === EnumSimulatedTestSessionStatus.IN_PROGRESS ||
    skillTest?.skill === EnumSkill.writing ||
    skillTest?.skill === EnumSkill.speaking
      ? `${skillTest?.submittedAnswers}`
      : `${skillTest?.correctAnswers}`;

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

  const totalTimeSpent = data?.items.reduce((acc, item) => acc + item.elapsedTime, 0) ?? 0;

  return (
    <button
      className="flex flex-col justify-between gap-2 rounded-lg border bg-white p-3 md:gap-4 md:rounded-2xl md:p-5"
      onClick={() => {
        if (isSupport) {
          setData({ skillTest, test, open: true });
        }
      }}
    >
      <p className="line-clamp-2 w-full text-start text-base font-semibold md:line-clamp-1 md:text-lg md:font-bold">
        {test.testName}
      </p>
      <div className={cn(`flex w-full flex-row justify-between ${!isSupport && "items-center"}`)}>
        <div className="flex max-w-64 flex-col gap-2 md:gap-4">
          <div className="flex flex-col gap-2">
            {isSupport ? (
              <>
                <div className="flex flex-col items-start text-left">
                  <div className="text-sm text-neutral-200">
                    {t([
                      `correctAnswer_${skillTest?.skill}_${skillTest?.status}`,
                      `correctAnswer_${skillTest?.skill}`,
                    ])}
                    :{" "}
                    <span className="text-sm font-semibold text-neutral-950">
                      {score}/{numberOfQuestions}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-200">
                    {t("timeSpent")}:{" "}
                    <span className="text-sm font-semibold text-neutral-950">
                      {formatTime(totalTimeSpent)}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/practice/${test.collectionId}/simulated-test/${test.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "w-fit gap-2 px-0 text-primary hover:bg-transparent hover:text-primary-700"
                  )}
                  search={{ skill: skill !== ExtendEnumSkill.allSkills ? skill : undefined }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("viewHistory")}
                  <ArrowRight size="16" />
                </Link>
              </>
            ) : (
              <div className="text-start text-sm text-neutral-200">{t("comingSoon")}...</div>
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
