import { useEffect, useState } from "react";

import ChoiceButton from "@/components/molecules/choice-button";
import { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { MultipleChoiceContent } from "@/lib/types";

import { BaseAnswerInputProps } from ".";

type MultipleChoiceProps = MultipleChoiceContent & BaseAnswerInputProps;

const MultipleChoice = (props: MultipleChoiceProps) => {
  const { answer, options, renderCheckButton, isAnswered } = props;
  const [selected, setSelected] = useState<number[]>([]);
  const isSingleSelect = answer.length === 1;
  const canShowCheckButton = selected.length > (isSingleSelect ? 0 : 1);

  useEffect(() => {
    return () => setSelected([]);
  }, [options]);

  const getCorrectAnswers = (): DLAnswer => {
    const numberOfCorrect = selected.filter((s) => answer.includes(s)).length;
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
      <div className="flex flex-col items-center gap-4">
        {options.map((option, index) => (
          <ChoiceButton
            key={index}
            label={option}
            onClick={() => handlePress(index)}
            variant={getVariant(index)}
            disabled={isAnswered}
          />
        ))}
      </div>
      {renderCheckButton && renderCheckButton(getCorrectAnswers, !canShowCheckButton)}
    </>
  );
};

export default MultipleChoice;
