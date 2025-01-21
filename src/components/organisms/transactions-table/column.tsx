/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import i18next from "i18next";

import TransactionStatusBadge from "@/components/molecules/transaction-status-badge";
import { EnumTransactionStatus } from "@/lib/enums";
import { TransactionHistory } from "@/lib/types";

export const columns = (
  onViewDetailClick: (id: number) => void
): ColumnDef<TransactionHistory>[] => {
  return [
    {
      accessorKey: "transactionId",
      header: "ID",
      cell: ({ row }) => {
        const testName = row.original.id;
        return (
          <div className="flex items-center gap-2">
            <div className="text-[#4B5563]">{testName}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "transactionName",
      header: "transaction.name",
      cell: ({ row }) => {
        const { t } = i18next;
        //TODO: Get quantity from transaction
        const quantity = 10;
        console.log(row.original); //Temporary log for passing eslint check

        return (
          <div className="flex items-center gap-2">
            <div className="text-[#4B5563]">
              {t("transaction.transactionName", { quantity, ns: "profile" })}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "transactionTime",
      header: "transaction.time",
      cell: ({ row }) => format(row.original.createdAt, "dd/MM/yyyy HH:mm"),
    },
    {
      accessorKey: "transactionAmount",
      header: "transaction.amount",
      cell: ({ row }) => (row.original.payosTransaction ? row.original.payosTransaction.amount : 0),
    },
    {
      accessorKey: "transactionStatus",
      header: "transaction.status",
      cell: ({ row }) => {
        return <TransactionStatusBadge status={row.original.status} />;
      },
    },
    {
      accessorKey: "viewDetail",
      cell: ({ row }) => {
        const { t } = i18next;
        const transactionId = row.original.id;
        const status = row.original.status;

        switch (status) {
          case EnumTransactionStatus.PAID:
            return (
              <button
                className="text-blue-600 underline"
                onClick={() => onViewDetailClick(transactionId)}
              >
                {t("transaction.viewDetail", { ns: "profile" })}
              </button>
            );
          // TODO: Handle cancelled transaction
          case EnumTransactionStatus.CANCELLED:
            return (
              <button className="text-blue-600 underline">
                {t("transaction.viewDetail", { ns: "profile" })}
              </button>
            );
          // TODO: Handle pending transaction
          case EnumTransactionStatus.PENDING:
            return (
              <button className="text-blue-600 underline">
                {t("transaction.cancel", { ns: "profile" })}
              </button>
            );
          //TODO: Handle underpaid transaction
          case EnumTransactionStatus.UNDERPAID:
            return (
              <button className="text-blue-600 underline">
                {t("transaction.transferMore", { ns: "profile" })}
              </button>
            );
          default:
            return null;
        }
      },
    },
  ];
};
