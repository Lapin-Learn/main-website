import Confetti, { ConfettiRef } from "@components/ui/confetti.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog.tsx";
import { useGetUserTransactionDetail } from "@hooks/react-query/useUsers.ts";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import CarrotBasket from "@/assets/carrotBasket.svg";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/shop";

export function SubscriptionRedirectDialog() {
  const { status, orderCode } = Route.useSearch();
  const confettiRef = useRef<ConfettiRef>(null);
  const { t } = useTranslation(["subscription", "shop"]);
  const { data } = useGetUserTransactionDetail(orderCode);

  return (
    <Dialog defaultOpen={!!orderCode}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(`redirect.${status}.title`)}</DialogTitle>
          <DialogDescription>
            {status === "PAID"
              ? t("shop.buy_success", {
                  ns: "shop",
                  name: data?.items[0].name,
                  quantity: data?.items[0].quantity,
                })
              : t(`redirect.${status}.description`, {
                  quantity: data?.items[0].quantity,
                })}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <img
            src={CarrotBasket}
            alt="Carrot Basket"
            className={cn("size-40", status === "CANCELLED" && "grayscale")}
          />
        </div>
        {status === "PAID" && (
          <Confetti
            ref={confettiRef}
            className="absolute left-0 top-0 z-0 size-full"
            onMouseEnter={() => {
              confettiRef.current?.fire({});
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
