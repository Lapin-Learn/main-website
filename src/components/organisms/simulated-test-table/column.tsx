/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { MAPPED_SKILL_ICON } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTestSessionsHistory } from "@/lib/types/simulated-test.type";
import { cn, formatTime } from "@/lib/utils";

export const columns: ColumnDef<
  SimulatedTestSessionsHistory & {
    viewDetail: string;
  }
>[] = [
  {
    accessorKey: "testName",
    header: "history.assignment",
    cell: ({ cell }: { cell: any }) => {
      const Icon = MAPPED_SKILL_ICON[cell.row.original.skill as EnumSkill];

      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("size-4")} fill="#929292" />}
          <div className="text-[#4B5563]">{cell.getValue()}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "history.date_completed",
    cell: ({ cell }: { cell: any }) => new Date(cell.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: "elapsedTime",
    header: "history.duration",
    cell: ({ cell }: { cell: any }) => formatTime(cell.getValue()),
  },
  {
    accessorKey: "estimatedBandScore",
    header: "history.result",
  },
  {
    accessorKey: "viewDetail",
    cell: ({ row, cell }: { row: any; cell: any }) => {
      return (
        <Link
          to={`/profile/history/${row.original.id}`}
          className="cursor-pointer text-blue-600 underline"
        >
          {cell.getValue()}
        </Link>
      );
    },
  },
];
