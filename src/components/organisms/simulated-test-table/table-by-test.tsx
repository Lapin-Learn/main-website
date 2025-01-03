import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetSTSessionsHistoryByST } from "@/hooks/react-query/use-simulated-test";
import { DEFAULT_PAGE_SIZE } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";

import { BaseTable } from "../base-table";
import { extendedColumns } from "./column";

type SimulatedTestHistoryTableProps = {
  simulatedTestId?: number;
  filter?: {
    skill?: EnumSkill;
  };
};

// Only 2 type of table, if more, refactor this component, right now we just do WET
export function SimulatedTestHistoryTable({
  simulatedTestId = 0,
  filter,
}: SimulatedTestHistoryTableProps) {
  const { t } = useTranslation("simulatedTest");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const { data, isLoading, isRefetching } = useGetSTSessionsHistoryByST(simulatedTestId, {
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    ...filter,
  });

  const i18nColumns = extendedColumns.map((column) => ({
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
