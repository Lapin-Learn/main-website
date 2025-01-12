import { ColumnDef } from "@tanstack/react-table";

import { AnalysisData } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import { BaseGuidance } from "../result/answer-guidance-content";

export const columns: ColumnDef<AnalysisData>[] = [
  {
    accessorKey: "name",
    header: "result.questionType",
    cell: ({ row }) => row.original.name,
    size: 0,
  },
  {
    id: "rightAnswers",
    accessorKey: "rightAnswers",
    header: "correctAnswer",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <div>{row.original.answers.rightOnTotal}</div>
        <div className="text-xs text-neutral-500">{row.original.answers.unanswered}</div>
      </div>
    ),
    size: 0,
  },
  {
    accessorKey: "accuracy",
    header: "result.accuracy",
    cell: ({ row }) => (row.original.accuracy * 100).toFixed(2) + "%",
    size: 0,
  },
  {
    accessorKey: "questions",
    header: "result.questions",
    cell: ({ row }) => {
      const questions = row.original.questions;

      return (
        <div className="flex flex-wrap items-center gap-2">
          {questions.map((question) => (
            <BaseGuidance
              key={question.questionNo}
              trigger={
                <div
                  key={question.questionNo}
                  className={cn("rounded-full size-8 flex items-center justify-center", {
                    "border border-green-500 text-green-500": question.status,
                    "hover:bg-green-100": question.status && question.guidance,
                    "border border-red-500 text-red-500": question.status === false,
                    "hover:bg-red-50": question.status === false && question.guidance,
                    "border border-neutral-300 text-neutral-300": question.status === null,
                    "hover:bg-neutral-50": question.status === null && question.guidance,
                    "hover:cursor-pointer": question.guidance,
                  })}
                >
                  {question.questionNo}
                </div>
              }
              guidance={question.guidance}
            />
          ))}
        </div>
      );
    },
  },
];
