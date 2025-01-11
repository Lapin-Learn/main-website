import { cva } from "class-variance-authority";

import useSimulatedTestStore, { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { cn, genQuestionId, scrollToElementById } from "@/lib/utils";

const questionNavigatorVariants = cva(
  "size-7 rounded-[4px] text-center inline-grid place-items-center text-xs duration-200 transition-colors",
  {
    variants: {
      status: {
        answered: "bg-blue-100 text-blue-900 hover:bg-blue-200/50",
        active: "bg-blue-500 text-white hover:bg-blue-500/80",
        unanswered: "bg-neutral-100/50 hover:bg-neutral-100/80",
        right: "bg-green-100 text-green-900 hover:bg-green-200/50",
        wrong: "bg-red-100 text-red-900 hover:bg-red-200/50",
        rightActive: "bg-green-500 text-white hover:bg-green-500/80",
        wrongActive: "bg-red-500 text-white hover:bg-red-500/80",
      },
    },
  }
);

type QuestionNavigatorProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  number: number;
  partNo: number;
  status?: boolean;
};

const QuestionNavigatorButton = ({
  number,
  className,
  partNo,
  status,
  ...props
}: QuestionNavigatorProps) => {
  const { navigateToPart } = useSimulatedTestStore();
  const { answerSheet, currentQuestion, setCurrentQuestion } = useAnswerStore();

  const handleNavigation = () => {
    navigateToPart(number, partNo);
    scrollToElementById(genQuestionId(number));
    setCurrentQuestion(number);
  };

  const statusVariant = determineStatus(number, currentQuestion, answerSheet, status);

  return (
    <button
      onClick={handleNavigation}
      className={cn(questionNavigatorVariants({ status: statusVariant }), className)}
      {...props}
    >
      {number}
    </button>
  );
};

export default QuestionNavigatorButton;

function determineStatus(
  number: number,
  currentQuestion: number,
  answerSheet: Record<string, string | null>,
  status?: boolean
) {
  if (status !== undefined) {
    return number === currentQuestion
      ? status
        ? "rightActive"
        : "wrongActive"
      : status
        ? "right"
        : "wrong";
  }

  if (number === currentQuestion) return "active";
  if (!answerSheet[number]) return "unanswered";

  return "answered";
}
