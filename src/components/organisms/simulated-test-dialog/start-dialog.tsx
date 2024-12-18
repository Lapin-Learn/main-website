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
  open: boolean;
  onClose: () => void;
  disableStart?: boolean;
};
const StartDialog = ({ onClose, open, disableStart = false }: StartDialogProps) => {
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "startDialog",
  });
  return (
    <AlertDialog open={open}>
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
          <AlertDialogAction asChild className="w-full" onClick={onClose} disabled={disableStart}>
            <Button size="xl" className="w-full" disabled={disableStart}>
              {t("startBtn")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default StartDialog;
