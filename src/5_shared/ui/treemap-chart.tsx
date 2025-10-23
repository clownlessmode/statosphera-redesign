import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useGraphColors } from "@shared/hooks";

interface Data {
  name: string;
  value: number;
  path?: string;
  children?: Data[];
}

interface TreemapChartProps {
  series: {
    data: Data[];
    rootLevel: string;
  };
  title?: string;
  formatter?: (params: any) => string;
  grid?: {
    bottom?: number;
  };
}

export const TreemapChart = ({
  series,
  formatter,
  grid,
}: TreemapChartProps) => {
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
      left: 10,
      right: 10,
      bottom: grid?.bottom || 20,
    },
    series: {
      roam: "move",
      leafDepth: 3,
      name: series.rootLevel,
      type: "treemap",
      emphasis: { focus: "series" },
      data: series.data,
      label: {
        show: true,
        color: colors.text,
        formatter: "{b}",
      },
      upperLabel: {
        color: colors.text,
        show: true,
      },
      levels: [
        {
          color: [
            colors.series[0],
            colors.series[1],
            colors.series[2],
            colors.series[3],
            colors.series[4],
          ],
          upperLabel: { show: false, backgroundColor: colors.background },
          itemStyle: {
            borderColor: colors.background,
            borderWidth: 1,
            gapWidth: 5,
          },
        },
        {
          upperLabel: { backgroundColor: colors.background },
          itemStyle: {
            borderColor: colors.background,
            borderWidth: 1,
            gapWidth: 5,
          },
        },
        {
          itemStyle: {
            borderColor: colors.background,
            borderColorSaturation: 0.6,
            borderWidth: 1,
            gapWidth: 5,
          },
        },
      ],

      universalTransition: {
        enabled: true,
        divideShape: "clone",
      },
    } as any,
  };

  return (
    <div className="w-full h-full">
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        className="w-full h-full"
        notMerge={true}
        lazyUpdate={false}
      />
    </div>
  );
};
