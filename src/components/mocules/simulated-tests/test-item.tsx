import { ArrowRight } from "lucide-react";

import ExamItemInProgressIcon from "@/assets/icons/exam/inprogress";
import { EnumTestRecordStatus } from "@/lib/enums";

import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui";
import { SimulatedTestSimple } from "@/lib/types/simulated-test.type";

export const TestItem = ({ testName }: SimulatedTestSimple) => {
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
            {/* TODO: integrate test user record */}
            <TestResult score={null} status={EnumTestRecordStatus.NotStarted} />
          </div>
        </div>
      </Button>
      <span>
        <Separator className="mt-1.5" />
      </span>
    </div>
  );
};

type TestResultProps = { score: string | null; status: EnumTestRecordStatus };
export const TestResult = ({ score, status }: TestResultProps) => {
  return (
    <div className="items-center justify-center text-center">
      {status === EnumTestRecordStatus.InProgress ? (
        <ExamItemInProgressIcon />
      ) : status === EnumTestRecordStatus.NotStarted ? (
        <ArrowRight className="text-neutral-400" size={16} />
      ) : (
        <span className="text-blue-600">{score}</span>
      )}
    </div>
  );
};
