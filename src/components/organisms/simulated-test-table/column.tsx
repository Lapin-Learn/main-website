/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { SimulatedTestSessionsHistoryItem } from "@/lib/types/simulated-test.type";
import { formatTime } from "@/lib/utils";

export const columns: ColumnDef<
  SimulatedTestSessionsHistoryItem & {
    viewDetail: string;
  }
>[] = [
  {
    accessorKey: "testName",
    header: "history.assignment",
  },
  {
    accessorKey: "skill",
    header: "history.skill",
    cell: ({ cell }: { cell: any }) => {
      return (
        <div className="text-neutral-200">
          {cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}
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
    accessorKey: "estimatedBandScore",
    header: "history.result",
  },
  {
    accessorKey: "elapsedTime",
    header: "history.duration",
    cell: ({ cell }: { cell: any }) => formatTime(cell.getValue()),
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
