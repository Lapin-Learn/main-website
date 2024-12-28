import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { QuestionGroupMatchingInformation } from "@/lib/types/simulated-test.type";

export default function MatchingInformationQuestionGroup({
  questionCard,
  questions,
  options,
  questionDescription,
  disabled,
}: QuestionGroupMatchingInformation) {
  const { answer, answerSheet } = useAnswerStore();
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
                disabled={disabled}
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
        </div>
      ))}
    </div>
  );
}
