import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

interface Item {
  no: number;
  name: string;
  description: string;
  color: string;
  opacity?: string;
}

const gamificationInfo = [
  {
    no: 3,
    name: "Trao đổi vật phẩm lấy sức mạnh và lượt chấm bài miễn phí",
    description:
      "Figma ipsum component variant main layer. Rectangle prototype vertical group comment blur opacity ipsum link blur. List duplicate component edit arrow editor font component. ",
    color: "yellow",
  },
  {
    no: 2,
    name: "Thăng hạng, thăng cấp với điểm kinh nghiệm tích luỹ",
    description:
      "Figma ipsum component variant main layer. Rectangle prototype vertical group comment blur opacity ipsum link blur. List duplicate component edit arrow editor font component. ",
    color: "green",
  },
  {
    no: 1,
    name: "Hệ thống bài học 5 phút mỗi ngày",
    description:
      "Figma ipsum component variant main layer. Rectangle prototype vertical group comment blur opacity ipsum link blur. List duplicate component edit arrow editor font component. ",
    color: "blue",
  },
];

const Notification = ({ no, name, description, color, opacity }: Item) => {
  return (
    <figure
      className={cn(
        "relative min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        opacity
      )}
    >
      <div className="flex flex-row gap-3">
        <div
          className={cn(
            "flex size-8 md:size-10 items-center justify-center rounded-sm",
            `bg-${color}-100`
          )}
        >
          <span className={cn("text-small md:text-heading-6 font-semibold", `text-${color}-700`)}>
            {no}
          </span>
        </div>
        <div className="flex w-full flex-col justify-center">
          <AccordionItem value={`item-${no}`} className="flex flex-col gap-2 border-none">
            <AccordionTrigger className="w-full items-center p-0" iconPosition="none">
              <p className="text-left text-small md:text-body">{name}</p>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <p className="text-xs md:text-small">{description}</p>
            </AccordionContent>
          </AccordionItem>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleAccordionChange = (value: string | null) => {
    setActiveItem(value);
  };

  const getOpacity = (no: number) => {
    if (activeItem) {
      if (activeItem === "item-1") {
        return no === 1 ? "opacity-100" : no === 2 ? "opacity-60" : "opacity-30";
      } else if (activeItem === "item-2") {
        return no === 2 ? "opacity-100" : "opacity-60";
      } else if (activeItem === "item-3") {
        return no === 3 ? "opacity-100" : no === 2 ? "opacity-60" : "opacity-30";
      }
    }
  };

  return (
    <div className={cn("relative flex h-56 md:h-64 w-full flex-col bg-background", className)}>
      <Accordion type="single" collapsible onValueChange={handleAccordionChange}>
        <AnimatedList>
          {gamificationInfo.map((item, idx) => (
            <Notification {...item} key={idx} opacity={getOpacity(item.no)} />
          ))}
        </AnimatedList>
      </Accordion>
    </div>
  );
}
