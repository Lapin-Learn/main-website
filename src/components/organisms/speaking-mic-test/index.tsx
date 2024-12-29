import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useSpeakingStore } from "@/hooks/zustand/use-recording-store";
import { MIC_TEST_DURATION } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

import RecordingButton from "../../molecules/recording-button";
import { InstructionCarousel } from "../instruction-carousel";

const SpeakingMicTest = () => {
  const { permission, setTestState } = useSpeakingStore();
  const { stopRecording } = useAudioRecording();
  const { t } = useTranslation("simulatedTest");

  const handleStartTest = () => {
    stopRecording();
    setTestState(EnumSimulatedTestSessionStatus.IN_PROGRESS);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h4 className="text-heading-4 font-semibold">{t("mode.practice")}</h4>
      <div className="flex flex-col items-center gap-10">
        <InstructionCarousel />
        <div className="flex w-[800px] flex-col items-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-8">
          <div className="relative h-full w-fit overflow-visible">
            <RecordingButton duration={MIC_TEST_DURATION} playBack />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>{t("speaking.microphoneTest", { seconds: 10 })}</p>
            <p>{t("speaking.microphonePermission")}</p>
          </div>
          <Button
            type="submit"
            className="w-full flex-1 sm:w-fit"
            onClick={handleStartTest}
            disabled={!permission}
          >
            <div className="flex items-center gap-2">
              <Zap fill="white" strokeWidth={0} className="size-4" />
              {t("startTest")}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingMicTest;
