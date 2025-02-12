import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import DraggableItem from "@/components/molecules/draggable-item";
import DroppableZone from "@/components/molecules/droppable-matching-zone";
import MatchingButton from "@/components/molecules/matching-button";
import { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { MatchingContent } from "@/lib/types";
import { cn } from "@/lib/utils";

import { BaseAnswerInputProps } from ".";

type MatchingAnswer = {
  [key: string]: string;
};

type MatchingProps = MatchingContent & BaseAnswerInputProps;
const Matching = (props: MatchingProps) => {
  const { columnA, columnB, renderCheckButton, isAnswered, answer } = props;
  const [selected, setSelected] = useState<MatchingAnswer>({});

  const [activeId, setActiveId] = useState<string | null>(null);
  const canShowCheckButton = Object.keys(selected).length == columnA.options.length;

  const answerRecord = answer.reduce<Record<string, string>>((acc, pair) => {
    acc[pair.columnA[0]] = pair.columnB[0];
    return acc;
  }, {});

  const getCorrectAnswers = (): DLAnswer => {
    const numberOfCorrect = Object.keys(selected).filter(
      (key) => selected[key] === answerRecord[key]
    ).length;
    return {
      numberOfCorrect,
      totalOfQuestions: columnA.options.length,
    };
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
  };

  const unselectedB = columnB.options.filter((option) => !Object.values(selected).includes(option));

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "grid w-3/4 gap-8",
          isAnswered ? "grid-cols-1 place-items-center" : "grid-cols-2"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="font-semibold">{columnA.title}</div>
          {columnA.options.map((option, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-900">
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
                        <MatchingButton
                          isDragging={isDragging}
                          draggingClassName="opacity-50"
                          variant={
                            isAnswered
                              ? selected[option] === answerRecord[option]
                                ? "correct"
                                : "incorrect"
                              : "default"
                          }
                        >
                          {selected[option]}
                        </MatchingButton>
                      )}
                      disabled={isAnswered}
                    />
                  ) : null}
                </DroppableZone>
                {isAnswered && selected[option] !== answerRecord[option] && (
                  <>
                    <MoveRight className="text-neutral-200" size={24} />
                    <MatchingButton variant="correct">{answerRecord[option]}</MatchingButton>
                  </>
                )}
              </div>
            );
          })}
        </div>
        {!isAnswered && (
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
                disabled={isAnswered}
              />
            ))}
            {unselectedB.length === 0 && (
              <div className="inline-flex h-full items-center text-sm text-neutral-400">
                All options are matched
              </div>
            )}
          </div>
        )}
        <DragOverlay>
          {activeId ? (
            <MatchingButton isDragging={false} draggingClassName="opacity-50">
              {activeId}
            </MatchingButton>
          ) : null}
        </DragOverlay>
      </motion.div>
      {renderCheckButton && renderCheckButton(getCorrectAnswers, !canShowCheckButton)}
    </DndContext>
  );
};
export default Matching;
