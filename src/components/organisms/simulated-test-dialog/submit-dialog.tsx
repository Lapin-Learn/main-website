import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useGetSTSessionDetail,
  useSubmitSimulatedTest,
} from "@/hooks/react-query/use-simulated-test";
import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { formatAnswerSheetToResponses, formatTime, getInitialTime } from "@/lib/utils";

type SubmitDialogProps = {
  triggerButton: React.ReactNode;
  sessionId: number;
};
const SubmitDialog = ({ triggerButton, sessionId }: SubmitDialogProps) => {
  const { answerSheet } = useAnswerStore();
  const { getTimer } = useGlobalTimerStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { mutate: submitTest, isPending } = useSubmitSimulatedTest();
  const { data: session } = useGetSTSessionDetail(sessionId);
  const onClose = () => {
    const responses = formatAnswerSheetToResponses(answerSheet);
    if (session) {
      submitTest(
        {
          sessionId: session.id,
          elapsedTime:
            (getInitialTime(session.mode, session.timeLimit, session.skillTest.skill) -
              (getTimer(timerKeys.testDetail(sessionId))?.time ?? 0)) /
            1000,
          status: EnumSimulatedTestSessionStatus.FINISHED,
          responses,
        },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
          },
        }
      );
    }
  };
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "submitDialog",
  });
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <Trans i18nKey="simulatedTest:submitDialog:description"></Trans>
            &nbsp;
            <strong>
              {formatTime((getTimer(timerKeys.testDetail(sessionId))?.time ?? 0) / 1000)}
            </strong>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full"> {t("cancelBtn")}</AlertDialogCancel>
          <Button
            className="size-full"
            onClick={onClose}
            isLoading={isPending}
            disabled={isPending}
          >
            {t("submitBtn")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SubmitDialog;
