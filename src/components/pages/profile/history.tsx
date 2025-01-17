import _ from "lodash";
import { Loader2 } from "lucide-react";
import { createElement, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { OverallBandScoreChart } from "@/components/molecules/overall-band-score-chart";
import SkillsFilter from "@/components/molecules/skill-filter";
import { SimulatedTestHistoryTable } from "@/components/organisms/simulated-test-table/table";
import { SkillEvaluationLineChart } from "@/components/organisms/skill-evaluation-line-chart";
import { Typography } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetQuestionTypeAccuracy,
  useGetSessionProgress,
  useGetUserBandScoreOverall,
} from "@/hooks/react-query/use-simulated-test";
import useBreakPoint from "@/hooks/use-screen-size";
import { MAPPED_SKILL_ICON_FILLED, SKILLS_LIST } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";
import { formatBandScore } from "@/lib/utils";

export default function HistoryPage() {
  const { t } = useTranslation(["profile", "simulatedTest"]);
  const { data, isLoading } = useGetUserBandScoreOverall();
  const [selected, setSelected] = useState<EnumSkill>(SKILLS_LIST[0].label);
  const { data: questionTypeAccuracy, isLoading: accuracyLoading } =
    useGetQuestionTypeAccuracy(selected);
  const { data: sessionProgress } = useGetSessionProgress(selected);

  const formattedData = useMemo(() => {
    return _.chain(sessionProgress)
      .groupBy("createdAt")
      .map((sessions) => {
        return {
          createdAt: sessions[0].createdAt,
          estimatedBandScore: formatBandScore(
            sessions.reduce((acc, curr) => acc + curr.estimatedBandScore, 0) / sessions.length
          ),
        };
      })
      .orderBy((session) => new Date(session.createdAt.split("/").reverse().join("/")), ["asc"])
      .takeRight(10)
      .value();
  }, [sessionProgress]);

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
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2">
        <OverallBandScoreChart
          className="col-span-2 row-span-1 md:col-span-1 md:row-span-2"
          data={data}
        />
        {Object.values(EnumSkill).map((skill) => {
          const bandScore = data.bandScores.find(
            (bandScore) => bandScore.skill == skill
          )?.estimatedBandScore;
          const formattedBandScore =
            typeof bandScore === "number" ? formatBandScore(bandScore) : "--";
          return (
            <Card className="h-fit md:h-full" key={skill}>
              <CardContent className="flex h-fit items-center justify-between gap-4 p-3 md:h-full md:px-6 md:py-4">
                <div>
                  <Typography
                    variant={breakpoint === "sm" ? "h3" : "h2"}
                    className="mb-2 capitalize"
                  >
                    {formattedBandScore}
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
                  fill: formattedBandScore === "--" ? "#BDBDBD" : "#F4926F",
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <SkillsFilter skillsList={SKILLS_LIST} selected={selected} setSelected={setSelected} />
      {accuracyLoading ? (
        <div className="grid min-h-[306px] w-full place-items-center">
          <Loader2 className="animate-spin text-primary-900" size={32} />
        </div>
      ) : questionTypeAccuracy?.length === 0 ? (
        <div className="flex h-[306px] items-center justify-center">
          {t("history.noData", { ns: "simulatedTest" })}
        </div>
      ) : (
        <div className="mb-12 mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Typography variant="h5" className="mb-4">
              {t("learning_history.simulated_test_history")}
            </Typography>
            <SkillEvaluationLineChart data={formattedData} />
          </div>
          <Card className="flex flex-col shadow-none">
            <CardHeader>
              <CardTitle>{t("learning_history.evaluation.accuracy")}</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              {accuracyLoading && (
                <div className="flex size-full items-center justify-center">
                  <Loader2 className="animate-spin text-primary-900" size={32} />
                </div>
              )}
              {questionTypeAccuracy?.map((questionType) => (
                <div key={questionType.evaluationtype} className="mb-2 flex justify-between">
                  <Typography variant="body1">{questionType.evaluationtype}</Typography>
                  <Typography variant="body1" className="font-bold">
                    {questionType.accuracy}%
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      <Typography variant="h5" className="mb-4">
        {t("learning_history.simulated_test_history")}
      </Typography>
      <SimulatedTestHistoryTable />
    </div>
  );
}
