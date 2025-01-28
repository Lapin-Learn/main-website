import { useDraggable } from "@dnd-kit/core";

type DraggableItemProps = {
  id: string;
  type: string;
  draggingClassName?: string;
  renderChildren: (isDragging: boolean) => React.ReactNode;
  disabled?: boolean;
};

const DraggableItem = ({ id, type, renderChildren, disabled = false }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      type,
    },
    disabled,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {renderChildren(isDragging)}
    </div>
  );
};
export default DraggableItem;
