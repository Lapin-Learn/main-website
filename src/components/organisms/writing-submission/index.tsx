import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import type { SimulatedTestAnswer, STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import WritingQuestionCard from "../../molecules/writing-question-card";
import { Separator, Typography } from "../../ui";
import { Skeleton } from "../../ui/skeleton";
import CriteriaScoreList from "../criteria-score-list";
import SubmissionContentAnswered from "./answered";

type WritingSubmissionProps = {
  evaluationResults?: STCriteriaEvaluation[];
  userSubmissions: SimulatedTestAnswer[];
  skillTestId: number;
  partDetails: string[][];
  rootComponent?: "card" | "accordion";
  finishedOn?: Date;
  timeSpent?: string;
};

function WritingSubmission(props: WritingSubmissionProps) {
  const {
    userSubmissions,
    skillTestId,
    partDetails,
    evaluationResults,
    rootComponent = "accordion",
    finishedOn,
    timeSpent,
  } = props;
  const { t } = useTranslation(["practice", "collection"]);

  if (rootComponent === "card") {
    return (
      <div className="flex flex-col gap-4">
        {userSubmissions.map((submission, index) => {
          const partDetail = partDetails[index] ?? [];
          return (
            <div className="flex flex-col gap-4 rounded-xl border-none bg-white p-5">
              <div className="flex flex-row items-center gap-4">
                <Typography variant="h3" className="uppercase">
                  Part {submission.questionNo}:&nbsp;{partDetail.join(", ")}
                </Typography>
                <div className="flex flex-row items-center gap-2 text-muted-foreground">
                  <Typography variant="body2">
                    {t("finished-on")}: {new Date(finishedOn ?? "").toLocaleString()}
                  </Typography>
                  <Separator className="h-4" orientation="vertical" />
                  <Typography variant="body2">
                    {t("timeSpent", { ns: "collection" })}: {timeSpent}
                  </Typography>
                </div>
              </div>
              <SubmissionContent
                submission={submission}
                skillTestId={skillTestId}
                partDetail={partDetail}
                evaluationResult={evaluationResults && evaluationResults[submission.questionNo - 1]}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="flex w-full flex-col gap-4"
      defaultValue={!evaluationResults?.length ? "0" : undefined}
    >
      {userSubmissions.map((submission, index) => {
        const partDetail = partDetails[index] ?? [];
        return (
          <AccordionItem
            value={index.toString()}
            key={index}
            className="flex flex-col gap-4 rounded-xl border-none bg-white p-5"
          >
            <AccordionTrigger
              className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
              iconPosition="right"
            >
              Part {submission.questionNo}:&nbsp;{partDetail.join(", ")}
            </AccordionTrigger>
            <AccordionContent>
              <SubmissionContent
                submission={submission}
                skillTestId={skillTestId}
                partDetail={partDetail}
                evaluationResult={evaluationResults && evaluationResults[submission.questionNo - 1]}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

type SubmissionContentProps = {
  submission: SimulatedTestAnswer;
  skillTestId: number;
  partDetail: string[];
  evaluationResult?: STCriteriaEvaluation;
};

function SubmissionContent(props: SubmissionContentProps) {
  const { submission, skillTestId, evaluationResult } = props;
  const { data, isLoading } = useGetSkillTestData(skillTestId, submission.questionNo);
  const { t } = useTranslation("simulatedTest");

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-8">
      <div
        className={cn(
          "flex flex-row gap-4 pb-0",
          evaluationResult ? "col-span-4" : "col-span-full"
        )}
      >
        <div className="flex flex-col">
          <Typography className="font-bold capitalize text-neutral-500">
            {t("result.taskDescription")}
          </Typography>
          {isLoading || !data ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <WritingQuestionCard content={data?.content} imageClassName="!w-1/3 mx-auto" />
          )}
        </div>
        <Separator className="w-0.5" orientation="vertical" />
        <SubmissionContentAnswered
          answer={submission.answer}
          evaluationResult={evaluationResult}
          skill={EnumSkill.writing}
        />
      </div>
      {evaluationResult && (
        <CriteriaScoreList evaluationResult={evaluationResult} skill={EnumSkill.writing} />
      )}
    </div>
  );
}

export default WritingSubmission;
