import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";
import { graphColors } from "@shared/constants/graph-colors";

interface Data {
  name: string;
  value: number;
  path?: string;
  children?: Data[];
}

type TreemapCharProps = {
  series: {
    data: Data[];
    name: string;
  };
  title?: string;
  formatter?: (params: any) => string;
  grid?: {
    bottom?: number;
  };
};

export const TreemapChart = ({ series, formatter, grid }: TreemapCharProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

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
      leafDepth: 2,
      name: series.name,
      type: "treemap",
      emphasis: { focus: "series" },
      data: series.data,
      label: {
        show: true,
      },
      upperLabel: {
        backgroundColor: colors.background,
        color: colors.text,
        show: true,
      },
      levels: [
        {
          upperLabel: { show: false },
          itemStyle: {
            borderColor: colors.background,
            borderWidth: 1,
            gapWidth: 5,
          },
        },
        {
          itemStyle: {
            borderColor: colors.background,
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
      />
    </div>
  );
};
