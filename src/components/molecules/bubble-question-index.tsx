import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { cn, genQuestionId } from "@/lib/utils";

type BubbleQuestionIndexProps = {
  index: number;
  className?: string;
};

const BubbleQuestionIndex = ({ index, className }: BubbleQuestionIndexProps) => {
  const { currentQuestion } = useAnswerStore();
  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full  text-sm font-semibold",
        currentQuestion == index ? "bg-blue-500 text-white" : "text-blue-900 bg-blue-100",
        className
      )}
      key={genQuestionId(index)}
      id={genQuestionId(index)}
    >
      {index}
    </span>
  );
};

export default BubbleQuestionIndex;
