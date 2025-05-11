import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";
import { useMemo } from "react";
import { Skeleton } from "@shared/ui/skeleton";
import { graphColors } from "@shared/constants/graph-colors";

type SeriesItem = {
  name: string;
  data: number[];
};

type StackedBarChartProps = {
  xAxis: string[]; // Месяцы
  series: SeriesItem[]; // Сегменты (группы)
  isLoading?: boolean;
  title?: string;
};

export const StackedBarChart = ({
  xAxis,
  series,
  isLoading = false,
  title,
}: StackedBarChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",

      title: title
        ? {
            text: title,
            left: "center",
            top: 0,
            textStyle: {
              color: colors.text,
              fontSize: 16,
              fontWeight: "bold",
            },
          }
        : undefined,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderRadius: 8,
        textStyle: { color: colors.text, fontSize: 12 },
      },
      legend: {
        top: 0,
        padding: [10, 0, 0, 0],
        icon: "roundRect",
        textStyle: { color: colors.text, fontSize: 12 },
      },
      grid: {
        left: "0",
        right: "0",
        bottom: "0",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xAxis,
        axisLine: { lineStyle: { color: colors.background } },
        axisLabel: { color: colors.text },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
      },
      color: colors.series,
      series: series.map((item) => ({
        ...item,
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "inside",
          formatter: "{c}%",
          color: colors.text,
          fontSize: 12,
        },
        itemStyle: {
          borderRadius: [8, 8, 8, 8],
        },
        barMaxWidth: 40,
        emphasis: { focus: "series" },
      })),
    }),
    [xAxis, series, colors, title]
  );

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <StackedBarChart.Skeleton />
      ) : (
        <ReactECharts
          option={option}
          notMerge
          lazyUpdate
          style={{ height: "100%", width: "100%" }}
          className="w-full h-full"
        />
      )}
    </div>
  );
};

StackedBarChart.Skeleton = () => {
  const barCount = 7;
  const segmentCount = 5;
  const segmentColors = [
    "bg-muted",
    "bg-muted-foreground/80",
    "bg-muted-foreground/60",
    "bg-muted-foreground/40",
    "bg-muted-foreground/20",
  ];

  return (
    <div className="w-full h-full pt-8 px-4 flex items-end justify-between gap-[20px] pb-3">
      {Array.from({ length: barCount }).map((_, barIndex) => (
        <div
          key={barIndex}
          className="flex flex-1 flex-col justify-end h-[85%] gap-[2px]"
        >
          {Array.from({ length: segmentCount }).map((_, segmentIndex) => {
            const height = `${10 + Math.random() * 20}%`;
            return (
              <div
                key={segmentIndex}
                className={`w-full animate-pulse rounded-md ${
                  segmentColors[segmentIndex % segmentColors.length]
                }`}
                style={{ height }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
