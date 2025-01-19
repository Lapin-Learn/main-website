import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot";
import { Button, Card, CardContent } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useBuyShopItem, useUseInventoryItem } from "@/hooks/react-query/useItem";
import { useToast } from "@/hooks/use-toast";
import { EnumItemShop } from "@/lib/enums";
import { Inventory, Shop } from "@/lib/types/shop.type";
import { formatVNDCurrency } from "@/lib/utils";

type ItemDialogProps = {
  item: Shop | Inventory;
  triggerContent: React.ReactNode;
};

const PopularTag = () => {
  const { t } = useTranslation("shop");

  return (
    <div className="absolute right-0 top-0 rounded-bl-sm rounded-tr-sm bg-orange-600 p-1 text-white">
      <p className="text-xs font-normal">{t("shop.price.popular")}</p>
    </div>
  );
};

const ShopDialog = ({ item, triggerContent }: ItemDialogProps) => {
  const { t } = useTranslation("shop");
  const { toast } = useToast();
  const useItem = useUseInventoryItem();
  const buyItem = useBuyShopItem();

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
  const handleBuyItem = ({ quantity }: { quantity: number }) => {
    buyItem.mutate(
      {
        id: item.id,
        quantity: quantity,
      },
      {
        onSuccess: () => {
          toast({
            title: t("success", { ns: "common" }),
            description: t("shop.buy_success", {
              name: t(`shop.items.${item.name}.name`),
              quantity: quantity,
            }),
          });
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent className="w-full max-w-[720px]">
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
            Object.entries(item.price).map(([key, value]) => (
              <Card className="flex aspect-square w-fit min-w-44 flex-col" key={item.id}>
                <Button
                  key={item.id}
                  variant="ghost"
                  className="relative flex size-full flex-col items-center justify-between space-y-2 p-4 pb-3 hover:cursor-pointer"
                  onClick={() => handleBuyItem({ quantity: parseInt(key) })}
                  disabled={buyItem.isPending}
                >
                  {String(key) === item.popular && <PopularTag />}

                  <div className="size-20">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="size-20 object-scale-down"
                    />
                  </div>
                  <div className="flex w-full flex-col text-center">
                    <p className="text-body font-semibold">
                      {item.name === EnumItemShop.SUBSCRIPTION
                        ? t(`shop.price.pack`, { context: "subscription", quantity: parseInt(key) })
                        : parseInt(key) === 1
                          ? t("shop.price.single_pack")
                          : t("shop.price.pack", { quantity: parseInt(key) })}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center space-x-0.5 text-base font-bold text-[#F17D53]">
                    {item.name === EnumItemShop.SUBSCRIPTION ? (
                      <p>{formatVNDCurrency(value)}</p>
                    ) : (
                      <>
                        <Carrot className="size-6" />
                        <p>{value}</p>
                      </>
                    )}
                  </div>
                </Button>
              </Card>
            ))
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
