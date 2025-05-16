import { EChartsOption } from "echarts";

import { getFormatTooltip } from "./formatter-tooltip";
import { graphColors } from "@shared/constants/graph-colors";
export const getOptionChart = (
  option: EChartsOption,
  theme: "light" | "dark" | string
) => {
  const { title, legend, ...otherOption } = option;
  const isLightTheme = theme === "light";
  const colors = isLightTheme ? graphColors.light : graphColors.dark;

  return {
    backgroundColor: colors.background,
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
          title: {
            zoom: "Приблизить",
            back: "Назад",
          },
        },
        magicType: {
          type: ["line", "bar"],
          title: {
            line: "Линейная диаграмма",
            bar: "Столбчатая диаграмма",
          },
        },
        saveAsImage: {
          title: "Сохранить",
          backgroundColor: colors.background,
        },
      },
      iconStyle: {
        borderColor: colors.text,
      },
    },

    title: {
      left: "center",
      top: "2%",
      textStyle: {
        fontSize: "12px",
        color: colors.text,
      },
      ...title,
    },
    legend: {
      top: "7%",
      itemWidth: 20,
      itemHeight: 8,
      textStyle: {
        fontSize: 10,
        color: colors.text,
      },
      ...legend,
    },
    tooltip: {
      trigger: "axis",
      formatter: (args: unknown) => getFormatTooltip(args),
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      textStyle: {
        fontSize: 10,
        color: colors.text,
      },
      borderRadius: 12,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,

      axisLine: {
        lineStyle: {
          color: colors.text,
        },
      },
      axisLabel: {
        color: colors.text,
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: false,
      min: (value: any) => value.min * 0.9,
      max: (value: any) => value.max * 1.1,

      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        color: colors.text,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: colors.gridLine,
        },
      },
    },

    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "0%",
      containLabel: true,
    },
    color: colors.series,
    ...otherOption,
  };
};
