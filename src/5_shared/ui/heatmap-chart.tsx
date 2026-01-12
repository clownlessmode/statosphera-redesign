import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useGraphColors, useIsMobile } from "@shared/hooks";

interface SankeyChartProps {
  xAxisData: string[];
  yAxisData: string[];
  series: number[][];
  title?: string;
  grid?: {
    bottom?: number;
  };
  min?: number;
  max?: number;
  formatter?: (params: any) => string;
  formatNumber?: (value: number) => string;
}

export const HeatChart = ({
  xAxisData,
  yAxisData,
  series,
  grid,
  min = 0,
  max = 500,
  formatter,
  formatNumber,
}: SankeyChartProps) => {
  const colors = useGraphColors();
  const isMobile = useIsMobile();

  const option: EChartsOption = {
    backgroundColor: "transparent",
    tooltip: {
      show: true,
      axisPointer: { type: "shadow" },
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 12,
      textStyle: { color: colors.text, fontSize: 12 },
      formatter: formatter ? formatter : undefined,
    },
    grid: {
      top: 20,
      left: !isMobile ? 40 : 30,
      right: !isMobile ? 100 : 10,
      bottom: grid?.bottom || 20,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: yAxisData,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: min,
      max: max,
      calculable: true,
      orient: !isMobile ? "vertical" : "horizontal",
      left: !isMobile ? "right" : "center",
      top: !isMobile ? "middle" : "bottom",
      itemWidth: !isMobile ? 20 : 10,
      textStyle: {
        color: colors.text,
      },
      inRange: {
        color: [colors.series[3], colors.series[0]],
      },
      formatter: formatNumber
        ? (value: any) => formatNumber(value as number)
        : undefined,
    },
    series: {
      type: "heatmap",
      data: series,
      label: {
        show: !isMobile,
        formatter: (params: any) => {
          return formatNumber ? formatNumber(params.value[2]) : undefined;
        },
      },
    } as any,
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
