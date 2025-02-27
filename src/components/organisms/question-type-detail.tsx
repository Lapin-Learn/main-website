import { Loader2, Triangle, X } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";

import UnlockLesson from "@/assets/icons/daily-lesson/unlock-lesson.svg";
import BandScoreSelect from "@/components/molecules/daily-lesson/bandscore-select";
import LessonCarousel from "@/components/molecules/daily-lesson/lesson-carousel";
import { Button, Card, CardContent, CardTitle } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetLessonList, useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { BAND_SCORES } from "@/lib/consts";
import { EnumBandScore } from "@/lib/enums";
import { formatLearningDuration } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson";

import QuestionTypeDetailInstruction from "./instruction";

type QuestionTypeDetailProps = PropsWithChildren<{
  className?: string;
}>;

const checkAvailable = (bandScore: EnumBandScore, currentBandScore: EnumBandScore) => {
  const bandScoreList = Object.values(EnumBandScore);
  const currentIndex = bandScoreList.indexOf(currentBandScore);
  const targetIndex = bandScoreList.indexOf(bandScore);
  return currentIndex >= targetIndex;
};

const checkAvailableJumpBand = (bandScore: EnumBandScore, currentBandScore: EnumBandScore) => {
  const bandScoreList = Object.values(EnumBandScore);
  const currentIndex = bandScoreList.indexOf(currentBandScore);
  const targetIndex = bandScoreList.indexOf(bandScore);
  return currentIndex + 1 == targetIndex;
};

const QuestionTypeDetail = ({ className, children }: QuestionTypeDetailProps) => {
  const searchParams = Route.useSearch();
  const { skill: exerciseSkill, bandScore, questionTypeId } = searchParams;
  const { data: questionTypes } = useGetQuestionTypes(exerciseSkill);

  const currentQuestionType = questionTypes?.find(
    (questionType) => questionType.id === Number(questionTypeId)
  );

  const { bandScore: currentBandScore } = currentQuestionType?.progress || {
    bandScore: EnumBandScore.PRE_IELTS,
  };

  const isComingSoon = [EnumBandScore.BAND_6, EnumBandScore.BAND_65, EnumBandScore.BAND_7].includes(
    bandScore
  );
  const isAvailable = checkAvailable(bandScore, currentBandScore);
  const isAvailableJumpBand = checkAvailableJumpBand(bandScore, currentBandScore);

  const { data, isLoading: isLoadingLessons } = useGetLessonList({
    questionTypeId,
    bandScore: bandScore ?? currentBandScore,
    enabled: isAvailable,
  });

  const [current, setCurrent] = useState(0);

  const navigate = Route.useNavigate();
  const { t } = useTranslation("dailyLesson");

  const handleCloseDetailDialog = () => {
    navigate({
      search: {
        skill: exerciseSkill,
        bandScore: undefined,
      },
    });
  };

  return (
    <Dialog
      open={bandScore !== undefined && questionTypeId !== undefined && questionTypeId !== 0}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseDetailDialog();
        }
      }}
    >
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent
        showClose={false}
        className="m-0 flex h-[95%] flex-col items-center justify-between gap-0 md:left-[99%] md:w-[50vw] md:-translate-x-full lg:w-[30vw]"
      >
        <DialogHeader className="sticky top-0 w-full">
          <div className="flex w-full flex-row items-start justify-between">
            <BandScoreSelect />
            <div className="flex !size-28 flex-row items-center overflow-hidden rounded-full lg:!size-40">
              <img
                src={currentQuestionType?.image?.url}
                alt={currentQuestionType?.name}
                className="h-full object-cover"
              />
            </div>
            <DialogClose onClick={handleCloseDetailDialog} className="ml-6">
              <X className="text-black" />
            </DialogClose>
          </div>
          <div className="flex flex-col items-center justify-center">
            <DialogTitle className="font-bold text-neutral-900 md:text-xl lg:text-2xl">
              {currentQuestionType?.name}
            </DialogTitle>
            <DialogDescription className="text-body font-normal text-supporting-text">
              {BAND_SCORES[bandScore as EnumBandScore]} &nbsp;&nbsp;|&nbsp;&nbsp;
              {t("questionType.totalLearnedTime")}&nbsp;
              {formatLearningDuration(data?.totalLearningDuration ?? 0)}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mt-4 flex size-full flex-col items-center justify-start space-y-2 md:space-y-6">
          {!isComingSoon && isAvailable && (
            <QuestionTypeDetailInstruction
              title={currentQuestionType?.name}
              instruction={currentQuestionType?.instructions[0]}
            >
              <Button className="flex w-fit flex-row space-x-1 bg-[#EFEFEF] transition-colors duration-200 hover:bg-neutral-100 focus:bg-neutral-100">
                <div className="flex size-4 items-center justify-center md:size-5 lg:size-6">
                  <Triangle className="size-2/3 rotate-90 text-black" fill="black" />
                </div>
                <p className="text-[10px] font-semibold text-black md:text-[12px] lg:text-[15px]">
                  {t("questionType.theoryPractice")}
                </p>
              </Button>
            </QuestionTypeDetailInstruction>
          )}

          <div className="w-full">
            {isComingSoon ? (
              <Card>
                <CardContent className="flex h-40 flex-1 items-center justify-center p-0 opacity-50">
                  <CardTitle>{t("questionType.comingSoon")}</CardTitle>
                </CardContent>
              </Card>
            ) : !isAvailable ? (
              <div className="grid h-full place-items-center content-center space-y-8 p-8">
                <img
                  src={UnlockLesson}
                  alt="Unlock Lesson"
                  className="size-16 md:size-24 lg:size-28"
                />
                <p className="text-center text-body font-normal">{t("questionType.unavailable")}</p>
              </div>
            ) : isLoadingLessons ? (
              <div className="grid h-56 place-items-center">
                <Loader2 className="size-12 animate-spin text-supporting-text" />
              </div>
            ) : (
              <LessonCarousel
                lessons={data?.lessons ?? []}
                setCurrent={setCurrent}
                skill={exerciseSkill}
              />
            )}
          </div>
        </div>

        {isAvailableJumpBand ? (
          <Button
            size="3xl"
            variant="black"
            className="absolute inset-x-6 bottom-6 shrink-0 rounded-md px-4 py-2.5"
            onClick={() => {
              navigate({
                to: `/daily-lesson/jump-band`,
                search: searchParams,
              });
            }}
          >
            <p className="text-body font-medium text-white">{t("questionType.practiceBtn")}</p>
          </Button>
        ) : (
          <Button
            size="3xl"
            className="absolute inset-x-6 bottom-6 shrink-0 rounded-md px-4 py-2.5"
            disabled={!isAvailable || isComingSoon || data?.lessons[current]?.id === undefined}
            onClick={() => {
              navigate({
                to: `/daily-lesson/${data?.lessons[current].id}`,
                search: searchParams,
              });
            }}
          >
            <p className="text-body font-medium text-white">{t("questionType.practiceBtn")}</p>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDetail;
