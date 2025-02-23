"use client";

import _ from "lodash";
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
import { calculateOverallBandScore } from "@/lib/utils";

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
  const chartData =
    Object.entries(data.criterias).map(([criteria, bandScore]) => ({
      criteria,
      bandScore: bandScore?.score ?? 0,
    })) ?? [];

  const overall = calculateOverallBandScore(
    Object.values(data.criterias).map((item) => item.score)
  );
  chartData.push({
    criteria: EnumSpeakingCriteria.Overall,
    bandScore: overall ?? 0,
  });

  return chartData.reverse();
}

export function SkillEvaluationChart({
  data,
  skill = EnumSkill.speaking,
}: OverallBandScoreChartProps) {
  const adaptedData = getAdaptedChartData(data) ?? [];
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-heading-2 font-bold text-primary-700">
          {adaptedData[adaptedData.length - 1].bandScore}
        </p>
        <p className="font-medium text-neutral-600">OVERALL</p>
      </div>

      <ChartContainer config={chartConfig} className="mx-auto h-[350px] w-full overflow-visible">
        <RadarChart data={adaptedData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent className="capitalize" />} />
          <PolarAngleAxis
            dataKey="criteria"
            tick={({ x, y, textAnchor, index, ...props }) => {
              const label = adaptedData[index];
              if (label.criteria === EnumSpeakingCriteria.Overall) return <></>;
              const criteria =
                (skill == EnumSkill.speaking
                  ? MAPPED_SPEAKING_CRITERIA_TITLES[label.criteria]
                  : MAPPED_WRITING_CRITERIA_TITLES[label.criteria]) ?? label.criteria;
              return (
                <text
                  x={x}
                  y={index === 0 ? y - 10 : y}
                  textAnchor={textAnchor}
                  fontWeight={500}
                  {...props}
                >
                  {_.chunk(criteria.split(" "), 2).map((c) => (
                    <tspan x={x} dy={"1rem"} fontSize={16} className="fill-muted-foreground">
                      {c.join(" ")}
                    </tspan>
                  ))}
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
    </div>
  );
}
