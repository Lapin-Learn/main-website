import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTest } from "@/lib/types/simulated-test.type";
import { calculateOverallBandScore, formatTime } from "@/lib/utils";

import TestSkillCard from "../../molecules/simulated-tests/test-skill-card";
import { Button, Separator } from "../../ui";
import useSelectModeDialog from "../select-mode-dialog/use-select-mode-dialog";

export function SimulatedTestCard(
  props: SimulatedTest & {
    collectionId: number;
  }
) {
  const { t } = useTranslation(["collection", "practice"]);
  const { setData } = useSelectModeDialog();
  const { testName, skillTests, totalTimeSpent } = props;
  const overallBandScore = calculateOverallBandScore(
    skillTests.map((test) => test.estimatedBandScore)
  );

  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="mb-4 truncate text-lg font-bold">{testName}</p>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8 lg:items-center">
        <div className="flex min-w-36 flex-col justify-between gap-4">
          <div className="flex flex-row gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-sm font-semibold text-neutral-200">Band</span>
                    <span className="text-sm font-semibold">{overallBandScore ?? "--"}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <Trans i18nKey="practice:tooltip.band" components={{ bold: <strong /> }} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator orientation="vertical" className="flex h-full min-h-12" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-sm font-semibold text-neutral-200">{t("timeSpent")}</span>
                    <span className="text-sm font-semibold">{formatTime(totalTimeSpent)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <Trans i18nKey="practice:tooltip.timeSpent" components={{ bold: <strong /> }} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Link to={`/practice/${props.collectionId}/simulated-test/${props.id}`}>
            <Button
              className="size-fit cursor-pointer gap-2 p-0 text-primary hover:bg-transparent hover:text-primary-700"
              variant="ghost"
            >
              {t("viewHistory")}
              <ArrowRight size="16" />
            </Button>
          </Link>
        </div>

        <div className="grid w-full flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
          {Object.values(EnumSkill).map((skill) => {
            const skillTest = skillTests.find((st) => st.skill === skill);
            const numberOfQuestions =
              skillTest?.skill === EnumSkill.speaking
                ? skillTest?.partsDetail[skillTest?.partsDetail?.length - 1].part
                : skillTest?.partsDetail[skillTest?.partsDetail?.length - 1].endQuestionNo;
            const isComingSoon =
              !skillTest || !skillTest.partsDetail || skillTest.partsDetail.length === 0;

            return (
              <TestSkillCard
                key={skill}
                skillTest={skillTest}
                numberOfQuestions={numberOfQuestions}
                isComingSoon={isComingSoon}
                onClick={() => {
                  if (skillTest) {
                    setData({
                      skillTest,
                      test: props,
                      open: true,
                    });
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SkeletonSimulatedTestCard() {
  return (
    <div className="animate-pulse rounded-2xl border bg-white p-5">
      <div className="mb-4 inline-block h-7 w-52 rounded bg-neutral-50" />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
        <div className="flex max-w-60 flex-col justify-between gap-4">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2">
              <div className="inline-block h-5 w-10 rounded bg-neutral-50" />
              <div className="inline-block h-5 w-8 rounded bg-neutral-50" />
            </div>
            <Separator orientation="vertical" className="flex h-full min-h-12" />
            <div className="flex flex-col gap-2">
              <div className="inline-block h-5 w-20 rounded bg-neutral-50" />
              <div className="inline-block h-5 w-8 rounded bg-neutral-50" />
            </div>
          </div>
          <div className="size-fit h-5 w-28 gap-2 bg-neutral-50 p-0" />
        </div>
        <div className="grid w-full flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
          {Object.keys(EnumSkill)
            .filter((key) => key !== "allSkills")
            .map((key) => (
              <div className="h-24 bg-neutral-50" key={key} />
            ))}
        </div>
      </div>
    </div>
  );
}
