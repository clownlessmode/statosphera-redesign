import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";

import { graphColors } from "@shared/constants/graph-colors";

type BarChartProps = {
  xAxisData: string[];
  yAxisData: number[];
  tooltipData?: string[];
  title?: string;
};

export const BarChart = ({
  xAxisData,
  yAxisData,
  tooltipData,
  title,
}: BarChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const maxValue = Math.max(...yAxisData);

  // Функция для сокращения дней недели
  const shortenDayName = (day: string): string => {
    const dayMap: { [key: string]: string } = {
      понедельник: "ПН",
      вторник: "ВТ",
      среда: "СР",
      четверг: "ЧТ",
      пятница: "ПТ",
      суббота: "СБ",
      воскресенье: "ВС",
      // Английские варианты на случай если приходят на английском
      monday: "ПН",
      tuesday: "ВТ",
      wednesday: "СР",
      thursday: "ЧТ",
      friday: "ПТ",
      saturday: "СБ",
      sunday: "ВС",
    };

    const lowerDay = day.toLowerCase();
    return dayMap[lowerDay] || day; // Если не день недели, возвращаем как есть
  };

  const option: EChartsOption = {
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
      trigger: "axis",
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 12,
      textStyle: { color: colors.text, fontSize: 10 },
      formatter: (params: any) => {
        const value = params[0].value;
        const label = xAxisData[params[0].dataIndex]; // Используем полное название в тултипе
        const tooltip = tooltipData?.[params[0].dataIndex] || "";
        return `${label} ${tooltip} <br />${value.toLocaleString()} ₽`;
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData.map(shortenDayName), // Применяем сокращение
      axisLabel: {
        color: colors.text,
        fontSize: 12,
        interval: 0,
        rotate: 0,
        margin: 8,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      show: false,
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: 10,
      right: 10,
      top: title ? 40 : 10,
      bottom: 30,
      containLabel: false,
    },
    series: [
      {
        type: "bar",
        data: yAxisData.map((value) => ({
          value,
          itemStyle: {
            color: value === maxValue ? colors.series[0] : "#B8B8B8",
            borderRadius: 10,
          },
        })),
        label: {
          show: true,
          position: "top",
          color: colors.text,
          fontSize: 10,
          formatter: (params: any) => params.value.toLocaleString(),
        },
      },
    ],
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
