import { useNavigate } from "@tanstack/react-router";
import { Fragment, PropsWithChildren, useEffect } from "react";

import ErrorFallback from "@/components/ErrorFallback";
import ListeningPage from "@/components/pages/simulated-test/listening";
import ReadingPage from "@/components/pages/simulated-test/reading";
import { useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useSimulatedTestState, { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { SimulatedTestAnswer } from "@/lib/types/simulated-test.type";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

import Footer from "./footer";
import Header from "./header";

/**
 * Render the simulated test page layout
 * The layout should decide which component should be render, escape checking condition in every component, as many stateless component as possible
 */
const SimulatedTestPage = () => {
  const { sessionId } = Route.useSearch();
  const { navigateToPart, position, resetTest } = useSimulatedTestState();
  const navigate = useNavigate();
  const { data: session, isLoading, isSuccess, isError } = useGetSTSessionDetail(sessionId);

  useEffect(() => {
    return () => {
      if (!sessionId) {
        navigate({ to: "/practice" });
      }
      resetTest();
    };
  }, []);

  useEffect(() => {
    if (isSuccess && !session) {
      navigate({ to: "/practice" });
    } else {
      if (session) {
        navigateToPart(session.skillTest.partsDetail[0].startQuestionNo, session.parts[0]);
        if (session.status === EnumSimulatedTestSessionStatus.FINISHED) {
          navigate({
            to: "result",
            search: {
              sessionId,
            },
          });
        }
      }
    }
  }, [isSuccess, session]);

  if (isError) {
    return <ErrorFallback />;
  }

  // TODO: enhance UI loading here
  if (isLoading || !session) {
    return <div className="size-screen grid place-items-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Header currentPart={position.part} session={session} />
      <DefaultAnswerWrapper draftAnswers={session.responses}>
        <SkillContentFactory skill={session.skillTest.skill} />
        <Footer
          sessionId={parseInt(sessionId)}
          partDetails={
            session.skillTest.partsDetail.map((part, index) => ({
              ...part,
              part: session.parts[index],
            })) ?? []
          }
        />
      </DefaultAnswerWrapper>
    </div>
  );
};

export default SimulatedTestPage;

/**
 * With each type of skill, you can add a new component here, only for render the content
 */
const SkillContentFactory = ({ skill }: { skill: EnumSkill }) => {
  switch (skill) {
    case EnumSkill.reading:
      return <ReadingPage />;
    case EnumSkill.listening:
      return <ListeningPage />;
    default:
      return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Coming soon</h1>
          <p className="text-center text-sm">This skill is not available yet</p>
        </div>
      );
  }
};

const DefaultAnswerWrapper = ({
  children,
  draftAnswers,
}: PropsWithChildren<{
  draftAnswers: SimulatedTestAnswer[] | null;
}>) => {
  const { loadAllAnswers } = useAnswerStore();
  useEffect(() => {
    loadAllAnswers(
      draftAnswers
        ? draftAnswers.reduce(
            (acc, answer) => {
              acc[answer.questionNo.toString()] = answer.answer;
              return acc;
            },
            {} as Record<string, string | null>
          )
        : {}
    );
  }, [draftAnswers]);
  return <Fragment>{children}</Fragment>;
};
