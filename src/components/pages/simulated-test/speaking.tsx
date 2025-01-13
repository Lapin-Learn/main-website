import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import SpeakingEndTest from "@/components/molecules/speaking-end-test";
import PartInstruction from "@/components/molecules/speaking-part-instruction";
import SpeakingMicTest from "@/components/organisms/speaking-introduction";
import SpeakingQuestion from "@/components/organisms/speaking-question";
import { useGetSkillTestData, useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useAudioRecording from "@/hooks/use-audio-recording";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { SpeakingContent, STSkillPageProps } from "@/lib/types/simulated-test.type";

const SpeakingPage = ({ skillTestId, sessionId }: STSkillPageProps) => {
  const {
    testState,
    showInstruction,
    position: { part: currentPart },
    reset: resetSpeakingTest,
    setInitialPart,
    setMode,
  } = useSpeakingTestState();

  const { data: session } = useGetSTSessionDetail(sessionId);
  const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);
  const { stopRecording } = useAudioRecording();
  const { reset: resetRecording } = useRecordingStore();
  const { stopTimer, deleteTimer } = useGlobalTimerStore();
  const { t } = useTranslation("simulatedTest");

  useEffect(() => {
    return () => {
      stopRecording();
      resetRecording();
      resetSpeakingTest();
    };
  }, []);

  useEffect(() => {
    if (session) {
      setMode(session.mode);
      setInitialPart(session.parts[0]);
    }
  }, [session]);

  useEffect(() => {
    return () => {
      resetSpeakingTest();
    };
  }, []);

  useEffect(() => {
    if (testState === EnumSimulatedTestSessionStatus.FINISHED) {
      if (session) {
        stopTimer(timerKeys.testDetail(session.id));
        deleteTimer(timerKeys.testDetail(session.id));
      }
    }
  }, [testState]);

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      {testContent && !isLoading ? (
        testState === EnumSimulatedTestSessionStatus.NOT_STARTED ? (
          <SpeakingMicTest mode={session.mode} sessionId={sessionId} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <h4 className="text-heading-4 font-semibold">
              {testState === EnumSimulatedTestSessionStatus.FINISHED
                ? t("speaking.endTestTitle")
                : PART_TITLES[currentPart]}
            </h4>
            {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS && showInstruction && (
              <PartInstruction sessionId={sessionId} />
            )}
            {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS && !showInstruction && (
              <SpeakingQuestion
                content={testContent as SpeakingContent}
                session={session}
                audioSrc="audioSrc"
              />
            )}
            {testState === EnumSimulatedTestSessionStatus.FINISHED && <SpeakingEndTest />}
          </div>
        )
      ) : (
        <div className="grid size-full flex-1 place-items-center">
          <Loader2 className="animate-spin text-neutral-300" size={24} />
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;
