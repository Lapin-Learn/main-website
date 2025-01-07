import { Fragment, PropsWithChildren, ReactNode, useEffect } from "react";

import ListeningPage from "@/components/pages/simulated-test/listening";
import ReadingPage from "@/components/pages/simulated-test/reading";
import WritingPage from "@/components/pages/simulated-test/writing";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTestAnswer, SimulatedTestSession } from "@/lib/types/simulated-test.type";

interface PageLayoutProps {
  header: ReactNode;
  session: SimulatedTestSession;
  answerStatus?: boolean[];
  renderFooter: (session: SimulatedTestSession, answerStatus?: boolean[]) => ReactNode;
}

export default function PageLayout({
  header,
  session,
  answerStatus,
  renderFooter,
}: PageLayoutProps) {
  const sessionId = session.id;
  const skillTestId = session.skillTest.id;

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      {header}
      <DefaultAnswerWrapper draftAnswers={session.responses}>
        <SkillContentFactory
          skill={session.skillTest.skill}
          skillTestId={skillTestId}
          sessionId={sessionId}
        />
        {renderFooter(session, answerStatus)}
      </DefaultAnswerWrapper>
    </div>
  );
}

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

/**
 * With each type of skill, you can add a new component here, only for render the content
 */
const SkillContentFactory = ({
  skill,
  skillTestId,
  sessionId,
}: {
  skill: EnumSkill;
  skillTestId: number;
  sessionId: number;
}) => {
  switch (skill) {
    case EnumSkill.reading:
      return <ReadingPage skillTestId={skillTestId} sessionId={sessionId} />;
    case EnumSkill.listening:
      return <ListeningPage skillTestId={skillTestId} sessionId={sessionId} />;
    case EnumSkill.writing:
      return <WritingPage />;
    default:
      return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Coming soon</h1>
          <p className="text-center text-sm">This skill is not available yet</p>
        </div>
      );
  }
};
