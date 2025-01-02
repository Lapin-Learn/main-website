/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import ListeningIcon from "@/assets/icons/skills/listening";
import ReadingIcon from "@/assets/icons/skills/reading";
import SpeakingIcon from "@/assets/icons/skills/speaking";
import WritingIcon from "@/assets/icons/skills/writing";
import { ExtendEnumSkill } from "@/lib/enums";
import { SimulatedTestSessionsHistory } from "@/lib/types/simulated-test.type";
import { cn, formatTime } from "@/lib/utils";

const skillsList: {
  label: ExtendEnumSkill;
  IconOutlined: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { label: ExtendEnumSkill.reading, IconOutlined: ReadingIcon },
  {
    label: ExtendEnumSkill.listening,
    IconOutlined: ListeningIcon,
  },
  { label: ExtendEnumSkill.writing, IconOutlined: WritingIcon },
  { label: ExtendEnumSkill.speaking, IconOutlined: SpeakingIcon },
];

export const columns: ColumnDef<
  SimulatedTestSessionsHistory & {
    viewDetail: string;
  }
>[] = [
  {
    accessorKey: "testName",
    header: "history.assignment",
    cell: ({ cell }: { cell: any }) => {
      const Icon = skillsList.find(
        (skill) => skill.label === cell.row.original.skill
      )?.IconOutlined;
      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("size-4")} fill="#929292" />}
          <div className="text-[#4B5563]">{cell.getValue()}</div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "skill",
  //   header: "history.skill",
  //   cell: ({ cell }: { cell: any }) => {
  //     return (
  //       <div className="text-neutral-200">
  //         {cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}
  //       </div>
  //     );
  //   },
  // },
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
