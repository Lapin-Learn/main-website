import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, ButtonProps, Typography } from "@/components/ui";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { useSpeakingEvaluation } from "@/hooks/react-query/use-daily-lesson";
import useAnswerDailyLesson from "@/hooks/use-answer-daily-lesson";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { AudioSource, SpeakingServiceResponse } from "@/lib/types";
import { cn } from "@/lib/utils";

import Transcript from "../speaking-transcript";
import RecordingBar from "./recording-bar";

const Pronounciation = () => {
  const [evaluateResult, setEvaluateResult] = useState<SpeakingServiceResponse>();

  const {
    lessonState: { currentQuestion, isCompleted },
    answerQuestion,
    nextQuestion,
    learnerAnswers,
  } = useDailyLessonStore();
  const { t } = useTranslation("question");

  const { mutate: evaluate, isPending } = useSpeakingEvaluation();

  const handleSendAudio = (speakingSrc: AudioSource | null) => {
    if (speakingSrc) {
      evaluate(
        {
          blob: speakingSrc.audioBlob,
          originalQuestion: currentQuestion?.question?.content.question || "",
        },
        {
          onSuccess: (returnData) => {
            setEvaluateResult(returnData);
            answerQuestion({
              numberOfCorrect: parseInt(returnData.pronunciation_accuracy),
              totalOfQuestions: 100,
            });
          },
        }
      );
    }
  };

  const theme = useMemo(
    () => getTheme(parseInt(evaluateResult?.pronunciation_accuracy ?? "0")),
    [evaluateResult]
  );

  const handleNextQuestion = () => {
    if (!isCompleted) {
      nextQuestion();
    } else {
      console.log(learnerAnswers);
    }
  };

  useAnswerDailyLesson();

  return (
    <>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 1 }}
        className="grid h-full flex-1 place-items-center gap-y-6"
      >
        <Transcript
          orginalQuestion={currentQuestion?.question?.content.question ?? ""}
          correctLetters={evaluateResult?.correct_letters ?? []}
          orginalIPATranscript={evaluateResult?.original_ipa_transcript ?? ""}
        />
        <div />
      </motion.div>
      {!evaluateResult && (
        <RecordingBar disabled={isCompleted || isPending} sendAudio={handleSendAudio} />
      )}
      {evaluateResult && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "fixed bottom-0 flex w-full items-center justify-between border-t bg-white md:px-56 md:py-8 ",
            theme.backgroundClassName
          )}
        >
          <div className="flex flex-row items-center gap-4">
            <AnimatedCircularProgressBar
              value={parseInt(evaluateResult?.pronunciation_accuracy ?? "0")}
              min={0}
              max={100}
              className="size-28"
              gaugePrimaryColor={theme.gaugePrimaryColor}
              gaugeSecondaryColor={theme.gaugeSecondaryColor}
            />
            <div className="flex flex-col gap-2">
              <Typography variant="h3" className={cn("font-semibold", theme.titleClassName)}>
                {t("speaking.resultTitle", {
                  context: theme.title,
                })}
              </Typography>
              <Typography variant="h5" className="font-medium text-neutral-600">
                {t("speaking.result", {
                  percentage: parseInt(evaluateResult?.pronunciation_accuracy ?? "0"),
                })}
              </Typography>
            </div>
          </div>
          <Button
            onClick={handleNextQuestion}
            variant={theme.buttonVariant as ButtonProps["variant"]}
            size="lg"
            disabled={isCompleted}
            className="bottom-8 my-6 h-12 w-48 max-w-full rounded-xl"
          >
            {t("general.continue")}
          </Button>
        </motion.div>
      )}
    </>
  );
};
export default Pronounciation;

const getTheme = (accuracy: number) => {
  if (accuracy > 80) {
    return {
      backgroundClassName: "bg-green-50 border-t-2 border-green-200",
      title: "correct",
      titleClassName: "text-green-onSurface",
      gaugePrimaryColor: "#24AE26",
      gaugeSecondaryColor: "#CCCCCC",
      buttonVariant: "green",
    };
  } else if (accuracy > 50) {
    return {
      backgroundClassName: "border-t-2 bg-orange-50 border-orange-200",
      title: "almost",
      titleClassName: "text-primary-700",
      gaugePrimaryColor: "#f97316",
      gaugeSecondaryColor: "#CCCCCC",
      buttonVariant: "default",
    };
  }
  return {
    backgroundClassName: "bg-red-50 border-t-2 border-red-100",
    title: "incorrect",
    titleClassName: "text-red-onSurface",
    gaugePrimaryColor: "#EA2121",
    gaugeSecondaryColor: "#CCCCCC",
    buttonVariant: "red",
  };
};
