import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useGetSTSessionDetail,
  useSubmitSimulatedTest,
} from "@/hooks/react-query/use-simulated-test";
import useGlobalTimerStore, { timerKeys, TimerType } from "@/hooks/zustand/use-global-timer";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumMode, EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { formatAnswerSheetToResponses, getElapsedTime, getInitialTime } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

type ExitDialogProps = {
  triggerButton: React.ReactNode;
};
const ExitDialog = ({ triggerButton }: ExitDialogProps) => {
  const navigate = useNavigate();
  const { sessionId, collectionId } = Route.useSearch();
  const { answerSheet } = useAnswerStore();
  const { data: session } = useGetSTSessionDetail(sessionId);
  const { getTimer } = useGlobalTimerStore();
  const { mutate: submitTest } = useSubmitSimulatedTest(collectionId);

  const onClose = () => {
    const responses = formatAnswerSheetToResponses(answerSheet);
    if (session) {
      const type: TimerType =
        session.timeLimit == 0 && session.mode == EnumMode.PRACTICE ? "stopwatch" : "countdown";
      const initialTime = getInitialTime(session.mode, session.timeLimit, session.skillTest.skill);
      const currentTime = getTimer(timerKeys.testDetail(sessionId))?.time ?? 0;
      if (session.skillTest.skill !== EnumSkill.speaking) {
        submitTest({
          sessionId,
          elapsedTime: getElapsedTime(type, initialTime, currentTime),
          status: EnumSimulatedTestSessionStatus.IN_PROGRESS,
          response: {
            skill: session.skillTest.skill,
            info: responses,
          },
        });
      }
    }
    navigate({ to: "/practice" });
  };
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "exitDialog",
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={onClose} variant="outline" size="xl">
              {t("exitBtn")}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild className="w-full">
            <Button size="xl" className="w-full">
              {t("continueBtn")}
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ExitDialog;
