import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";
import OverviewEvaluationSection from "@components/organisms/overview-evaluation-section.tsx";
import SpeakingSubmission from "@components/organisms/speaking-submission";
import { parseTimestampsToStartEnd } from "@components/organisms/speaking-submission/helpers.ts";
import { SpeakingResourceProvider } from "@components/organisms/speaking-submission/SpeakingResource.tsx";
import SummaryBandScore from "@components/organisms/summary-bandscore.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs.tsx";
import { Typography } from "@components/ui/typography.tsx";
import _ from "lodash";
import { ErrorBoundary } from "react-error-boundary";
import { Trans, useTranslation } from "react-i18next";

import { EvaluationSection } from "@/components/molecules/evaluation-section";
import { useGetSimulatedTestDetail } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

type SpeakingResultProps = {
  session: SpeakingSession;
};

function SpeakingResult({ session }: SpeakingResultProps) {
  useTranslation();
  const { status, orderCode } = Route.useSearch();
  const { data: stData } = useGetSimulatedTestDetail(session.skillTest.simulatedIeltsTest.id);
  const questionTypes =
    stData?.skillTests
      .find((skill) => skill.skill === EnumSkill.speaking)
      ?.partsDetail.map((item) => item.questionTypesIndices.map((index) => index.name)) ?? [];
  const formattedUserSubmissions = parseTimestampsToStartEnd(session.responses);
  const groupedSubmissions = _.groupBy(formattedUserSubmissions, "partNo") ?? [];
  const audioResource = session.resource;

  const submissions = session.parts.map((partNo) => {
    const partData = session.responses.filter((response) => response.partNo === partNo);

    return {
      partNo,
      data: partData,
    };
  });

  return (
    <ErrorBoundary fallback={<div>Data đã bị cũ hoặc lỗi</div>}>
      <SpeakingResourceProvider resource={audioResource} audioList={formattedUserSubmissions}>
        <OverviewEvaluationSection session={session} />
        <Tabs defaultValue={submissions[0].partNo.toString()} className="space-y-8">
          <TabsList className="border-b-0">
            {submissions.map((value) => (
              <TabsTrigger
                key={value.partNo}
                value={value.partNo.toString()}
                className="gap-3 border-b text-small font-medium"
              >
                Part {value.partNo}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex flex-row gap-4">
            {submissions.map((value) => (
              <TabsContent value={value.partNo.toString()} className="w-3/4 flex-1">
                <div className="flex flex-col gap-4">
                  <Typography
                    variant="h3"
                    className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
                  >
                    Part {value.partNo}: {questionTypes[value.partNo - 1]?.join(",")}
                  </Typography>
                  <SummaryBandScore
                    criterias={session.results[value.partNo - 1]?.criterias}
                    skill={EnumSkill.speaking}
                  />
                  <div className="rounded-xl bg-neutral-50 p-5 font-normal text-neutral-600 [&_p]:mb-3">
                    <Trans
                      i18nKey="speaking.part_introduction"
                      ns="simulatedTest"
                      context={value.partNo.toString()}
                      components={{
                        strong: <strong />,
                        p: <p />,
                      }}
                    />
                  </div>
                  {value.data.length > 0 && (
                    <SpeakingSubmission
                      partNo={value.partNo}
                      submission={groupedSubmissions[value.partNo]}
                      skillTestId={session.skillTest.id}
                      evaluationResult={session.results.find(
                        (evaluation) => evaluation.part == value.partNo
                      )}
                    />
                  )}
                </div>
              </TabsContent>
            ))}
            {session.results.length == 0 && (
              <EvaluationSection status={session.status} id={session.id} className="max-w-96" />
            )}
          </div>
        </Tabs>
        <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
      </SpeakingResourceProvider>
    </ErrorBoundary>
  );
}

export default SpeakingResult;
