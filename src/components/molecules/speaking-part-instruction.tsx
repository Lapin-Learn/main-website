import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { PART_INSTRUCTIONS } from "@/lib/consts";
import { EnumMode } from "@/lib/enums";

import { Button } from "../ui";

const PartInstruction = ({ sessionId }: { sessionId: number }) => {
  const {
    position: { part: currentPart },
    navigateToPart,
  } = useSpeakingTestState();
  const { data: session } = useGetSTSessionDetail(sessionId);
  const { t } = useTranslation("simulatedTest");
  const { startTimer } = useGlobalTimerStore();

  const handleStart = () => {
    navigateToPart(1, currentPart);
    if (session?.mode === EnumMode.FULL_TEST) {
      if (currentPart === 1 || currentPart === 3) startTimer(timerKeys.testDetail(sessionId));
    }
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
