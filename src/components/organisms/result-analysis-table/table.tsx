import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_SIZE } from "@/lib/consts";
import { SimulatedTestSession, SkillTestGuidance } from "@/lib/types/simulated-test.type";

import { BaseTable } from "../base-table";
import { columns } from "./column";

type ResultAnalysisTableProps = {
  session: SimulatedTestSession;
  answerStatus?: boolean[];
  isLoading: boolean;
  guidances: SkillTestGuidance[] | null;
};

export function ResultAnalysisTable({
  session,
  answerStatus,
  isLoading,
  guidances,
}: ResultAnalysisTableProps) {
  const { t } = useTranslation(["simulatedTest", "collection"]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const i18nColumns = columns.map((column) => ({
    ...column,
    header: t(column.header as string, {
      ns: column.id === "rightAnswers" ? "collection" : "simulatedTest",
      context: column.id === "rightAnswers" ? "plural" : undefined,
    }),
  }));

  const processedData = useMemo(() => {
    return session.skillTest.partsDetail
      .map((part) =>
        part.questionTypesIndices.map((type) => {
          const { name, startIndex, endIndex } = type;
          const statuses = answerStatus?.slice(startIndex - 1, endIndex) || [];
          const rightAnswers = statuses.filter((status) => status).length;

          return {
            name,
            rightAnswers,
            unanswered: statuses.filter((status) => status === null).length,
            questions: Array.from({ length: endIndex - startIndex + 1 }, (_, i) => ({
              questionNo: startIndex + i,
              status: statuses[i],
              guidances: guidances ? guidances[startIndex + i - 1] : null,
            })),
          };
        })
      )
      .flat();
  }, [session, answerStatus, guidances]);

  const groupedData = useMemo(() => {
    return _.chain(processedData)
      .groupBy("name")
      .map((items, name) => {
        const rightAnswers = _.sumBy(items, "rightAnswers");
        const unanswered = _.sumBy(items, "unanswered");
        const questions = _.flatMap(items, "questions");

        return {
          name,
          answers: {
            rightOnTotal: `${rightAnswers}/${questions.length}`,
            unanswered: `${t("result.unanswered")}: ${unanswered}`,
          },
          accuracy: rightAnswers / questions.length,
          questions,
        };
      })
      .value();
  }, [processedData]);

  const table = useReactTable({
    data: groupedData,
    rowCount: groupedData.length,
    columns: i18nColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    enableSorting: false,
  });

  return (
    <BaseTable
      table={table}
      columns={i18nColumns}
      pagination={pagination}
      setPagination={setPagination}
      loading={isLoading}
    />
  );
}
