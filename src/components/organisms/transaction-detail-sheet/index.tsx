import { format } from "date-fns";
import { toNumber } from "lodash";
import { MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import TransactionStatusBadge from "@/components/molecules/transaction-status-badge";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetUserTransactionDetail } from "@/hooks/react-query/useUsers";
import { EnumTransactionStatus } from "@/lib/enums";
import { formatVNDCurrency } from "@/lib/utils";

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
  const { data, isLoading } = useGetUserTransactionDetail(transactionId);
  const { t } = useTranslation("profile");
  if (!data) return null;
  if (!transactionId) return null;

  const quantity = data?.items.length > 0 ? data.items[0].quantity : 0;
  console.log(status);

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
                      {formatVNDCurrency(toNumber(data?.amount))}
                    </h5>
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <p className="col-span-1 text-xs text-neutral-300">
                      {t("transaction.transactionDetail.status")}
                    </p>
                    <p className="col-span-3 text-end text-xs font-semibold">
                      <TransactionStatusBadge status={data?.status} />
                    </p>
                  </div>
                  {status === EnumTransactionStatus.PAID ? (
                    <>
                      <DetailItem
                        label={t("transaction.transactionDetail.time")}
                        value={
                          data.transactions
                            ? format(data.transactions[0].transactionDateTime, "dd/MM/yyyy HH:mm")
                            : "--"
                        }
                      />
                      <DetailItem
                        label={t("transaction.transactionDetail.id")}
                        value={data?.orderCode}
                      />
                    </>
                  ) : (
                    <>
                      <DetailItem
                        label={t("transaction.transactionDetail.cancelTime")}
                        value={data.canceledAt ? format(data.canceledAt, "dd/MM/yyyy HH:mm") : "--"}
                      />
                      <DetailItem
                        label={t("transaction.transactionDetail.cancelReason")}
                        value={
                          data.cancellationReason
                            ? t(`transaction.cancelReason.${data.cancellationReason}`)
                            : "--"
                        }
                      />
                    </>
                  )}
                </div>
                {status === EnumTransactionStatus.PAID && (
                  <div className="flex flex-col gap-2 rounded-lg border border-neutral-100 p-4">
                    <DetailItem
                      label={t("transaction.transactionDetail.accountNumber")}
                      value={data.transactions ? data.transactions[0].accountNumber : "--"}
                    />
                    <DetailItem
                      label={t("transaction.transactionDetail.bank")}
                      value={data.transactions ? data.transactions[0].counterAccountBankName : "--"}
                    />
                    <DetailItem
                      label={t("transaction.transactionDetail.amount")}
                      value={data.transactions ? data.transactions[0].amount : "--"}
                    />
                    <DetailItem
                      label={t("transaction.transactionDetail.description")}
                      value={data.transactions ? data.transactions[0].description : "--"}
                    />
                  </div>
                )}
              </div>
            </SheetHeader>
            <SheetFooter>
              <a href="mailto:lapinlearnproject@gmail.com" className="flex w-full">
                <Button className="flex w-full gap-2">
                  <MailIcon className="size-4" />
                  {t("transaction.transactionDetail.contact")}
                </Button>
              </a>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailSheet;
