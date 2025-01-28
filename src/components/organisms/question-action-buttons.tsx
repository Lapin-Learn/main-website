import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import { useLessonCompletion } from "@/hooks/react-query/use-daily-lesson";
import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { getDuration } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson/$dailyLessonId";

type QuestionActionButtonsProps = {
  getCorrectAnswers: () => DLAnswer;
  disabled: boolean;
};
const QuestionActionButtons = ({ getCorrectAnswers, disabled }: QuestionActionButtonsProps) => {
  const {
    answerQuestion,
    nextQuestion,
    lessonState: { currentQuestion, isCompleted, startTime },
    learnerAnswers,
    setResult,
  } = useDailyLessonStore();
  const lessonCompletionMutation = useLessonCompletion();
  const { dailyLessonId } = Route.useParams();

  const { t } = useTranslation("question");
  const isAnswered = currentQuestion ? learnerAnswers[currentQuestion.index] !== undefined : false;

  const handleOnClick = () => {
    const answer = getCorrectAnswers();
    answerQuestion(answer);
  };

  useEffect(() => {
    if (isCompleted) {
      const statistic = learnerAnswers.reduce(
        (acc, answer) => {
          if (answer.correct_letters) {
            const accCorrectLetters = answer.correct_letters
              .split("")
              .filter((letter) => letter === "1").length;
            return {
              numberOfCorrect: acc.numberOfCorrect + accCorrectLetters,
              totalOfQuestions: acc.totalOfQuestions + 1,
            };
          }
          const accCorrect = acc.numberOfCorrect + answer.numberOfCorrect;
          const accTotal = acc.totalOfQuestions + answer.totalOfQuestions;

          return { numberOfCorrect: accCorrect, totalOfQuestions: accTotal };
        },
        { numberOfCorrect: 0, totalOfQuestions: 0 }
      );

      lessonCompletionMutation.mutate(
        {
          lessonId: Number(dailyLessonId),
          correctAnswers: statistic.numberOfCorrect,
          wrongAnswers: statistic.totalOfQuestions - statistic.numberOfCorrect,
          duration: getDuration(startTime),
        },
        {
          onSuccess: ({ bonusCarrot, bonusXP, correctAnswers, duration }) => {
            setResult({
              carrot: bonusCarrot,
              exp: bonusXP,
              percent: Math.ceil((correctAnswers / statistic.totalOfQuestions) * 100),
              timer: duration,
            });
          },
        }
      );
    }
  }, [isCompleted]);

  if (isAnswered) {
    const isCorrectAll = currentQuestion
      ? learnerAnswers[currentQuestion.index].numberOfCorrect ===
        learnerAnswers[currentQuestion.index].totalOfQuestions
      : false;

    return (
      <Button
        onClick={nextQuestion}
        variant={isCorrectAll ? "green" : "red"}
        size="lg"
        className="bottom-8 my-8 h-14 w-96 max-w-full rounded-xl"
      >
        {t("general.continue")}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleOnClick}
      variant="black"
      size="lg"
      className="bottom-8 my-8 h-14 w-96 max-w-full rounded-xl"
      disabled={disabled}
    >
      {t("general.check")}
    </Button>
  );
};

export default QuestionActionButtons;
