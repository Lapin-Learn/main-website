import { useNavigate } from "@tanstack/react-router";
import { Triangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PracticeIcon from "@/assets/icons/practice";
import { Button } from "@/components/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useGetLessonList, useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { EnumBandScore, EnumSkill } from "@/lib/enums";
import { formatLearningDuration } from "@/lib/utils";

import QuestionTypeDetailInstruction from "./instruction";

type QuestionTypeDetailProps = {
  questionTypeId: string;
  exerciseSkill: EnumSkill;
  className?: string;
  children: React.ReactNode;
};

const QuestionTypeDetail = ({
  questionTypeId,
  exerciseSkill,
  className,
  children,
}: QuestionTypeDetailProps) => {
  // const { questionTypeId } = Route.useParams();
  const { data, isSuccess } = useGetLessonList(questionTypeId);
  const { data: questionTypes } = useGetQuestionTypes(exerciseSkill);

  const currentQuestionType = questionTypes?.find(
    (questionType) => questionType.id === Number(questionTypeId)
  );
  const { bandScore } = currentQuestionType?.progress || { bandScore: "pre_ielts" };
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation("dailyLesson");
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      {isSuccess && (
        <DialogContent
          showClose={false}
          className="m-0 flex h-[95%] flex-col items-center justify-between md:left-[98%] md:w-[50vw] md:-translate-x-full md:overflow-y-scroll lg:w-[30vw]"
        >
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-center justify-end">
              <DialogClose>
                <X className="text-black" />
              </DialogClose>
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-2 md:space-y-4 lg:space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex !size-24 flex-row items-center overflow-hidden rounded-full lg:!size-36">
                  <img
                    src={currentQuestionType?.image?.url}
                    alt={currentQuestionType?.name}
                    className="object-contain"
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
                <Button className="flex w-fit flex-row space-x-1 bg-[#EFEFEF] px-7 py-3">
                  <div className="flex size-4 items-center justify-center md:size-5 lg:size-6">
                    <Triangle className="size-2/3 rotate-90 text-black" fill="black" />
                  </div>
                  <p className="text-[10px] font-semibold text-black md:text-[12px] lg:text-[15px]">
                    {t("questionType.theoryPractice")}
                  </p>
                </Button>
              </QuestionTypeDetailInstruction>

              <div className="w-full">
                <Carousel className="" setApi={setApi}>
                  <CarouselContent className="m-0">
                    {data?.lessons.map((lesson, index) => {
                      return (
                        <CarouselItem
                          className="flex-col items-center space-y-2 rounded-md bg-neutral-50 px-5 py-4"
                          key={lesson.id}
                        >
                          <div className="flex w-full flex-row items-center justify-between">
                            <CarouselPrevious className="size-6 border-none bg-transparent shadow-none" />
                            <p className="text-body font-semibold text-black">
                              {index + 1}/{data?.lessons.length}
                            </p>
                            <CarouselNext className="size-6 border-none bg-transparent shadow-none" />
                          </div>
                          <div className="flex w-full flex-col items-start justify-start space-y-2">
                            <div className="flex size-12 items-center justify-center rounded-full bg-white">
                              <PracticeIcon width={20} height={20} fill="" />
                            </div>
                            <p className="text-left text-heading-6 font-bold text-neutral-900 md:text-heading-5 lg:text-heading-4">
                              {lesson.name}
                            </p>
                          </div>
                          <div className="flex w-full flex-row items-center justify-center space-x-4">
                            <Progress
                              value={(lesson.xp / 50) * 100}
                              className="h-3 flex-1 bg-[#CCCCCC]"
                            />
                            <p className="text-[14px] font-normal text-[#929292]">
                              {t("questionTypes.xp")} {lesson.xp}/50
                            </p>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full rounded-md px-4 py-2.5"
            onClick={() => {
              navigate({
                to: `/daily-lesson/${questionTypes?.[current].id}`,
                search: { questionTypeId },
              });
            }}
          >
            <p className="text-body font-medium text-white">{t("questionType.practiceBtn")}</p>
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default QuestionTypeDetail;
