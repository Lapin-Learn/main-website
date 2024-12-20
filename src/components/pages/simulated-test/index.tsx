import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import ListeningPage from "@/components/pages/simulated-test/listening";
import ReadingPage from "@/components/pages/simulated-test/reading";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

import Footer from "./footer";
import Header from "./header";

/**
 * Render the simulated test page layout
 * The layout should decide which component should be render, escape checking condition in every component, as many stateless component as possible
 */
const SimulatedTestPage = () => {
  const { sessionId, skillTestId } = Route.useSearch();
  const { navigateToPart, position, resetTest } = useSimulatedTestState();
  const navigate = useNavigate();
  const skill: EnumSkill = EnumSkill.reading;

  // TODO: render the page for each skill base on the skillTest.skill value from get session

  // TODO: calling api to get the detail of the session before render the outlet
  useEffect(() => {
    navigateToPart(1, 1);
    return () => {
      if (!sessionId) {
        navigate({ to: "/practice" });
      }
      resetTest();
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Header
        currentPart={position.part}
        testId={skillTestId}
        skillTestId={skillTestId}
        skill={skill}
        timeLimit={40 * 60}
      />
      <SkillContentFactory skill={skill} />
      <Footer sessionId={parseInt(sessionId)} />
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
