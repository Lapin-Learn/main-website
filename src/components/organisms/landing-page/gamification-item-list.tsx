import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

interface Item {
  no: number;
  key: string;
  name: string;
  description: string;
  color: string;
  opacity?: number;
}

const gamificationInfo = [
  {
    no: 2,
    key: "shop",
    name: "gamification.gamificationInfo.2.name",
    description: "gamification.gamificationInfo.2.description",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    no: 1,
    key: "levelup",
    name: "gamification.gamificationInfo.1.name",
    description: "gamification.gamificationInfo.1.description",
    color: "text-green-600 bg-green-50",
  },
  {
    no: 0,
    key: "lesson",
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
        "relative min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden rounded-2xl",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
      style={{
        opacity,
      }}
    >
      <AccordionItem value={no.toString()}>
        <AccordionTrigger
          className="flex w-full flex-row p-4 [&[data-state=open]]:pb-0"
          iconPosition="none"
        >
          <div className="flex w-full flex-row items-center gap-4">
            <div
              className={cn(
                "flex shrink-0 size-8 md:size-10 items-center justify-center rounded-sm",
                color
              )}
            >
              <span className="text-small font-semibold md:text-heading-6">{no + 1}</span>
            </div>
            <p className="text-left text-small md:text-body">{t(name)}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0">
          <p className="ml-12 text-xs md:ml-14 md:text-small">{t(description)}</p>
        </AccordionContent>
      </AccordionItem>
    </figure>
  );
};

export function GamificationItemList({
  className,
  activeItem,
  setActiveItem,
}: {
  className?: string;
  activeItem: string;
  setActiveItem: (value: string) => void;
}) {
  const handleAccordionChange = (value: string) => {
    setActiveItem(value);
  };

  const getOpacity = (no: number) => {
    if (activeItem) {
      return 1 - Math.abs(no - Number(activeItem)) * 0.35;
    }
    return 1;
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
        ref={ref}
        value={activeItem}
      >
        {isInView && (
          <AnimatedList>
            {gamificationInfo.map((item) => (
              <GamificationItem {...item} opacity={getOpacity(item.no)} />
            ))}
          </AnimatedList>
        )}
      </Accordion>
    </div>
  );
}
