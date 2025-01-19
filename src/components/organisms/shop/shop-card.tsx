import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot";
import { Card, CardContent } from "@/components/ui";
import { EnumItemShop } from "@/lib/enums";
import { Inventory, Shop } from "@/lib/types/shop.type";
import { formatVNDCurrency } from "@/lib/utils";

import { ShopDialog } from "./shop-dialog";

type ItemCardProps = {
  item: Shop | Inventory;
};

const ShopCard = ({ item }: ItemCardProps) => {
  const { t } = useTranslation("shop");

  return (
    <ShopDialog
      triggerContent={
        <Card className="flex flex-col" key={item.id}>
          <CardContent
            key={item.id}
            className="relative flex size-full flex-col items-center justify-between space-y-3 p-4 pb-3 hover:cursor-pointer"
          >
            <div className="h-20 w-full">
              <img src={item.image.url} alt={item.name} className="size-full object-contain" />
            </div>
            <div className="flex w-full flex-col space-y-1 text-center">
              <p className="text-body font-semibold">{t(`shop.items.${item.name}.name`)}</p>
              <p className="text-xs font-normal text-[#929292]">
                {t(`shop.items.${item.name}.description`)}
              </p>
            </div>
            {!("quantity" in item) && (
              <div className="flex flex-row items-center justify-center space-x-0.5 text-base font-bold text-[#F17D53]">
                {item.name === EnumItemShop.SUBSCRIPTION ? (
                  <p>{formatVNDCurrency(Object.values(item.price)[0])}</p>
                ) : (
                  <>
                    <Carrot className="size-6" />
                    <p>{Object.values(item.price)[0]}</p>
                  </>
                )}
              </div>
            )}
            {"quantity" in item && (
              <div className="absolute right-4 top-0 md:right-2 md:top-2">
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

export { ShopCard };
