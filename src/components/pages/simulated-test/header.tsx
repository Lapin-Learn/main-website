import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import StartDialog from "@/components/organisms/simulated-test-dialog/start-dialog";
import { SimulatedTestTourFactory } from "@/components/organisms/simulated-test-tour";
import { Button } from "@/components/ui";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { getInitialTime, getPartName, getTimerMode } from "@/lib/utils";

import Timer from "./timer";

type HeaderProps = {
  currentPart: number;
  session: SimulatedTestSession;
};

export default function Header({ currentPart, session }: HeaderProps) {
  const { t } = useTranslation("simulatedTest");
  const [run, setRun] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);

  const { isSuccess } = useGetSkillTestData(session.skillTest.id, currentPart);
  const { createTimer, startTimer } = useGlobalTimerStore();

  useEffect(() => {
    const isFirstTime = localStorage.getItem("simulatedTestFirstTime") !== "false";
    if (isFirstTime) {
      setRun(true);
    } else {
      setShowStartDialog(true);
    }
  }, []);

  const onEndTour = () => {
    setRun(false);
    localStorage.setItem("simulatedTestFirstTime", "false");
    setShowStartDialog(true);
  };

  const { skill } = session.skillTest;

  useEffect(() => {
    if (isSuccess && session) {
      createTimer(
        timerKeys.testDetail(session.id),
        getTimerMode(session.mode, session.timeLimit),
        getInitialTime(session.mode, session.timeLimit, skill)
      );
    }
  }, [isSuccess, session]);

  return (
    <>
      <StartDialog
        onClose={() => {
          startTimer(timerKeys.testDetail(session.id));
          setShowStartDialog(false);
        }}
        open={showStartDialog}
        disableStart={!isSuccess}
        parts={session.parts.length}
        timeLimit={session.timeLimit}
        mode={session.mode}
        skill={skill}
      />
      <SimulatedTestTourFactory skill={skill} run={run} onEndTour={onEndTour} />
      <div className="grid w-full place-items-center border-b bg-white px-4 shadow-sm sm:h-16 sm:px-8">
        <div className="flex flex-col items-center">
          <h6 className="text-base font-bold uppercase sm:text-lg">
            {[skill.toString(), getPartName(session.skillTest.skill), currentPart].join(" ")}
          </h6>
          <div className="text-xs font-semibold text-neutral-300 sm:text-sm">
            {session.skillTest.simulatedIeltsTest.testName}
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
        <Timer sessionId={session.id} />
      </div>
    </>
  );
}
