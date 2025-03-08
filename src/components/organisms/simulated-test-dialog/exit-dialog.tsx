import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

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
  mode?: EnumMode;
};
const ExitDialog = ({ triggerButton, mode }: ExitDialogProps) => {
  const navigate = useNavigate();
  const { sessionId, collectionId } = Route.useSearch();
  const { answerSheet } = useAnswerStore();
  const { data: session } = useGetSTSessionDetail(sessionId);
  const { getTimer } = useGlobalTimerStore();
  const { mutate: submitTest, isPending } = useSubmitSimulatedTest(collectionId);

  const onClose = () => {
    const responses = formatAnswerSheetToResponses(answerSheet);
    if (session) {
      const type: TimerType =
        session.timeLimit == 0 && session.mode == EnumMode.PRACTICE ? "stopwatch" : "countdown";
      const initialTime = getInitialTime(session.mode, session.timeLimit, session.skillTest.skill);
      const currentTime = getTimer(timerKeys.testDetail(sessionId))?.time ?? 0;
      if (session.skillTest.skill !== EnumSkill.speaking) {
        submitTest(
          {
            sessionId,
            elapsedTime: getElapsedTime(type, initialTime, currentTime),
            status: EnumSimulatedTestSessionStatus.IN_PROGRESS,
            response: {
              skill: session.skillTest.skill,
              info: responses,
            },
          },
          {
            onSettled: () => {
              if (collectionId) {
                navigate({ to: `/practice/${collectionId}` });
              } else {
                navigate({ to: "/practice" });
              }
            },
          }
        );
      } else {
        submitTest(
          {
            sessionId,
            elapsedTime: getElapsedTime(type, initialTime, currentTime),
            status: EnumSimulatedTestSessionStatus.CANCELED,
            response: {
              skill: session.skillTest.skill,
              info: [],
            },
          },
          {
            onSettled: () => {
              if (collectionId) {
                navigate({ to: `/practice/${collectionId}` });
              } else {
                navigate({ to: "/practice" });
              }
            },
          }
        );
      }
    }
  };
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "exitDialog",
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <Trans
              context={mode}
              i18nKey="exitDialog.description"
              prefix="exitDialog"
              ns="simulatedTest"
              components={{ strong: <strong /> }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full gap-2 max-md:flex-row">
          <AlertDialogAction asChild>
            <Button
              onClick={onClose}
              variant="outline"
              size="xl"
              isLoading={isPending}
              disabled={isPending}
            >
              {t(mode === EnumMode.PRACTICE ? "saveAndExitBtn" : "exitBtn")}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild className="mt-0 w-full">
            <Button size="xl" className="w-full" isLoading={isPending} disabled={isPending}>
              {t("continueBtn")}
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ExitDialog;
