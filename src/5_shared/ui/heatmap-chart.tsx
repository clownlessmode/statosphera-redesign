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
  formatter?: (params: any) => string;
}

export const HeatChart = ({
  xAxisData,
  yAxisData,
  series,
  grid,
  formatter,
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
      right: !isMobile ? 80 : 10,
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
      min: 0,
      max: 500,
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
    },
    series: {
      type: "heatmap",
      data: series,
      label: {
        show: !isMobile,
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
