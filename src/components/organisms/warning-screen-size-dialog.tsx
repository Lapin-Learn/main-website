import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import WarningScreenSize from "@/assets/images/simulated-test/warning-screen-size.svg";
import useBreakPoint from "@/hooks/use-screen-size";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type WarningScreenSizeDialogProps = {
  closable?: boolean;
};

const WarningScreenSizeDialog = ({ closable = false }: WarningScreenSizeDialogProps) => {
  const [open, setOpen] = useState(false);
  const breakpoint = useBreakPoint();
  const { t } = useTranslation();
  useEffect(() => {
    if (breakpoint === "xs" || breakpoint === "sm") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [breakpoint]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-md:max-w-screen">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("warning")}</AlertDialogTitle>
        </AlertDialogHeader>
        <img src={WarningScreenSize} alt="Warning" className="mx-auto my-8 size-40" />
        <p className="text-center">{t("screen_size_warning")}</p>
        {closable && (
          <AlertDialogFooter className="items-end">
            <AlertDialogCancel className="w-fit">{t("close")}</AlertDialogCancel>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WarningScreenSizeDialog;
