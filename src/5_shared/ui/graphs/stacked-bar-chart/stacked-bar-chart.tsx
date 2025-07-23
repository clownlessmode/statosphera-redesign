import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { graphColors } from "@shared/constants/graph-colors";
import StackedBarChartSkeleton from "../stacked-bars/stacked-bars-skeleton";

type StackedBarChartDemoProps = {
  isLoading?: boolean;
};

export const StackedBarChartDemo = ({
  isLoading = false,
}: StackedBarChartDemoProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  // labelOption как в демо
  const labelOption = {
    show: true,
    position: "insideBottom" as const,
    distance: 15,
    align: "left" as const,
    verticalAlign: "middle" as const,
    rotate: 90,
    formatter: "{c}  {name|{a}}",
    fontSize: 16,
    rich: { name: {} },
    color: colors.text,
  };

  const option = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderRadius: 8,
        textStyle: { color: colors.text, fontSize: 12 },
      },
      legend: {
        data: ["Forest", "Steppe", "Desert", "Wetland"],
        textStyle: { color: colors.text, fontSize: 12 },
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      grid: {
        left: "0",
        right: "0",
        bottom: "0",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: ["2012", "2013", "2014", "2015", "2016"],
          axisLine: { lineStyle: { color: colors.background } },
          axisLabel: { color: colors.text },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
        },
      ],
      color: colors.series,
      series: [
        {
          name: "Forest",
          type: "bar",
          barGap: 0,
          label: labelOption,
          emphasis: { focus: "series" },
          data: [320, 332, 301, 334, 390],
          stack: "total",
          barMaxWidth: 40,
          itemStyle: { borderRadius: [8, 8, 8, 8] },
        },
        {
          name: "Steppe",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: [220, 182, 191, 234, 290],
          stack: "total",
          barMaxWidth: 40,
          itemStyle: { borderRadius: [8, 8, 8, 8] },
        },
        {
          name: "Desert",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: [150, 232, 201, 154, 190],
          stack: "total",
          barMaxWidth: 40,
          itemStyle: { borderRadius: [8, 8, 8, 8] },
        },
        {
          name: "Wetland",
          type: "bar",
          label: labelOption,
          emphasis: { focus: "series" },
          data: [98, 77, 101, 99, 40],
          stack: "total",
          barMaxWidth: 40,
          itemStyle: { borderRadius: [8, 8, 8, 8] },
        },
      ],
    }),
    [colors],
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
