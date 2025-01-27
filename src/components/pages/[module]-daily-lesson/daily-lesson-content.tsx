import { Link } from "@tanstack/react-router";
import { MoveLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import AnswerInput from "@/components/organisms/[module]-daily-lesson/answer-input";
import QuestionCard from "@/components/organisms/[module]-daily-lesson/question-card";
import { Button } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { useLessonQuestions } from "@/hooks/react-query/use-daily-lesson";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson/$dailyLessonId";

const DailyLessonContent = () => {
  const { dailyLessonId } = Route.useParams();
  const { data, isLoading, isSuccess } = useLessonQuestions(dailyLessonId);
  const { t } = useTranslation("question");

  const { startLesson, clear, lessonState, nextQuestion } = useDailyLessonStore();

  useEffect(() => {
    if (isSuccess && data) {
      startLesson(data.questionToLessons.map((q) => q.question));
    }
    return () => {
      clear();
    };
  }, [isSuccess, data, clear, startLesson]);

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess && data) {
    const numberOfQuestions = data.questionToLessons.length;
    const currentQuestion = lessonState.currentQuestion?.index ?? 0;
    const currentProgress = Math.max(1, (currentQuestion / numberOfQuestions) * 100);

    return (
      <div className="mx-auto flex h-screen flex-col items-center gap-2 p-8">
        <div className="mb-4 flex w-full flex-row items-center gap-4">
          <Link to="/daily-lesson">
            <MoveLeft size={24} />
          </Link>
          <Progress
            className="h-4 w-full"
            value={currentProgress}
            indicatorClassName={cn(
              "bg-gradient-to-r duration-500",
              currentProgress > 50 ? " from-secondary to-primary" : " from-blue-100 to-blue-500"
            )}
          />
          <div>{`${currentQuestion}/${numberOfQuestions}`}</div>
        </div>
        <div className="h-full flex-1">
          <QuestionCard />
          <AnswerInput />
        </div>
        <Button
          onClick={nextQuestion}
          variant="black"
          size="lg"
          className="bottom-8 my-8 h-12 w-96 max-w-full"
        >
          {t("general.check")}
        </Button>
      </div>
    );
  }
};

export default DailyLessonContent;
