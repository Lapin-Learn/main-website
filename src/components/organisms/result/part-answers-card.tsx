import TagsList from "@/components/molecules/tags-list";
import { PartDetail, STSkillTestAnswer } from "@/lib/types/simulated-test.type";

import AnswerKeyContent from "./answer-key-content";

export function PartAnswersCard({
  part,
  partDetail,
  userAnswers,
  answerStatus,
  answers,
}: {
  part: number;
  partDetail: PartDetail;
  userAnswers: string[];
  answerStatus: boolean[];
  answers: STSkillTestAnswer[];
}) {
  const { startQuestionNo, questionTypes, endQuestionNo } = partDetail;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <p className="text-lg font-bold">
          Part {part}: Question {startQuestionNo}-{endQuestionNo}
        </p>
        <TagsList tags={questionTypes} />
      </div>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-7 gap-4 md:grid-cols-3 md:grid-rows-5">
        {answers.slice(startQuestionNo - 1, endQuestionNo).map((answer, i) => {
          const id = i + startQuestionNo;
          return (
            <div key={id} className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-900">
                {id}
              </div>
              <AnswerKeyContent
                answer={answer}
                userAnswer={userAnswers[id - 1]}
                status={answerStatus[id - 1]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SkeletonPartAnswersCard() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-2xl bg-white p-4">
      <div className="flex gap-4">
        <div className="h-8 w-24 rounded-md bg-neutral-50"></div>
        <div className="h-8 w-24 rounded-md bg-neutral-50"></div>
      </div>
      <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-neutral-50"></div>
            <div className="h-5 w-24 rounded-md bg-neutral-50"></div>
            <div className="h-5 w-24 rounded-md bg-neutral-50"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
