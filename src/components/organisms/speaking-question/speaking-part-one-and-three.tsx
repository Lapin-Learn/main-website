import { ArrowRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import useCountdown from "@/hooks/use-countdown";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { NEXT_QUESTION_COUNT_DOWN, SPEAKING_PART_ONE_AND_THREE_DURATION } from "@/lib/consts";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";

import { SpeakingQuestionProps } from ".";
import { getNextButtonText } from "./helpers";

const SpeakingPartOneAndThree = ({ content, session }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    navigateToPart,
    setTestState,
  } = useSpeakingTestState();
  const { stopRecording } = useAudioRecording();
  const { timeLeft, restart, isRunning, isEnd } = useCountdown(NEXT_QUESTION_COUNT_DOWN);
  const { getTimer } = useGlobalTimerStore();
  const { t } = useTranslation("simulatedTest");

  const testTime = getTimer(timerKeys.testDetail(session.id))?.time;

  const handleNextQuestion = useCallback(() => {
    restart();
    stopRecording();
  }, [stopRecording, restart]);

  useEffect(() => {
    if (session.mode === EnumMode.FULL_TEST && testTime === 0) {
      handleNextQuestion();
      const currentPartIndex = session.parts.findIndex((part) => part === currentPart);
      if (currentPartIndex + 1 < session.parts.length) {
        navigateToPart(1, session.parts[currentPartIndex + 1]);
      } else {
        setTestState(EnumSimulatedTestSessionStatus.FINISHED);
      }
    }
  }, [testTime]);

  useEffect(() => {
    if (!isRunning || !isEnd) return;

    if (question === content?.content.length) {
      const currentPartIndex = session.parts.findIndex((part) => part === currentPart);
      if (currentPartIndex + 1 < session.parts.length) {
        navigateToPart(1, session.parts[currentPartIndex + 1]);
      } else {
        setTestState(EnumSimulatedTestSessionStatus.FINISHED);
      }
    } else {
      navigateToPart(question + 1, currentPart);
    }
  }, [isRunning, isEnd]);

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <h6 className="text-heading-6 font-semibold">{`Question ${question}`}</h6>
        <p className="text-center">{content?.content[question - 1]}</p>
      </div>
      <RecordingButton
        onStop={handleNextQuestion}
        duration={SPEAKING_PART_ONE_AND_THREE_DURATION}
        diasbled={isRunning}
      />
      <Button
        type="button"
        variant={question === content?.content.length ? "default" : "ghost"}
        className="w-full flex-1 sm:w-fit"
        disabled={isRunning}
        onClick={handleNextQuestion}
      >
        <div className="flex items-center gap-2">
          {t(
            getNextButtonText(
              isRunning,
              currentPart === session.parts[session.parts.length - 1],
              question === content?.content.length
            ),
            { time: timeLeft }
          )}
          <ArrowRight className="size-4" />
        </div>
      </Button>
    </div>
  );
};

export default SpeakingPartOneAndThree;
