import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CallBackProps, STATUS } from "react-joyride";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import StartDialog from "@/components/organisms/simulated-test-dialog/start-dialog";
import SimulatedTestTour from "@/components/organisms/simulated-test-tour";
import { Button } from "@/components/ui";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import useCountdown from "@/hooks/use-countdown";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";

type HeaderProps = {
  currentPart: number;
  testId: number;
  skillTestId: number;
};

export default function Header({ currentPart, skillTestId }: HeaderProps) {
  const { t } = useTranslation("simulatedTest");
  const [run, setRun] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);

  const { isSuccess } = useGetSkillTestData(skillTestId, currentPart);
  const { setElapsedTime } = useAnswerStore();
  const { time, resume, isEnd } = useCountdown(60 * 40, setElapsedTime); // 40 minutes

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
        disableStart={!isSuccess}
      />
      <SimulatedTestTour run={run} handleTourCallback={handleTourCallback} />
      <div className="grid w-full place-items-center border-b bg-white px-4 shadow-sm sm:h-20 sm:px-8">
        <div className="flex flex-col items-center">
          {/* TODO: get skill, session detail to render data  */}
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
