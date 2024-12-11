import { Trans, useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type StartDialogProps = {
  onClose: () => void;
};
const StartDialog = ({ onClose }: StartDialogProps) => {
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "startDialog",
  });
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <Trans
              i18nKey="simulatedTest:startDialog:description"
              values={{
                parts: 3,
                minutes: 40,
              }}
            >
              <strong></strong>
              <strong></strong>
              <strong></strong>
            </Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild className="w-full" onClick={onClose}>
            <Button size="xl" className="w-full">
              {t("startBtn")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default StartDialog;
