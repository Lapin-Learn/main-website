import { STSkillTestAnswer } from "@/lib/types/simulated-test.type";

import AnswerKeyContent from "./answer-key-content";

export default function AnswerKeys({
  answerKeys,
  startNo,
  endNo,
  userAnswers,
  answerStatus,
}: {
  answerKeys: STSkillTestAnswer[];
  startNo: number;
  endNo: number;
  userAnswers: string[];
  answerStatus: boolean[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {answerKeys.slice(startNo - 1, endNo).map((answer, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="text-base font-bold">{+startNo + index}</div>
          <AnswerKeyContent
            answer={answer}
            userAnswer={userAnswers[+startNo + index - 1]}
            status={answerStatus[+startNo + index - 1]}
          />
        </div>
      ))}
    </div>
  );
}
