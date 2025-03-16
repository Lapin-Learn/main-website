import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { useState } from "react";

import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import type { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import SpeakingSingleQuestionSubmission from "../../molecules/speaking-single-question-submission";
import EvaluationList from "../evaluation-list.tsx";
import { ExtendedSpeakingResponse } from "./helpers";

type SpeakingSubmissionProps = {
  partNo: number;
  submission?: ExtendedSpeakingResponse[];
  skillTestId: number;
  evaluationResult?: STCriteriaEvaluation[];
};

export function SpeakingSubmission(props: SpeakingSubmissionProps) {
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
            {partNo == 2 ? (
              <div>
                <strong>{data?.heading}</strong>
                <p>You should say:</p>
                {data?.content && Array.isArray(data.content) ? (
                  <ul className="pl-4">
                    {data?.content.map((question, index) => (
                      <li key={index} className="list-inside list-disc">
                        {question}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : data && Array.isArray(data.content) ? (
              data?.content.map((question, index) => (
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
            ) : null}
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
              submission={
                submission?.find((value) => value.questionNo === activeQuestion + 1) ?? null
              }
            />
          </div>
        </Card>
      </div>

      {evaluationResult && <EvaluationList evaluationResult={evaluationResult} partNo={partNo} />}
    </div>
  );
}

export default SpeakingSubmission;
