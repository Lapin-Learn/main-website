import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import useCountdown from "@/hooks/use-countdown";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import {
  NEXT_QUESTION_COUNT_DOWN,
  SPEAKING_PART_TWO_DURATION,
  SPEAKING_PART_TWO_PREPARE_DURATION,
} from "@/lib/consts";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

import { SpeakingQuestionProps } from ".";
import { getNextButtonText } from "./helpers";

const PartTwoContentFormatted = ({ content }: { content: string }) => {
  const [question, details] = content.split("You should say:");
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

const SpeakingPartTwo = ({ content, session }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    setTestState,
    navigateToPart,
    addSpeakingSource,
  } = useSpeakingTestState();
  const { recordingStatus } = useRecordingStore();
  const { stopRecording } = useAudioRecording();
  const { timeLeft, restart, isRunning, isEnd } = useCountdown(NEXT_QUESTION_COUNT_DOWN);
  const {
    time,
    resume,
    isEnd: isEndPreparation,
  } = useCountdown(SPEAKING_PART_TWO_PREPARE_DURATION);
  const recordingButtonRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation("simulatedTest");

  const handleNextPart = useCallback(() => {
    restart();
    stopRecording();
  }, [stopRecording, restart, addSpeakingSource]);

  useEffect(() => {
    resume();
  }, [resume]);

  useEffect(() => {
    if (isEndPreparation && recordingButtonRef.current) {
      recordingButtonRef.current.click();
    }
  }, [isEndPreparation]);

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
        <PartTwoContentFormatted content={content.content[0]} />
      </div>
      <div className="col-span-4 flex flex-col items-center justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-10">
        <p className="text-center">
          {isEndPreparation || recordingStatus === "recording"
            ? t("speaking.startSpeakingPartTwo")
            : t("speaking.preparePartTwo", { time })}
        </p>
        <RecordingButton
          onStop={handleNextPart}
          duration={SPEAKING_PART_TWO_DURATION}
          diasbled={isRunning}
          ref={recordingButtonRef}
        />
        <Button
          type="button"
          className="w-full flex-1 sm:w-fit"
          disabled={isRunning}
          onClick={handleNextPart}
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
