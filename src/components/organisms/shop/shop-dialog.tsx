import { PricingPlanItemList } from "@components/organisms/pricing-plan-item-list.tsx";
import { DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

import carrot from "@/assets/carrot.svg";
import { Button, Card, CardContent } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useUseInventoryItem } from "@/hooks/react-query/useItem";
import { EnumRandomGiftType } from "@/lib/enums";
import { Inventory, Shop } from "@/lib/types/shop.type";
import { cn } from "@/lib/utils";

import { useItemDialog } from "../use-item-dialog";

type ItemDialogProps = {
  item: Shop | Inventory;
  triggerContent: ReactNode;
  dialogContentClassName?: string;
};

const ShopDialog = ({ item, triggerContent, dialogContentClassName }: ItemDialogProps) => {
  const { t } = useTranslation("shop");
  const useItem = useUseInventoryItem();
  const [open, setOpen] = useState(false);
  const { setOpen: setUseItemDialogOpen } = useItemDialog();

  const handleUseItem = () => {
    useItem.mutate(
      { itemId: item.id },
      {
        onSuccess: (returnData) => {
          if ("value" in returnData) {
            if (returnData.type === EnumRandomGiftType.CARROTS) {
              setUseItemDialogOpen({
                itemName: `${returnData.value} ${t("reward.carrot")}`,
                imageSource: carrot,
                description: t("reward.paid", { ns: "shop" }),
              });
            } else if (typeof returnData.value !== "number") {
              setUseItemDialogOpen({
                itemName: t(`shop.items.${returnData.value.name}.name`),
                imageSource: returnData.value.image.url ?? "",
                description: t("reward.paid", { ns: "shop" }),
              });
            }
          } else {
            setUseItemDialogOpen({
              itemName: t(`shop.items.${item.name}.name`),
              imageSource: item.image.url ?? "",
              description: t("reward.activate", { ns: "shop" }),
            });
          }
        },
        onSettled: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent
        className={cn(
          "md:w-full w-fit rounded-md md:max-w-2xl flex flex-col gap-4",
          dialogContentClassName
        )}
      >
        <DialogHeader className="flex h-fit flex-col space-y-1.5">
          <DialogTitle>
            <p className="text-heading-4 font-semibold">{t(`shop.items.${item.name}.name`)}</p>
          </DialogTitle>
          <DialogDescription className="text-supporting-text ">
            {t(`shop.items.${item.name}.description`)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex size-full items-center justify-center gap-4">
          {"quantity" in item ? (
            <Card className="flex w-fit flex-col border-0 shadow-none" key={item.id}>
              <CardContent
                key={item.id}
                className="flex size-full flex-col items-center justify-between space-y-2 p-4 pb-3 hover:cursor-pointer"
              >
                <img src={item.image.url} alt={item.name} className="mb-4 size-40 object-contain" />
                <p className="text-body font-normal">
                  {t(`shop.use_modal.amount`, { amount: item.quantity, name: "" })}
                </p>
              </CardContent>
            </Card>
          ) : (
            <PricingPlanItemList item={item} closeDialog={() => setOpen(false)} />
          )}
        </div>
        {"quantity" in item && (
          <DialogFooter className="place-self-end">
            <Button onClick={handleUseItem} disabled={useItem.isPending} size="lg">
              {t("shop.use_modal.use_now")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { ShopDialog };
