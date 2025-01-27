import { useDraggable } from "@dnd-kit/core";

type DraggableItemProps = {
  id: string;
  type: string;
  draggingClassName?: string;
  renderChildren: (isDragging: boolean) => React.ReactNode;
};

const DraggableItem = ({ id, type, renderChildren }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type,
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {renderChildren(isDragging)}
    </div>
  );
};
export default DraggableItem;
