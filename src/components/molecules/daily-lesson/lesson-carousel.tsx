import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PracticeIcon from "@/assets/icons/practice";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { DailyLesson } from "@/lib/types";

type LessonCarouselProps = {
  lessons: DailyLesson[];
  setCurrent: (current: number) => void;
};

const LessonCarousel = ({ lessons, setCurrent }: LessonCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const { t } = useTranslation("dailyLesson");
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel className="" setApi={setApi}>
      <CarouselContent className="m-0 space-x-0">
        {lessons.map((lesson, index) => {
          return (
            <CarouselItem
              className="flex-col items-center space-y-2 rounded-md bg-neutral-50 px-5 py-4"
              key={lesson.id}
            >
              <div className="relative flex w-full flex-row items-center justify-between">
                <CarouselPrevious
                  className="relative left-0 top-0 size-6 translate-y-0 border-none bg-transparent shadow-none"
                  icon={<ChevronLeft className="size-6" color="#000" />}
                />
                <p className="text-body font-semibold text-black">
                  {index + 1}/{lessons.length}
                </p>

                <CarouselNext
                  className="relative right-0 top-0 size-6 translate-y-0 border-none bg-transparent shadow-none"
                  icon={<ChevronRight className="size-6" color="#000" />}
                />
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
                <Progress value={(lesson.xp / 50) * 100} className="h-3 flex-1 bg-[#CCCCCC]" />
                <p className="text-[14px] font-normal text-[#929292]">
                  {t("questionTypes.xp")} {lesson.xp}/50
                </p>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default LessonCarousel;
