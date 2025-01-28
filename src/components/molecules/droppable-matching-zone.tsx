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
            "min-w-48 transition-all duration-200 h-12 inline-flex items-center p-4",
            isOver && " border-blue-500 bg-blue-100 text-blue-500",
            !children &&
              " border-[1.5px] border-dashed bg-white/80 rounded-lg text-supporting-text "
          )}
        >
          <p>{placeholder}</p>
        </div>
      )}
    </div>
  );
};

export default DroppableMatchingZone;
