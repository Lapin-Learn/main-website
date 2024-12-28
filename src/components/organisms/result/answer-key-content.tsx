import { Check, X } from "lucide-react";

import { STSkillTestAnswer } from "@/lib/types/simulated-test.type";

export default function AnswerKeyContent({
  answer,
  userAnswer,
  status,
}: {
  answer: STSkillTestAnswer;
  userAnswer: string;
  status: boolean;
}) {
  return (
    <>
      <div className="text-sm">
        <span className="text-green-500">
          {String(answer.valid || answer.variants?.join("/ ")).toUpperCase()}
        </span>{" "}
        : {userAnswer}
      </div>
      {status ? (
        <Check className="text-green-500" size={16} />
      ) : (
        <X className="text-red-500" size={16} />
      )}
    </>
  );
}
