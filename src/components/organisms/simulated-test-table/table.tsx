import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetSTSessionsHistory } from "@/hooks/react-query/use-simulated-test";

import { BaseTable } from "../base-table";
import { columns, extendedColumns } from "./column";

type SimulatedTestHistoryTableProps = {
  minimal?: boolean;
};

export function SimulatedTestHistoryTable({ minimal = false }: SimulatedTestHistoryTableProps) {
  const { t } = useTranslation("simulatedTest");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, refetch, isLoading, isRefetching } = useGetSTSessionsHistory(
    pagination.pageIndex * pagination.pageSize,
    pagination.pageSize
  );

  const i18nColumns = (minimal ? columns : extendedColumns).map((column) => ({
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

  useEffect(() => {
    refetch();
  }, [pagination]);

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
