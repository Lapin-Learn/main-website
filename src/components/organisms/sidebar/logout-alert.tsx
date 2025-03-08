import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button, buttonVariants } from "@/components/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSignOut } from "@/hooks/react-query/useAuth";

const LogoutAlert = () => {
  const signOut = useSignOut();
  const { t } = useTranslation("auth");

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <LogOut size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-heading-4">
            {" "}
            {t("logOut.title")}
          </AlertDialogTitle>
          <AlertDialogDescription> {t("logOut.confirm")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive/80"
              onClick={() => {
                signOut.mutate();
              }}
              size="lg"
            >
              {t("logOut.title")}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel className={buttonVariants({ size: "lg", variant: "ghost" })}>
            {t("cancel", { ns: "common" })}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlert;
