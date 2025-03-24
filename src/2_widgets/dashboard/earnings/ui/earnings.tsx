import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { type ChartConfig, ChartContainer } from "@shared/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const chartData = [
  { month: "Пн", desktop: 196988, fullName: "Понедельник" },
  { month: "Вт", desktop: 168079, fullName: "Вторник" },
  { month: "Ср", desktop: 200048, fullName: "Среда" },
  { month: "Чт", desktop: 220304, fullName: "Четверг" },
  { month: "Пт", desktop: 254704, fullName: "Пятница" },
  { month: "Сб", desktop: 193498, fullName: "Суббота" },
  { month: "Вс", desktop: 155937, fullName: "Воскресенье" },
];

const chartConfig = {
  desktop: {
    label: "Выручка:",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;
  const value = data.desktop;

  const formatNumber = (value: number) => {
    return (
      new Intl.NumberFormat("ru-RU", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(value) + "₽"
    );
  };

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="font-medium">{data.fullName}</div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex h-2 w-2 rounded-full bg-[var(--color-desktop)]" />
        <span>Выручка: {formatNumber(value)}</span>
      </div>
    </div>
  );
};

const Earnings = () => {
  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${value.toLocaleString("ru-RU")}₽`;
    } else {
      return `${value}₽`;
    }
  };

  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Выручка за последние 7 дней</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center overflow-hidden">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            width={500}
            height={250}
            margin={{
              top: 20,
              right: 16,
              left: 16,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis hide />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                angle={270}
                dataKey="desktop"
                position="inside"
                className="fill-white font-medium"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Earnings;
