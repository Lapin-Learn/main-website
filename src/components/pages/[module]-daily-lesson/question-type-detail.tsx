import { useNavigate } from "@tanstack/react-router";
import { Triangle, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import BandScoreSelect from "@/components/molecules/daily-lesson/bandscore-select";
import LessonCarousel from "@/components/molecules/daily-lesson/lesson-carousel";
import { Button, Card, CardContent, CardTitle } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetLessonList, useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { EnumBandScore } from "@/lib/enums";
import { formatLearningDuration } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson/";

import QuestionTypeDetailInstruction from "./instruction";

type QuestionTypeDetailProps = {
  questionTypeId: string;
  className?: string;
  children: React.ReactNode;
};

const checkAvailable = (bandScore: EnumBandScore, currentBandScore: EnumBandScore) => {
  const bandScoreList = Object.values(EnumBandScore);
  const currentIndex = bandScoreList.indexOf(currentBandScore);
  const targetIndex = bandScoreList.indexOf(bandScore);
  return currentIndex >= targetIndex;
};

const QuestionTypeDetail = ({ questionTypeId, className, children }: QuestionTypeDetailProps) => {
  const { skill: exerciseSkill, bandScore } = Route.useSearch();
  const { data: questionTypes } = useGetQuestionTypes(exerciseSkill);
  const [bandSelected, _] = useState(EnumBandScore.PRE_IELTS);

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

  const { data } = useGetLessonList({
    questionTypeId,
    bandScore: bandScore ?? currentBandScore,
    enabled: isAvailable,
  });

  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();
  const { t } = useTranslation("dailyLesson");

  const handleCloseDetailDialog = () => {
    navigate({
      to: "/daily-lesson",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent
        showClose={false}
        onPointerDownOutside={handleCloseDetailDialog}
        className="m-0 flex h-[95%] flex-col items-center justify-between md:left-[99%] md:w-[50vw] md:-translate-x-full md:overflow-y-scroll lg:w-[30vw]"
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <BandScoreSelect value={bandSelected} />
            <DialogClose onClick={handleCloseDetailDialog}>
              <X className="text-black" />
            </DialogClose>
          </div>
          <div className="flex w-full flex-col items-center justify-center space-y-2 md:space-y-4 lg:space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex !size-24 flex-row items-center overflow-hidden rounded-full lg:!size-36">
                <img
                  src={currentQuestionType?.image?.url}
                  alt={currentQuestionType?.name}
                  className="h-full object-cover"
                />
              </div>
              <div className="flex size-fit flex-col items-center justify-center">
                <DialogTitle className="font-bold text-neutral-900 md:text-xl lg:text-2xl">
                  {currentQuestionType?.name}
                </DialogTitle>
                <DialogDescription className="text-body font-normal text-supporting-text">
                  {bandScore === EnumBandScore.PRE_IELTS
                    ? EnumBandScore.PRE_IELTS.toUpperCase()
                    : `Band ${bandScore}`}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  {t("questionType.totalLearnedTime")}{" "}
                  {formatLearningDuration(data?.totalLearningDuration || 0)}
                </DialogDescription>
              </div>
            </div>

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

            <div className="w-full">
              {isComingSoon ? (
                <Card>
                  <CardContent className="flex h-40 flex-1 items-center justify-center p-0 opacity-50">
                    <CardTitle>{t("questionType.comingSoon")}</CardTitle>
                  </CardContent>
                </Card>
              ) : !isAvailable ? (
                <Card>
                  <CardContent className="flex h-40 flex-1 items-center justify-center p-0 opacity-50">
                    <CardTitle>{t("questionType.unavailable")}</CardTitle>
                  </CardContent>
                </Card>
              ) : (
                <LessonCarousel lessons={data?.lessons || []} setCurrent={setCurrent} />
              )}
            </div>
          </div>
        </div>

        <Button
          size="2xl"
          className="w-full rounded-md px-4 py-2.5"
          disabled={!isAvailable || isComingSoon}
          onClick={() => {
            navigate({
              to: `/daily-lesson/${data?.lessons[current].id}`,
              search: { questionTypeId },
            });
          }}
        >
          <p className="text-body font-medium text-white">{t("questionType.practiceBtn")}</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDetail;
