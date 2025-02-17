import { DialogTitle } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import parse from "html-react-parser";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { SkillTestGuidance, STSkillTestAnswer } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

type AnswerGuidanceContentProps = {
  answer: STSkillTestAnswer;
  userAnswer?: string;
  status: boolean;
  guidance: SkillTestGuidance | null;
  questionNo: number;
};

export default function AnswerGuidanceContent({
  answer,
  userAnswer,
  status,
  guidance,
  questionNo,
}: AnswerGuidanceContentProps) {
  return (
    <BaseGuidance
      guidance={guidance}
      trigger={
        <button
          className={cn(
            "underline-offset-4 flex items-center gap-1 decoration-blue-500 decoration-2",
            guidance ? "hover:underline" : "cursor-default"
          )}
        >
          <div className="text-sm">
            <span className="text-green-500">
              {String(answer.valid || answer.variants?.join("/ ")).toUpperCase()}
            </span>
            {userAnswer && ` : ${userAnswer}`}
          </div>
          {status ? (
            <Check className="text-green-600" size={16} />
          ) : (
            <X className="text-red-500" size={16} />
          )}
        </button>
      }
      questionNo={questionNo}
    />
  );
}

export function BaseGuidance({
  guidance,
  trigger,
  questionNo,
}: {
  guidance: SkillTestGuidance | null;
  trigger: React.ReactNode;
  questionNo?: number;
}) {
  const { t } = useTranslation("simulatedTest");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {guidance && (
        <DialogContent className="max-w-3xl">
          <DialogHeader className="self-center">
            <DialogTitle className="mb-2 text-center text-2xl font-semibold">
              {t("result.explanation", { questionNo })}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-80">{parse(guidance.explanationInText)}</ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
