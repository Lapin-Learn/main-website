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

type ExitDialogProps = {
  triggerButton: React.ReactNode;
};
const DailyLessonExitDialog = ({ triggerButton }: ExitDialogProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("question");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("exitDialog.title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t("exitDialog.message")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={() => navigate({ to: "/daily-lesson" })} variant="outline" size="xl">
              {t("exitDialog.exitBtn")}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild className="w-full">
            <Button size="xl" className="w-full">
              {t("exitDialog.continueBtn")}
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DailyLessonExitDialog;
