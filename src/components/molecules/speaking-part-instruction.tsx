import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PART_INSTRUCTIONS } from "@/lib/consts";

import { Button } from "../ui";

type PartInstructionProps = {
  partNo: number;
};

const PartInstruction = ({ partNo }: PartInstructionProps) => {
  const { t } = useTranslation("simulatedTest");

  return (
    <div className="flex w-[800px] flex-col items-center gap-4 overflow-visible rounded-lg border border-blue-200 bg-white px-16 py-12">
      <h4 className="text-heading-5 font-semibold">Instruction</h4>
      <div className="flex flex-col items-center gap-2">
        {PART_INSTRUCTIONS[partNo].map((instruction, index) => (
          <p className="text-center" key={index}>
            {instruction}
          </p>
        ))}
      </div>
      <Button type="submit" className="w-full flex-1 sm:w-fit">
        <div className="flex items-center gap-2">
          <Zap fill="white" strokeWidth={0} className="size-4" />
          {t("start")}
        </div>
      </Button>
    </div>
  );
};

export default PartInstruction;
