import { Button, Card } from "@components/ui";
import { useBuyShopItem } from "@hooks/react-query/useItem.ts";
import { useCreateLink } from "@hooks/react-query/usePayment.ts";
import { useToast } from "@hooks/use-toast.ts";
import { RefObject } from "react";
import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot.tsx";
import { EnumItemShop } from "@/lib/enums.ts";
import { Shop } from "@/lib/types/shop.type.ts";
import { formatVNDCurrency } from "@/lib/utils";
import { PaymentTypeEnum } from "@/services/payment.ts";

export function ItemPricingPlans({
  item,
  closeDialog,
  paymentRef,
}: {
  item: Shop;
  closeDialog: () => void;
  paymentRef: RefObject<HTMLIFrameElement>;
}) {
  const buyItem = useBuyShopItem();
  const createPaymentLink = useCreateLink();
  const { toast } = useToast();
  const { t } = useTranslation("shop");

  const handleSuccess = ({ quantity }: { quantity: number }) => {
    toast({
      title: t("success", { ns: "common" }),
      description: t("shop.buy_success", {
        name: t(`shop.items.${item.name}.name`),
        quantity,
      }),
    });
    closeDialog();
  };

  const handleBuyItem = ({ quantity }: { quantity: number }) => {
    buyItem.mutate(
      {
        id: item.id,
        quantity,
      },
      {
        onSuccess: () => handleSuccess({ quantity }),
      }
    );
  };

  const handlePurchase = ({ quantity }: { quantity: number }) => {
    createPaymentLink.mutate(
      {
        type: PaymentTypeEnum.CARROTS,
        quantity,
      },
      {
        onSuccess: (result) => paymentRef.current?.setAttribute("src", result.checkoutUrl),
      }
    );
  };

  return Object.entries(item.price).map(([key, value]) => (
    <Card className="flex aspect-square size-40 flex-col" key={item.price.toString()}>
      <Button
        variant="ghost"
        className="relative flex h-fit w-full flex-col items-center justify-center gap-2 pt-6 hover:cursor-pointer md:justify-between"
        onClick={() =>
          item.name === EnumItemShop.SUBSCRIPTION
            ? handlePurchase({ quantity: parseInt(key) })
            : handleBuyItem({ quantity: parseInt(key) })
        }
        disabled={buyItem.isPending}
      >
        {String(key) === item.popular && <PopularTag />}

        <div className="hidden size-[60px] md:flex">
          <img src={item.image.url} alt={item.name} className="size-full object-scale-down" />
        </div>
        <div className="flex w-full flex-col text-center">
          <p className="text-body font-semibold">
            {item.name === EnumItemShop.SUBSCRIPTION
              ? t(`shop.price.pack`, {
                  context: "subscription",
                  quantity: parseInt(key),
                })
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
  ));
}

const PopularTag = () => {
  const { t } = useTranslation("shop");

  return (
    <div className="absolute right-0 top-0 rounded-bl-sm rounded-tr-sm bg-orange-600 p-1 text-white">
      <p className="text-xs font-normal">{t("shop.price.popular")}</p>
    </div>
  );
};
