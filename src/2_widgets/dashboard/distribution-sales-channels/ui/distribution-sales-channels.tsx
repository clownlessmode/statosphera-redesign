"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@shared/ui/chart";
import { useMemo } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

// Изменены данные на каналы продаж
const chartData = [
  { channel: "Онлайн", revenue: 275000 },
  { channel: "Розница", revenue: 200000 },
  { channel: "Дистрибьюторы", revenue: 287000 },
  { channel: "Партнеры", revenue: 173000 },
  { channel: "Другие", revenue: 190000 },
];

// Обновлена конфигурация для всех каналов продаж с разными цветами
const chartConfig = {
  revenue: {
    label: "Выручка",
  },
  online: {
    label: "Онлайн",
    color: "hsl(var(--chart-1))",
  },
  retail: {
    label: "Розница",
    color: "hsl(var(--chart-2))",
  },
  distributors: {
    label: "Дистрибьюторы",
    color: "hsl(var(--chart-3))",
  },
  partners: {
    label: "Партнеры",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Другие",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

// Цвета для сегментов диаграммы
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const DistributionSalesChannels = () => {
  // Подсчет общей выручки
  const totalRevenue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.revenue, 0);
  }, []);

  // Функция для форматирования суммы в рубли
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Распределение по каналам продаж</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center overflow-hidden">
        <ChartContainer config={chartConfig} className="mx-auto w-full h-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="channel"
              innerRadius={40}
              strokeWidth={10}
              cornerRadius={4}
            >
              {/* Добавляем ячейки с разными цветами для каждого сегмента */}
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              {/* Возвращаем метку с общей суммой в центре */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {formatCurrency(totalRevenue)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 1000}
                          className="fill-muted-foreground"
                        >
                          Выручка
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DistributionSalesChannels;
