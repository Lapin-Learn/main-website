import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";
import i18next from "i18next";
import { useState } from "react";

import { EvaluationSection } from "@/components/molecules/evaluation-section";
import OverviewEvaluationSection from "@/components/organisms/overview-evaluation-section";
import WritingSubmission from "@/components/organisms/writing-submission";
import { STCriteriaEvaluation } from "@/lib/types";
import { WritingSession } from "@/lib/types/simulated-test-session.type";
import { cn, updateResults } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

type WritingResultProps = {
  session: WritingSession;
};

function WritingResult({ session }: WritingResultProps) {
  const [results, setResults] = useState<STCriteriaEvaluation[]>(updateResults(session.results));
  const { status, orderCode } = Route.useSearch();

  // Get part types: Line graph, Pie chart, etc.
  const selectedPartDetails = session.skillTest.partsDetail;

  const partDetails = selectedPartDetails.map((part) =>
    part.questionTypesIndices.map((qt) => qt.name)
  );

  const submissions = session.parts.map((partNo) => {
    return (
      session.responses.find((response) => response.questionNo === partNo) ?? {
        questionNo: partNo,
        answer: "",
      }
    );
  });

  i18next.on("languageChanged", () => {
    setResults(updateResults(session.results));
  });

  return (
    <div className="flex flex-col gap-4">
      <OverviewEvaluationSection session={session} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-4">
        <div
          className={cn(
            "flex gap-4 pb-0",
            !session.results.length ? "col-span-4" : "col-span-full"
          )}
        >
          <WritingSubmission
            userSubmissions={submissions}
            skillTestId={session.skillTest.id}
            partDetails={partDetails}
            evaluationResults={results}
          />
        </div>
        {results.length == 0 && <EvaluationSection id={session.id} status={session.status} />}
      </div>
      <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
    </div>
  );
}

export default WritingResult;
