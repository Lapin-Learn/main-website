import { ArrowRight } from "lucide-react";

import ExamItemInProgressIcon from "@/assets/icons/exam/inprogress";
import { Button } from "@/components/ui";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { SimulatedTestSimple } from "@/lib/types/simulated-test.type";

import { Separator } from "../../ui/separator";

export const TestItem = ({ testName, status, estimatedBandScore }: SimulatedTestSimple) => {
  // TODO: Navigate to test history detail page
  // const handleExam = () => {
  //   console.log("exam clicked");
  // };

  return (
    <div>
      <Button variant="ghost" className="w-full p-0">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row items-center justify-between gap-2 py-1">
            <p className="grow-0 truncate text-small text-neutral-900">{testName}</p>
            <TestResult score={estimatedBandScore} status={status} />
          </div>
        </div>
      </Button>
      <span>
        <Separator className="mt-1.5" />
      </span>
    </div>
  );
};

type TestResultProps = { score: number | null; status: EnumSimulatedTestSessionStatus };
export const TestResult = ({ score, status }: TestResultProps) => {
  return (
    <div className="items-center justify-center text-center">
      {status === EnumSimulatedTestSessionStatus.IN_PROGRESS ? (
        <ExamItemInProgressIcon />
      ) : status === EnumSimulatedTestSessionStatus.NOT_STARTED ? (
        <ArrowRight className="text-neutral-400" size={16} />
      ) : (
        <span className="text-blue-600">{score}</span>
      )}
    </div>
  );
};
