import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import type {
  STCriteriaEvaluation,
  SimulatedTestAnswer as WritingSubmission,
} from "@/lib/types/simulated-test.type";

import { MAPPED_WRITING_CRITERIA_TITLES } from "../../lib/consts";
import CriteriaScoreCardSimple from "../molecules/criteria-score-card-simple";
import WritingQuestionCard from "../molecules/writing-question-card";
import { Button, Separator, Typography } from "../ui";
import { Skeleton } from "../ui/skeleton";

type WritingSubmissionProps = {
  evaluationResults?: STCriteriaEvaluation[];
  userSubmissions: WritingSubmission[];
  skillTestId: number;
  partDetails: string[][];
};

function WritingSubmission(props: WritingSubmissionProps) {
  const { userSubmissions, skillTestId, partDetails, evaluationResults } = props;

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {userSubmissions.map((submission, index) => (
        <SubmissionAccordionItem
          key={index}
          submission={submission}
          skillTestId={skillTestId}
          partDetail={
            submission.questionNo <= partDetails.length
              ? partDetails[submission.questionNo - 1]
              : [""]
          }
          evaluationResult={evaluationResults && evaluationResults[submission.questionNo - 1]}
        />
      ))}
    </Accordion>
  );
}

type SubmissionAccordionItemProps = {
  submission: WritingSubmission;
  skillTestId: number;
  partDetail: string[];
  evaluationResult?: STCriteriaEvaluation;
};

function SubmissionAccordionItem(props: SubmissionAccordionItemProps) {
  const { submission, skillTestId, partDetail, evaluationResult } = props;
  const { data, isLoading } = useGetSkillTestData(skillTestId, submission.questionNo);

  return (
    <AccordionItem
      value={submission.questionNo.toString()}
      className="flex flex-col gap-4 rounded-xl border-none bg-white p-5"
    >
      <AccordionTrigger
        className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
        iconPosition="right"
      >
        Part {submission.questionNo}:&nbsp;{partDetail.join(", ")}
      </AccordionTrigger>
      <AccordionContent className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-8">
        <div className="col-span-4 flex flex-col gap-4 pb-0">
          {isLoading || !data ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <WritingQuestionCard content={data?.content} imageClassName="!w-1/3 mx-auto" />
          )}
          <div className="my-2 flex flex-row items-center gap-5">
            <Separator className="flex-1" />
            <Typography variant="h6" className="text-center uppercase text-neutral-500">
              Your answer
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
          <CriteriaScoreList evaluationResult={evaluationResult} />
        ) : (
          <div className="col-span-2 grid h-full place-items-center content-center gap-2 text-muted-foreground">
            <Typography variant="h6" className="italic">
              Not evaluated yet
            </Typography>
            <Button variant="secondary" size="sm">
              Evaluate now
            </Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function CriteriaScoreList({ evaluationResult }: { evaluationResult: STCriteriaEvaluation }) {
  return (
    <div className="col-span-2 flex flex-col rounded-lg bg-secondary/50">
      <Typography variant="h3" className="mt-6 text-center capitalize text-primary-700">
        Total: {evaluationResult.overall}
      </Typography>
      {Object.entries(evaluationResult.criterias).map(([key, value]) => (
        <CriteriaScoreCardSimple
          key={key}
          criteria={MAPPED_WRITING_CRITERIA_TITLES[key] ?? key}
          evaluate={value.evaluate ?? ""}
          score={value.score}
        />
      ))}
    </div>
  );
}

export default WritingSubmission;
