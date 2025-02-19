import { Button, Typography } from "@components/ui";
import Confetti, { ConfettiRef } from "@components/ui/confetti.tsx";
import { Dialog, DialogClose, DialogContent } from "@components/ui/dialog.tsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { useItemDialog } from "./provider";

const UseItemDialog = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  const { open, setClose, item } = useItemDialog();
  const { t } = useTranslation(["subscription", "shop"]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setClose();
        }
      }}
    >
      <DialogContent className="flex h-[672px] max-w-xl items-center justify-center overflow-hidden rounded-lg bg-blue-radial p-0">
        <div className="absolute flex size-full flex-col justify-between px-6 py-8">
          <div className="relative flex h-full flex-col content-center items-center justify-center gap-4">
            <div className="rounded-full bg-white p-10 shadow-md">
              <img src={item?.imageSource} alt="Carrot Basket" className="size-40" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <Typography variant="h4" className="text-center font-semibold text-blue-800">
                {item?.description}
              </Typography>
              <Typography variant="h2" className="uppercase text-blue-900">
                {item?.itemName}
              </Typography>
            </div>
            <div
              className={cn(
                "bg-center -z-10 absolute animate-[spin_6s_linear_infinite] bg-rewards size-[900px]"
              )}
            />
          </div>
          <div className="w-full">
            <DialogClose asChild>
              <Button variant="blue" size="3xl" className="w-full !ring-0">
                {t("reward.button", { ns: "shop" })}
              </Button>
            </DialogClose>
          </div>
        </div>

        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 -z-10 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export { UseItemDialog };
