import { useNavigate } from "@tanstack/react-router";
import { Triangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { useGetLessonList, useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { EnumBandScore, EnumSkill } from "@/lib/enums";
import { Instruction } from "@/lib/types";
import { formatLearningDuration } from "@/lib/utils";

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
  const [count, setCount] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation("dailyLesson");
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Drawer>
      <DrawerTrigger className={className}>{children}</DrawerTrigger>
      {isSuccess && (
        <DrawerContent className=" m-3 flex w-1/3 flex-col justify-between rounded-2xl p-6">
          <div className="size-full">
            <div className="flex flex-row justify-end">
              <DrawerClose>
                <X className="text-black" />
              </DrawerClose>
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <img
                  src={currentQuestionType?.image?.url}
                  alt={currentQuestionType?.name}
                  className="size-36 rounded-full"
                />
                <div className="flex flex-col items-center justify-center">
                  <p className="text-heading-4 font-bold text-neutral-900">
                    {currentQuestionType?.name}
                  </p>
                  <p className="text-body font-normal text-supporting-text">
                    {bandScore === EnumBandScore.PRE_IELTS
                      ? EnumBandScore.PRE_IELTS.toUpperCase()
                      : `Band ${bandScore}`}
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    {t("questionType.totalLearnedTime")}{" "}
                    {formatLearningDuration(data?.totalLearningDuration || 0)}
                  </p>
                </div>
              </div>
              <QuestionTypeDetailInstruction
                title={currentQuestionType?.name}
                instruction={currentQuestionType?.instructions[0]}
              >
                <Button className="flex w-fit flex-row space-x-1 bg-[#EFEFEF] px-7 py-3">
                  <div className="flex size-6 items-center justify-center">
                    <Triangle className="h-3 w-2.5 rotate-90 text-black" fill="black" />
                  </div>
                  <p className="text-[15px] font-semibold text-black">
                    {t("questionType.theoryPractice")}
                  </p>
                </Button>
              </QuestionTypeDetailInstruction>
              <Carousel className="w-full" setApi={setApi}>
                <CarouselContent>
                  {data?.lessons.map((lesson, index) => {
                    const xpRequired = currentQuestionType?.bandScoreRequires.find(
                      (bandScore) => bandScore.bandScore === currentQuestionType.progress.bandScore
                    )?.requireXP;
                    return (
                      <CarouselItem className="flex h-fit w-full flex-col items-center space-y-2 rounded-md bg-neutral-50 px-5 py-4">
                        <div className="flex w-full flex-row items-center justify-between">
                          <CarouselPrevious className="size-6 border-none bg-transparent shadow-none" />
                          <p className="text-body font-semibold text-black">
                            {index + 1}/{data?.lessons.length}
                          </p>
                          <CarouselNext className="size-6 border-none bg-transparent shadow-none" />
                        </div>
                        <div className="flex w-full flex-col items-start justify-start">
                          {/* <img src={} alt={lesson.name} className="w-20 h-20" /> */}
                          <p className="text-left text-heading-4 font-bold text-neutral-900">
                            {lesson.name}
                          </p>
                        </div>
                        <div className="flex w-full flex-row space-x-4 ">
                          <Progress
                            value={currentQuestionType?.progress.totalLearningXP || 0}
                            className="h-3 bg-[#CCCCCC]"
                          />
                          <p className="grow text-[14px] font-normal text-[#929292]">
                            {t("questionTypes.xp")} {currentQuestionType?.progress.totalLearningXP}/
                            {xpRequired}
                          </p>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <Button
            className="rounded-md px-4 py-2.5"
            onClick={() => {
              navigate({
                to: `/daily-lesson/${questionTypes?.[current].id}`,
                search: { questionTypeId },
              });
            }}
          >
            <p className="text-body font-medium text-white">{t("questionType.practiceBtn")}</p>
          </Button>
        </DrawerContent>
      )}
    </Drawer>
  );
};

type QuestionTypeDetailInstructionProps = {
  title?: string;
  instruction?: Instruction;
  children: React.ReactNode;
};

const QuestionTypeDetailInstruction = ({
  title,
  instruction,
  children,
}: QuestionTypeDetailInstructionProps) => {
  if (!instruction) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="m-8 h-full overflow-y-auto sm:max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center space-y-4">
          <DialogTitle>{title ?? ""}</DialogTitle>
        </DialogHeader>
        <div dangerouslySetInnerHTML={{ __html: instruction.content }} />
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDetail;
