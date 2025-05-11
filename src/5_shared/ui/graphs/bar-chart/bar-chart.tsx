import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";

import { graphColors } from "@shared/constants/graph-colors";

type BarChartProps = {
  xAxisData: string[];
  yAxisData: number[];
  tooltipData?: string[];
  title?: string;
};

export const BarChart = ({
  xAxisData,
  yAxisData,
  tooltipData,
  title,
}: BarChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const maxValue = Math.max(...yAxisData);

  const option: EChartsOption = {
    backgroundColor: "transparent",
    title: title
      ? {
          text: title,
          left: "center",
          textStyle: {
            color: colors.text,
            fontSize: 14,
          },
        }
      : undefined,
    tooltip: {
      trigger: "axis",
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 12,
      textStyle: { color: colors.text, fontSize: 10 },
      formatter: (params: any) => {
        const value = params[0].value;
        const label = params[0].name;
        const tooltip = tooltipData?.[params[0].dataIndex] || "";
        return `${label} ${tooltip} <br />${value.toLocaleString()} ₽`;
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        color: colors.text,
      },
      axisLine: {
        lineStyle: {
          color: colors.text,
        },
      },
    },
    yAxis: {
      type: "value",
      show: false,
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: colors.gridLine,
        },
      },
    },
    grid: {
      left: 0,
      right: 0,
      top: title ? 40 : 0,
      bottom: 0,
      containLabel: false,
    },
    series: [
      {
        type: "bar",
        data: yAxisData.map((value) => ({
          value,
          itemStyle: {
            color: value === maxValue ? colors.series[0] : "#B8B8B8",
            borderRadius: 10,
          },
        })),
        label: {
          show: true,
          position: "top",
          color: colors.text,
          fontSize: 10,
          formatter: (params: any) => params.value.toLocaleString(),
        },
      },
    ],
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
