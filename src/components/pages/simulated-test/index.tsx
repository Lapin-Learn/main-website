import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

import ErrorFallback from "@/components/ErrorFallback";
import PageLayout from "@/components/organisms/simulated-test/page-layout";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { SimulatedTestSession, SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

import Header from "./header";
import WritingPage from "./writing";

/**
 * Render the simulated test page layout
 * The layout should decide which component should be render, escape checking condition in every component, as many stateless component as possible
 */
const SimulatedTestPage = () => {
  const { sessionId, skillTestId } = Route.useSearch();
  const { navigateToPart, position, resetTest } = useSimulatedTestState();
  const navigate = useNavigate();
  // const { data: session, isLoading, isSuccess, isError } = useGetSTSessionDetail(sessionId);

  const isSuccess = true;
  const isError = false;
  const isLoading = false;
  const session: SimulatedTestSession = {
    skillTest: {
      id: 1,
      skill: EnumSkill.writing,
      partsDetail: [],
      simulatedIeltsTest: {
        id: 1,
        testName: "Sample Test",
      },
      answers: [],
    },
    parts: [1],
    responses: [
      {
        questionNo: 1,
        answer: "A",
      },
    ],
    status: EnumSimulatedTestSessionStatus.IN_PROGRESS,
    elapsedTime: 0,
    estimatedBandScore: null,
    id: 1,
    learnerProfileId: "",
    mode: EnumMode.PRACTICE,
    timeLimit: 0,
    updatedAt: new Date(),
    results: [],
  };
  // useEffect(() => {
  //   return () => {
  //     if (!sessionId) {
  //       navigate({ to: "/practice" });
  //     }
  //     resetTest();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isSuccess && !session) {
  //     navigate({ to: "/practice" });
  //   } else {
  //     if (session) {
  //       navigateToPart(session.skillTest.partsDetail[0].startQuestionNo, session.parts[0]);
  //       if (session.status === EnumSimulatedTestSessionStatus.FINISHED) {
  //         navigate({
  //           to: "result",
  //           search: {
  //             sessionId,
  //           },
  //         });
  //       }
  //     }
  //   }
  // }, [isSuccess, session]);

  if (isError) {
    return <ErrorFallback />;
  }

  // TODO: enhance UI loading here
  if (isLoading || !session) {
    return <div className="size-screen grid place-items-center">Loading...</div>;
  }

  return (
    <PageLayout
      header={<Header currentPart={position.part} session={session} />}
      session={session}
      sessionId={sessionId}
      skillTestId={skillTestId}
      renderFooter={renderFooter}
    />
  );
};

export default SimulatedTestPage;

function renderFooter(session: SimulatedTestSession, sessionId: number): ReactNode {
  return (
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
  );
}
