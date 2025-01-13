import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EnumMode } from "@/lib/enums";

const InstructionCard = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white p-6">
      <h5 className="text-heading-6 font-semibold">{title}</h5>
      <p className="text-center text-small">{content}</p>
    </div>
  );
};

function InstructionCarousel({ mode }: { mode: EnumMode }) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { t } = useTranslation("simulatedTest");

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="flex w-[800px] flex-col items-center gap-4">
      <Carousel setApi={setCarouselApi}>
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem className="basis-full" key={index}>
              <InstructionCard
                title={t(`speaking.instructions.${mode}.${index}.title`)}
                content={t(`speaking.instructions.${mode}.${index}.content`)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="border-none"
          icon={<ChevronLeft className="size-4 text-blue-300" />}
        />
        <CarouselNext
          className="border-none"
          icon={<ChevronRight className="size-4 text-blue-300" />}
        />
      </Carousel>

      <div className="flex justify-center space-x-3">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`size-2 rounded-full hover:bg-opacity-50 ${
              currentIndex === index ? "bg-blue-800" : "bg-blue-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(InstructionCarousel);
