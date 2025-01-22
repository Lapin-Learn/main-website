import { Typography } from "@components/ui";
import Confetti, { ConfettiRef } from "@components/ui/confetti.tsx";
import { Dialog, DialogContent } from "@components/ui/dialog.tsx";
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
        <div
          className={cn(
            "relative flex h-72 items-center justify-center",
            status?.toLowerCase() === EnumTransactionStatus.PAID && "bg-blue-radial"
          )}
        >
          <div
            className={cn(
              "bg-center absolute animate-spin-slow duration-[5000]",
              status?.toLowerCase() === EnumTransactionStatus.PAID && "bg-rewards size-[600px]",
              status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "grayscale"
            )}
          />
          <div className="absolute w-full px-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={CarrotBasket}
                alt="Carrot Basket"
                className={cn(
                  "size-40",
                  status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "grayscale"
                )}
              />
              <div className="text-center">
                <Typography>{t(`reward.${status?.toLowerCase()}`, { ns: "shop" })}</Typography>
                <Typography variant="h3">
                  {data?.items[0].quantity} {t("reward.carrot", { ns: "shop" })}
                </Typography>
              </div>
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
