import { Typography } from "@components/ui";
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
import { EnumTransactionStatus } from "@/lib/enums.ts";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/shop";

export function SubscriptionRedirectDialog() {
  const { status, orderCode } = Route.useSearch();
  const confettiRef = useRef<ConfettiRef>(null);
  const { t } = useTranslation(["subscription", "shop"]);
  const { data } = useGetUserTransactionDetail(orderCode);

  return (
    <Dialog defaultOpen={!!orderCode}>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative flex h-72 items-center justify-center bg-blue-radial">
          <div
            className={cn(
              "bg-rewards bg-center size-[600px] absolute animate-spin-slow duration-[5000]",
              status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "grayscale"
            )}
          />
          <div className="absolute">
            <DialogHeader>
              {status?.toLowerCase() !== EnumTransactionStatus.PAID && (
                <>
                  <DialogTitle>{t(`redirect.${status}.title`)}</DialogTitle>
                  <DialogDescription>
                    {t(`redirect.${status}.description`, {
                      quantity: data?.items[0].quantity,
                    })}
                  </DialogDescription>
                </>
              )}
            </DialogHeader>
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={CarrotBasket}
                alt="Carrot Basket"
                className={cn(
                  "size-40",
                  status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "grayscale"
                )}
              />
              {status?.toLowerCase() === EnumTransactionStatus.PAID && (
                <div className="text-center">
                  <Typography>{t("reward.receive", { ns: "shop" })}</Typography>
                  <Typography variant="h3">
                    {data?.items[0].quantity} {t("reward.carrot", { ns: "shop" })}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          {status?.toLowerCase() === EnumTransactionStatus.PAID && (
            <Confetti
              ref={confettiRef}
              className="absolute left-0 top-0 z-0 size-full"
              onMouseEnter={() => {
                confettiRef.current?.fire({});
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
