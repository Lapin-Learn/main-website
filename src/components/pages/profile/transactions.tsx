import { useState } from "react";
import { useTranslation } from "react-i18next";

import TransactionDetailSheet from "@/components/organisms/transaction-detail-sheet";
import { TransactionsHistoryTable } from "@/components/organisms/transactions-table/table";
import { Typography } from "@/components/ui";
import { EnumTransactionStatus } from "@/lib/enums";

export default function TransactionsPage() {
  const [open, setOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<EnumTransactionStatus | null>(null);
  const { t } = useTranslation("profile");

  const onViewDetailClick = (id: number, status: EnumTransactionStatus) => {
    setTransactionId(id);
    setTransactionStatus(status);
    setOpen(true);
  };

  return (
    <div className="py-8">
      <Typography variant="h5" className="mb-4">
        {t("transaction.title")}
      </Typography>
      <TransactionsHistoryTable onViewDetailClick={onViewDetailClick} />
      {transactionId && transactionStatus && (
        <TransactionDetailSheet
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
          }}
          transactionId={transactionId}
          status={transactionStatus}
        />
      )}
    </div>
  );
}
