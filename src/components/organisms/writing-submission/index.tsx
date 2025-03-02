import { useTranslation } from "react-i18next";

import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import type { SimulatedTestAnswer, STCriteriaEvaluation } from "@/lib/types/simulated-test.type";

import WritingQuestionCard from "../../molecules/writing-question-card";
import { Typography } from "../../ui";
import { Skeleton } from "../../ui/skeleton";
import SubmissionContentAnswered from "./answered";

type WritingSubmissionProps = {
  evaluationResults?: STCriteriaEvaluation[];
  userSubmissions: SimulatedTestAnswer[];
  skillTestId: number;
  partDetails: string[][];
};

function WritingSubmission(props: WritingSubmissionProps) {
  const { userSubmissions, skillTestId, partDetails, evaluationResults } = props;

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
    <div className="grid grid-cols-[2fr_3fr] gap-4 pb-0">
      <div className="flex flex-col gap-8 border-r pr-4">
        <Typography variant="h6" className="font-semibold capitalize">
          {t("result.taskDescription")}
        </Typography>
        {isLoading || !data ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <WritingQuestionCard content={data?.content} imageClassName="mx-auto" />
        )}
      </div>
      <SubmissionContentAnswered
        answer={submission.answer}
        evaluationResult={evaluationResult}
        skill={EnumSkill.writing}
      />
    </div>
  );
}

export default WritingSubmission;
