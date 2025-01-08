import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import SpeakingEndTest from "@/components/molecules/speaking-end-test";
import PartInstruction from "@/components/molecules/speaking-part-instruction";
import SpeakingMicTest from "@/components/organisms/speaking-mic-test";
import SpeakingQuestion from "@/components/organisms/speaking-question";
import { useGetSkillTestData, useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { SpeakingContent, STSkillPageProps } from "@/lib/types/simulated-test.type";

const SpeakingPage = ({ skillTestId, sessionId }: STSkillPageProps) => {
  //TODO: Handle get test data
  const {
    testState,
    showInstruction,
    position: { part: currentPart },
    reset: resetSpeakingTest,
  } = useSpeakingTestState();
  const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);
  const { data: session } = useGetSTSessionDetail(sessionId);
  const { getMicrophonePermission, stopRecording } = useAudioRecording();
  const { stopStream, reset: resetRecording } = useRecordingStore();
  const { t } = useTranslation("simulatedTest");

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    getMicrophonePermission();
    return () => {
      stopStream();
      stopRecording();
      resetRecording();
      resetSpeakingTest();
    };
  }, []);

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      {testContent && !isLoading ? (
        <>
          {testState === EnumSimulatedTestSessionStatus.NOT_STARTED ? (
            <SpeakingMicTest />
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
          )}
        </>
      ) : (
        <div className="grid size-full flex-1 place-items-center">
          <Loader2 className="animate-spin text-neutral-300" size={24} />
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;
