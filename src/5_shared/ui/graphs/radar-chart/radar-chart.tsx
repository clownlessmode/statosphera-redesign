import ReactECharts from "echarts-for-react";

import { useMemo } from "react";
import { useGraphColors } from "@shared/hooks/use-graph-colors";
import RadarChartSkeleton from "./radar-chart-skeleton";
import { useIsMobile } from "@shared/hooks/use-mobile";

type RadarChartProps = {
  data: { name: string; value: number }[];
  title?: string;
  isLoading?: boolean;
};

export const RadarChart = ({
  data,
  title = "",
  isLoading = false,
}: RadarChartProps) => {
  const colors = useGraphColors();
  const isMobile = useIsMobile();
  // Максимум для всех осей (считаем, что значения в %)
  const maxValue = 100;

  // Формируем индикаторы для radar
  const indicators = useMemo(
    () =>
      data.map((item) => ({
        name: `${item.name}\n(${item.value.toFixed(2)}%)`,
        max: maxValue,
      })),
    [data],
  );

  // Только значения в том же порядке
  const values = useMemo(() => data.map((item) => item.value), [data]);

  const option = useMemo(
    () => ({
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
        formatter: (params: any) => {
          const values = Array.isArray(params) ? params[0].value : params.value;

          const indicatorsText = indicators
            .map(
              (ind, i) =>
                `${ind.name.replace(/\n.*/, "")}: ${values[i].toFixed(2)}%`,
            )
            .join("<br/>");

          return `<strong>${title}</strong><br/>${indicatorsText}`;
        },
      },

      radar: {
        // радиус и центр настраиваем под пропорции
        radius: isMobile ? "45%" : "65%",
        center: ["50%", "55%"],
        shape: "polygon",
        name: {
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
            color: [
              "transparent",
              colors.gridLine, // чередуем зоны
            ],
          },
        },
        indicator: indicators,
      },
      series: [
        {
          name: title,
          type: "radar",
          data: [
            {
              value: values,
              name: title,
              // заливка области
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
    }),
    [colors, indicators, values, title, isMobile],
  );

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          {/* Можно вставить ваш скелетон */}
          <RadarChartSkeleton />
        </div>
      ) : (
        <ReactECharts
          option={option}
          notMerge={false}
          lazyUpdate={true}
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </div>
  );
};
