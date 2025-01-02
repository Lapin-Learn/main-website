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

const SpeakingPartOneAndThree = ({ content }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    navigateToPart,
    setTestState,
    addSpeakingSource,
  } = useSpeakingTestState();
  const { stopRecording } = useAudioRecording();
  const { time, timeLeft, restart } = useCountdown(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const { t } = useTranslation("simulatedTest");

  const handleNextQuestion = useCallback(() => {
    setIsCountingDown(true);
    restart();
    stopRecording((audioUrl) => {
      addSpeakingSource(audioUrl);
    });
  }, [stopRecording, restart]);

  const getNextButtonText = () => {
    if (isCountingDown) {
      if (
        (currentPart === 1 && question < content.part1.length) ||
        (currentPart === 3 && question < content.part3.length)
      ) {
        return `${t("speaking.nextQuestionInSeconds", { time })}`;
      } else if (currentPart === 1 && question === content.part1.length) {
        if (content.part2 || content.part3) {
          return `${t("speaking.nextPartInSeconds", { time })}`;
        } else {
          return t("speaking.endTestInSeconds", { time });
        }
      } else if (currentPart === 3 && question === content.part3.length) {
        return t("speaking.endTestInSeconds", { time });
      } else {
        return `${t("speaking.nextPartInSeconds", { time })}`;
      }
    }
    if (currentPart === 1 && question === content.part1.length) {
      if (content.part2) {
        return "Part 2";
      } else if (content.part3) {
        return "Part 3";
      } else {
        return t("speaking.endTest");
      }
    } else if (currentPart === 3 && question === content.part3.length) {
      return t("speaking.endTest");
    } else {
      return t("nextQuestion");
    }
  };

  useEffect(() => {
    if (isCountingDown && timeLeft === 0) {
      if (currentPart === 1) {
        if (question === content.part1.length) {
          if (content.part2) {
            navigateToPart(1, 2);
          } else if (content.part3) {
            navigateToPart(1, 3);
          } else {
            setTestState(EnumSimulatedTestSessionStatus.FINISHED);
          }
        } else {
          navigateToPart(question + 1, 1);
        }
        setIsCountingDown(false);
      } else if (currentPart === 3) {
        if (question === content.part3.length) {
          setTestState(EnumSimulatedTestSessionStatus.FINISHED);
        } else {
          navigateToPart(question + 1, 3);
        }
        setIsCountingDown(false);
      }
    }
  }, [isCountingDown, timeLeft, currentPart]);

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-heading-5 font-semibold">{`Question ${question}`}</h4>
        <p className="text-center">
          {currentPart === 1 && content.part1[question - 1]}
          {currentPart === 3 && content.part3[question - 1]}
        </p>
      </div>
      <RecordingButton onStop={handleNextQuestion} duration={30} diasbled={isCountingDown} />
      <Button
        type="button"
        variant={question === content.part1.length ? "default" : "ghost"}
        className="w-full flex-1 sm:w-fit"
        disabled={isCountingDown}
        onClick={handleNextQuestion}
      >
        <div className="flex items-center gap-2">
          {getNextButtonText()}
          <ArrowRight className="size-4" />
        </div>
      </Button>
    </div>
  );
};

export default SpeakingPartOneAndThree;
