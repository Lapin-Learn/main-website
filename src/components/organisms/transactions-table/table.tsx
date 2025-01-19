import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetUserTransactionHistory } from "@/hooks/react-query/useUsers";

import { BaseTable } from "../base-table";
import { columns } from "./column";

export function TransactionsHistoryTable() {
  const { t } = useTranslation("profile");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isRefetching } = useGetUserTransactionHistory(
    pagination.pageIndex * pagination.pageSize,
    pagination.pageSize
  );

  const i18nColumns = columns.map((column) => ({
    ...column,
    header: t(column.header as string),
  }));

  const table = useReactTable({
    data: data?.items ?? [],
    rowCount: data?.total,
    columns: i18nColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    enableSorting: false,
  });

  return (
    <BaseTable
      table={table}
      columns={i18nColumns}
      pagination={pagination}
      setPagination={setPagination}
      loading={isLoading || isRefetching}
    />
  );
}
