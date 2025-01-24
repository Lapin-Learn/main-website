import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { PracticeBreadcrumb } from "@/components/molecules/practice-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCollectionInfo,
  useGetSimulatedTestDetail,
  useGetSTSessionDetail,
} from "@/hooks/react-query/use-simulated-test";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { SpeakingSession, WritingSession } from "@/lib/types/simulated-test-session.type";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { Route } from "@/routes/_authenticated/_dashboard/practice/simulated-test/result";

import ReadingListeningResult from "./reading-listening-result";
import SpeakingResult from "./speaking-result";
import WritingResult from "./writing-result";

export default function ResultPage() {
  const { sessionId } = Route.useSearch();
  const navigate = useNavigate();
  const { data: session, isLoading } = useGetSTSessionDetail(sessionId);

  const { data: simulatedTest } = useGetSimulatedTestDetail(
    session?.skillTest.simulatedIeltsTest.id || 0,
    !isLoading
  );
  const { collection, isLoading: collectionLoading } = useGetCollectionInfo(
    simulatedTest?.collectionId || 0
  );

  const resultStatues = [
    EnumSimulatedTestSessionStatus.FINISHED,
    EnumSimulatedTestSessionStatus.IN_EVALUATING,
    EnumSimulatedTestSessionStatus.NOT_EVALUATED,
    EnumSimulatedTestSessionStatus.EVALUATION_FAILED,
  ];

  useEffect(() => {
    if (!isLoading && session && !resultStatues.includes(session.status) && simulatedTest) {
      navigate({ to: `/practice/${simulatedTest?.collectionId}` });
    }
  }, [isLoading, navigate, session, simulatedTest]);

  if (isLoading || !session) {
    return <div className="size-screen grid place-items-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4 pt-8">
      {collectionLoading || !collection ? (
        <Skeleton className="h-5 w-52" />
      ) : (
        <PracticeBreadcrumb collection={collection} session={session} />
      )}
      <SkillResultFactory session={session} />
    </div>
  );
}

function SkillResultFactory({ session }: { session: SimulatedTestSession }) {
  switch (session.skillTest.skill) {
    case EnumSkill.writing:
      return <WritingResult session={session as WritingSession} />;
    case EnumSkill.speaking:
      return <SpeakingResult session={session as SpeakingSession} />;
    default:
      return <ReadingListeningResult />;
  }
}
