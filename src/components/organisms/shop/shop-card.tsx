import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot";
import { Card, CardContent } from "@/components/ui";
import { EnumItemShop } from "@/lib/enums";
import { Inventory, Shop } from "@/lib/types/shop.type";
import { formatVNDCurrency } from "@/lib/utils";

import { ShopDialog } from "./shop-dialog";

type ItemCardProps = {
  item: Shop | Inventory;
  type: "shop" | "inventory";
};

const ShopCard = ({ item, type }: ItemCardProps) => {
  const { t } = useTranslation("shop");

  return (
    <ShopDialog
      dialogContentClassName={
        type === "shop" ? "md:max-w-2xl w-2xl h-fit min-h-96 md:h-96" : "md:max-w-lg"
      }
      triggerContent={
        <Card className="flex min-h-56 flex-col hover:shadow-lg" key={item.id}>
          <CardContent
            key={item.id}
            className="relative flex size-full flex-col items-center justify-between gap-2 p-4 py-5 hover:cursor-pointer"
          >
            <div className="grid size-full flex-1 items-center">
              <img
                src={item.image.url}
                alt={item.name}
                className="max-h-28 w-full object-contain md:max-h-20"
              />
            </div>
            <div className="flex w-full flex-col space-y-1 text-center">
              <p className="text-body font-semibold">{t(`shop.items.${item.name}.name`)}</p>
              <p className="line-clamp-2 text-xs font-normal text-[#929292]">
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
              <div className="absolute right-4 top-4 md:right-3 md:top-3">
                <p className="text-heading-5 font-bold text-blue-500">{"x" + item.quantity}</p>
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
