import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import { Button } from "@/components/ui";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { SPEAKING_PART_ONE_AND_THREE_DURATION, SPEAKING_PART_TWO_DURATION } from "@/lib/consts";
import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { getPartName } from "@/lib/utils";

import { HeaderProps } from "./header";
import Timer from "./timer";

export default function SpeakingHeader({ currentPart, session }: HeaderProps) {
  const { t } = useTranslation("simulatedTest");
  // const { isSuccess } = useGetSkillTestData(session.skillTest.id, currentPart);
  const isSuccess = true;
  const { createTimer, deleteTimer } = useGlobalTimerStore();
  const {
    testState,
    position: { question },
  } = useSpeakingTestState();

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
      const partTimeLimit =
        currentPart === 1 || currentPart === 3
          ? SPEAKING_PART_ONE_AND_THREE_DURATION
          : SPEAKING_PART_TWO_DURATION;

      if (mode == EnumMode.FULL_TEST || timeLimit !== 0) {
        if (question === 1) {
          createTimer(timerKeys.testDetail(id), "countdown", partTimeLimit);
        }
      } else {
        createTimer(timerKeys.testDetail(id), "stopwatch", 30);
      }
    }
  }, [isSuccess, session, currentPart]);

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
        {testState === EnumSimulatedTestSessionStatus.IN_PROGRESS ? (
          <Timer sessionId={session.id} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
