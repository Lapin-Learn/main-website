"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SessionProgress } from "@/lib/types/simulated-test.type";

const chartConfig = {
  estimatedBandScore: {
    label: "Band Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SkillEvaluationLineChart({ data }: { data: SessionProgress[] }) {
  return (
    <ChartContainer config={chartConfig} className="size-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          right: 12,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="createdAt" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[2, 9]}
          ticks={[2, 3, 4, 5, 6, 7, 8, 9]}
          tickMargin={4}
          allowDecimals={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="estimatedBandScore"
          type="linear"
          stroke="var(--color-estimatedBandScore)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
