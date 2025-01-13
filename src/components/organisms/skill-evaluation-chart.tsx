"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MAPPED_SPEAKING_CRITERIA_TITLES, MAPPED_WRITING_CRITERIA_TITLES } from "@/lib/consts";
import { EnumSkill, EnumSpeakingCriteria } from "@/lib/enums";
import { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import { calculateOverallBandScore } from "./streak/utils";

const chartConfig = {
  bandScore: {
    label: "Band score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type OverallBandScoreChartProps = {
  data: STCriteriaEvaluation;
  skill?: EnumSkill.speaking | EnumSkill.writing;
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

export function SkillEvaluationChart({
  data,
  skill = EnumSkill.speaking,
}: OverallBandScoreChartProps) {
  const adaptedData = getAdaptedChartData(data) ?? [];
  return (
    <ChartContainer config={chartConfig} className="mx-auto h-[350px] w-full overflow-visible">
      <RadarChart data={adaptedData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="capitalize" />} />
        <PolarAngleAxis
          dataKey="criteria"
          tick={({ x, y, textAnchor, index, ...props }) => {
            const label = adaptedData[index];
            return (
              <text
                x={x}
                y={index === 0 ? y - 10 : y}
                textAnchor={textAnchor}
                fontSize={13}
                fontWeight={500}
                {...props}
                className={cn(
                  "capitalize",
                  label.criteria === EnumSpeakingCriteria.Overall && "font-bold text-black"
                )}
              >
                <tspan x={x} dy={"1rem"} fontSize={14} className="fill-muted-foreground">
                  {(skill == EnumSkill.speaking
                    ? MAPPED_SPEAKING_CRITERIA_TITLES[label.criteria]
                    : MAPPED_WRITING_CRITERIA_TITLES[label.criteria]) ?? label.criteria}
                  {label.criteria === EnumSpeakingCriteria.Overall && `: ${label.bandScore}`}
                </tspan>
              </text>
            );
          }}
        />
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
