import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";
import { graphColors } from "@shared/constants/graph-colors";

type SeriesData = {
  name: string;
  data: number[];
};

type HorizontalStackedBarChartProps = {
  yAxisData: string[];
  series: SeriesData[];
  title?: string;
  formatter?: (params: any) => string;
  grid?: {
    bottom?: number;
  };
};

export const HorizontalStackedBarChart = ({
  yAxisData,
  series,
  title,
  formatter,
  grid,
}: HorizontalStackedBarChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const option: EChartsOption = {
    backgroundColor: "transparent",
    title: title
      ? {
          text: title,
          left: "center",
          textStyle: {
            color: colors.text,
            fontSize: 16,
          },
        }
      : undefined,
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 12,
      textStyle: { color: colors.text, fontSize: 12 },
      formatter: formatter ? formatter : undefined,
    },
    legend: {
      data: series.map((s) => s.name),
      textStyle: { color: colors.text },
      top: 40,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: grid?.bottom || "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: { color: colors.text, fontSize: 12 },
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "category",
      data: yAxisData,
      axisLabel: { color: colors.text, fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: series.map((s, idx) => ({
      name: s.name,
      type: "bar",
      stack: "total",
      label: {
        show: false,
        color: "#fff",
        fontSize: 12,
        textBorderColor: "#383838C2",
        textBorderWidth: 3,
        position: "insideRight",
        formatter: "{c}",
      },
      emphasis: { focus: "series" },
      data: s.data,
      itemStyle: {
        color: colors.series[idx % colors.series.length],
        borderRadius: [10, 10, 10, 10], // скругление справа
      },
    })),
  };

  return (
    <div className="w-full h-full">
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        className="w-full h-full"
      />
    </div>
  );
};
