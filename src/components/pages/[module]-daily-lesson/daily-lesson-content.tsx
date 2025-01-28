import { Link } from "@tanstack/react-router";
import { MoveLeft } from "lucide-react";
import { useEffect } from "react";

import AnswerInput from "@/components/organisms/[module]-daily-lesson/answer-input";
import QuestionCard from "@/components/organisms/[module]-daily-lesson/question-card";
import LessonResultDialog from "@/components/organisms/lesson-result-dialog";
import { Button } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { useLessonQuestions } from "@/hooks/react-query/use-daily-lesson";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson/$dailyLessonId";

import QuestionActionButtons from "../../organisms/question-action-buttons";

const DailyLessonContent = () => {
  const { dailyLessonId } = Route.useParams();
  const { data, isLoading, isSuccess } = useLessonQuestions(dailyLessonId);

  const {
    startLesson,
    clear,
    learnerAnswers,
    lessonState: { result, isCompleted },
  } = useDailyLessonStore();

  useEffect(() => {
    if (isSuccess && data) {
      startLesson(data.questionToLessons.map((q) => q.question));
    }
  }, [isSuccess, data, startLesson]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess && data) {
    const numberOfQuestions = data.questionToLessons.length;
    const currentQuestion = learnerAnswers.length ?? 0;
    const currentProgress = Math.max(1, (currentQuestion / numberOfQuestions) * 100);

    return (
      <div className="mx-auto flex h-screen flex-col items-center gap-2 p-8">
        <div className="mb-4 flex w-full flex-row items-center gap-4">
          <Link to="/daily-lesson">
            <Button
              variant="ghost"
              size="icon"
              className="size-12 rounded-full hover:text-neutral-500"
            >
              <MoveLeft size={24} />
            </Button>
          </Link>
          <Progress
            className="h-4 w-full"
            value={currentProgress}
            indicatorClassName={cn(
              "bg-gradient-to-r duration-500",
              currentProgress > 50 ? " from-primary-300 to-primary" : " from-blue-100 to-blue-500"
            )}
          />
          <div>{`${currentQuestion}/${numberOfQuestions}`}</div>
        </div>
        <div className="flex h-full flex-1 flex-col items-center justify-between gap-4">
          <QuestionCard />
          <AnswerInput
            renderCheckButton={(getCorrectAnswers, disabled) => (
              <QuestionActionButtons getCorrectAnswers={getCorrectAnswers} disabled={disabled} />
            )}
          />
        </div>
        <LessonResultDialog open={isCompleted && result !== null} />
      </div>
    );
  }
};

export default DailyLessonContent;
