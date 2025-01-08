import { Check, X } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { SkillTestGuidance, STSkillTestAnswer } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

type AnswerGuidanceContentProps = {
  answer: STSkillTestAnswer;
  userAnswer?: string;
  status: boolean;
  guidance: SkillTestGuidance | null;
};

export default function AnswerGuidanceContent({
  answer,
  userAnswer,
  status,
  guidance,
}: AnswerGuidanceContentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild disabled={!guidance}>
        <button
          className={cn(
            "underline-offset-4 flex items-center gap-1 decoration-blue-500 decoration-2",
            guidance && "hover:underline"
          )}
        >
          <div className="text-sm">
            <span className="text-green-500">
              {String(answer.valid || answer.variants?.join("/ ")).toUpperCase()}
            </span>
            {userAnswer && ` : ${userAnswer}`}
          </div>
          {status ? (
            <Check className="text-green-500" size={16} />
          ) : (
            <X className="text-red-500" size={16} />
          )}
        </button>
      </DialogTrigger>
      {guidance && (
        <DialogContent className="max-w-3xl">
          <DialogHeader />
          <div dangerouslySetInnerHTML={{ __html: guidance.explanationInText }} />
        </DialogContent>
      )}
    </Dialog>
  );
}
