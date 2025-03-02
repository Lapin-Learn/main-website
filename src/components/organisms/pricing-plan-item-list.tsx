import { Card, CardContent } from "@components/ui";
import { useBuyShopItem } from "@hooks/react-query/useItem.ts";
import { useCreateLink } from "@hooks/react-query/usePayment.ts";
import { useToast } from "@hooks/use-toast.ts";
import { useTranslation } from "react-i18next";

import Carrot from "@/assets/icons/carrot.tsx";
import { EnumItemShop } from "@/lib/enums.ts";
import { Shop } from "@/lib/types/shop.type.ts";
import { cn, formatVNDCurrency } from "@/lib/utils";
import { PaymentTypeEnum } from "@/services/payment.ts";

export function PricingPlanItemList({
  item,
  closeDialog,
}: {
  item: Shop;
  closeDialog?: () => void;
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
    closeDialog?.();
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
        redirectUrl: window.location.href,
      },
      {
        onSuccess: ({ checkoutUrl }) => (window.location.href = checkoutUrl),
      }
    );
  };

  return Object.entries(item.price).map(([key, value]) => (
    <Card
      className={cn(
        "group flex size-40 md:size-48 flex-col overflow-hidden shadow-none transition-all duration-150 ",
        buyItem.isPending || createPaymentLink.isPending
          ? "pointer-events-none opacity-50 "
          : "hover:cursor-pointer hover:bg-neutral-50/50"
      )}
      key={key}
      onClick={() => {
        if (buyItem.isPending || createPaymentLink.isPending) return;
        if (item.name === EnumItemShop.SUBSCRIPTION) {
          handlePurchase({ quantity: parseInt(key) });
        } else {
          handleBuyItem({ quantity: parseInt(key) });
        }
      }}
    >
      <CardContent className="relative flex h-fit w-full flex-col items-center justify-center gap-2 !pt-4">
        {String(key) === item.popular && <PopularTag />}

        <div className="size-20 md:flex md:size-24">
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
      </CardContent>
    </Card>
  ));
}

const PopularTag = () => {
  const { t } = useTranslation("shop");

  return (
    <div className="absolute right-0 top-0 rounded-bl-sm rounded-tr-sm bg-secondary p-1 text-primary-700 md:p-2">
      <p className="text-xs font-normal">{t("shop.price.popular")}</p>
    </div>
  );
};
