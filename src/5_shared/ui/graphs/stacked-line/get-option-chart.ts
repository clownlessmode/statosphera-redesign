import { EChartsOption } from "echarts";
import { getFormatTooltip } from "./formatter-tooltip";

type GraphColors = {
  text: string;
  background: string;
  gridLine: string;
  series: string[];
  tooltipBg: string;
  tooltipBorder: string;
};

export const getOptionChart = (
  option: EChartsOption & { groupType?: string },
  graphColors: GraphColors,
  customColors?: string[],
  show?: boolean,
) => {
  const { title, legend, groupType, series, ...otherOption } = option;
  const colors =
    customColors && customColors.length > 0
      ? {
          ...graphColors,
          series: customColors,
        }
      : graphColors;

  // Гарантируем, что вторая линия всегда имеет другой цвет из палитры темы
  // Используем третий цвет из палитры (chart-3) для второй линии, так как он более контрастен
  const seriesWithColors = Array.isArray(series)
    ? series.map((s: any, index: number) => {
        if (index === 1 && series.length > 1) {
          // Для второй серии используем цвет из палитры темы
          // Если customColors заданы, используем второй цвет из них
          // Иначе используем третий цвет из палитры (colors.series[2]), который более контрастен чем второй
          const secondColor =
            customColors && customColors.length > 1
              ? customColors[1]
              : colors.series[2] || colors.series[1] || colors.series[0];
          return {
            ...s,
            itemStyle: {
              ...s.itemStyle,
              color: secondColor,
            },
            lineStyle: {
              ...s.lineStyle,
              color: secondColor,
            },
          };
        }
        return s;
      })
    : series;

  return {
    backgroundColor: colors.background,
    toolbox: {
      show: show,
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
      emphasis: {
        iconStyle: {
          borderColor: colors.series[0],
        },
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
      formatter: (args: unknown) => getFormatTooltip(args, groupType),
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
    series: seriesWithColors,
    ...otherOption,
  };
};
