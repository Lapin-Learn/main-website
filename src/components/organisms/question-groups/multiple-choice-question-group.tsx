import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import BubbleQuestionIndex from "@/components/molecules/bubble-question-index";
import { Checkbox, Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { useResult } from "@/hooks/zustand/use-result";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumQuestionGroup } from "@/lib/enums";
import { Option } from "@/lib/types";
import { QuestionGroupMultipleChoice } from "@/lib/types/simulated-test.type";
import { genQuestionId } from "@/lib/utils";

import AnswerGuidanceContent from "../result/answer-guidance-content";

type MultipleSelectProps = {
  question: {
    questionNo: number[];
    question: string;
    options: Option[];
  };
  disabled?: boolean;
  questionStatus: boolean[];
};
function MultipleSelect({ question, disabled, questionStatus }: MultipleSelectProps) {
  const MAX_SELECT = question.questionNo.length;
  const { answer, answerSheet } = useAnswerStore();

  const initialSelection = question.questionNo.map((qNo) => answerSheet[qNo.toString()] ?? "");
  const [selected, setSelected] = useState<string[]>(initialSelection);
  const prevSelectedRef = useRef<string[]>(initialSelection);

  useEffect(() => {
    selected.forEach((value, index) => {
      if (prevSelectedRef.current[index] !== value) {
        answer(question.questionNo[index], value ?? null);
      }
    });
    prevSelectedRef.current = selected;
  }, [selected, question.questionNo, answer]);

  return (
    <div className="mt-2 flex flex-col gap-3">
      {question.options.map((option, index) => (
        <div key={index} className="flex items-baseline">
          <Checkbox
            value={option.value}
            id={`${question.questionNo}-${option.value}`}
            onCheckedChange={(checked) => {
              if (checked) {
                const newSelected = [...selected, option.value];
                setSelected(newSelected.slice(-MAX_SELECT));
              } else {
                setSelected(selected.filter((item) => item !== option.value));
              }
            }}
            checked={selected.includes(option.value)}
            disabled={disabled}
            status={
              questionStatus.length
                ? questionStatus[selected.findIndex((item) => item === option.value)]
                : undefined
            }
          />
          <Label
            className="ml-2 text-base font-normal"
            htmlFor={`${question.questionNo}-${option.value}`}
          >
            {option.value}. {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default function MultipleChoiceQuestionGroup({
  questionCard,
  questions,
  questionType,
}: QuestionGroupMultipleChoice) {
  const { answer, answerSheet } = useAnswerStore();
  const { t } = useTranslation("collection");
  const { answerKeys, status, guidances } = useResult();

  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      {questionType === EnumQuestionGroup.TFNG && (
        <ul className="pl-4 pt-2 italic">
          <li>
            <strong>TRUE</strong> - if the statement agrees with the information
          </li>
          <li>
            <strong>FALSE</strong> - if the statement contradicts the information
          </li>
          <li>
            <strong>NOT GIVEN</strong> - if there is no information on this
          </li>
        </ul>
      )}
      {questionType === EnumQuestionGroup.YNNG && (
        <ul className="pl-4 pt-2 italic">
          <li>
            <strong>YES</strong> - if the statement agrees with the information
          </li>
          <li>
            <strong>NO</strong> - if the statement contradicts the information
          </li>
          <li>
            <strong>NOT GIVEN</strong> - if there is no information on this
          </li>
        </ul>
      )}
      {questions.map((question) => {
        const id = question.questionNo[0] - 1;
        const questionStatus =
          question.questionNo.length > 1
            ? status.slice(id, question.questionNo[question.questionNo.length - 1])
            : [status[id]];
        const answerStatus =
          questionStatus.length > 1 ? questionStatus.every((status) => status) : questionStatus[0];

        return (
          <div key={question.questionNo[0]} className="mt-4">
            {question.questionNo.length > 1 && (
              <div className="inline-flex">
                {question.questionNo.map((no) => (
                  <BubbleQuestionIndex index={no} key={no} className="mr-2" />
                ))}
              </div>
            )}
            {question.questionNo.length == 1 ? (
              <p>
                <BubbleQuestionIndex index={question.questionNo[0]} className="mr-2" />
                {question.question}
              </p>
            ) : (
              <>
                {question.questionNo.map((no) => (
                  <span id={genQuestionId(no)} key={no} />
                ))}
                <strong>{question.question}</strong>
              </>
            )}
            <div className="mt-2">
              {question.questionNo.length > 1 ? (
                <MultipleSelect
                  question={question}
                  disabled={!!answerKeys.length}
                  questionStatus={questionStatus}
                />
              ) : (
                <RadioGroup
                  onValueChange={(value) => {
                    answer(question.questionNo[0], value);
                  }}
                  value={answerSheet[question.questionNo[0]] ?? ""}
                  disabled={!!answerKeys.length}
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
                        <span className="capitalize">{option.value}</span>. {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
            {answerKeys.length ? (
              <div className="mt-2 flex">
                <span className="font-medium italic">
                  {t("correctAnswer", { context: "single" })} :{" "}
                </span>{" "}
                &nbsp;
                <AnswerGuidanceContent
                  answer={answerKeys[id]}
                  status={answerStatus}
                  guidance={guidances ? guidances[id] : null}
                  questionNo={question.questionNo[0]}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
