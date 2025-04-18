import { CheckIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import { useLessonCompletion } from "@/hooks/react-query/use-daily-lesson";
import useAnswerDailyLesson from "@/hooks/use-answer-daily-lesson";
import useBreakPoint from "@/hooks/use-screen-size";
import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { cn } from "@/lib/utils";

type QuestionActionButtonsProps = {
  getCorrectAnswers: () => DLAnswer;
  disabled: boolean;
  isJumpBand?: boolean;
  lessonId: number | string;
};
const QuestionActionButtons = ({
  getCorrectAnswers,
  disabled,
  isJumpBand = false,
  lessonId,
}: QuestionActionButtonsProps) => {
  const [randomEncourage, setRandomEncourage] = useState<number>(0);
  const isMobile = useBreakPoint() === "xs";
  const {
    answerQuestion,
    nextQuestion,
    lessonState: { currentQuestion, isCompleted },
    learnerAnswers,
    setShowExplanation,
  } = useDailyLessonStore();
  const lessonCompletionMutation = useLessonCompletion();

  const { t } = useTranslation("question");
  const isAnswered = currentQuestion ? learnerAnswers[currentQuestion.index] !== undefined : false;

  const handleOnClick = () => {
    const answer = getCorrectAnswers();
    answerQuestion(answer);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;

    if (isAnswered) {
      if (!lessonCompletionMutation.isPending && !isCompleted) {
        nextQuestion();
      }
    } else {
      if (!disabled) {
        handleOnClick();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAnswered, currentQuestion, disabled, lessonCompletionMutation.isPending, isCompleted]);

  useAnswerDailyLesson({
    isJumpBand,
    lessonId,
  });

  useEffect(() => {
    if (isAnswered) {
      const isCorrectAll = currentQuestion
        ? learnerAnswers[currentQuestion.index].numberOfCorrect ===
          learnerAnswers[currentQuestion.index].totalOfQuestions
        : false;

      const randomValue = isCorrectAll
        ? Math.random() * Number(t("general.correct.length"))
        : Math.random() * Number(t("general.incorrect.length"));
      setRandomEncourage(randomValue);
    }
  }, [isAnswered, currentQuestion]);

  if (isAnswered) {
    const isCorrectAll = currentQuestion
      ? learnerAnswers[currentQuestion.index].numberOfCorrect ===
        learnerAnswers[currentQuestion.index].totalOfQuestions
      : false;

    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "sticky bottom-0 mt-2 md:mt-4 flex w-full items-center justify-between border-t-2 px-4 md:px-56 md:py-2",
          isCorrectAll
            ? "bg-green-50 border-t-2 border-green-200"
            : "bg-red-50 border-t-2 border-red-100"
        )}
      >
        <div className="flex gap-2">
          <div
            className={cn(
              "size-4 md:size-8 relative rounded-full",
              isCorrectAll ? "bg-green-500" : "bg-red-500"
            )}
          >
            {isCorrectAll ? (
              <CheckIcon
                className="absolute-center"
                strokeWidth={4}
                size={isMobile ? 12 : 20}
                color="white"
              />
            ) : (
              <XIcon
                className="absolute-center"
                strokeWidth={4}
                size={isMobile ? 12 : 20}
                color="white"
              />
            )}
          </div>
          <div className="flex flex-col justify-start gap-1">
            <h6
              className={`text-heading-6 font-bold ${isCorrectAll ? "text-green-900" : "text-red-900"}`}
            >
              {t(
                `general.${isCorrectAll ? "correct" : "incorrect"}.${Math.floor(randomEncourage)}`
              )}
            </h6>
            <Button
              variant="link"
              className={`h-fit justify-start p-0 text-small font-normal underline ${isCorrectAll ? "text-green-900" : "text-red-900"}`}
              onClick={() => setShowExplanation(true)}
            >
              {t("general.viewExplanation")}
            </Button>
          </div>
        </div>
        <Button
          onClick={nextQuestion}
          variant={isCorrectAll ? "green" : "red"}
          size="lg"
          className="bottom-8 my-4 w-48 max-w-full rounded-lg md:my-6 md:h-12 md:rounded-xl"
          disabled={lessonCompletionMutation.isPending || isCompleted}
        >
          {t("general.continue")}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="sticky bottom-0 mt-2 flex w-full items-center justify-end border-t bg-white px-4 md:mt-4 md:px-56 md:py-2">
      <Button
        onClick={handleOnClick}
        variant="black"
        size="lg"
        className="my-4 w-full max-w-full rounded-lg md:my-6 md:h-12 md:w-48 md:rounded-xl"
        disabled={disabled}
      >
        {t("general.check")}
      </Button>
    </div>
  );
};

export default QuestionActionButtons;
