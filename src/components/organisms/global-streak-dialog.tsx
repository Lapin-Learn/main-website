import useGlobalStreakDialog from "@/hooks/zustand/use-global-streak-dialog";

import { Dialog, DialogContent } from "../ui/dialog";
import { StreakSection } from "./streak";

const GlobalStreakDialog = () => {
  const { open, setOpenDialog, setCloseDialog } = useGlobalStreakDialog();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setCloseDialog();
        } else {
          setOpenDialog();
        }
      }}
    >
      <DialogContent
        showClose={false}
        autoFocus={false}
        className="border-none bg-transparent !p-0 shadow-none"
      >
        <div className="h-fit shadow-xl">
          <StreakSection collapsible={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalStreakDialog;
