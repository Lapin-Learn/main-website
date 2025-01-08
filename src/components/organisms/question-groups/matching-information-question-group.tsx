import { useTranslation } from "react-i18next";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useResult } from "@/hooks/zustand/use-result";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { QuestionGroupMatchingInformation } from "@/lib/types/simulated-test.type";

import AnswerGuidanceContent from "../result/answer-guidance-content";

export default function MatchingInformationQuestionGroup({
  questionCard,
  questions,
  options,
  questionDescription,
}: QuestionGroupMatchingInformation) {
  const { answer, answerSheet } = useAnswerStore();
  const { t } = useTranslation("collection");
  const { answerKeys, status, guidances } = useResult();

  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      {questionDescription && typeof questionDescription == "string" && (
        <p className="my-2">{questionDescription}</p>
      )}
      <ul className="ml-4 flex flex-col gap-2">
        {options.map((option) => (
          <li key={option.value}>
            <strong>{option.value}</strong>&nbsp;{option.label}
          </li>
        ))}
      </ul>
      {questions.map((question) => (
        <div
          key={question.questionNo}
          className="mt-4"
          id={`Question-${question.questionNo.toString()}`}
        >
          <p>
            <strong className="mr-2">{question.questionNo}.</strong>
            {question.question}
            <span className="ml-2 inline-block">
              <Select
                value={answerSheet[question.questionNo] ?? ""}
                onValueChange={(value: string) => answer(question.questionNo, value)}
                disabled={!!answerKeys.length}
              >
                <SelectTrigger className="w-40">
                  <SelectValue
                    placeholder={
                      <span className="text-[#6B7280]">Question {question.questionNo}</span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.value}. {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </span>
          </p>
          {answerKeys.length && status.length ? (
            <div className="mt-2 flex">
              <span className="font-medium italic">
                {t("correctAnswer", { context: "single" })} :{" "}
              </span>{" "}
              &nbsp;
              <AnswerGuidanceContent
                answer={answerKeys[question.questionNo - 1]}
                status={status[question.questionNo - 1]}
                guidance={guidances ? guidances[question.questionNo - 1] : null}
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
