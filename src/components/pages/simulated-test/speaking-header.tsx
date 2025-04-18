import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import { Button } from "@/components/ui";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import {
  SPEAKING_PART_ONE_AND_THREE_DURATION_DEV,
  SPEAKING_PART_ONE_AND_THREE_DURATION_PROD,
  SPEAKING_PART_TWO_DURATION_DEV,
  SPEAKING_PART_TWO_DURATION_PROD,
} from "@/lib/consts";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { getPartName, isDevEnv } from "@/lib/utils";

import Timer from "../../molecules/timer";
import { HeaderProps } from "./header";

export default function SpeakingHeader({ currentPart, session }: HeaderProps) {
  const { t } = useTranslation("simulatedTest");
  // const { isSuccess } = useGetSkillTestData(session.skillTest.id, currentPart);
  const isSuccess = true;
  const { createTimer, deleteTimer, resetTimer, stopTimer } = useGlobalTimerStore();
  const { testState, showInstruction } = useSpeakingTestState();

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
      const partTimeLimit =
        currentPart === 1 || currentPart === 3
          ? isDevEnv()
            ? SPEAKING_PART_ONE_AND_THREE_DURATION_DEV
            : SPEAKING_PART_ONE_AND_THREE_DURATION_PROD
          : isDevEnv()
            ? SPEAKING_PART_TWO_DURATION_DEV
            : SPEAKING_PART_TWO_DURATION_PROD;

      if (session.mode == EnumMode.FULL_TEST) {
        createTimer(timerKeys.testDetail(session.id), "countdown", partTimeLimit);
        if (showInstruction) {
          stopTimer(timerKeys.testDetail(session.id));
          resetTimer(timerKeys.testDetail(session.id), partTimeLimit);
        }
      } else {
        createTimer(timerKeys.testDetail(session.id), "stopwatch", 0);
      }
    }
  }, [isSuccess, session, currentPart, showInstruction]);

  return (
    <>
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
        {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS && (
          <div className="absolute right-4">
            <Timer sessionId={session.id} />
          </div>
        )}
      </div>
    </>
  );
}
