import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";

import { useMemo } from "react";
import { graphColors } from "@shared/constants/graph-colors";

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
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  // Максимум для всех осей (считаем, что значения в %)
  const maxValue = 100;

  // Формируем индикаторы для radar
  const indicators = useMemo(
    () =>
      data.map((item) => ({
        name: `${item.name}\n(${item.value.toFixed(2)}%)`,
        max: maxValue,
      })),
    [data]
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
                `${ind.name.replace(/\n.*/, "")}: ${values[i].toFixed(2)}%`
            )
            .join("<br/>");

          return `<strong>${title}</strong><br/>${indicatorsText}`;
        },
      },

      radar: {
        // радиус и центр настраиваем под пропорции
        radius: "80%",
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
    [colors, indicators, values, title]
  );

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          {/* Можно вставить ваш скелетон */}
          <RadarChart.Skeleton />
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

RadarChart.Skeleton = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-[70%] aspect-square rounded-full bg-muted-foreground animate-pulse" />
    <div className="w-[40%] aspect-square rounded-full bg-muted z-10" />
  </div>
);
