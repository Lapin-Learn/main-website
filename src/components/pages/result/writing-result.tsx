import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";

import { EvaluationSection } from "@/components/molecules/evaluation-section";
import OverviewEvaluationSection from "@/components/organisms/overview-evaluation-section";
import WritingSubmission from "@/components/organisms/writing-submission";
import { WritingSession } from "@/lib/types/simulated-test-session.type";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

type WritingResultProps = {
  session: WritingSession;
};

function WritingResult({ session }: WritingResultProps) {
  const { status, orderCode } = Route.useSearch();

  // Get part types: Line graph, Pie chart, etc.
  const selectedPartDetails = session.skillTest.partsDetail;

  const partDetails = selectedPartDetails.map((part) =>
    part.questionTypesIndices.map((qt) => qt.name)
  );

  const submissions = session.parts.map((partNo) => {
    const submission = session.responses.find((response) => response.questionNo === partNo) ?? {
      questionNo: partNo,
      answer: "",
    };
    return submission;
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
            evaluationResults={session.results}
          />
        </div>
        {session.results.length == 0 && (
          <EvaluationSection id={session.id} status={session.status} />
        )}
      </div>
      <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
    </div>
  );
}

export default WritingResult;
