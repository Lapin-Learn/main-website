import { GripVertical } from "lucide-react";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type MatchingButtonProps = PropsWithChildren<{
  draggingClassName?: string;
  isDragging?: boolean;
}>;

const MatchingButton = ({ draggingClassName, isDragging, children }: MatchingButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex h-10 w-fit items-center gap-2 rounded-md border bg-white p-2 pr-4",
        isDragging && draggingClassName
      )}
      type="button"
    >
      <GripVertical
        className="text-neutral-200 hover:cursor-move hover:text-neutral-600"
        size={16}
      />
      {children}
    </button>
  );
};
export default MatchingButton;
