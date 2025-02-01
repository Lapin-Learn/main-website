import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
    name: "gamification.gamificationInfo.2.name",
    description: "gamification.gamificationInfo.2.description",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    no: 2,
    name: "gamification.gamificationInfo.1.name",
    description: "gamification.gamificationInfo.1.description",
    color: "text-green-600 bg-green-50",
  },
  {
    no: 1,
    name: "gamification.gamificationInfo.0.name",
    description: "gamification.gamificationInfo.0.description",
    color: "text-blue-600 bg-blue-50",
  },
];

const GamificationItem = ({ no, name, description, color, opacity }: Item) => {
  const { t } = useTranslation("landingPage");

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
      {/* TODO: Not applying the correct color to the background and text */}
      <div className="flex flex-row gap-3">
        <div
          className={cn(
            "flex shrink-0 size-8 md:size-10 items-center justify-center rounded-sm",
            color
          )}
        >
          <span className="text-small font-semibold md:text-heading-6">{no}</span>
        </div>
        <div className="flex w-full flex-col justify-center">
          <AccordionItem value={`item-${no}`} className="flex flex-col gap-2 border-none">
            <AccordionTrigger className="w-full items-center p-0" iconPosition="none">
              <p className="text-left text-small md:text-body">{t(name)}</p>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <p className="text-xs md:text-small">{t(description)}</p>
            </AccordionContent>
          </AccordionItem>
        </div>
      </div>
    </figure>
  );
};

export function GamificationItemList({ className }: { className?: string }) {
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

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.1,
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div className={cn("relative flex h-56 md:h-64 w-full flex-col bg-background", className)}>
      <Accordion
        type="single"
        collapsible
        onValueChange={handleAccordionChange}
        defaultValue={`item-${1}`}
        ref={ref}
      >
        {isInView && (
          <AnimatedList>
            {gamificationInfo.map((item, idx) => (
              <GamificationItem {...item} key={idx} opacity={getOpacity(item.no)} />
            ))}
          </AnimatedList>
        )}
      </Accordion>
    </div>
  );
}
