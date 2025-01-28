import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

interface Item {
  no: number;
  name: string;
  description: string;
  color: string;
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

const Notification = ({ no, name, description, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row gap-3">
        <div
          className={cn("flex size-10 items-center justify-center rounded-sm", `bg-${color}-100`)}
        >
          <span className={cn("text-heading-6 font-semibold", `text-${color}-700`)}>{no}</span>
        </div>
        <div className="flex w-full flex-col justify-center">
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${no}`} className="border-none">
              <AccordionTrigger className="mb-2 w-full items-center p-0" iconPosition="none">
                <p className="text-body">{name}</p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-small">{description}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full flex-col bg-background", className)}>
      <AnimatedList>
        {gamificationInfo.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
