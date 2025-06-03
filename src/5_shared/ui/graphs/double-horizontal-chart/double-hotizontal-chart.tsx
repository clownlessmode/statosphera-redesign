import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";

import { useMemo } from "react";
import { graphColors } from "@shared/constants/graph-colors";

import DoubleHorizontalBarChartSkeleton from "./double-horizontal-chart-skeleton";

type SeriesItem = {
  name: string;
  data: (string | number)[];
};

type UniversalBarChartProps = {
  data: {
    yAxis: string[];
    series: SeriesItem[];
  };
  title?: string;
  isLoading?: boolean;
};

export const DoubleHorizontalBarChart = ({
  data,
  title,
  isLoading = false,
}: UniversalBarChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const option = useMemo(() => {
    return {
      backgroundColor: "transparent",
      title: title
        ? {
            text: title,
            left: "center",
            top: 0,
            textStyle: { color: colors.text, fontSize: 16 },
          }
        : undefined,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderRadius: 12,
        textStyle: { color: colors.text },
        formatter: (params: any[]) => {
          const category = params[0]?.name;
          const details = params
            .map(
              (p) =>
                `<strong>${p.seriesName}:</strong> ${Number(
                  p.value
                ).toLocaleString()}`
            )
            .join("<br />");
          return `<div><strong>${category}</strong><br />${details}</div>`;
        },
      },

      legend: {
        data: data.series.map((s) => s.name),
        top: 0,
        left: "center",
        icon: "roundRect",
        textStyle: { color: colors.text },
      },
      grid: {
        left: 0,
        right: 60,
        top: 20,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: "category",
        data: data.yAxis,
        // invert: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      series: data.series.map((serie, i) => ({
        name: serie.name,
        type: "bar",
        data: serie.data.map((v) => Number(v)),
        barWidth: 12,
        itemStyle: {
          borderRadius: 6,
          color: colors.series[i % colors.series.length],
        },
        label: {
          show: true,
          position: "right",
          color: colors.text,
          fontSize: 10,
          formatter: ({ value }: any) => Number(value).toLocaleString(),
        },
      })),
    };
  }, [data, colors, title]);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <DoubleHorizontalBarChartSkeleton />
      ) : (
        <ReactECharts
          option={option}
          notMerge
          lazyUpdate
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </div>
  );
};
