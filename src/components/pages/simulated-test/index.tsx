import LoadingPage from "@components/pages/loading-page.tsx";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import ErrorFallback from "@/components/ErrorFallback";
import { FloatingNote } from "@/components/molecules/floating-note";
import WarningScreenSizeDialog from "@/components/organisms/warning-screen-size-dialog";
import PageLayout from "@/components/templates/simulated-test-detail-layout";
import { useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

import Footer from "./footer";
import Header from "./header";
import SpeakingHeader from "./speaking-header";

/**
 * Render the simulated test page layout
 * The layout should decide which component should be rendered, escape checking condition in every component, as many stateless component as possible
 */
const SimulatedTestPage = () => {
  const { sessionId } = Route.useSearch();
  const { position, resetTest } = useSimulatedTestState();
  const {
    position: { part: speakingPart },
  } = useSpeakingTestState();
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
      if (session && session.status === EnumSimulatedTestSessionStatus.FINISHED) {
        navigate({
          to: "result",
          search: {
            sessionId,
          },
        });
      }
    }
  }, [isSuccess, session]);

  if (isError) {
    return <ErrorFallback />;
  }

  if (isLoading || !session) {
    return <LoadingPage />;
  }

  return (
    <>
      <WarningScreenSizeDialog closable />
      <PageLayout
        header={
          session.skillTest.skill === EnumSkill.speaking ? (
            <SpeakingHeader currentPart={speakingPart} session={session} />
          ) : (
            <Header currentPart={position.part} session={session} />
          )
        }
        session={session}
        renderFooter={renderFooter}
      />
      <FloatingNote />
    </>
  );
};

export default SimulatedTestPage;

function renderFooter(session: SimulatedTestSession) {
  return (
    <Footer
      partDetails={
        session.skillTest.partsDetail.map((part, index) => ({
          ...part,
          part: session.parts[index],
        })) ?? []
      }
      skill={session.skillTest.skill}
    />
  );
}
