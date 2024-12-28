import { Check, X } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SkillTestGuidance, STSkillTestAnswer } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

export default function AnswerKeyContent({
  answer,
  userAnswer,
  status,
  guidance,
}: {
  answer: STSkillTestAnswer;
  userAnswer: string;
  status: boolean;
  guidance: SkillTestGuidance;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "underline-offset-4 flex items-center gap-1 decoration-blue-500 decoration-2",
            guidance && "hover:underline"
          )}
        >
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
        </div>
      </DialogTrigger>
      {guidance && (
        <DialogContent>
          <div dangerouslySetInnerHTML={{ __html: guidance.explanationInText }} />
        </DialogContent>
      )}
    </Dialog>
  );
}
