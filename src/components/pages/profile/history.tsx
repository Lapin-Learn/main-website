import { PaginationState } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { createElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { OverallBandScoreChart } from "@/components/molecules/overall-band-score-chart";
import { columns } from "@/components/organisms/simulated-test-table/column";
import { SimulatedTestHistoryTable } from "@/components/organisms/simulated-test-table/table";
import { Typography } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetSTSessionsHistory,
  useGetUserBandScoreOverall,
} from "@/hooks/react-query/use-simulated-test";
import useBreakPoint from "@/hooks/use-screen-size";
import { MAPPED_SKILL_ICON_FILLED } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";

export default function HistoryPage() {
  const { t } = useTranslation("profile");
  const { data, isLoading } = useGetUserBandScoreOverall();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: history, refetch } = useGetSTSessionsHistory(
    pagination.pageIndex * pagination.pageSize,
    pagination.pageSize
  );

  useEffect(() => {
    refetch();
  }, [pagination]);

  const breakpoint = useBreakPoint();

  if (isLoading || !data)
    return (
      <div className="grid min-h-96 w-full place-items-center">
        <Loader2 className="animate-spin text-primary-900" size={32} />
      </div>
    );

  return (
    <div>
      <Typography variant="h5" className="my-4">
        {t("learning_history.learning_result")}
      </Typography>
      <div className="mb-9 grid grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2">
        <OverallBandScoreChart
          className="col-span-2 row-span-1 md:col-span-1 md:row-span-2"
          data={data}
        />
        {Object.values(EnumSkill).map((skill) => {
          const bandScore =
            data.bandScores.find((bandScore) => bandScore.skill == skill)?.bandScore ?? "--";
          return (
            <Card className="h-fit md:h-full" key={skill}>
              <CardContent className="flex h-fit items-center justify-between gap-4 p-3 md:h-full md:px-6 md:py-4">
                <div>
                  <Typography
                    variant={breakpoint === "sm" ? "h3" : "h2"}
                    className="mb-2 capitalize"
                  >
                    {bandScore}
                  </Typography>
                  <Typography
                    variant={breakpoint === "sm" ? "body2" : "body1"}
                    className="capitalize text-supporting-text"
                  >
                    {skill}
                  </Typography>
                </div>
                {createElement(MAPPED_SKILL_ICON_FILLED[skill], {
                  width: breakpoint === "sm" ? 28 : 36,
                  height: breakpoint === "sm" ? 28 : 36,
                  fill: bandScore === "--" ? "#BDBDBD" : "#F4926F",
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Typography variant="h5" className="mb-4">
        {t("learning_history.simulated_test_history")}
      </Typography>

      <SimulatedTestHistoryTable
        columns={columns.map((column) => ({
          ...column,
          header: t(`${column.header}`, { ns: "simulatedTest" }),
        }))}
        data={{
          ...history,
          offset: history?.offset ?? 0,
          limit: history?.limit ?? 0,
          total: history?.total ?? 0,
          page: history?.page ?? 0,
          items:
            history?.items?.map((test) => ({
              ...test,
              viewDetail: t("history.viewDetail", { ns: "simulatedTest" }),
            })) ?? [],
        }}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
