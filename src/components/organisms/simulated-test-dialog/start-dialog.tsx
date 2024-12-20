import { Trans, useTranslation } from "react-i18next";

import {
  AlertDialog,
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
          <Button size="xl" className="w-full" disabled={disableStart} onClick={onClose}>
            {t("startBtn")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default StartDialog;
