import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import useCountdown from "@/hooks/use-countdown";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

import { SpeakingQuestionProps } from ".";

const formatPartTwoContent = (content: string) => {
  const [question, details] = content.split("You should say:\n-");
  const detailItems = details.split("\n- ").filter((item) => item);
  return (
    <>
      <h5 className="text-center text-heading-5 font-semibold">{question}</h5>
      <ul className="list-inside list-disc">
        <p>You should say:</p>
        {detailItems.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </>
  );
};

const SpeakingPartTwo = ({ content }: SpeakingQuestionProps) => {
  const { setTestState, navigateToPart, addSpeakingSource } = useSpeakingTestState();
  const { stopRecording } = useAudioRecording();
  const { time, timeLeft, restart } = useCountdown(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const { t } = useTranslation("simulatedTest");

  const handleNextPart = useCallback(() => {
    setIsCountingDown(true);
    restart();
    stopRecording((audioUrl) => {
      addSpeakingSource(audioUrl);
    });
  }, [stopRecording, restart]);

  const getNextButtonText = () => {
    if (isCountingDown) {
      if (content.part3) {
        return `${t("speaking.nextPartInSeconds", { time })}`;
      } else {
        return t("speaking.endTestInSeconds", { time });
      }
    }
    return content.part3 ? "Part 3" : t("speaking.endTest");
  };

  useEffect(() => {
    if (isCountingDown && timeLeft === 0) {
      if (content.part3) {
        navigateToPart(1, 3);
      } else {
        setTestState(EnumSimulatedTestSessionStatus.FINISHED);
        alert("End of test");
      }
      setIsCountingDown(false);
    }
  }, [isCountingDown, timeLeft]);

  return (
    <div className="grid w-[880px] grid-cols-12 gap-6">
      <div className="col-span-8 flex flex-col justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
        {formatPartTwoContent(content.part2[0])}
      </div>
      <div className="col-span-4 flex flex-col items-center justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-10">
        <p className="text-center">{t("speaking.preparePartTwo")}</p>
        <div className="relative h-full w-fit overflow-visible">
          <RecordingButton onStop={handleNextPart} duration={30} diasbled={isCountingDown} />
        </div>
        <Button
          type="button"
          className="w-full flex-1 sm:w-fit"
          disabled={isCountingDown}
          onClick={handleNextPart}
        >
          <div className="flex items-center gap-2">
            {getNextButtonText()}
            <ArrowRight className="size-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SpeakingPartTwo;
