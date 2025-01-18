import { DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot";
import { Button, Card, CardContent } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useBuyShopItem, useUseInventoryItem } from "@/hooks/react-query/useItem";
import { ItemEnum } from "@/lib/enums";
import { IInventory, IShop } from "@/lib/types/item.type";

type ItemDialogProps = {
  item: IShop | IInventory;
  triggerContent: React.ReactNode;
};

const ItemDialog = ({ item, triggerContent }: ItemDialogProps) => {
  const { t } = useTranslation("item");
  const useItem = useUseInventoryItem();
  const buyItem = useBuyShopItem();

  const handleUseItem = () => {
    useItem.mutate({ itemId: item.id });
  };
  const handleBuyItem = ({ quantity }: { quantity: number }) => {
    buyItem.mutate({
      id: item.id,
      quantity: quantity,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent className="sm:w-fit sm:max-w-[720px]">
        <DialogHeader className="flex flex-col space-y-1.5">
          <p className="text-heading-4 font-bold">{t(`shop.items.${item.name}.name`)}</p>
          <p className="text-body font-normal text-neutral-300">
            {t(`shop.items.${item.name}.description`)}
          </p>
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
            Object.values(item.price).map((price, amount) => (
              <Card
                className="flex w-full flex-col"
                key={item.id}
                onClick={() => handleBuyItem({ quantity: amount })}
              >
                <CardContent
                  key={item.id}
                  className="flex size-full flex-col items-center justify-between space-y-2 p-4 pb-3 hover:cursor-pointer"
                >
                  <div className="size-20">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="size-20 object-scale-down"
                    />
                  </div>
                  <div className="flex w-full flex-col text-center">
                    <p className="text-body font-semibold">{t(`shop.items.${item.name}.name`)}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center space-x-0.5 text-base font-bold text-[#F17D53]">
                    {item.name === ItemEnum.BILL ? (
                      <p className="">đ</p>
                    ) : (
                      <Carrot className="size-6" />
                    )}
                    <p>{price}</p>
                  </div>
                </CardContent>
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

export { ItemDialog };
