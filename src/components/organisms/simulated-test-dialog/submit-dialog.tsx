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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

type SubmitDialogProps = {
  triggerButton: React.ReactNode;
  time: React.ReactNode;
};
const SubmitDialog = ({ triggerButton, time }: SubmitDialogProps) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate({ to: "/practice" });
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
            &nbsp;<span>{time}</span>.
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
