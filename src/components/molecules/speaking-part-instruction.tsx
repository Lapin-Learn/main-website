import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_INSTRUCTIONS } from "@/lib/consts";

import { Button } from "../ui";

const PartInstruction = () => {
  const {
    position: { part: currentPart },
    navigateToPart,
  } = useSpeakingTestState();
  const { t } = useTranslation("simulatedTest");
  const handleStart = () => {
    navigateToPart(1, currentPart);
  };

  return (
    <div className="flex w-[800px] flex-col items-center gap-4 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <h4 className="text-heading-5 font-semibold">Instruction</h4>
      <div className="flex flex-col items-center gap-2">
        {PART_INSTRUCTIONS[currentPart].map((instruction, index) => (
          <p className="text-center" key={index}>
            {instruction}
          </p>
        ))}
      </div>
      <Button type="submit" className="w-full flex-1 sm:w-fit" onClick={handleStart}>
        <div className="flex items-center gap-2">
          <Zap fill="white" strokeWidth={0} className="size-4" />
          {t("start")}
        </div>
      </Button>
    </div>
  );
};

export default PartInstruction;
