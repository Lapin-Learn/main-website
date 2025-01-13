"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EnumSpeakingCriteria } from "@/lib/enums";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";

import { calculateOverallBandScore } from "./streak/utils";

const chartConfig = {
  bandScore: {
    label: "Band score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type OverallBandScoreChartProps = {
  data: STCriteriaEvaluation;
};

export function getAdaptedChartData(data: STCriteriaEvaluation) {
  const { part: _part, score, ...adaptedData } = data;
  const chartData =
    Object.entries(adaptedData).map(([criteria, bandScore]) => ({
      criteria,
      bandScore: bandScore?.score ?? 0,
    })) ?? [];

  if (score) {
    chartData.push({
      criteria: EnumSpeakingCriteria.Overall,
      bandScore: score,
    });
  } else {
    const overall = calculateOverallBandScore(Object.values(adaptedData).map((item) => item.score));
    chartData.push({
      criteria: EnumSpeakingCriteria.Overall,
      bandScore: overall,
    });
  }

  return chartData.reverse();
}

export function SkillEvaluationChart({ data }: OverallBandScoreChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] overflow-visible"
    >
      <RadarChart data={getAdaptedChartData(data) ?? []}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="capitalize" />} />
        <PolarAngleAxis dataKey="criteria" />
        <PolarRadiusAxis domain={[0, 9]} className="hidden" />
        <PolarGrid />
        <Radar
          dataKey="bandScore"
          fill="var(--color-bandScore)"
          fillOpacity={0.6}
          dot={{
            r: 2,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}
