import { useEffect, useState } from "react";

import ChoiceButton from "@/components/molecules/choice-button";
import { MultipleChoiceContent } from "@/lib/types";

import { BaseAnswerInputProps } from ".";

type MultipleChoiceProps = MultipleChoiceContent & BaseAnswerInputProps;
const MultipleChoice = (props: MultipleChoiceProps) => {
  const { answer, options } = props;
  const [selected, setSelected] = useState<number[]>([]);
  const isSingleSelect = answer.length === 1;

  useEffect(() => {
    return () => setSelected([]);
  }, [options]);

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

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        {options.map((option, index) => (
          <ChoiceButton
            key={index}
            label={option}
            onClick={() => handlePress(index)}
            variant={selected.includes(index) ? "selected" : "default"}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
