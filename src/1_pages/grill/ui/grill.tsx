import { DataTable } from "@shared/ui/table/data-table";
import { Header } from "@widgets/header";
import { columns } from "../model/columns";
import type { Grill as GrillType } from "../model/types";
import { GRILL_MOCK } from "@shared/constants/mock/grill-mock";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
// import { TrendingUp } from "lucide-react";

import StatCard from "./stat-card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@shared/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Сегодня",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Средние продажи за 4 недели",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
const Grill = () => {
  const data: GrillType[] = GRILL_MOCK;
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Гриль`}
        actions={{ left: <Button>Добавить позицию</Button> }}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-fit flex flex-row min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full bg-background">
        <div className="overflow-x-auto w-full max-w-full max-h-[calc(100vh-4rem)] ">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="flex gap-4 flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Количество продаж по часам</CardTitle>
              <CardDescription>
                Showing total visitors for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <ChartLegend content={<ChartLegendContent />} />

                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="h-full w-full">asd</Card>
          <div className="flex flex-row gap-4 ">
            <StatCard title="Выручка" number={66773} description="Сегодня" />
            <StatCard
              title="Количество продаж"
              number={330.9}
              description="Сегодня"
            />
          </div>
          <div className="flex flex-row gap-4 ">
            <StatCard
              title="Количество чеков"
              number={163}
              description="Сегодня (гриль)"
            />
            <StatCard title="Средний чек" number={410} description="Сегодня" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grill;
