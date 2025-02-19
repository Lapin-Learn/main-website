import { Typography } from "@components/ui";
import Confetti, { ConfettiRef } from "@components/ui/confetti.tsx";
import { Dialog, DialogContent } from "@components/ui/dialog.tsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import CarrotBasket from "@/assets/carrot-basket.svg";
import { useGetUserTransactionDetail } from "@/hooks/react-query/usePayment";
import { EnumTransactionStatus } from "@/lib/enums.ts";
import { cn } from "@/lib/utils";

export function SubscriptionRedirectDialog({
  status,
  orderCode,
}: {
  status: EnumTransactionStatus;
  orderCode: number;
}) {
  const confettiRef = useRef<ConfettiRef>(null);
  const { t } = useTranslation(["subscription", "shop"]);
  const { data } = useGetUserTransactionDetail(orderCode);

  return (
    <Dialog defaultOpen={!!orderCode}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <div
          className={cn(
            "relative flex md:h-[576px] h-screen max-w-xl items-center justify-center",
            status?.toLowerCase() === EnumTransactionStatus.PAID && "bg-blue-radial"
          )}
        >
          <div
            className={cn(
              "bg-center absolute animate-[spin_6s_linear_infinite]",
              status?.toLowerCase() === EnumTransactionStatus.PAID && "bg-rewards size-[800px]",
              status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "bg-background"
            )}
          />
          <div className="absolute w-full px-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full bg-white p-10 shadow-md">
                <img
                  src={CarrotBasket}
                  alt="Carrot Basket"
                  className={cn(
                    "size-40",
                    status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "saturate-50"
                  )}
                />
              </div>
              <div className="mt-4 flex flex-col items-center gap-4">
                <Typography
                  variant="h4"
                  className={cn(
                    "text-center font-medium text-blue-800",
                    status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "text-neutral-300"
                  )}
                >
                  {t(`reward.${status?.toLowerCase()}`, { ns: "shop" })}
                </Typography>
                <Typography
                  variant="h2"
                  className={cn(
                    "uppercase text-blue-900",
                    status?.toLowerCase() === EnumTransactionStatus.CANCELLED && "text-primary-900"
                  )}
                >
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
