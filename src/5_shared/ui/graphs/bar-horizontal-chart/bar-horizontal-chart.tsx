import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useTheme } from "@app/providers/theme-provider";
import { graphColors } from "@shared/constants/graph-colors";
import { Skeleton } from "@shared/ui/skeleton";

type BarHorizontalChartProps = {
  labels: string[]; // адреса для тултипа
  values: number[];
  isLoading?: boolean;
};

export const BarHorizontalChart = ({
  labels,
  values,
  isLoading = false,
}: BarHorizontalChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  if (isLoading) {
    return <BarHorizontalChart.Skeleton count={labels.length || 7} />;
  }

  const max = Math.max(...values, 1);
  const normalized = values.map((v) => (v / max) * 100);

  const option: EChartsOption = {
    grid: {
      top: 0,
      bottom: 0,
      left: 16,
      right: 16,
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
    },
    series: [
      {
        type: "bar",
        data: normalized,
        barCategoryGap: "30%",
        itemStyle: {
          borderRadius: 10,
          color: colors.series[0],
        },
        label: {
          show: true,
          position: "inside",
          formatter: (params: any) => `${values[params.dataIndex].toFixed(1)}%`,
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

BarHorizontalChart.Skeleton = ({ count = 7 }: { count?: number }) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 py-2 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full h-[20px] rounded-full bg-muted animate-pulse"
          style={{
            width: `${40 + Math.random() * 50}%`,
          }}
        />
      ))}
    </div>
  );
};
