import { ItemPricingPlans } from "@components/molecules/item-pricing-plans.tsx";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useUseInventoryItem } from "@/hooks/react-query/useItem";
import { useToast } from "@/hooks/use-toast";
import { Inventory, Shop } from "@/lib/types/shop.type";

type ItemDialogProps = {
  item: Shop | Inventory;
  triggerContent: ReactNode;
};

const ShopDialog = ({ item, triggerContent }: ItemDialogProps) => {
  const { t } = useTranslation("shop");
  const { toast } = useToast();
  const useItem = useUseInventoryItem();

  const handleUseItem = () => {
    useItem.mutate(
      { itemId: item.id },
      {
        onSuccess: () => {
          toast({
            title: t("success", { ns: "common" }),
            description: t("shop.use_success", {
              name: t(`shop.items.${item.name}.name`),
              quantity: 1,
            }),
          });
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent className="w-fit rounded-md md:w-full md:max-w-[720px]">
        <DialogHeader className="flex flex-col space-y-1.5">
          <DialogTitle>
            <p className="text-heading-4 font-bold">{t(`shop.items.${item.name}.name`)}</p>
            <p className="text-body font-normal text-neutral-300">
              {t(`shop.items.${item.name}.description`)}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex w-full items-center justify-center space-x-4">
          {"quantity" in item ? (
            <Card className="flex w-fit flex-col border-0 shadow-none" key={item.id}>
              <CardContent
                key={item.id}
                className="flex size-full flex-col items-center justify-between space-y-2 p-4 pb-3 hover:cursor-pointer"
              >
                <div className="size-20">
                  <img src={item.image.url} alt={item.name} className="size-20 object-scale-down" />
                </div>
                <div className="flex w-full flex-col text-center">
                  <p className="text-body font-semibold">{t(`shop.items.${item.name}.name`)}</p>
                </div>
                <p className="text-body font-normal">
                  {t(`shop.use_modal.amount`, { amount: item.quantity, name: "" })}
                </p>
              </CardContent>
            </Card>
          ) : (
            <ItemPricingPlans item={item} />
          )}
        </div>
        {"quantity" in item && (
          <DialogFooter className="place-self-end">
            <Button onClick={handleUseItem} disabled={useItem.isPending}>
              {t("shop.use_modal.use_now")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { ShopDialog };
