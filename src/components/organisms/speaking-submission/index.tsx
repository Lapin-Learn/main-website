import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import _ from "lodash";
import { useState } from "react";

import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSpeakingCriteria } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import type { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import SpeakingSingleQuestionSubmission from "../../molecules/speaking-single-question-submission";
import EvaluationList from "../evaluation-list.tsx";
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
    evaluationResults?.filter((evaluation) => evaluation.part !== EnumSpeakingCriteria.Overall) ??
    [];

  const groupedSubmissions = _.groupBy(formattedUserSubmissions, "partNo") ?? [];

  return (
    <SpeakingResourceProvider resource={resource} audioList={formattedUserSubmissions}>
      {parts.map((partNo, index) => {
        if (groupedSubmissions[partNo]) {
          return (
            <SubmissionItem
              key={partNo}
              partNo={partNo}
              submission={groupedSubmissions[partNo]}
              skillTestId={skillTestId}
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
  );
}

type SubmissionItemProps = {
  partNo: number;
  submission: ExtendedSpeakingResponse[];
  skillTestId: number;
  evaluationResult?: STCriteriaEvaluation;
};

function SubmissionItem(props: SubmissionItemProps) {
  const { submission, skillTestId, evaluationResult, partNo } = props;
  const { data } = useGetSkillTestData(skillTestId, partNo);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4">
      <div className="col-span-2 grid grid-cols-subgrid gap-4">
        <Card className="rouned-xl flex flex-col border-none bg-white shadow-none">
          <CardHeader className="md:p-5 md:pb-4">
            <CardTitle className="text-heading-6">Questions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 md:p-5 md:pt-0">
            {data && Array.isArray(data.content)
              ? data?.content.map((question, index) => (
                  <div className="flex flex-row items-baseline gap-4">
                    <p
                      className={cn(
                        "min-w-6 text-primary-600 font-semibold",
                        index !== activeQuestion && "text-neutral-500"
                      )}
                    >
                      {index + 1}.
                    </p>
                    <button
                      className={cn(
                        "rounded-md bg-primary-50 px-3 py-2 text-primary-600 font-semibold text-left hover:bg-primary-100/50 w-full",
                        index !== activeQuestion &&
                          "text-neutral-500 bg-[#F7F7F7] hover:bg-neutral-50"
                      )}
                      onClick={() => setActiveQuestion(index)}
                    >
                      {question}
                    </button>
                  </div>
                ))
              : null}
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-4 rounded-xl border-none bg-white p-5 shadow-none">
          <div
            className={cn(
              "flex flex-col gap-4 pb-0",
              evaluationResult ? "col-span-3" : "col-span-full"
            )}
          >
            <SpeakingSingleQuestionSubmission
              question={data && Array.isArray(data.content) ? data.content[activeQuestion] : ""}
              no={activeQuestion + 1}
              partNo={partNo}
              submission={submission.find((item) => item.questionNo === activeQuestion + 1) ?? null}
            />
          </div>
        </Card>
      </div>

      {evaluationResult && <EvaluationList evaluationResult={evaluationResult} />}
    </div>
  );
}

export default SpeakingSubmission;
