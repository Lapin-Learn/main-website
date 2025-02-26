import { useEffect } from "react";

import { getDuration } from "@/lib/utils";

import { useLessonCompletion } from "./react-query/use-daily-lesson";
import useDailyLessonStore from "./zustand/use-daily-lesson-store";

/**
 * Hook to handle the completion of the daily lesson after the user has answered all the questions.
 * It will send the answers to the backend and update the lesson state.
 * @NganTrucLe
 * I separated the logic to reuse it in different components.
 */
const useAnswerDailyLesson = ({
  isJumpBand = false,
  lessonId,
}: {
  isJumpBand?: boolean;
  lessonId?: number | string;
}) => {
  const {
    lessonState: { isCompleted, startTime },
    learnerAnswers,
    setResult,
  } = useDailyLessonStore();
  const lessonCompletionMutation = useLessonCompletion();

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
          lessonId: Number(lessonId),
          correctAnswers: statistic.numberOfCorrect,
          wrongAnswers: statistic.totalOfQuestions - statistic.numberOfCorrect,
          duration: getDuration(startTime),
          isJumpBand,
        },
        {
          onSuccess: (returnData) => {
            setResult(returnData);
          },
        }
      );
    }
  }, [isCompleted]);
};

export default useAnswerDailyLesson;
