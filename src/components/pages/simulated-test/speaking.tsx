import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import PartInstruction from "@/components/molecules/speaking-part-instruction";
import SpeakingMicTest from "@/components/organisms/speaking-mic-test";
import SpeakingQuestion from "@/components/organisms/speaking-question";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import mockSpeaking from "@/lib/mock/mockSpeaking.json";

const SpeakingPage = () => {
  //TODO: Handle get test data
  const isLoading = false;
  const { getMicrophonePermission } = useAudioRecording();
  const { testState, stopStream, reset } = useRecordingStore();
  const {
    showInstruction,
    position: { part: currentPart },
  } = useSpeakingTestState();

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
      reset();
    };
  }, [stopStream, reset]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      {mockSpeaking && !isLoading ? (
        <>
          {testState === EnumSimulatedTestSessionStatus.NOT_STARTED ? (
            <SpeakingMicTest />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              <h4 className="text-heading-4 font-semibold">{PART_TITLES[currentPart]}</h4>
              {showInstruction && <PartInstruction />}
              {!showInstruction && <SpeakingQuestion content={mockSpeaking} audioSrc="audioSrc" />}
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
