import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { ChartConfig, ChartTooltipContent } from "@shared/ui/chart";
import { ChartTooltip } from "@shared/ui/chart";
import { ChartContainer } from "@shared/ui/chart";
import { PolarAngleAxis } from "recharts";
import { PolarGrid } from "recharts";
import { Radar } from "recharts";
import { FC } from "react";
import { RadarChart } from "recharts";

const PlanPercent: FC = () => {
  const chartData = [
    { title: "Выручка (92.67%)", desktop: 92.67 },
    { title: "Применение QC (93.3%)", desktop: 0 },
    { title: "Выручка QC (93.3%)", desktop: 0 },
    { title: "Ср.чек (99.3%)", desktop: 99.3 },
    { title: "Чеки (93.3%)", desktop: 93.3 },
  ];
  const chartConfig = {
    desktop: {
      label: "Процент",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full h-[300px]">
      <CardHeader>
        <CardTitle>Процент выполнения плана</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent shared />}
            />
            <PolarAngleAxis dataKey="title" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PlanPercent;
