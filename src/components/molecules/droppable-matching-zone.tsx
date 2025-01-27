import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type DroppableMatchingZoneProps = PropsWithChildren<{
  id: string;
  accepts: string[];
  placeholder?: string;
}>;

const DroppableMatchingZone = ({
  id,
  accepts,
  placeholder,
  children,
}: DroppableMatchingZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      accepts,
    },
  });

  return (
    <div ref={setNodeRef}>
      {children ? (
        children
      ) : (
        <div
          className={cn(
            "min-w-48 transition-all duration-200 h-10",
            isOver && " border-blue-500 bg-blue-50 text-blue-500",
            !children && " border border-dashed bg-white/50 rounded-md text-supporting-text "
          )}
        >
          <p className={cn("text-sm p-2")}>{placeholder}</p>
        </div>
      )}
    </div>
  );
};

export default DroppableMatchingZone;
