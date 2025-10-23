import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useGraphColors } from "@shared/hooks";

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
      left: 40,
      right: 80,
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
      orient: "vertical",
      left: "right",
      top: "middle",
      textStyle: {
        color: colors.text,
      },
      inRange: {
        // Цвет для значений от min до max
        color: [colors.series[3], colors.series[0]], // от светло-голубого до темно-синего
        // Можно также управлять размером символа, прозрачностью и т.д.
        // symbolSize: [10, 30],
        // opacity: [0.4, 1],
      },
    },
    series: {
      type: "heatmap",
      data: series,
      label: {
        show: true,
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
