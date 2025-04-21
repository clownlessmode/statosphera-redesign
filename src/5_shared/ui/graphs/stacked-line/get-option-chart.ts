import { EChartsOption } from "echarts";

import { useTheme } from "@app/providers/theme-provider";
import { getFormatTooltip } from "./formatter-tooltip";
const themeColors = {
  light: {
    text: "#333333", // --foreground
    background: "#fafafa", // --background
    gridLine: "#acaaa740", // --muted-foreground + 25% прозрачности
    series: [
      "#E50046", // --chart-1
      "#FFADC6", // --chart-2
      "#FF7AA8", // альтернативный для chart-3
      "#FF5D94", // альтернативный для chart-4
      "#FF3D7F", // альтернативный для chart-5
    ],
    tooltipBg: "#ffffff", // --popover
    tooltipBorder: "#dad9d8", // --border
  },
  dark: {
    text: "#d4d4d4", // --foreground
    background: "#262626", // --background
    gridLine: "#63636340", // --muted-foreground + 25% прозрачности
    series: [
      "#E50046", // --chart-1
      "#FFADC6", // --chart-2
      "#FF7AA8", // альтернативный для chart-3
      "#FF5D94", // альтернативный для chart-4
      "#FF3D7F", // альтернативный для chart-5
    ],
    tooltipBg: "#262626", // --popover (dark)
    tooltipBorder: "#2f2f2f", // --border (dark)
  },
};
export const getOptionChart = (option: EChartsOption) => {
  const { title, legend, ...otherOption } = option;
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const colors = isLightTheme ? themeColors.light : themeColors.dark;

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
        color: colors.text,
      },
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
