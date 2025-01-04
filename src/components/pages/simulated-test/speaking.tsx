import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import SpeakingEndTest from "@/components/molecules/speaking-end-test";
import PartInstruction from "@/components/molecules/speaking-part-instruction";
import SpeakingMicTest from "@/components/organisms/speaking-mic-test";
import SpeakingQuestion from "@/components/organisms/speaking-question";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import mockSpeaking from "@/lib/mock/mockSpeaking.json";
import { SpeakingContent } from "@/lib/types/simulated-test.type";

const SpeakingPage = () => {
  //TODO: Handle get test data
  const isLoading = false;
  const { getMicrophonePermission, stopRecording } = useAudioRecording();
  const { stopStream, reset: resetRecording } = useRecordingStore();
  const {
    testState,
    showInstruction,
    position: { part: currentPart },
    reset: resetSpeakingTest,
    setInitialPart,
  } = useSpeakingTestState();
  const { t } = useTranslation("simulatedTest");

  const speakingData: SpeakingContent = mockSpeaking;

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
    if (speakingData.part1) {
      setInitialPart(1);
      return;
    }
    if (speakingData.part2) {
      setInitialPart(2);
      return;
    }
    setInitialPart(3);
  }, []);

  useEffect(() => {
    getMicrophonePermission();
    return () => {
      stopStream();
      stopRecording();
      resetRecording();
      resetSpeakingTest();
    };
  }, [stopStream, resetRecording, resetSpeakingTest, getMicrophonePermission]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      {speakingData && !isLoading ? (
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
                <PartInstruction />
              )}
              {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS && !showInstruction && (
                <SpeakingQuestion content={mockSpeaking} audioSrc="audioSrc" />
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
