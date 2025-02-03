/* eslint-disable @typescript-eslint/no-explicit-any */
import EvaluationStatusBadge from "@components/molecules/evaluation-status-badge.tsx";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { MAPPED_SKILL_ICON } from "@/lib/consts";
import { EnumMode, EnumSkill } from "@/lib/enums";
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

function ModeCell({ mode }: { mode: EnumMode }) {
  const { t } = useTranslation("simulatedTest");
  const text = (mode === EnumMode.FULL_TEST ? t("mode.full_test") : t("mode.practice"))
    .split("Mode")
    .join(" ");
  if (mode == EnumMode.FULL_TEST) {
    return text;
  } else {
    // TODO: Add more config time, parts
    return (
      <div>
        <div>{text}</div>
      </div>
    );
  }
}

export const columns: ColumnDef<SimulatedTestSessionsHistory>[] = [
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

      return estimatedBandScore ?? <EvaluationStatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: "viewDetail",
    cell: ({ row }) => <ViewDetailCell id={row.original.id} />,
  },
];

export const extendedColumns: ColumnDef<SimulatedTestSessionsHistory>[] = [
  {
    accessorKey: "skill",
    header: "history.skill",
    cell: ({ row }) => {
      const skill = row.original.skill;
      const Icon = MAPPED_SKILL_ICON[skill as EnumSkill];

      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("size-4")} fill="#929292" />}
          <div className="capitalize text-[#4B5563]">{skill}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "history.date_completed",
    cell: ({ row }) => format(row.original.createdAt, "dd/MM/yyyy HH:mm"),
  },
  {
    accessorKey: "elapsedTime",
    header: "history.duration",
    cell: ({ row }) => formatTime(row.original.elapsedTime),
  },
  {
    accessorKey: "mode",
    header: "mode.title",
    cell: ({ row }) => <ModeCell mode={row.original.mode} />,
  },
  {
    accessorKey: "estimatedBandScore",
    header: "history.result",
    cell: ({ row }) => {
      const estimatedBandScore = row.original.estimatedBandScore;

      return estimatedBandScore ?? <EvaluationStatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: "viewDetail",
    cell: ({ row }) => <ViewDetailCell id={row.original.id} />,
  },
];
