import { MoveLeft } from "lucide-react";
import { useEffect } from "react";

import AnswerInput from "@/components/organisms/[module]-daily-lesson/answer-input";
import DailyLessonExitDialog from "@/components/organisms/[module]-daily-lesson/daily-lesson-exit-dialog";
import QuestionCard from "@/components/organisms/[module]-daily-lesson/question-card";
import { ExplanationDialog } from "@/components/organisms/explanation-dialog";
import LessonResultDialog from "@/components/organisms/lesson-result-dialog";
import ResultStepperProvider from "@/components/organisms/lesson-result-dialog/result-stepper-provider";
import { Button } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { useLessonQuestions } from "@/hooks/react-query/use-daily-lesson";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/daily-lesson/$dailyLessonId";

import QuestionActionButtons from "../../organisms/question-action-buttons";

const DailyLessonContent = () => {
  const { dailyLessonId } = Route.useParams();
  const { data, isLoading, isSuccess } = useLessonQuestions(dailyLessonId);

  const {
    startLesson,
    clear,
    learnerAnswers,
    lessonState: { result },
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
      <div className="mx-auto flex h-screen flex-col items-center gap-2">
        <div className="mb-4 flex w-full flex-row items-center gap-4 border-b md:px-36 md:py-2">
          <DailyLessonExitDialog
            triggerButton={
              <Button
                variant="ghost"
                size="icon"
                className="size-12 rounded-full hover:text-neutral-500"
              >
                <MoveLeft size={24} />
              </Button>
            }
          />
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
        <ExplanationDialog />
        <ResultStepperProvider result={result}>
          <LessonResultDialog defaultOpen={result !== null} />
        </ResultStepperProvider>
      </div>
    );
  }
};

export default DailyLessonContent;
