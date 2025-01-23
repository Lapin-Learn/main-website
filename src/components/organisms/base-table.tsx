import {
  ColumnDef,
  flexRender,
  PaginationState,
  SortDirection,
  Table as TableProps,
} from "@tanstack/react-table";
import { ArrowDown, ArrowDownUp, ArrowUp, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ReactNode, useEffect, useMemo } from "react";
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

  useEffect(() => {
    if (table.getPageCount() > 0 && pagination.pageIndex >= table.getPageCount()) {
      table.setPagination({ ...pagination, pageIndex: 0 });
      setPagination({ ...pagination, pageIndex: 0 });
    }
  }, [table.getPageCount(), pagination.pageIndex]);

  const SortIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
    const Icon = isSorted === "desc" ? ArrowDown : isSorted === "asc" ? ArrowUp : ArrowDownUp;

    return <Icon className="ml-2 size-3 text-[#676879]" />;
  };

  const currentPage = table.getState().pagination.pageIndex;
  const lastPage = table.getPageCount();
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const paginationPageList = useMemo(() => {
    const pageList = [currentPage];
    if (currentPage == 0) return [currentPage, nextPage, nextPage + 1];
    if (currentPage == lastPage - 1) return [prevPage - 1, prevPage, currentPage];
    if (currentPage > 0) pageList.unshift(prevPage);
    if (currentPage < lastPage - 1) pageList.push(nextPage);
    return pageList;
  }, [currentPage, lastPage, prevPage, nextPage]);

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <div className="relative">
          <Table className={cn("", classNames?.table)}>
            <TableHeader className="z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="w-full">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {!header.isPlaceholder && header.column.columnDef.header !== "undefined" ? (
                          <Typography
                            variant="body2"
                            className="font-semibold text-black"
                            comp="div"
                          >
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
            <TableBody className="relative w-full bg-white">
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
                            <Typography variant="body2" className="truncate" comp="div">
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
              {loading && (
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 z-0 grid w-full place-items-center bg-white/50 backdrop-blur-[1px]",
                    table.getRowModel().rows?.length ? "h-0" : "min-h-20"
                  )}
                >
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <Typography variant="body2" className="text-neutral-500">
          {t("total", {
            number: table.getRowCount(),
            unit: "",
          })}
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
              paginationPageList.map((page) => (
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
