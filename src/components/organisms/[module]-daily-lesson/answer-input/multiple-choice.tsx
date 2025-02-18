import { motion } from "motion/react";
import { useEffect, useState } from "react";

import ChoiceButton from "@/components/molecules/choice-button";
import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { MultipleChoiceContent } from "@/lib/types";
import { cn } from "@/lib/utils";

import { BaseAnswerInputProps } from ".";

type MultipleChoiceProps = MultipleChoiceContent & BaseAnswerInputProps;

export type MultipleChoiceAnswer = Record<string, string[]>;

const MultipleChoice = (props: MultipleChoiceProps) => {
  const { answer, options, renderCheckButton, isAnswered, currentQuestionIndex, className } = props;
  const [selected, setSelected] = useState<number[]>([]);
  const {
    lessonState: { currentQuestion },
    saveHistory,
  } = useDailyLessonStore();
  const isSingleSelect = answer.length === 1;
  const canShowCheckButton = selected.length > (isSingleSelect ? 0 : 1);

  useEffect(() => {
    return () => setSelected([]);
  }, [options]);

  const getCorrectAnswers = (): DLAnswer => {
    const numberOfCorrect = selected.filter((s) => answer.includes(s)).length;
    saveHistory(
      {
        [currentQuestion?.question.content.question ?? "unknown"]: selected.map((s) => options[s]),
      },
      {
        [currentQuestion?.question.content.question ?? "unknown"]: answer.map((a) => options[a]),
      }
    );

    return {
      numberOfCorrect,
      totalOfQuestions: answer.length,
    };
  };

  const handlePress = (index: number) => {
    setSelected((prev) => {
      if (isSingleSelect) {
        if (prev.includes(index)) {
          return [];
        } else {
          return [index];
        }
      }
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const getVariant = (index: number) => {
    if (isAnswered) {
      if (answer.includes(index)) {
        return "correct";
      } else if (selected.includes(index)) {
        return "incorrect";
      }
    } else {
      return selected.includes(index) ? "selected" : "default";
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 1 }}
        className={cn("flex flex-col items-center gap-4", className)}
        key={currentQuestionIndex}
      >
        {options.map((option, index) => (
          <ChoiceButton
            key={index}
            label={option}
            onClick={() => handlePress(index)}
            variant={getVariant(index)}
            disabled={isAnswered}
          />
        ))}
      </motion.div>
      {renderCheckButton && renderCheckButton(getCorrectAnswers, !canShowCheckButton)}
    </>
  );
};

export default MultipleChoice;
