import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CallBackProps, STATUS } from "react-joyride";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import StartDialog from "@/components/organisms/simulated-test-dialog/start-dialog";
import SimulatedTestTour from "@/components/organisms/simulated-test-tour";
import { Button } from "@/components/ui";
import useCountdown from "@/hooks/use-countdown";

type HeaderProps = {
  currentPart: number;
};
export default function Header({ currentPart }: HeaderProps) {
  const [run, setRun] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const { time, resume, isEnd } = useCountdown(60 * 40); // 40 minutes
  const { t } = useTranslation("simulatedTest");
  useEffect(() => {
    const isFirstTime = localStorage.getItem("simulatedTestFirstTime") !== "false";
    if (isFirstTime) {
      setRun(true);
    } else {
      setShowStartDialog(true);
    }
  }, []);
  useEffect(() => {
    if (isEnd) {
      // TODO: submit the test
    }
  }, [isEnd]);

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem("simulatedTestFirstTime", "false");
      setShowStartDialog(true);
    }
  };

  return (
    <>
      <StartDialog
        onClose={() => {
          resume();
          setShowStartDialog(false);
        }}
        open={showStartDialog}
      />
      <SimulatedTestTour run={run} handleTourCallback={handleTourCallback} />
      <div className="grid w-full place-items-center border-b bg-white px-4 shadow-sm sm:h-20 sm:px-8">
        <div className="flex flex-col items-center">
          <h6 className="text-base font-bold uppercase sm:text-lg">
            Reading passage {currentPart}
          </h6>
          <div className="text-xs font-semibold text-neutral-300 sm:text-sm">
            Road to IELTS - test 1
          </div>
        </div>
        <ExitDialog
          triggerButton={
            <Button className="quit absolute left-4 sm:left-8" variant="ghost">
              <ChevronLeft size={20} />
              {t("exitDialog.exitBtn")}
            </Button>
          }
        />

        <div className="timer absolute right-4 w-20 rounded-md bg-secondary p-1 text-center text-base font-bold text-secondary-foreground sm:right-8 sm:text-lg md:w-24 md:p-2">
          {time}
        </div>
      </div>
    </>
  );
}
