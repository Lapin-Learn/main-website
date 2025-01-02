import {
  ColumnDef,
  flexRender,
  PaginationState,
  SortDirection,
  Table as TableProps,
} from "@tanstack/react-table";
import { ArrowDown, ArrowDownUp, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBreakPoint from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";

import { Button, Typography } from "../ui";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";

export interface BaseTableProps<TData, TValue> {
  table: TableProps<TData>;
  columns: ColumnDef<TData, TValue>[];
  onClickItem?: (row: TData) => void;
  notFound?: ReactNode;
  loading?: boolean;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
  classNames?: Partial<Record<"table" | "header" | "body" | "row" | "cell", string>>;
}

export const BaseTable = <TData, TValue>(props: BaseTableProps<TData, TValue>) => {
  const {
    table,
    columns = [],
    onClickItem,
    loading = false,
    notFound,
    pagination,
    setPagination,
    classNames,
  } = props;
  const breakpoint = useBreakPoint();
  const { t } = useTranslation();

  const SortIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
    const Icon = isSorted === "desc" ? ArrowDown : isSorted === "asc" ? ArrowUp : ArrowDownUp;

    return <Icon className="ml-2 size-3 text-[#676879]" />;
  };

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table className={cn("", classNames?.table)}>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {!header.isPlaceholder && header.column.columnDef.header !== "undefined" ? (
                        <Typography variant="body2" className="font-semibold text-black">
                          <div className="flex cursor-pointer items-center justify-between truncate p-4">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <SortIcon isSorted={header.column.getIsSorted()} />
                            )}
                          </div>
                        </Typography>
                      ) : null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {loading ? (
            <TableBody className="bg-white">
              <TableRow className="h-36 w-full">
                <TableCell colSpan={columns.length} className="items-center text-center">
                  Loading...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody className="bg-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={cn(
                        !!onClickItem && "cursor-pointer",
                        row.getIsSelected()
                          ? ""
                          : "[&:hover_button]:opacity-100 [&_button]:opacity-0"
                      )}
                      {...(onClickItem ? { onClick: () => onClickItem(row.original) } : {})}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const size = cell.column.getSize();
                        return (
                          <TableCell key={cell.id} className="p-4" width={size}>
                            <Typography variant="body2" className="truncate">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {notFound ? notFound : "No result"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <Typography variant="body2" className="text-neutral-500 ">
          {table.getRowModel().rows.length} / {table.getRowCount()}
        </Typography>

        <Pagination className="w-fit flex-1 justify-end">
          <PaginationContent className="w-fit overflow-hidden rounded-md border text-neutral-500">
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
                disabled={!table.getCanPreviousPage()}
              >
                {breakpoint === "xs" ? <ChevronLeft className="size-4" /> : t("prev")}
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
                disabled={!table.getCanNextPage()}
              >
                {breakpoint === "xs" ? <ChevronRight className="size-4" /> : t("next")}
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
