import { Button, Card } from "@components/ui";
import { Textarea } from "@components/ui/textarea.tsx";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { NotebookPenIcon } from "lucide-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function FloatingNote() {
  const { t } = useTranslation("simulatedTest");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        noteRef.current &&
        !noteRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <DndContext>
      <div className="absolute bottom-28 right-5 z-50">
        <Button
          ref={buttonRef}
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="group flex size-full items-center justify-center overflow-hidden rounded-full px-4 py-3 shadow-lg hover:gap-2"
        >
          <span className="w-0 translate-x-0 transition-all duration-200 ease-in-out group-hover:w-fit md:translate-x-full md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
            {t("noteBtn.title")}
          </span>
          <NotebookPenIcon size={16} />
        </Button>
      </div>

      {isOpen && (
        <DraggableNote noteRef={noteRef} isTextareaFocused={isTextareaFocused}>
          <Card className="relative size-full border bg-blue-50 p-4 shadow-lg">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onFocus={() => setIsTextareaFocused(true)}
              onBlur={() => setIsTextareaFocused(false)}
              placeholder={t("noteBtn.placeholder")}
              className="size-full resize-none border-none shadow-none focus-visible:ring-0"
            />
          </Card>
        </DraggableNote>
      )}
    </DndContext>
  );
}

const DraggableNote = ({
  children,
  noteRef,
  isTextareaFocused,
}: {
  children: React.ReactNode;
  noteRef: MutableRefObject<HTMLDivElement | null>;
  isTextareaFocused: boolean;
}) => {
  const [position, setPosition] = useState({
    x: window.innerWidth - 350,
    y: window.innerHeight - 350,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.delta) return;

    setPosition((prev) => ({
      x: prev.x + event.delta.x,
      y: prev.y + event.delta.y,
    }));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <DraggableContent noteRef={noteRef} position={position} isTextareaFocused={isTextareaFocused}>
        {children}
      </DraggableContent>
    </DndContext>
  );
};

const DraggableContent = ({
  children,
  position,
  noteRef,
  isTextareaFocused,
}: {
  children: React.ReactNode;
  position: { x: number; y: number };
  noteRef: MutableRefObject<HTMLDivElement | null>;
  isTextareaFocused: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: "draggable-note" });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        noteRef.current = node;
      }}
      style={{
        position: "fixed",
        left: `${position.x + (transform?.x || 0)}px`,
        top: `${position.y + (transform?.y || 0)}px`,
        cursor: isTextareaFocused ? "default" : "move",
      }}
      className="z-50 h-[200px] w-[300px]"
      {...(!isTextareaFocused && listeners)}
      {...(!isTextareaFocused && attributes)}
      role="none"
    >
      {children}
    </div>
  );
};
