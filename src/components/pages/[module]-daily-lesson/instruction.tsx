import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Instruction } from "@/lib/types";

type QuestionTypeDetailInstructionProps = {
  title?: string;
  instruction?: Instruction;
  children: React.ReactNode;
};

const QuestionTypeDetailInstruction = ({
  title,
  instruction,
  children,
}: QuestionTypeDetailInstructionProps) => {
  if (!instruction) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showClose={false}
        className="h-[90%]flex min-w-[300px] max-w-2xl flex-col overflow-y-auto p-8"
      >
        <div className="absolute right-5 top-5 flex w-full flex-row items-center justify-end">
          <DialogClose>
            <X className="text-black" />
          </DialogClose>
        </div>
        <DialogHeader className="flex h-fit flex-col items-center justify-center space-y-4">
          <DialogTitle className="text-heading-4 font-bold">{title ?? ""}</DialogTitle>
        </DialogHeader>
        <div
          className="h-full grow overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: instruction.content }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDetailInstruction;
