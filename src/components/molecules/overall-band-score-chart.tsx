"use client";

import { Trans } from "react-i18next";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EnumSkill } from "@/lib/enums";
import { BandScoreSkill, UserBandScoreOverall } from "@/lib/types/simulated-test.type";

import TooltipWrapper from "./tooltip-wrapper";

const DEFAULT_DATA: BandScoreSkill[] = [
  { skill: EnumSkill.reading, estimatedBandScore: 0 },
  { skill: EnumSkill.listening, estimatedBandScore: 0 },
  { skill: EnumSkill.writing, estimatedBandScore: 0 },
  { skill: EnumSkill.speaking, estimatedBandScore: 0 },
];

const chartConfig = {
  bandScore: {
    label: "Skill",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type OverallBandScoreChartProps = {
  className?: string;
  data: UserBandScoreOverall;
};

export function OverallBandScoreChart({ className, data }: OverallBandScoreChartProps) {
  return (
    <Card className={className}>
      <CardContent className="overflow-visible pb-0 pt-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] overflow-visible"
        >
          <RadarChart
            data={DEFAULT_DATA.map((item) => {
              const bandScore = data.bandScores.find((bandScore) => bandScore.skill === item.skill);
              return { ...item, bandScore: bandScore?.estimatedBandScore ?? 0 };
            })}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="capitalize" />} />
            <PolarAngleAxis
              dataKey="skill"
              tickFormatter={(skill) => skill.charAt(0).toUpperCase()}
            />
            <PolarRadiusAxis domain={[0, 9]} />
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xl font-semibold">
        <TooltipWrapper
          triggerNode={
            <span className="hover:opacity-80">Overall:&nbsp;{data.overallBandScore ?? "--"}</span>
          }
          contentNode={<Trans i18nKey="tooltip:simulatedTest.overall_band" />}
        />
      </CardFooter>
    </Card>
  );
}
