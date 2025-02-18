import { ArrowRightIcon, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import StartDialog from "@/components/organisms/simulated-test-dialog/start-dialog";
import SubmitDialog from "@/components/organisms/simulated-test-dialog/submit-dialog";
import { SimulatedTestTourFactory } from "@/components/organisms/simulated-test-tour";
import { Button } from "@/components/ui";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { EnumMode } from "@/lib/enums";
import { SimulatedTestSession } from "@/lib/types/simulated-test.type";
import { getInitialTime, getPartName, getTimerMode } from "@/lib/utils";

import Timer from "./timer";

export type HeaderProps = {
  currentPart: number;
  session: SimulatedTestSession;
};

export default function Header({ currentPart, session }: HeaderProps) {
  const { t } = useTranslation("simulatedTest");
  const [run, setRun] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);

  // const { isSuccess } = useGetSkillTestData(session.skillTest.id, currentPart);
  const isSuccess = true;
  const { createTimer, startTimer, deleteTimer } = useGlobalTimerStore();

  useEffect(() => {
    const isFirstTime = localStorage.getItem("simulatedTestFirstTime") !== "false";
    if (isFirstTime) {
      setRun(true);
    } else {
      setShowStartDialog(true);
    }
    return () => {
      deleteTimer(timerKeys.testDetail(session.id));
    };
  }, []);

  const onEndTour = () => {
    setRun(false);
    localStorage.setItem("simulatedTestFirstTime", "false");
    setShowStartDialog(true);
  };

  const { skill } = session.skillTest;

  // Run before create timer below
  useEffect(() => {
    return () => {
      if (session) {
        deleteTimer(timerKeys.testDetail(session.id));
      }
    };
  }, [session]);

  useEffect(() => {
    if (isSuccess && session) {
      const { mode, timeLimit, id } = session;
      // Load previous elapsed time if available
      let initialTime = session.elapsedTime * 1000;
      // countdown
      if (mode == EnumMode.FULL_TEST || timeLimit !== 0) {
        initialTime = getInitialTime(mode, timeLimit, skill) - initialTime;
      }
      createTimer(timerKeys.testDetail(id), getTimerMode(mode, timeLimit), initialTime);
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
        <div className="flex flex-col items-center py-1">
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
        <div className="absolute right-4 flex items-center gap-2">
          <Timer sessionId={session.id} />
          <SubmitDialog
            triggerButton={
              <Button size="xl" className="submit flex gap-2 px-4">
                {t("submitBtn")}
                <ArrowRightIcon strokeWidth={3} size={16} />
              </Button>
            }
            sessionId={session.id}
          />
        </div>
      </div>
    </>
  );
}
