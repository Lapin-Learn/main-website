import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import type { SimulatedTestAnswer, STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import WritingQuestionCard from "../../molecules/writing-question-card";
import { Button, Typography } from "../../ui";
import { Skeleton } from "../../ui/skeleton";
import SubmissionContentAnswered from "./answered";
import SummaryBandScore from "./summary-bandscore";

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
  const [expanded, setExpanded] = useState(false);

  const extractParagraphs = (htmlString: string): string[] => {
    return [...new DOMParser().parseFromString(htmlString, "text/html").querySelectorAll("p")].map(
      (p) => p.textContent?.trim() || ""
    );
  };

  return (
    <div className="relative transition-all duration-300 ease-in-out">
      <div className={cn("grid grid-cols-[2fr_3fr] gap-4", expanded && "flex flex-col gap-8")}>
        {expanded && (
          <SummaryBandScore
            paragraphs={extractParagraphs(submission.answer ?? "")}
            criterias={evaluationResult?.criterias}
          />
        )}
        <div className="flex flex-col gap-5">
          <Typography variant="h6" className="font-semibold capitalize">
            {t("result.taskDescription")}
          </Typography>
          {isLoading || !data ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <WritingQuestionCard content={data.content} imageClassName="mx-auto" />
          )}
        </div>
        <SubmissionContentAnswered
          paragraphs={extractParagraphs(submission.answer ?? "")}
          evaluationResult={evaluationResult}
          skill={EnumSkill.writing}
        />
      </div>
      {!expanded && (
        <div className="absolute inset-0 flex items-end justify-center bg-white bg-opacity-75">
          <Button
            onClick={() => setExpanded(true)}
            className="gap-1 rounded-lg px-5 py-2 text-white"
          >
            <Typography className="text-small font-medium">{t("result.viewDetail")}</Typography>
            <ChevronDown size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default WritingSubmission;
