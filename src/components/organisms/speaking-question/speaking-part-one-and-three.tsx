import { ArrowRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import useCountdown from "@/hooks/use-countdown";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { NEXT_QUESTION_COUNT_DOWN, SPEAKING_PART_ONE_AND_THREE_DURATION } from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

import { SpeakingQuestionProps } from ".";
import { getNextButtonText } from "./helpers";

const SpeakingPartOneAndThree = ({ content }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    navigateToPart,
    setTestState,
    addSpeakingSource,
  } = useSpeakingTestState();
  const { stopRecording } = useAudioRecording();
  const { timeLeft, restart, isRunning, isEnd } = useCountdown(NEXT_QUESTION_COUNT_DOWN);
  const { t } = useTranslation("simulatedTest");

  const handleNextQuestion = useCallback(() => {
    restart();
    stopRecording((audioUrl) => {
      addSpeakingSource(audioUrl);
    });
  }, [stopRecording, restart]);

  useEffect(() => {
    if (!isRunning || !isEnd) return;

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
    } else if (currentPart === 3) {
      if (question === content.part3.length) {
        setTestState(EnumSimulatedTestSessionStatus.FINISHED);
      } else {
        navigateToPart(question + 1, 3);
      }
    }
  }, [isRunning, isEnd, currentPart]);

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <h6 className="text-heading-6 font-semibold">{`Question ${question}`}</h6>
        <p className="text-center">
          {currentPart === 1 && content.part1[question - 1]}
          {currentPart === 3 && content.part3[question - 1]}
        </p>
      </div>
      <RecordingButton
        onStop={handleNextQuestion}
        duration={SPEAKING_PART_ONE_AND_THREE_DURATION}
        diasbled={isRunning}
      />
      <Button
        type="button"
        variant={question === content.part1.length ? "default" : "ghost"}
        className="w-full flex-1 sm:w-fit"
        disabled={isRunning}
        onClick={handleNextQuestion}
      >
        <div className="flex items-center gap-2">
          {t(getNextButtonText(isRunning, currentPart, question, content), { time: timeLeft })}
          <ArrowRight className="size-4" />
        </div>
      </Button>
    </div>
  );
};

export default SpeakingPartOneAndThree;
