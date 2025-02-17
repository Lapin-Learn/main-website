import BubbleQuestionIndex from "@/components/molecules/bubble-question-index";
import TagsList from "@/components/molecules/tags-list";
import { PartDetail, SkillTestGuidance, STSkillTestAnswer } from "@/lib/types/simulated-test.type";

import AnswerGuidanceContent from "./answer-guidance-content";

type PartAnswersCardProps = {
  part: number;
  partDetail: PartDetail;
  userAnswers: string[];
  answerStatus: boolean[];
  answers: STSkillTestAnswer[];
  guidances: SkillTestGuidance[];
};

export function PartAnswersCard({
  part,
  partDetail,
  userAnswers,
  answerStatus,
  answers,
  guidances,
}: PartAnswersCardProps) {
  const { startQuestionNo, questionTypesIndices, endQuestionNo } = partDetail;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <p className="text-lg font-bold">
          Part {part}: Question {startQuestionNo}-{endQuestionNo}
        </p>
        <TagsList tags={questionTypesIndices.map((index) => index.name)} />
      </div>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-7 gap-4 md:grid-cols-3 md:grid-rows-5">
        {answers?.slice(startQuestionNo - 1, endQuestionNo).map((answer, i) => {
          const id = i + startQuestionNo;

          return (
            <AnswerContent
              key={id}
              questionNo={id}
              answer={answer}
              userAnswer={userAnswers[id - 1]}
              status={answerStatus[id - 1]}
              guidance={guidances ? guidances[id - 1] : null}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AnswerContent({
  id,
  questionNo,
  answer,
  userAnswer,
  status,
  guidance,
}: {
  id?: string;
  questionNo: number;
  answer: STSkillTestAnswer;
  userAnswer: string;
  status: boolean;
  guidance: SkillTestGuidance | null;
}) {
  return (
    <div className="flex items-center gap-2" id={id}>
      <BubbleQuestionIndex index={questionNo} isCurrent={false} />
      <AnswerGuidanceContent
        answer={answer}
        userAnswer={userAnswer}
        status={status}
        guidance={guidance}
        questionNo={questionNo}
      />
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
