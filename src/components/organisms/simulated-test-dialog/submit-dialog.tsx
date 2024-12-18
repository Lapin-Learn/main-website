import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import React from "react";
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
import { useSubmitSimulatedTest } from "@/hooks/react-query/use-simulated-test";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

type SubmitDialogProps = {
  triggerButton: React.ReactNode;
  sessionId: number;
};
const SubmitDialog = ({ triggerButton, sessionId }: SubmitDialogProps) => {
  const { answerSheet, elapsedTime } = useAnswerStore();
  const { mutate: submitTest } = useSubmitSimulatedTest();
  const onClose = () => {
    const responses = Object.entries(answerSheet).map(([questionNo, answer]) => ({
      questionNo: parseInt(questionNo),
      answer,
    }));
    submitTest({
      sessionId,
      elapsedTime,
      status: EnumSimulatedTestSessionStatus.FINISHED,
      responses,
    });
  };
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "submitDialog",
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <Trans i18nKey="simulatedTest:submitDialog:description"></Trans>
            &nbsp;<span>thời gian</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full"> {t("cancelBtn")}</AlertDialogCancel>
          <AlertDialogAction onClick={onClose} className="w-full">
            {t("submitBtn")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SubmitDialog;
