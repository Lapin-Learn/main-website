import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import WarningScreenSize from "@/assets/images/simulated-test/warning-screen-size.svg";
import useBreakPoint from "@/hooks/use-screen-size";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const WarningScreenSizeDialog = () => {
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
        <AlertDialogFooter>
          <AlertDialogCancel>{t("close")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WarningScreenSizeDialog;
