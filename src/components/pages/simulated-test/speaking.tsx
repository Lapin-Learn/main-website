import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import PartInstruction from "@/components/molecules/speaking-part-instruction";
import SpeakingMicTest from "@/components/organisms/speaking-mic-test";
import SpeakingQuestion from "@/components/organisms/speaking-question";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_TITLES } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import mockSpeaking from "@/lib/mock/mockSpeaking.json";

const SpeakingPage = () => {
  //TODO: Handle get test data
  const isLoading = false;
  const navigate = useNavigate();
  const { getMicrophonePermission, stopRecording } = useAudioRecording();
  const { stopStream, reset: resetRecording } = useRecordingStore();
  const {
    testState,
    showInstruction,
    position: { part: currentPart },
    reset: resetSpeakingTest,
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
      stopRecording();
      resetRecording();
      resetSpeakingTest();
    };
  }, [stopStream, resetRecording, resetSpeakingTest, getMicrophonePermission]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      {mockSpeaking && !isLoading ? (
        <>
          {testState === EnumSimulatedTestSessionStatus.NOT_STARTED ? (
            <SpeakingMicTest />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              <h4 className="text-heading-4 font-semibold">
                {testState === EnumSimulatedTestSessionStatus.FINISHED
                  ? "Kết thúc bài thi Speaking"
                  : PART_TITLES[currentPart]}
              </h4>
              {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS && showInstruction && (
                <PartInstruction />
              )}
              {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS && !showInstruction && (
                <SpeakingQuestion content={mockSpeaking} audioSrc="audioSrc" />
              )}
              {testState === EnumSimulatedTestSessionStatus.FINISHED && (
                <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-center">
                      Bạn đã hoàn thành bài thi Speaking. Vui lòng chờ kết quả từ chúng tôi.
                    </p>
                    <p className="text-center">Bạn có thể nghe lại phần bài nói của mình ở đây:</p>
                  </div>
                  <audio controls src="audioSrc" className="w-full" />
                  <Button
                    onClick={() =>
                      navigate({
                        to: "/practice",
                      })
                    }
                  >
                    Trang chủ
                  </Button>
                </div>
              )}
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
