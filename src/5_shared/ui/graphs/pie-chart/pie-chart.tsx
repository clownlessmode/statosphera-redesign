import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";
import { useMemo } from "react";

import { graphColors } from "@shared/constants/graph-colors";
import { useIsMobile } from "@shared/hooks/use-mobile";

type PieChartProps = {
  data: { name: string; value: number }[];
  tooltipData?: string[];
  title?: string;
  formatter?: (params: any) => string;
};

export const PieChart = ({
  data,
  tooltipData,
  title,
  formatter,
}: PieChartProps) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;
  const radius = isMobile ? "50" : "70";

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      title: title
        ? {
            text: title,
            left: "center",
            textStyle: {
              color: colors.text,
              fontSize: 14,
            },
          }
        : undefined,
      tooltip: {
        trigger: "item",
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderRadius: 12,
        textStyle: { color: colors.text, fontSize: 10 },
        formatter: (params: any) => {
          const tooltip = tooltipData?.[params.dataIndex] || "";
          return formatter
            ? formatter(params)
            : `${
                params.name
              } ${tooltip}<br />${params.value.toLocaleString()} ₽ (${
                params.percent
              }%)`;
        },
      },
      legend: {
        orient: "horizontal",
        left: "center",
        top: "30",
        textStyle: {
          color: colors.text,
          fontSize: 10,
        },
        selectedMode: true, // чтобы можно было включать/выключать секции
        animation: true,
        animationDurationUpdate: 500,
        animationEasingUpdate: "cubicOut",
      },
      color: colors.series,

      series: [
        {
          name: title,
          type: "pie",
          radius: radius,
          center: ["50%", "60%"],
          data,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: true,
            formatter: "{b}: {d}%",
            color: colors.text,
            fontSize: 10,
          },
          animation: true,
          animationDurationUpdate: 500,
          animationEasingUpdate: "cubicOut",
        },
      ],
    }),
    [colors, data, tooltipData, title, formatter],
  );

  return (
    <div className="w-full h-full">
      <ReactECharts
        option={option}
        notMerge={false}
        lazyUpdate={true}
        style={{
          height: "100%",
          width: "100%",
          minWidth: "250px",
          margin: "auto",
        }}
        className="w-full h-full"
      />
    </div>
  );
};
