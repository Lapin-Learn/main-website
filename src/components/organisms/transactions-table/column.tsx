/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import i18next from "i18next";
import { toNumber } from "lodash";

import TransactionStatusBadge from "@/components/molecules/transaction-status-badge";
import { EnumTransactionStatus } from "@/lib/enums";
import { TransactionHistory } from "@/lib/types";
import { formatVNDCurrency } from "@/lib/utils";

export const columns = (
  onViewDetailClick: (id: number, status: EnumTransactionStatus) => void
): ColumnDef<TransactionHistory>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="text-[#4B5563]">{row.original.id}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "transactionName",
      header: "transaction.name",
      cell: ({ row }) => {
        const { t } = i18next;
        const quantity = row.original.items.length > 0 ? row.original.items[0].quantity : 0;

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
      accessorKey: "createdAt",
      header: "transaction.time",
      accessorFn: (value) => format(value.createdAt, "dd/MM/yyyy HH:mm"),
    },
    {
      accessorKey: "transactionAmount",
      header: "transaction.amount",
      cell: ({ row }) => {
        const amountToPaid = toNumber(
          row.original.payosTransaction ? row.original.payosTransaction.amount : 0
        );
        return formatVNDCurrency(amountToPaid);
      },
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

        return (
          <button
            className="text-blue-600 underline"
            onClick={() => onViewDetailClick(transactionId, status)}
          >
            {t("transaction.viewDetail", { ns: "profile" })}
          </button>
        );
      },
    },
  ];
};
