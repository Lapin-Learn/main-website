import { format } from "date-fns";
import pkg from "lodash";
import { MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import TransactionStatusBadge from "@/components/molecules/transaction-status-badge";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  useCancelTransaction,
  useGetPaymentLink,
  useGetUserTransactionDetail,
} from "@/hooks/react-query/usePayment";
import { useToast } from "@/hooks/use-toast";
import { EnumTransactionStatus } from "@/lib/enums";
import { formatVNDCurrency } from "@/lib/utils";

const { toNumber } = pkg;

type TransactionDetailSheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  transactionId: number;
  status: EnumTransactionStatus;
};

const DetailItem = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="grid grid-cols-4 items-center">
      <p className="col-span-1 text-xs text-neutral-300">{label}</p>
      <p className="col-span-3 text-end text-xs font-semibold">{value}</p>
    </div>
  );
};

const TransactionDetailSheet = ({
  open,
  onOpenChange,
  transactionId,
  status,
}: TransactionDetailSheetProps) => {
  const { data: transactionDetail, isLoading } = useGetUserTransactionDetail(transactionId);
  const { data: paymentLinkInfo } = useGetPaymentLink(
    transactionId,
    status === EnumTransactionStatus.PENDING || status === EnumTransactionStatus.UNDERPAID
  );
  const { mutate: cancelMutate, isPending: cancelLoading } = useCancelTransaction();
  const { t } = useTranslation("profile");

  const { toast } = useToast();
  if (!transactionDetail) return null;
  if (!transactionId) return null;

  const quantity = transactionDetail?.items.length > 0 ? transactionDetail.items[0].quantity : 0;

  const handleCancel = () => {
    if (transactionId) {
      cancelMutate(transactionId, {
        onSuccess: () => {
          toast({
            title: t("success", { ns: "common" }),
            description: t("transaction.cancelSuccess", { ns: "profile" }),
          });
        },
        onError: (response) => {
          toast({
            title: t("error", { ns: "common" }),
            description: t(response.message, { ns: "error" }),
            variant: "destructive",
          });
        },
        onSettled: () => {
          if (onOpenChange) onOpenChange(false);
        },
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="m-3 flex flex-col justify-between rounded-2xl">
        {isLoading ? (
          <div className="flex justify-between">Loading...</div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle className="text-heading-4 font-bold">
                {t("transaction.transactionDetail.title")}
              </SheetTitle>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 rounded-lg border border-neutral-100 p-4">
                  <div className="flex flex-col">
                    <p className="text-small text-neutral-300">
                      {t("transaction.transactionName", { quantity, ns: "profile" })}
                    </p>
                    <h5 className="text-heading-5 font-bold">
                      {formatVNDCurrency(toNumber(transactionDetail?.amount))}
                    </h5>
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <p className="col-span-1 text-xs text-neutral-300">
                      {t("transaction.transactionDetail.status")}
                    </p>
                    <p className="col-span-3 text-end text-xs font-semibold">
                      <TransactionStatusBadge status={transactionDetail?.status} />
                    </p>
                  </div>
                  {status === EnumTransactionStatus.CANCELLED ? (
                    <>
                      <DetailItem
                        label={t("transaction.transactionDetail.cancelTime")}
                        value={
                          transactionDetail.canceledAt
                            ? format(transactionDetail.canceledAt, "dd/MM/yyyy HH:mm")
                            : "--"
                        }
                      />
                      <DetailItem
                        label={t("transaction.transactionDetail.cancelReason")}
                        value={
                          transactionDetail.cancellationReason
                            ? t(`transaction.cancelReason.${transactionDetail.cancellationReason}`)
                            : "--"
                        }
                      />
                    </>
                  ) : (
                    <>
                      {status === EnumTransactionStatus.UNDERPAID && (
                        <DetailItem
                          label={t("transaction.transactionDetail.amountPaid")}
                          value={formatVNDCurrency(toNumber(transactionDetail?.amountPaid))}
                        />
                      )}
                      <DetailItem
                        label={t("transaction.transactionDetail.time")}
                        value={
                          transactionDetail.transactions &&
                          transactionDetail.transactions.length > 0
                            ? format(
                                transactionDetail.transactions[0].transactionDateTime,
                                "dd/MM/yyyy HH:mm"
                              )
                            : format(transactionDetail.createdAt, "dd/MM/yyyy HH:mm")
                        }
                      />
                      <DetailItem
                        label={t("transaction.transactionDetail.id")}
                        value={transactionDetail?.orderCode}
                      />
                    </>
                  )}
                </div>
                {status === EnumTransactionStatus.PAID && (
                  <div className="flex flex-col gap-2 rounded-lg border border-neutral-100 p-4">
                    <DetailItem
                      label={t("transaction.transactionDetail.accountNumber")}
                      value={
                        transactionDetail.transactions
                          ? transactionDetail.transactions[0].accountNumber
                          : "--"
                      }
                    />
                    <DetailItem
                      label={t("transaction.transactionDetail.bank")}
                      value={
                        transactionDetail.transactions
                          ? transactionDetail.transactions[0].counterAccountBankName
                          : "--"
                      }
                    />
                    <DetailItem
                      label={t("transaction.transactionDetail.amount")}
                      value={
                        transactionDetail.transactions
                          ? formatVNDCurrency(toNumber(transactionDetail.transactions[0].amount))
                          : "--"
                      }
                    />
                    <DetailItem
                      label={t("transaction.transactionDetail.description")}
                      value={
                        transactionDetail.transactions
                          ? transactionDetail.transactions[0].description
                          : "--"
                      }
                    />
                  </div>
                )}
              </div>
            </SheetHeader>
            <SheetFooter>
              {(status === EnumTransactionStatus.PAID ||
                status === EnumTransactionStatus.CANCELLED) && (
                <a href="mailto:lapinlearnproject@gmail.com" className="flex w-full">
                  <Button className="flex w-full gap-2">
                    <MailIcon className="size-4" />
                    {t("transaction.transactionDetail.contact")}
                  </Button>
                </a>
              )}
              {(status === EnumTransactionStatus.PENDING ||
                status === EnumTransactionStatus.UNDERPAID) && (
                <div className="flex flex-1 gap-6">
                  <Button
                    onClick={handleCancel}
                    variant="ghost"
                    disabled={cancelLoading}
                    isLoading={cancelLoading}
                  >
                    {t("transaction.cancel")}
                  </Button>
                  <Button
                    onClick={() => {
                      if (paymentLinkInfo) {
                        window.location.href = paymentLinkInfo.checkoutUrl;
                      }
                    }}
                    className="w-full"
                  >
                    {t("transaction.pay")}
                  </Button>
                </div>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailSheet;
