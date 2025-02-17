import { cn } from "@/lib/utils";

type BubbleQuestionIndexProps = {
  index: number;
  className?: string;
};

const BubbleQuestionIndex = ({ index, className }: BubbleQuestionIndexProps) => {
  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-900",
        className
      )}
    >
      {index}
    </span>
  );
};

export default BubbleQuestionIndex;
