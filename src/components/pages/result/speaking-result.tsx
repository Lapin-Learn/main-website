import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";
import OverviewEvaluationSection from "@components/organisms/overview-evaluation-section.tsx";
import SummaryBandScore from "@components/organisms/summary-bandscore.tsx";
import { Typography } from "@components/ui/typography.tsx";

import { EvaluationSection } from "@/components/molecules/evaluation-section";
import SpeakingSubmission from "@/components/organisms/speaking-submission";
import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

type SpeakingResultProps = {
  session: SpeakingSession;
};

function SpeakingResult({ session }: SpeakingResultProps) {
  const { status, orderCode } = Route.useSearch();
  const { data: stData } = useGetSimulatedTestDetail(session.skillTest.simulatedIeltsTest.id);
  const questionTypes =
    stData?.skillTests
      .find((skill) => skill.skill === EnumSkill.speaking)
      ?.partsDetail.map((item) => item.questionTypesIndices.map((index) => index.name)) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <OverviewEvaluationSection session={session} />

      <Typography
        variant="h3"
        className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
      >
        Part {session.parts[0]}: {questionTypes[0]?.join(",")}
      </Typography>
      <SummaryBandScore criterias={session.results[0]?.criterias} skill={EnumSkill.speaking} />
      <div className="rounded-xl bg-neutral-50 p-5 font-normal text-neutral-600 [&_p]:mb-3">
        <p>
          The examiner will ask for your name and identification, followed by general questions
          about yourself (e.g., where you live, work, or study).
        </p>
        <p>
          You will then answer questions on familiar topics like music, cooking, weather, or movies.
          The examiner may prompt you to extend your responses by asking “why?” or “why not?”
        </p>
        <p>
          This section tests your ability to communicate opinions and information on everyday topics
          in a question-answer format.
        </p>
      </div>

      <div className="gap-2 md:gap-4">
        <div className="flex gap-4 pb-0">
          <SpeakingSubmission
            userSubmissions={session.responses}
            skillTestId={session.skillTest.id}
            questionTypes={questionTypes}
            evaluationResults={session.results}
            parts={session.parts}
            resource={session.resource}
          />

          {session.results.length == 0 && (
            <EvaluationSection status={session.status} id={session.id} />
          )}
        </div>
      </div>
      <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
    </div>
  );
}

export default SpeakingResult;
