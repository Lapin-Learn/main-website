import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetSimulatedTestDetail,
  useGetSTSessionDetail,
} from "@/hooks/react-query/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

import { CollectionDetailHeader } from "../organisms/collection-detail-header";
import { PartAnswersCard, SkeletonPartAnswersCard } from "../organisms/result/part-answers-card";
import { Button } from "../ui";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function ResultPage() {
  const { t } = useTranslation(["collection", "common"]);
  const { sessionId } = Route.useSearch();
  const { data: session, isLoading } = useGetSTSessionDetail(sessionId);
  const navigate = useNavigate();

  const { data: simulatedTest } = useGetSimulatedTestDetail(
    session?.skillTest.simulatedIeltsTest.id || 0,
    !isLoading
  );

  useEffect(() => {
    if (session?.status !== EnumSimulatedTestSessionStatus.FINISHED && simulatedTest) {
      navigate({ to: `/practice/${simulatedTest?.collectionId}` });
    }
  }, [session, simulatedTest]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <CollectionDetailHeader collectionId={simulatedTest?.collectionId || 0} session={session} />
      <Tabs defaultValue="answerKeys" className="flex flex-col gap-6">
        {isLoading ? (
          <div className="flex justify-between">
            <Skeleton className="h-9 w-52" />
            <Skeleton className="h-9 w-28" />
          </div>
        ) : (
          <div className="flex justify-between">
            <TabsList className="w-fit">
              <TabsTrigger value="answerKeys">{t("answerKeys")}</TabsTrigger>
              <TabsTrigger value="analysis">{t("analysis")}</TabsTrigger>
            </TabsList>
            <Button variant="link">{t("viewDetail")}</Button>
          </div>
        )}
        <TabsContent value="answerKeys" className="flex flex-col gap-6">
          {isLoading ? (
            <SkeletonPartAnswersCard />
          ) : (
            <>
              {session?.parts.map((part, index) => {
                const userAnswers = new Array(session.responses?.length || 0).fill(null);
                const answerStatus = new Array(session.results?.length || 0).fill(null);
                session.responses?.forEach((answer, index) => {
                  userAnswers[answer.questionNo - 1] = answer.answer;
                  answerStatus[answer.questionNo - 1] = session.results[index];
                });
                return (
                  <PartAnswersCard
                    key={index}
                    part={part}
                    partDetail={session.skillTest.partsDetail[index]}
                    userAnswers={userAnswers}
                    answerStatus={answerStatus}
                    answers={session.skillTest.answers}
                  />
                );
              })}
            </>
          )}
        </TabsContent>
        <TabsContent value="analysis">Analysis.</TabsContent>
      </Tabs>
    </div>
  );
}
