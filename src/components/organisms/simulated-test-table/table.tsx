import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortDirection,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { PagedData } from "@/lib/types";
import { SimulatedTestSessionsHistory } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

interface SimulatedTestHistoryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: PagedData<SimulatedTestSessionsHistory>;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
}

export function SimulatedTestHistoryTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
}: SimulatedTestHistoryTableProps<TData, TValue>) {
  const { t } = useTranslation("simulatedTest");

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: data?.items as TData[],
    rowCount: data?.total,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    manualPagination: true,
  });

  const SortIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
    const Icon = isSorted === "desc" ? ArrowDown : isSorted === "asc" ? ArrowUp : ChevronsUpDown;

    return <Icon className="ml-2 size-4" />;
  };

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {!header.isPlaceholder && header.column.columnDef.header !== "undefined" && (
                        <div
                          className="flex cursor-pointer items-center justify-between p-4 text-black"
                          onClick={() => {
                            header.column.toggleSorting(header.column.getIsSorted() === "asc");
                          }}
                        >
                          <Typography variant="body2" className="font-semibold"></Typography>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon isSorted={header.column.getIsSorted()} />
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className="p-4">
                        <Typography variant="body2">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Typography variant="body2">{t("history.noData")}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4 flex items-end justify-end">
        <PaginationContent className="overflow-hidden rounded-md border text-neutral-500">
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => {
                table.previousPage();
                setPagination({
                  ...pagination,
                  pageIndex: table.getState().pagination.pageIndex - 1,
                });
              }}
              className={cn(!table.getCanPreviousPage() && "opacity-50")}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
          </PaginationItem>
          {table.getPageCount() > 0 &&
            [...Array(table.getPageCount()).keys()].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => {
                    if (table.getState().pagination.pageIndex === page) return;
                    table.setPagination({ ...pagination, pageIndex: page });
                    setPagination({ ...pagination, pageIndex: page });
                  }}
                  isActive={table.getState().pagination.pageIndex === page}
                  className={cn(table.getState().pagination.pageIndex === page && " text-black")}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem className="border-0">
            <Button
              variant="ghost"
              onClick={() => {
                table.nextPage();
                setPagination({
                  ...pagination,
                  pageIndex: table.getState().pagination.pageIndex + 1,
                });
              }}
              className={cn(!table.getCanPreviousPage() && "opacity-50")}
              disabled={!table.getCanPreviousPage()}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
