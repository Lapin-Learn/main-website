import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { ResultAnalysisTable } from "@/components/organisms/result-analysis-table/table";
import {
  useGetSimulatedTestDetail,
  useGetSTSessionDetail,
} from "@/hooks/react-query/use-simulated-test";
import { useResult } from "@/hooks/zustand/use-result";
import useSimulatedTestState, { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { ReadingListeningSession } from "@/lib/types/simulated-test-session.type";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

import { PartAnswersCard, SkeletonPartAnswersCard } from "../../organisms/result/part-answers-card";
import PageLayout from "../../templates/simulated-test-detail-layout";
import { Button } from "../../ui";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Skeleton } from "../../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Footer from "../simulated-test/footer";
import { ResultHeader } from "./result-header";

export default function ReadingListeningResult() {
  const { t } = useTranslation(["collection", "common"]);
  const { sessionId } = Route.useSearch();
  const navigate = useNavigate();
  const { data: session, isLoading, userAnswers, answerStatus } = useGetSTSessionDetail(sessionId);
  const { data: simulatedTest } = useGetSimulatedTestDetail(
    session?.skillTest.simulatedIeltsTest.id || 0,
    !isLoading
  );
  const { setAnswerKeys, setGuidances, setStatus, reset } = useResult();
  const { resetAnswers } = useAnswerStore();
  const { resetTest } = useSimulatedTestState();

  useEffect(() => {
    if (
      !isLoading &&
      session &&
      session.status !== EnumSimulatedTestSessionStatus.FINISHED &&
      simulatedTest
    ) {
      navigate({ to: `/practice/${simulatedTest?.collectionId}` });
    }
  }, [session, simulatedTest]);

  if (isLoading || !session) {
    return <div className="size-screen grid place-items-center">Loading...</div>;
  }

  const isAvailableSkill = [EnumSkill.reading, EnumSkill.listening].includes(
    session.skillTest.skill
  );

  const onDialogOpen = () => {
    if (session && session.status === EnumSimulatedTestSessionStatus.FINISHED) {
      if ("answers" in session.skillTest) {
        setAnswerKeys(session.skillTest.answers);
        setGuidances(session.skillTest.guidances);
      }
      setStatus(answerStatus);
    }

    resetTest();
  };

  const onDialogClose = () => {
    reset();
    resetAnswers();
  };

  return (
    <>
      <ResultHeader collectionId={simulatedTest?.collectionId || 0} session={session} />
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
            {isAvailableSkill && (
              <Dialog onOpenChange={(open) => !open && onDialogClose()}>
                <DialogTrigger asChild>
                  <Button variant="link" onClick={onDialogOpen}>
                    {t("detail.button")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen h-screen p-0" aria-describedby={undefined}>
                  <PageLayout
                    header={
                      <DialogHeader className="p-4 sm:px-8">
                        <DialogTitle>{t("detail.title")}</DialogTitle>
                      </DialogHeader>
                    }
                    session={session}
                    answerStatus={answerStatus}
                    renderFooter={renderDialogFooter}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
        <TabsContent value="answerKeys">
          {isLoading ? (
            <SkeletonPartAnswersCard />
          ) : !isAvailableSkill ? (
            <div className="flex h-full flex-col items-center">
              <h1 className="text-2xl font-bold">Coming soon</h1>
              <p className="text-center text-sm">This skill is not available yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {(session as ReadingListeningSession).parts.map((part, index) => (
                <PartAnswersCard
                  key={index}
                  part={part}
                  partDetail={session.skillTest.partsDetail[index]}
                  userAnswers={userAnswers}
                  answerStatus={answerStatus}
                  answers={(session as ReadingListeningSession).skillTest.answers}
                  guidances={(session as ReadingListeningSession).skillTest.guidances}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="analysis">
          <ResultAnalysisTable
            session={session}
            answerStatus={answerStatus}
            isLoading={isLoading}
            guidances={(session as ReadingListeningSession).skillTest.guidances}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

function renderDialogFooter(session: SimulatedTestSession, answerStatus?: boolean[]) {
  const partDetails = session.skillTest.partsDetail.map((part, index) => ({
    ...part,
    part: session.parts[index],
  }));
  return (
    <DialogFooter>
      <Footer
        sessionId={session.id}
        partDetails={partDetails}
        skill={session.skillTest.skill}
        answerStatus={answerStatus}
      />
    </DialogFooter>
  );
}
