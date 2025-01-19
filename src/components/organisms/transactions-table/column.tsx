/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge, Button } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TransactionHistory } from "@/lib/types";

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-4 items-center">
      <p className="col-span-1 text-xs text-neutral-300">{label}</p>
      <p className="col-span-3 text-end text-xs font-semibold">{value}</p>
    </div>
  );
}

function ViewDetailCell({ id }: { id: string | number }) {
  //TODO: Get data from APIs

  const { t } = useTranslation("simulatedTest");
  return (
    <Sheet>
      <SheetTrigger className="text-blue-600 underline">Xem chi tiết</SheetTrigger>
      <SheetContent className="m-3 flex flex-col justify-between rounded-2xl">
        <SheetHeader>
          <SheetTitle className="text-heading-4 font-bold">Chi tiết giao dịch</SheetTitle>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-lg border border-neutral-100 p-4">
              <div className="flex flex-col">
                <p className="text-small text-neutral-300">MUA 100 CÀ RỐT</p>
                <h5 className="text-heading-5 font-bold">đ 20,000</h5>
              </div>
              <div className="grid grid-cols-4 items-center">
                <p className="col-span-1 text-xs text-neutral-300">Trạng thái</p>
                <p className="col-span-3 text-end text-xs font-semibold">
                  <Badge variant="green">Thành công</Badge>
                </p>
              </div>
              <DetailItem label="Thời gian" value="01/12/2024 8:01" />
              <DetailItem label="Mã giao dịch" value="979329" />
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-neutral-100 p-4">
              <DetailItem label="Số thẻ/TK" value="18921857" />
              <DetailItem label="Ngân hàng" value="TMCP Cong Thuong Viet Nam" />
              <DetailItem label="Số tiền" value="đ 20,000" />
              <DetailItem
                label="Tin nhắn"
                value="76840933097-0939074483-CSHCQKUWXU8 Thanh toan don hang GD 159950-011725 09:56:41"
              />
            </div>
          </div>
        </SheetHeader>
        <SheetFooter>
          <Button className="flex w-full gap-2">
            <MailIcon className="size-4" />
            Liên hệ hỗ trợ
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const columns: ColumnDef<TransactionHistory>[] = [
  {
    accessorKey: "transactionName",
    header: "transaction.name",
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
    accessorKey: "transactionTime",
    header: "transaction.time",
    cell: ({ row }) => format(row.original.createdAt, "dd/MM/yyyy"),
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
      const estimatedBandScore = row.original.status;

      return <Badge variant="green">{estimatedBandScore}</Badge>;
    },
  },
  {
    accessorKey: "viewDetail",
    cell: ({ row }) => <ViewDetailCell id={row.original.id} />,
  },
];
