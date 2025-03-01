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
import { DEFAULT_TIME_LIMIT } from "@/lib/consts";
import { EnumMode, EnumSkill } from "@/lib/enums";

type StartDialogProps = {
  open: boolean;
  onClose: () => void;
  disableStart?: boolean;
  parts: number;
  timeLimit: number;
  mode: EnumMode;
  skill: EnumSkill;
};

const StartDialog = ({
  onClose,
  open,
  disableStart = false,
  parts,
  timeLimit,
  mode,
  skill,
}: StartDialogProps) => {
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
                parts,
                minutes:
                  mode === EnumMode.PRACTICE
                    ? timeLimit === 0
                      ? "unlimited"
                      : timeLimit
                    : DEFAULT_TIME_LIMIT[skill],
                context: mode === EnumMode.PRACTICE && timeLimit == 0 ? "unlimited" : "default",
              }}
            >
              <strong />
              <strong />
              <strong />
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
