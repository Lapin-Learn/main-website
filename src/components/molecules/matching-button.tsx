import { cva, VariantProps } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const matchingButtonVariants = cva(
  "inline-flex min-h-12 w-fit items-center gap-2 border-[1.5px] rounded-lg p-2 pr-4 max-w-96",
  {
    variants: {
      isDragging: {
        true: "border-blue-500",
        false: "",
      },
      variant: {
        default: "bg-white",
        correct: "bg-green-50 border-green-500 text-green-900",
        incorrect: "bg-red-50 border-red-500 text-red-900",
      },
    },
    defaultVariants: {
      isDragging: false,
      variant: "default",
    },
  }
);

type MatchingButtonProps = PropsWithChildren<{
  draggingClassName?: string;
  isDragging?: boolean;
}> &
  VariantProps<typeof matchingButtonVariants>;

const MatchingButton = ({
  draggingClassName,
  isDragging,
  children,
  variant,
}: MatchingButtonProps) => {
  return (
    <button
      className={cn(
        matchingButtonVariants({
          isDragging,
          variant,
        }),
        isDragging && draggingClassName
      )}
      type="button"
    >
      <GripVertical
        className="text-neutral-200 hover:cursor-move hover:text-neutral-600"
        size={16}
      />
      <div className="flex-1">{children}</div>
    </button>
  );
};
export default MatchingButton;
