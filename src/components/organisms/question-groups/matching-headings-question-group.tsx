import { useTranslation } from "react-i18next";

import BubbleQuestionIndex from "@/components/molecules/bubble-question-index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useResult } from "@/hooks/zustand/use-result";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumQuestionGroup } from "@/lib/enums";
import { QuestionGroupMatchingHeadings } from "@/lib/types/simulated-test.type";
import { genQuestionId } from "@/lib/utils";

import AnswerGuidanceContent from "../result/answer-guidance-content";
import { getMatchingInformationToParagraphQuestions } from "./helpers";

export default function MatchingHeadingsQuestionGroup({
  questions,
  questionType,
  numberOfParagraphs,
}: QuestionGroupMatchingHeadings) {
  const { answer, answerSheet } = useAnswerStore();
  const { t } = useTranslation("collection");
  const { answerKeys, status, guidances } = useResult();

  const modifiedQuestions =
    questionType === EnumQuestionGroup.matchingInformationToParagraph
      ? getMatchingInformationToParagraphQuestions(questions, numberOfParagraphs)
      : questions;

  return (
    <div>
      {modifiedQuestions.map((question) => (
        <div key={question.questionNo} className="mt-4" id={genQuestionId(question.questionNo)}>
          <p>
            <BubbleQuestionIndex index={question.questionNo} className="mb-2 mr-2" />
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
                  {question.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
                questionNo={question.questionNo}
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
