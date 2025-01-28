import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";

type QuestionActionButtonsProps = {
  getCorrectAnswers: () => DLAnswer;
  disabled: boolean;
};
const QuestionActionButtons = ({ getCorrectAnswers, disabled }: QuestionActionButtonsProps) => {
  const {
    answerQuestion,
    nextQuestion,
    lessonState: { currentQuestion },
    learnerAnswers,
  } = useDailyLessonStore();
  const { t } = useTranslation("question");
  const isAnswered = currentQuestion ? learnerAnswers[currentQuestion.index] !== undefined : false;

  const handleOnClick = () => {
    const answer = getCorrectAnswers();
    answerQuestion(answer);
  };

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
