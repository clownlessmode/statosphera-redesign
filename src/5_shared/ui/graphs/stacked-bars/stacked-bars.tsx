import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useMemo } from "react";

import { useGraphColors } from "@shared/hooks/use-graph-colors";
import StackedBarChartSkeleton from "./stacked-bars-skeleton";

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
  const colors = useGraphColors();
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
        top: 80,
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
    [xAxis, series, colors, title],
  );

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <StackedBarChartSkeleton />
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
