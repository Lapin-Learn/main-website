import AnswerInput from "@components/organisms/[module]-daily-lesson/answer-input";
import DailyLessonExitDialog from "@components/organisms/[module]-daily-lesson/daily-lesson-exit-dialog.tsx";
import QuestionCard from "@components/organisms/[module]-daily-lesson/question-card.tsx";
import { ExplanationDialog } from "@components/organisms/explanation-dialog";
import LessonResultDialog from "@components/organisms/lesson-result-dialog";
import ResultStepperProvider from "@components/organisms/lesson-result-dialog/result-stepper-provider.tsx";
import QuestionActionButtons from "@components/organisms/question-action-buttons.tsx";
import WarningScreenSizeDialog from "@components/organisms/warning-screen-size-dialog.tsx";
import LoadingPage from "@components/pages/loading-page.tsx";
import { Button, Typography } from "@components/ui";
import { Progress } from "@components/ui/progress.tsx";
import { useJumpBandQuestions } from "@hooks/react-query/use-daily-lesson.ts";
import { MoveLeft } from "lucide-react";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

import UnlockLesson from "@/assets/icons/daily-lesson/unlock-lesson.svg";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/daily-lesson/jump-band";

const JumpBandPage = () => {
  const { t } = useTranslation();
  const search = Route.useSearch();
  const { questionTypeId } = search;
  const navigate = Route.useNavigate();

  const { data, isLoading } = useJumpBandQuestions({ questionTypeId });

  const {
    clear,
    lessonState: { isStarted, result },
    learnerAnswers,
    startLesson,
  } = useDailyLessonStore();

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  const handleStartJumpBand = () => {
    console.log(data);
    if (!data) return;
    startLesson(data.questions);
  };

  const handleGoBack = () => {
    navigate({
      to: "/daily-lesson",
      search,
    });
  };

  if (isLoading) return <LoadingPage />;

  if (isStarted && data) {
    const numberOfQuestions = data?.questions.length;
    const currentQuestion = learnerAnswers.length ?? 0;
    const currentProgress = Math.max(1, (currentQuestion / numberOfQuestions) * 100);

    return (
      <div className="mx-auto flex h-screen w-full flex-col items-center bg-[#F8F8F8]">
        <div className="sticky top-0 z-10 flex w-full flex-row items-center gap-2 border-b bg-white px-4 md:gap-4 md:px-48">
          <WarningScreenSizeDialog />
          <DailyLessonExitDialog
            triggerButton={
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full hover:text-neutral-500 md:size-12"
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
        <div className="relative flex h-full w-screen flex-1 flex-col overflow-x-hidden overflow-y-scroll">
          <QuestionCard />
          <AnswerInput
            className="h-full flex-1"
            renderCheckButton={(getCorrectAnswers, disabled) => (
              <QuestionActionButtons
                getCorrectAnswers={getCorrectAnswers}
                disabled={disabled}
                isJumpBand={true}
                lessonId={data.lastLessonId}
              />
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

  return (
    <div className="grid h-screen w-screen place-items-center content-center justify-center gap-8">
      <img src={UnlockLesson} alt="Unlock Lesson" className="size-40" />
      <div className="flex flex-col items-center gap-2">
        <Typography variant="h3" className="font-normal">
          <Trans
            i18nKey={"jump-band.guidance"}
            ns="dailyLesson"
            components={{ bold: <span className="font-semibold" /> }}
          />
        </Typography>
        <Typography variant="h3" className="font-normal">
          <Trans
            i18nKey={"jump-band.numberOfQuestions"}
            values={{
              questions: data?.questions.length ?? 10,
            }}
            ns="dailyLesson"
            components={{ bold: <span className="font-semibold" /> }}
          />
        </Typography>
      </div>
      <div className="flex flex-row gap-4">
        <Button size="3xl" variant="ghost" onClick={handleGoBack} className="md:min-w-60">
          {t("go_back")}
        </Button>
        <Button
          size="3xl"
          disabled={isLoading}
          onClick={handleStartJumpBand}
          className="md:min-w-60"
        >
          {t("get_started")}
        </Button>
      </div>
    </div>
  );
};

export default JumpBandPage;
