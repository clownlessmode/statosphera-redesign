import ReactECharts from "echarts-for-react";
import { useGraphColors } from "@shared/hooks/use-graph-colors";
import RadarChartSkeleton from "./radar-chart-skeleton";
import { useIsMobile } from "@shared/hooks/use-mobile";

type RadarChartProps = {
  title?: string;
  indicator: {
    name: string;
  }[];
  value: number[];
  isLoading?: boolean;
  formatter?: (params: any) => string;
};

export const RadarChartRfm = ({
  indicator,
  value,
  title = "",
  isLoading = false,
  formatter,
}: RadarChartProps) => {
  const colors = useGraphColors();
  const isMobile = useIsMobile();

  const option = {
    backgroundColor: "transparent",
    title: {
      text: title,
      left: "center",
      top: 0,
      textStyle: {
        fontSize: 16,
        fontWeight: "normal",
        color: colors.text,
      },
    },

    tooltip: {
      trigger: "item",
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 8,
      textStyle: {
        color: colors.text,
        fontSize: 12,
      },
      formatter: formatter ? formatter : "{c}",
    },
    radar: {
      radius: isMobile ? "45%" : "65%",
      center: ["50%", "55%"],
      shape: "polygon",
      axisName: {
        show: true,
        color: colors.text,
        fontSize: 12,
        lineHeight: 18,
      },
      axisLine: {
        lineStyle: { color: colors.gridLine },
      },
      splitLine: {
        lineStyle: { color: colors.gridLine },
      },
      splitArea: {
        areaStyle: {
          color: ["transparent", colors.gridLine],
        },
      },
      indicator: indicator,
    },
    series: [
      {
        name: title,
        type: "radar",
        data: [
          {
            value: value,
            areaStyle: {
              color: colors.series[0],
              opacity: 0.3,
            },
            // линия контура
            lineStyle: {
              color: colors.series[0],
              width: 2,
            },
            // маркеры на каждой точке
            symbol: "circle",
            symbolSize: 6,
            itemStyle: {
              color: colors.series[0],
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <RadarChartSkeleton />
        </div>
      ) : (
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          className="w-full h-full"
        />
      )}
    </div>
  );
};
