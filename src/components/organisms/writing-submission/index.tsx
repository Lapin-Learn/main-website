import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import type { SimulatedTestAnswer, STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import WritingQuestionCard from "../../molecules/writing-question-card";
import { Separator, Typography } from "../../ui";
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
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Tabs
      defaultValue={"part" + currentTab}
      onValueChange={(value) => setCurrentTab(+value.slice(4))}
      className="space-y-8"
    >
      <TabsList className="border-b-0">
        {userSubmissions.map((_, index) => (
          <TabsTrigger
            key={index}
            value={"part" + index}
            className={cn(
              "text-small font-medium gap-3 border-b",
              currentTab === index ? "text-primary-700 border-b-primary-700" : "text-neutral-200 "
            )}
          >
            Part {index + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={"part" + currentTab}>
        <SubmissionContent
          submission={userSubmissions[currentTab]}
          skillTestId={skillTestId}
          partDetail={partDetails[currentTab]}
          evaluationResult={evaluationResults && evaluationResults[currentTab]}
        />
      </TabsContent>
    </Tabs>
  );
}
//       {userSubmissions.map((submission, index) => {
//         const partDetail = partDetails[index] ?? [];
//         return (
//           <SubmissionContent
//             submission={submission}
//             skillTestId={skillTestId}
//             partDetail={partDetail}
//             evaluationResult={evaluationResults && evaluationResults[submission.questionNo - 1]}
//           />
//         );
//       })}
//     </Tabs>
//   );
// }

type SubmissionContentProps = {
  submission: SimulatedTestAnswer;
  skillTestId: number;
  partDetail: string[];
  evaluationResult?: STCriteriaEvaluation;
};

function SubmissionContent(props: SubmissionContentProps) {
  const { submission, skillTestId, evaluationResult, partDetail } = props;
  const { data, isLoading } = useGetSkillTestData(skillTestId, submission.questionNo);
  const { t } = useTranslation("simulatedTest");

  const extractParagraphs = (htmlString: string): string[] => {
    return [...new DOMParser().parseFromString(htmlString, "text/html").querySelectorAll("p")].map(
      (p) => p.textContent?.trim() || ""
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h3" className="uppercase">
        Part {submission.questionNo}:&nbsp;{partDetail.join(", ")}
      </Typography>
      <SummaryBandScore
        paragraphs={extractParagraphs(submission.answer ?? "")}
        criterias={evaluationResult?.criterias}
      />
      <div className="flex flex-row gap-4 rounded-xl border-none bg-white p-5">
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
        <Separator orientation="vertical" />
        <SubmissionContentAnswered
          paragraphs={extractParagraphs(submission.answer ?? "")}
          evaluationResult={evaluationResult}
          skill={EnumSkill.writing}
        />
      </div>
    </div>
  );
}

export default WritingSubmission;
