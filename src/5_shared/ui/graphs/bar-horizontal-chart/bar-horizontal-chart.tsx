import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useTheme } from "@app/providers/theme-provider";
import { graphColors } from "@shared/constants/graph-colors";
import BarHorizontalChartSkeleton from "./bar-horizontal-chart-skeleton";

type BarHorizontalChartProps = {
  labels: string[]; // адреса для тултипа
  values: number[];
  itemColors?: (string | undefined)[]; // массив цветов для каждого элемента
  isLoading?: boolean;
};

export const BarHorizontalChart = ({
  labels,
  values,
  itemColors,
  isLoading = false,
}: BarHorizontalChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  if (isLoading) {
    return <BarHorizontalChartSkeleton count={labels.length || 7} />;
  }

  const max = Math.max(...values, 1);
  const normalized = values.map((v) => (v / max) * 100);

  const option: EChartsOption = {
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 12,
      textStyle: { color: colors.text, fontSize: 10 },
      formatter: (params: any) => {
        const value = values[params.dataIndex];
        const name = labels[params.dataIndex];
        return `<b>${name}</b><br />${value.toFixed(1)}%`;
      },
    },

    xAxis: {
      type: "value",
      max: 100,
      min: 0,
      show: false,
    },
    yAxis: {
      type: "category",
      data: labels.map(() => ""), // скрываем текст
      show: false,
      inverse: true,
    },
    series: [
      {
        type: "bar",
        data: normalized,
        barCategoryGap: "30%",
        itemStyle: {
          borderRadius: 10,
          color: (params: any) => {
            // Если передан массив цветов и есть цвет для этого элемента, используем его
            if (itemColors && itemColors[params.dataIndex]) {
              return itemColors[params.dataIndex] || colors.series[0];
            }
            // Иначе используем стандартный цвет
            return colors.series[0];
          },
        },
        label: {
          show: true,
          position: "inside",
          formatter: (params: any) =>
            `${labels[params.dataIndex].split(",").slice(1).join(",").trim()} ${values[params.dataIndex].toFixed(1)}%`,
          color: colors.text,
          fontSize: 12,
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: "100%", height: `${labels.length * 32}px` }}
    />
  );
};

export default BarHorizontalChart;
