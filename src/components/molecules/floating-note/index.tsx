import { Button, Card, Typography } from "@components/ui";
import { Textarea } from "@components/ui/textarea.tsx";
import { DndContext, DragEndEvent, useDraggable, useSensor, useSensors } from "@dnd-kit/core";
import { NotebookPenIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SmartPointerSensor } from "./smart-pointer-sensor";

export function FloatingNote() {
  const { t } = useTranslation("simulatedTest");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <DndContext>
      <div className="absolute bottom-28 right-5">
        <Button
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
        <DraggableNote isTextareaFocused={isTextareaFocused}>
          <div className="relative z-50">
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute right-0 top-1 z-50 text-gray-500 hover:bg-transparent"
            >
              <XIcon size={16} />
            </Button>
            <Card className="relative z-40 size-full border bg-blue-50 p-4 shadow-lg">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
                placeholder={t("noteBtn.placeholder")}
                className="scrollbar z-50 size-full h-52 resize-none border-none shadow-none focus-visible:ring-0"
              />
              <Typography variant="caption" className=" text-gray-500">
                {t("noteBtn.guide")}
              </Typography>
            </Card>
          </div>
        </DraggableNote>
      )}
    </DndContext>
  );
}

const DraggableNote = ({
  children,
  isTextareaFocused,
}: {
  children: React.ReactNode;
  isTextareaFocused: boolean;
}) => {
  const [position, setPosition] = useState({
    x: window.innerWidth - 350,
    y: window.innerHeight - 350,
  });

  const sensors = useSensors(useSensor(SmartPointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.delta) return;

    setPosition((prev) => ({
      x: prev.x + event.delta.x,
      y: prev.y + event.delta.y,
    }));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <DraggableContent position={position} isTextareaFocused={isTextareaFocused}>
        {children}
      </DraggableContent>
    </DndContext>
  );
};

const DraggableContent = ({
  children,
  position,
  isTextareaFocused,
}: {
  children: React.ReactNode;
  position: { x: number; y: number };
  isTextareaFocused: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: "draggable-note" });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "fixed",
        left: `${position.x + (transform?.x || 0)}px`,
        top: `${position.y + (transform?.y || 0)}px`,
        cursor: isTextareaFocused ? "default" : "move",
      }}
      className="w-[300px]"
      {...(!isTextareaFocused && listeners)}
      {...(!isTextareaFocused && attributes)}
      role="none"
    >
      {children}
    </div>
  );
};
