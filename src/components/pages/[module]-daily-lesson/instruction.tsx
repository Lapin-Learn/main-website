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
      <DialogContent showClose={false} className="h-[90%] overflow-y-auto p-8 sm:max-w-md">
        <div className="absolute right-5 top-5 flex w-full flex-row items-center justify-end">
          <DialogClose>
            <X className="text-black" />
          </DialogClose>
        </div>
        <DialogHeader className="flex flex-col items-center justify-center space-y-4">
          <DialogTitle className="text-heading-4 font-bold">{title ?? ""}</DialogTitle>
        </DialogHeader>
        <div
          className="overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: instruction.content }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDetailInstruction;
