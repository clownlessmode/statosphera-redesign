import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useGraphColors } from "@shared/hooks";

interface SankeyChartProps {
  data: {
    nodes: {
      name: string;
    }[];
    links: {
      source: string;
      target: string;
      value: number;
    }[];
  };
  title?: string;
  grid?: {
    bottom?: number;
  };
  formatter?: (params: any) => string;
}

export const SankeyChart = ({ data, grid, formatter }: SankeyChartProps) => {
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
      draggable: true,
      type: "sankey",
      data: data.nodes,
      links: data.links,
      nodeGap: 20,
      nodeWidth: 20,
      emphasis: {
        focus: "adjacency",
        label: {
          color: colors.text,
          fontWeight: "bold",
        },
      },
      label: {
        show: true,
        position: "right",
        color: colors.text,
        fontSize: 12,
        formatter: "{b}",
      },
      levels: [
        {
          depth: 0,
          itemStyle: {
            color: colors.series[0],
          },
        },
        {
          depth: 1,
          itemStyle: {
            color: colors.series[1],
          },
        },
        {
          depth: 2,
          itemStyle: {
            color: colors.series[2],
          },
        },
        {
          depth: 3,
          itemStyle: {
            color: colors.series[3],
          },
        },
      ],
      lineStyle: {
        color: "source",
        opacity: 0.4,
        curveness: 0.5,
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
