import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const WarningScreenSizeDialog = () => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning</AlertDialogTitle>
        </AlertDialogHeader>
        <p>
          This app is best viewed on a larger screen. Please consider using a larger screen for a
          better experience.
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WarningScreenSizeDialog;
