import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useCountdown from "@/hooks/use-countdown";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import {
  NEXT_QUESTION_COUNT_DOWN,
  SPEAKING_PART_TWO_DURATION,
  SPEAKING_PART_TWO_PREPARE_DURATION,
} from "@/lib/consts";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { AudioSource } from "@/lib/types";

import { SpeakingQuestionProps } from ".";
import { getNextButtonText } from "./helpers";

const SpeakingPartTwo = ({ content, session }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    setTestState,
    navigateToPart,
    addSpeakingSource,
  } = useSpeakingTestState();
  const { recordingStatus } = useRecordingStore();
  const { timeLeft, restart, isRunning, isEnd } = useCountdown(NEXT_QUESTION_COUNT_DOWN);
  const {
    time: preparationTime,
    resume: resumePreparation,
    stop: stopPreparation,
    isEnd: isEndPreparation,
  } = useCountdown(SPEAKING_PART_TWO_PREPARE_DURATION);
  const { startTimer, getTimer } = useGlobalTimerStore();
  const recordingButtonRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation("simulatedTest");

  const testTime = getTimer(timerKeys.testDetail(session.id))?.time;

  const handleStart = useCallback(() => {
    stopPreparation();
    if (session.mode === EnumMode.FULL_TEST) {
      startTimer(timerKeys.testDetail(session.id));
    }
  }, [startTimer, session.id]);

  const handleNextPart = (src?: AudioSource) => {
    restart();
    if (src) {
      addSpeakingSource({
        url: src.audioUrl,
        blob: src.audioBlob,
        partNo: currentPart,
        questionNo: question,
        file: new File([src.audioBlob], `speaking-${currentPart}-${question}.webm`),
      });
    }
  };

  useEffect(() => {
    resumePreparation();
  }, [resumePreparation]);

  useEffect(() => {
    if (isEndPreparation && recordingButtonRef.current) {
      recordingButtonRef.current.click();
      if (session.mode === EnumMode.FULL_TEST) {
        startTimer(timerKeys.testDetail(session.id));
      }
    }
  }, [isEndPreparation]);

  useEffect(() => {
    if (session.mode === EnumMode.FULL_TEST && testTime === 0) {
      handleNextPart();
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

  if (!content) return null;

  return (
    <div className="grid w-[880px] grid-cols-12 gap-6">
      <div className="col-span-8 flex flex-col justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
        {parse(content.content[0])}
      </div>
      <div className="col-span-4 flex flex-col items-center justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-10">
        <p className="text-center">
          {isEndPreparation || recordingStatus === "recording" || isRunning
            ? t("speaking.startSpeakingPartTwo")
            : t("speaking.preparePartTwo", { time: preparationTime })}
        </p>
        <RecordingButton
          onStart={handleStart}
          onStop={handleNextPart}
          duration={SPEAKING_PART_TWO_DURATION}
          disabled={isRunning}
          ref={recordingButtonRef}
        />
        <Button
          type="button"
          className="w-full flex-1 sm:w-fit"
          disabled={isRunning}
          onClick={() => handleNextPart}
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
    </div>
  );
};

export default SpeakingPartTwo;
