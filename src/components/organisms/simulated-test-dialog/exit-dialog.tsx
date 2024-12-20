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
import { useSubmitSimulatedTest } from "@/hooks/react-query/use-simulated-test";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { formatAnswerSheetToResponses } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

type ExitDialogProps = {
  triggerButton: React.ReactNode;
};
const ExitDialog = ({ triggerButton }: ExitDialogProps) => {
  const navigate = useNavigate();
  const { sessionId } = Route.useSearch();
  const { answerSheet, elapsedTime } = useAnswerStore();
  const { mutate: submitTest } = useSubmitSimulatedTest();
  const onClose = () => {
    const responses = formatAnswerSheetToResponses(answerSheet);
    submitTest({
      sessionId,
      elapsedTime,
      status: EnumSimulatedTestSessionStatus.IN_PROGRESS,
      responses,
    });
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
