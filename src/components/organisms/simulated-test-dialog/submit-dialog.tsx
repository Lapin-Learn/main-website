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
import { useSubmitSimulatedTest } from "@/hooks/react-query/use-simulated-test";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { formatAnswerSheetToResponses } from "@/lib/utils";

type SubmitDialogProps = {
  triggerButton: React.ReactNode;
  sessionId: number;
};
const SubmitDialog = ({ triggerButton, sessionId }: SubmitDialogProps) => {
  const { answerSheet, elapsedTime } = useAnswerStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { mutate: submitTest, isPending } = useSubmitSimulatedTest();
  const onClose = () => {
    const responses = formatAnswerSheetToResponses(answerSheet);
    submitTest(
      {
        sessionId,
        elapsedTime,
        status: EnumSimulatedTestSessionStatus.FINISHED,
        responses,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      }
    );
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
            &nbsp;<span>thời gian</span>.
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
