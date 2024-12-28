import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetSimulatedTestDetail,
  useGetSTSessionDetail,
} from "@/hooks/react-query/use-simulated-test";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

import { CollectionDetailHeader } from "../organisms/collection-detail-header";
import { PartAnswersCard, SkeletonPartAnswersCard } from "../organisms/result/part-answers-card";
import PageLayout from "../organisms/simulated-test/page-layout";
import { Button } from "../ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Footer from "./simulated-test/footer";

export default function ResultPage() {
  const { t } = useTranslation(["collection", "common"]);
  const { sessionId } = Route.useSearch();
  const { data: session, isLoading, userAnswers, answerStatus } = useGetSTSessionDetail(sessionId);
  const navigate = useNavigate();
  const [viewDetail, setViewDetail] = useState(false);

  const { data: simulatedTest } = useGetSimulatedTestDetail(
    session?.skillTest.simulatedIeltsTest.id || 0,
    !isLoading
  );

  useEffect(() => {
    if (session?.status !== EnumSimulatedTestSessionStatus.FINISHED && simulatedTest) {
      navigate({ to: `/practice/${simulatedTest?.collectionId}` });
    }
  }, [session, simulatedTest]);

  if (isLoading || !session) {
    return <div className="size-screen grid place-items-center">Loading...</div>;
  }

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
            <Button variant="link" onClick={() => setViewDetail(true)}>
              {t("detail.button")}
            </Button>
          </div>
        )}
        <TabsContent value="answerKeys" className="flex flex-col gap-6">
          {isLoading ? (
            <SkeletonPartAnswersCard />
          ) : session.skillTest.skill === EnumSkill.writing ||
            session.skillTest.skill === EnumSkill.speaking ? (
            <div className="flex h-full flex-col items-center">
              <h1 className="text-2xl font-bold">Coming soon</h1>
              <p className="text-center text-sm">This skill is not available yet</p>
            </div>
          ) : (
            <>
              {session?.parts.map((part, index) => {
                return (
                  <PartAnswersCard
                    key={index}
                    part={part}
                    partDetail={session.skillTest.partsDetail[index]}
                    userAnswers={userAnswers}
                    answerStatus={answerStatus}
                    answers={session.skillTest.answers}
                    guidances={session.skillTest.guidances}
                  />
                );
              })}
            </>
          )}
        </TabsContent>
        <TabsContent value="analysis">Analysis.</TabsContent>
      </Tabs>
      <Dialog open={viewDetail} onOpenChange={setViewDetail}>
        <DialogContent className="max-w-screen h-screen px-0">
          <PageLayout
            header={
              <DialogHeader className="px-4 sm:px-8">
                <DialogTitle>{t("detail.title")}</DialogTitle>
              </DialogHeader>
            }
            session={session}
            sessionId={sessionId}
            skillTestId={session?.skillTest.id || 0}
            renderFooter={renderDialogFooter}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function renderDialogFooter(session: SimulatedTestSession, sessionId: number): ReactNode {
  return (
    <DialogFooter>
      <Footer
        sessionId={sessionId}
        partDetails={
          session.skillTest.partsDetail.map((part, index) => ({
            ...part,
            part: session.parts[index],
          })) ?? []
        }
        status={session.status}
      />
    </DialogFooter>
  );
}
