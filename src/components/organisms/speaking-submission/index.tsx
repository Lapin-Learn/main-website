import _ from "lodash";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill, EnumWritingCriteria } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import type { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";

import SpeakingSingleQuestionSubmission from "../../molecules/speaking-single-question-submission";
import { Button, Typography } from "../../ui";
import CriteriaScoreList from "../criteria-score-list";
import EmptySubmission from "./EmptySubmission";
import { ExtendedSpeakingResponse, parseTimestampsToStartEnd } from "./helpers";
import { SpeakingResourceProvider } from "./SpeakingResource";

type SpeakingSubmissionProps = {
  evaluationResults?: STCriteriaEvaluation[];
  userSubmissions: SpeakingSession["responses"];
  skillTestId: number;
  questionTypes: string[][];
  parts: number[];
  resource?: string;
};

function SpeakingSubmission(props: SpeakingSubmissionProps) {
  const { userSubmissions, skillTestId, questionTypes, evaluationResults, parts, resource } = props;
  const formattedUserSubmissions = parseTimestampsToStartEnd(userSubmissions);

  const filteredEvaluationResults =
    evaluationResults?.filter((evaluation) => evaluation.part !== EnumWritingCriteria.Overall) ??
    [];

  const groupedSubmissions = _.groupBy(formattedUserSubmissions, "partNo") ?? [];

  return (
    <Accordion
      type="single"
      collapsible
      className="flex w-full flex-col gap-4"
      defaultValue={parts[0].toString()}
    >
      <SpeakingResourceProvider resource={resource} audioList={formattedUserSubmissions}>
        {parts.map((partNo, index) => {
          if (groupedSubmissions[partNo]) {
            return (
              <SubmissionAccordionItem
                key={partNo}
                partNo={partNo}
                submission={groupedSubmissions[partNo]}
                skillTestId={skillTestId}
                partDetail={questionTypes[index]}
                evaluationResult={filteredEvaluationResults.find(
                  (evaluation) => evaluation.part == partNo
                )}
              />
            );
          }
          return (
            <EmptySubmission
              key={partNo}
              partNo={partNo}
              questionTypes={questionTypes[index] ?? []}
            />
          );
        })}
      </SpeakingResourceProvider>
    </Accordion>
  );
}

type SubmissionAccordionItemProps = {
  partNo: number;
  submission: ExtendedSpeakingResponse[];
  skillTestId: number;
  partDetail: string[];
  evaluationResult?: STCriteriaEvaluation;
};

function SubmissionAccordionItem(props: SubmissionAccordionItemProps) {
  const { submission, skillTestId, partDetail, evaluationResult, partNo } = props;
  const { data, isLoading } = useGetSkillTestData(skillTestId, partNo);

  return (
    <AccordionItem
      value={partNo.toString()}
      className="flex flex-col gap-4 rounded-xl border-none bg-white p-5"
    >
      <AccordionTrigger
        className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
        iconPosition="right"
      >
        Part {partNo}:&nbsp;{partDetail?.join(", ")}
      </AccordionTrigger>
      <AccordionContent className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-8">
        <div className="col-span-3 flex flex-col gap-4 pb-0">
          {data &&
            !isLoading &&
            Array.isArray(data.content) &&
            data.content.map((question: string, index: number) => (
              <SpeakingSingleQuestionSubmission
                key={index}
                question={question}
                no={index + 1}
                partNo={partNo}
                submission={submission.find((item) => item.questionNo === index + 1) ?? null}
              />
            ))}
        </div>
        {evaluationResult ? (
          <CriteriaScoreList evaluationResult={evaluationResult} skill={EnumSkill.speaking} />
        ) : (
          <div className="col-span-3 grid h-full place-items-center content-center gap-2 text-muted-foreground">
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

export default SpeakingSubmission;
