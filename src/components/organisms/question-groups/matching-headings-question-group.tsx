import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { QuestionGroupMatchingHeadings } from "@/lib/types/simulated-test.type";

export default function MatchingHeadingsQuestionGroup({
  questionCard,
  questions,
}: QuestionGroupMatchingHeadings) {
  const { answer, answerSheet } = useAnswerStore();
  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
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
              >
                <SelectTrigger className="w-40">
                  <SelectValue
                    placeholder={
                      <span className="text-[#6B7280]">Question {question.questionNo}</span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
