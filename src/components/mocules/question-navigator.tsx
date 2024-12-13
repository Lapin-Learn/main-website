import { cva, VariantProps } from "class-variance-authority";

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

type QuestionNavigatorProps = VariantProps<typeof questionNavigatorVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    number: number;
  };

const QuestionNavigator = ({ number, status, className, ...props }: QuestionNavigatorProps) => {
  return (
    <button
      onClick={() => {
        scrollToElementById(`Question-${number}`);
      }}
      className={cn(questionNavigatorVariants({ status }), className)}
      {...props}
    >
      {number}
    </button>
  );
};

export default QuestionNavigator;
