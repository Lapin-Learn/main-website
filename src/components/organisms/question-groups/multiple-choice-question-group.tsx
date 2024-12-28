import { useEffect, useState } from "react";

import { Checkbox, Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { Option } from "@/lib/types";
import { QuestionGroupMultipleChoice } from "@/lib/types/simulated-test.type";

type MultipleSelectProps = {
  question: {
    questionNo: number[];
    question: string;
    options: Option[];
  };
  disabled?: boolean;
};
function MultipleSelect({ question, disabled }: MultipleSelectProps) {
  const MAX_SELECT = question.questionNo.length;
  const { answer } = useAnswerStore();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    for (let i = 0; i < MAX_SELECT; i++) {
      answer(question.questionNo[i], selected[i] ?? "");
    }
  }, [selected]);
  return (
    <div className="mt-2 flex flex-col gap-3">
      {question.options.map((option, index) => (
        <div key={index} className="flex items-baseline">
          <Checkbox
            value={option.value}
            id={`${question.questionNo}-${option.value}`}
            onCheckedChange={(checked) => {
              console.log("checked", selected.length);
              if (checked) {
                const newSelected = [...selected, option.value];
                setSelected(newSelected.slice(-MAX_SELECT));
              } else {
                setSelected(selected.filter((item) => item !== option.value));
              }
            }}
            checked={selected.includes(option.value)}
            disabled={disabled}
          />
          <Label
            className="ml-2 text-base font-normal"
            htmlFor={`${question.questionNo}-${option.value}`}
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default function MultipleChoiceQuestionGroup({
  questionCard,
  questions,
  disabled,
}: QuestionGroupMultipleChoice) {
  const { answer, answerSheet } = useAnswerStore();
  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      {/* TODO DISCUSSION: hard code here base on type or store in dtb, there may be a difference YES NO NG */}
      {/* <ul className="pl-4 pt-2">
        <li>TRUE - if the statement agrees with the information</li>
        <li>FALSE - if the statement contradicts the information </li>
        <li>NOT GIVEN - if there is no information on this</li>
      </ul> */}
      {questions.map((question) => (
        <div key={question.questionNo[0]} className="mt-4">
          {question.questionNo.length == 1 ? (
            <p>
              <strong className="mr-2" id={`Question-${question.questionNo.toString()}`}>
                {question.questionNo[0]}.
              </strong>
              {question.question}
            </p>
          ) : (
            <>
              {question.questionNo.map((no) => (
                <span id={`Question-${no}`} key={no} />
              ))}
              <strong>{question.question}</strong>
            </>
          )}
          <div className="mt-2">
            {question.questionNo.length > 1 ? (
              <MultipleSelect question={question} disabled={disabled} />
            ) : (
              <RadioGroup
                onValueChange={(value) => {
                  answer(question.questionNo[0], value);
                }}
                value={answerSheet[question.questionNo[0]] ?? ""}
                disabled={disabled}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <RadioGroupItem
                      value={option.value}
                      id={`${question.questionNo}-${option.value}`}
                    />
                    <Label
                      className="ml-2 text-base font-normal"
                      htmlFor={`${question.questionNo}-${option.value}`}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
