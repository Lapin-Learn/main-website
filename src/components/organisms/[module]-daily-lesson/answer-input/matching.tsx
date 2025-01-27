import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";

import DraggableItem from "@/components/molecules/draggable-item";
import DroppableZone from "@/components/molecules/droppable-matching-zone";
import MatchingButton from "@/components/molecules/matching-button";
import { MatchingContent } from "@/lib/types";

import { BaseAnswerInputProps } from ".";

type MatchingAnswer = {
  [key: string]: string;
};

type MatchingProps = MatchingContent & BaseAnswerInputProps;
const Matching = (props: MatchingProps) => {
  const { columnA, columnB } = props;
  const [selected, setSelected] = useState<MatchingAnswer>({});

  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (over) {
      const dropzoneId = over.id;
      const dragId = active.id;
      setSelected({
        ...selected,
        [dropzoneId]: dragId as string,
      });
    } else {
      // Remove the item from selected if dropped outside
      const newSelected = { ...selected };
      for (const key in newSelected) {
        if (newSelected[key] === active.id) {
          delete newSelected[key];
        }
      }
      setSelected(newSelected);
    }
    setActiveId(null);
  }

  const unselectedB = columnB.options.filter((option) => !Object.values(selected).includes(option));

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="font-semibold">{columnA.title}</div>
          {columnA.options.map((option, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-900">
                  {index + 1}
                </div>
                <div>{option}</div>
                <DroppableZone
                  id={option}
                  accepts={["matching"]}
                  placeholder="Drop your answer here"
                >
                  {selected[option] ? (
                    <DraggableItem
                      key={option}
                      id={selected[option]}
                      type="matching"
                      renderChildren={(isDragging) => (
                        <MatchingButton isDragging={isDragging} draggingClassName="opacity-50">
                          {selected[option]}
                        </MatchingButton>
                      )}
                    />
                  ) : null}
                </DroppableZone>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-semibold">{columnB.title}</div>
          {unselectedB.map((option) => (
            <DraggableItem
              key={option}
              id={option}
              type="matching"
              renderChildren={(isDragging) => (
                <MatchingButton isDragging={isDragging} draggingClassName="opacity-50">
                  {option}
                </MatchingButton>
              )}
            />
          ))}
          {unselectedB.length === 0 && (
            <div className="inline-flex h-full items-center text-sm text-neutral-400">
              All options are matched
            </div>
          )}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <MatchingButton isDragging={false} draggingClassName="opacity-50">
            {activeId}
          </MatchingButton>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
export default Matching;
