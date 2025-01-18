import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot";
import { Card, CardContent } from "@/components/ui";
import { ItemEnum } from "@/lib/enums";
import { IInventory, IShop } from "@/lib/types/item.type";

import { ItemDialog } from "./item-dialog";

type ItemCardProps = {
  item: IShop | IInventory;
};

const ItemCard = ({ item }: ItemCardProps) => {
  const { t } = useTranslation("item");

  return (
    <ItemDialog
      triggerContent={
        <Card className="flex flex-col" key={item.id}>
          <CardContent
            key={item.id}
            className="relative flex size-full flex-col items-center justify-between space-y-2 p-4 pb-3 hover:cursor-pointer"
          >
            <div className="size-20">
              <img src={item.image.url} alt={item.name} className="size-20 object-scale-down" />
            </div>
            <div className="flex w-full flex-col text-center">
              <p className="text-body font-semibold">{t(`shop.items.${item.name}.name`)}</p>
              <p className="text-xs font-normal text-[#929292]">
                {t(`shop.items.${item.name}.description`)}
              </p>
            </div>
            {!("quantity" in item) && (
              <div className="flex flex-row items-center justify-center space-x-0.5 text-base font-bold text-[#F17D53]">
                {item.name === ItemEnum.BILL ? (
                  <p className="">đ</p>
                ) : (
                  <Carrot className="size-6" />
                )}
                <p>{Object.values(item.price)[0]}</p>
              </div>
            )}
            {"quantity" in item && (
              <div className="absolute right-4 top-0">
                <p className="text-base font-bold text-[#F17D53]">{"x" + item.quantity}</p>
              </div>
            )}
          </CardContent>
        </Card>
      }
      item={item}
    />
  );
};

export { ItemCard };
