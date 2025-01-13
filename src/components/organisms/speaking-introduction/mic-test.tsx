import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useMicrophone } from "@/components/providers/microphone-permission-provider";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { MIC_TEST_DURATION } from "@/lib/consts";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";

import RecordingButton from "../../molecules/recording-button";

export type MicTestProps = {
  mode: EnumMode;
  sessionId: number;
};

function MicTest({ mode, sessionId }: MicTestProps) {
  const { permission } = useMicrophone();
  const { stopRecording } = useAudioRecording();
  const { setTestState } = useSpeakingTestState();
  const { startTimer } = useGlobalTimerStore();
  const { t } = useTranslation("simulatedTest");

  const handleStartTest = () => {
    stopRecording();
    setTestState(EnumSimulatedTestSessionStatus.IN_PROGRESS);
    if (mode === EnumMode.PRACTICE) {
      startTimer(timerKeys.testDetail(sessionId));
    }
  };

  return (
    <div className="flex w-[800px] flex-col items-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-8">
      <div className="relative h-full w-fit overflow-visible">
        <RecordingButton duration={MIC_TEST_DURATION} playBack />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p>{t("speaking.microphoneTest", { seconds: 10 })}</p>
        <p>{t("microphone.permission", { ns: "common" })}</p>
      </div>
      <Button
        type="submit"
        className="w-full flex-1 sm:w-fit"
        onClick={handleStartTest}
        disabled={permission !== "granted"}
      >
        <div className="flex items-center gap-2">
          <Zap fill="white" strokeWidth={0} className="size-4" />
          {t("startTest")}
        </div>
      </Button>
    </div>
  );
}

export default MicTest;
