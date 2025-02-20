import _ from "lodash";
import { Info, Loader2 } from "lucide-react";
import { createElement, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { OverallBandScoreChart } from "@/components/molecules/overall-band-score-chart";
import SkillsFilter from "@/components/molecules/skill-filter";
import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
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
  const { t } = useTranslation(["profile", "simulatedTest", "tooltip"]);
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
      .value()
      .filter((s) => s.estimatedBandScore >= 2);
  }, [sessionProgress]);

  const breakpoint = useBreakPoint();

  return (
    <div className="w-full">
      <Typography variant="h5" className="my-4">
        {t("learning_history.learning_result")}
      </Typography>
      {isLoading || !data ? (
        <div className="grid min-h-96 w-full place-items-center">
          <Loader2 className="animate-spin text-primary-900" size={32} />
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-2 gap-2 md:mb-12 md:grid-cols-3 md:grid-rows-2 md:gap-4">
          <OverallBandScoreChart
            className="col-span-2 row-span-1 shadow-none md:col-span-1 md:row-span-2"
            data={data}
          />
          {Object.values(EnumSkill).map((skill) => {
            const bandScore = data.bandScores.find(
              (bandScore) => bandScore.skill == skill
            )?.estimatedBandScore;
            const formattedBandScore =
              typeof bandScore === "number" ? formatBandScore(bandScore) : "--";
            return (
              <Card className="h-fit shadow-none md:h-full" key={skill}>
                <CardContent className="flex h-fit items-center justify-between gap-4 p-3 md:h-full md:px-6 md:py-4">
                  <div>
                    <Typography
                      variant={breakpoint === "xs" ? "h3" : "h2"}
                      className="mb-2 text-left capitalize"
                    >
                      {formattedBandScore}
                    </Typography>
                    <div className="flex items-center gap-1">
                      <Typography
                        variant={breakpoint === "xs" ? "body2" : "body1"}
                        className="text-left capitalize text-supporting-text"
                      >
                        {skill}
                      </Typography>
                      <TooltipWrapper
                        triggerNode={
                          <Info className="size-3 text-supporting-text" strokeWidth={2} />
                        }
                        contentNode={
                          <>
                            <span>
                              <Trans
                                i18nKey={`tooltip:learningHistory.${skill}.description`}
                                components={{ bold: <strong /> }}
                              />
                            </span>
                            <ul className="list-disc pl-4">
                              {Array.from({
                                length: parseInt(
                                  t(`learningHistory.${skill}.number_of_question_types`, {
                                    ns: "tooltip",
                                  }),
                                  10
                                ),
                              }).map((_, index) => (
                                <li key={index} className="pb-1">
                                  <span>
                                    <Trans
                                      i18nKey={`tooltip:learningHistory.${skill}.questionTypes.${index}`}
                                      components={{ bold: <strong /> }}
                                    />
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </>
                        }
                        className="flex max-w-80 flex-col gap-1"
                      />
                    </div>
                  </div>
                  {createElement(MAPPED_SKILL_ICON_FILLED[skill], {
                    width: breakpoint === "xs" ? 28 : 36,
                    height: breakpoint === "xs" ? 28 : 36,
                    fill: formattedBandScore === "--" ? "#BDBDBD" : "#F4926F",
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <SkillsFilter skillsList={SKILLS_LIST} selected={selected} setSelected={setSelected} />
      {accuracyLoading ? (
        <div className="grid min-h-96 w-full place-items-center">
          <Loader2 className="animate-spin text-primary-900" size={32} />
        </div>
      ) : (
        <div className="mb-12 mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Typography variant="h5" className="mb-2 md:mb-4">
              {t("learning_history.evaluation.chart")}
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
              {questionTypeAccuracy?.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  {t("history.noData", { ns: "simulatedTest" })}
                </div>
              ) : (
                questionTypeAccuracy?.map((questionType) => (
                  <div
                    key={questionType.evaluationtype}
                    className="mb-1 flex justify-between md:mb-2"
                  >
                    <Typography variant={breakpoint == "xs" ? "body2" : "body1"}>
                      {questionType.evaluationtype}
                    </Typography>
                    <Typography
                      variant={breakpoint == "xs" ? "body2" : "body1"}
                      className="font-bold"
                    >
                      {questionType.accuracy ?? 0}
                      {SkillUnitMap[selected]}
                    </Typography>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Typography variant="h5" className="mb-4">
        {t("learning_history.simulated_test_history")}
      </Typography>
      <div>
        <SimulatedTestHistoryTable />
      </div>
    </div>
  );
}

const SkillUnitMap = {
  [EnumSkill.reading]: "%",
  [EnumSkill.listening]: "%",
  [EnumSkill.speaking]: "",
  [EnumSkill.writing]: "",
};
