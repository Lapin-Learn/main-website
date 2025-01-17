import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import type {
  STCriteriaEvaluation,
  SimulatedTestAnswer as WritingSubmission,
} from "@/lib/types/simulated-test.type";

import WritingQuestionCard from "../molecules/writing-question-card";
import { Button, Separator, Typography } from "../ui";
import { Skeleton } from "../ui/skeleton";
import CriteriaScoreList from "./criteria-score-list";

type WritingSubmissionProps = {
  evaluationResults?: STCriteriaEvaluation[];
  userSubmissions: WritingSubmission[];
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
        {userSubmissions.map((submission) => {
          const partDetail =
            submission.questionNo <= partDetails.length
              ? partDetails[submission.questionNo - 1]
              : [""];
          return (
            <div className="flex flex-col gap-4 rounded-xl border-none bg-white p-5">
              <div className="flex flex-row items-center gap-4">
                <Typography variant="h3" className="uppercase">
                  Part {submission.questionNo}:&nbsp;{partDetail.join(", ")}
                </Typography>
                <div className="flex flex-row items-center gap-2 text-muted-foreground">
                  <Typography variant="body2">
                    {t("finished-on")}: {new Date(finishedOn || "").toLocaleString()}
                  </Typography>
                  <Separator className="h-4" orientation="vertical" />
                  <Typography variant="body2">
                    {t("timeSpent", { ns: "collection" })}: {timeSpent}
                  </Typography>
                </div>
              </div>
              <SubmissionContent
                submission={userSubmissions[0]}
                skillTestId={skillTestId}
                partDetail={partDetails[0]}
                evaluationResult={evaluationResults && evaluationResults[0]}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {userSubmissions.map((submission, index) => {
        const partDetail =
          submission.questionNo <= partDetails.length
            ? partDetails[submission.questionNo - 1]
            : [""];
        return (
          <AccordionItem
            value={submission.questionNo.toString()}
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
  submission: WritingSubmission;
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
      <div className="col-span-4 flex flex-col gap-4 pb-0">
        {isLoading || !data ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <WritingQuestionCard content={data?.content} imageClassName="!w-1/3 mx-auto" />
        )}
        <div className="my-2 flex flex-row items-center gap-5">
          <Separator className="flex-1" />
          <Typography className="text-center uppercase text-neutral-500">
            {t("result.yourAnswer")}
          </Typography>
          <Separator className="flex-1" />
        </div>
        {submission.answer && (
          <div
            dangerouslySetInnerHTML={{ __html: submission.answer }}
            className="text-justify [&_p]:mb-2"
          />
        )}
      </div>
      {evaluationResult ? (
        <CriteriaScoreList evaluationResult={evaluationResult} skill={EnumSkill.writing} />
      ) : (
        <div className="col-span-2 grid h-full place-items-center content-center gap-2 text-muted-foreground">
          <Typography className="italic">Not evaluated yet</Typography>
          <Button variant="secondary" size="sm">
            Evaluate now
          </Button>
        </div>
      )}
    </div>
  );
}

export default WritingSubmission;
