import { cva } from "class-variance-authority";

import useSimulatedTestStore, { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { cn, scrollToElementById } from "@/lib/utils";

const questionNavigatorVariants = cva(
  "size-7 rounded-[4px] text-center inline-grid place-items-center text-xs duration-200 transition-colors",
  {
    variants: {
      status: {
        answered: "bg-blue-100 text-blue-900 hover:bg-blue-200/50",
        active: "bg-blue-500 text-white hover:bg-blue-500/80",
        unanswered: "bg-neutral-100/50 hover:bg-neutral-100/80",
      },
    },
  }
);

type QuestionNavigatorProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  number: number;
  partNo: number;
};

const QuestionNavigator = ({ number, className, partNo, ...props }: QuestionNavigatorProps) => {
  const { navigateToPart } = useSimulatedTestStore();
  const { answerSheet, currentQuestion, setCurrentQuestion } = useAnswerStore();
  return (
    <button
      onClick={() => {
        navigateToPart(number, partNo);
        scrollToElementById(`Question-${number}`);
        setCurrentQuestion(number);
      }}
      className={cn(
        questionNavigatorVariants({
          status:
            number.toString() == currentQuestion.toString()
              ? "active"
              : answerSheet[number] == null || answerSheet[number] === undefined
                ? "unanswered"
                : "answered",
        }),
        className
      )}
      {...props}
    >
      {number}
    </button>
  );
};

export default QuestionNavigator;
