/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { MAPPED_SKILL_ICON } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";
import { SimulatedTestSessionsHistory } from "@/lib/types/simulated-test.type";
import { cn, formatTime } from "@/lib/utils";

function ViewDetailCell({ id }: { id: string | number }) {
  const { t } = useTranslation("simulatedTest");
  return (
    <Link
      to={`/practice/simulated-test/result?sessionId=${id}`}
      className="cursor-pointer text-blue-600 underline"
    >
      {t("history.viewDetail")}
    </Link>
  );
}

export const getColumns: () => ColumnDef<SimulatedTestSessionsHistory>[] = () => [
  {
    accessorKey: "testName",
    header: "history.assignment",
    cell: ({ row }) => {
      const Icon = MAPPED_SKILL_ICON[row.original.skill as EnumSkill];
      const testName = row.original.testName;

      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("size-4")} fill="#929292" />}
          <div className="text-[#4B5563]">{testName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "history.date_completed",
    cell: ({ row }) => format(row.original.createdAt, "dd/MM/yyyy"),
  },
  {
    accessorKey: "elapsedTime",
    header: "history.duration",
    cell: ({ row }) => formatTime(row.original.elapsedTime),
  },
  {
    accessorKey: "estimatedBandScore",
    header: "history.result",
    cell: ({ row }) => {
      const estimatedBandScore = row.original.estimatedBandScore;

      return estimatedBandScore ?? "--";
    },
  },
  {
    accessorKey: "viewDetail",
    cell: ({ row }) => <ViewDetailCell id={row.original.id} />,
  },
];
