import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useCountdown from "@/hooks/use-countdown";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import {
  NEXT_QUESTION_COUNT_DOWN,
  SPEAKING_PART_ONE_AND_THREE_DURATION_DEV,
  SPEAKING_PART_ONE_AND_THREE_DURATION_PROD,
} from "@/lib/consts";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { AudioSource } from "@/lib/types";
import { isDevEnv } from "@/lib/utils";

import { SpeakingQuestionProps } from ".";
import { getNextButtonText } from "./helpers";

const SpeakingPartOneAndThree = ({ content, session }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    navigateToPart,
    setTestState,
    addSpeakingSource,
  } = useSpeakingTestState();
  const { timeLeft, restart, isRunning, isEnd } = useCountdown(NEXT_QUESTION_COUNT_DOWN);
  const { getTimer } = useGlobalTimerStore();
  const recordingButtonRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation("simulatedTest");

  const testTime = getTimer(timerKeys.testDetail(session.id))?.time;

  const handleNavigateToNextPart = () => {
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
  };

  const handleNextQuestion = (src?: AudioSource) => {
    if (src) {
      restart();
      addSpeakingSource({
        url: src.audioUrl,
        blob: src.audioBlob,
        partNo: currentPart,
        questionNo: question,
        file: new File([src.audioBlob], `speaking-${currentPart}-${question}.webm`),
      });
    } else {
      handleNavigateToNextPart();
    }
  };

  useEffect(() => {
    if (isEnd) {
      handleNavigateToNextPart();
    }
  }, [isEnd]);

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

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <h6 className="text-heading-6 font-semibold">{`Question ${question}`}</h6>
        <p className="text-center">{content?.content[question - 1]}</p>
      </div>
      <RecordingButton
        onStop={handleNextQuestion}
        duration={
          isDevEnv()
            ? SPEAKING_PART_ONE_AND_THREE_DURATION_DEV
            : SPEAKING_PART_ONE_AND_THREE_DURATION_PROD
        }
        disabled={isRunning}
        ref={recordingButtonRef}
      />
      <Button
        type="button"
        variant="ghost"
        className="flex w-full flex-1 items-center gap-2 sm:w-fit"
        disabled={isRunning}
        onClick={() => {
          recordingButtonRef.current?.click();
        }}
      >
        {t(
          getNextButtonText(
            isRunning,
            currentPart === session.parts[session.parts.length - 1],
            question === content?.content.length
          ),
          { time: timeLeft }
        )}
      </Button>
    </div>
  );
};

export default SpeakingPartOneAndThree;
