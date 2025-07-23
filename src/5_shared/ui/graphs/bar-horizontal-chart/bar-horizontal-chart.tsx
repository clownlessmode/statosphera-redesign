import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useTheme } from "@app/providers/theme-provider";
import { graphColors } from "@shared/constants/graph-colors";
import BarHorizontalChartSkeleton from "./bar-horizontal-chart-skeleton";
import { useMemo } from "react";

type BarHorizontalChartProps = {
  unit?: string;
  labels: string[];
  values: number[];
  itemColors?: (string | undefined)[];
  isLoading?: boolean;
  barCategoryGap?: string;
  formatter?: (params: any) => string;
  // Новые пропсы
  formatNumbers?: boolean; // убирает .0 для целых чисел
  pluralForms?: [string, string, string]; // формы склонения [1, 2-4, 5+]
};

// Функция для склонения слов
const getPluralForm = (
  count: number,
  forms: [string, string, string],
): string => {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return forms[2]; // 11-14 всегда третья форма
  }

  if (lastDigit === 1) {
    return forms[0]; // 1, 21, 31...
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]; // 2-4, 22-24, 32-34...
  }

  return forms[2]; // 0, 5-20, 25-30...
};

// Функция для форматирования чисел
const formatNumber = (value: number, shouldFormat: boolean): string => {
  if (!shouldFormat) {
    return value.toFixed(1);
  }

  // Если число целое, показываем без десятичных знаков
  if (Number.isInteger(value)) {
    return value.toString();
  }

  // Иначе показываем с одним знаком после запятой
  return value.toFixed(1);
};

export const BarHorizontalChart = ({
  labels,
  values,
  itemColors,
  isLoading = false,
  unit = "%",
  barCategoryGap = "30%",
  formatter,
  formatNumbers = false,
  pluralForms,
}: BarHorizontalChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  // Функция для получения единицы измерения с правильным склонением
  const getUnitWithPlural = (value: number): string => {
    if (pluralForms) {
      return getPluralForm(value, pluralForms);
    }
    return unit;
  };

  // Вычисляем максимальную длину текста для определения отступа слева
  const maxLabelWidth = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return 150;

    context.font = "12px sans-serif";

    let maxWidth = 0;
    labels.forEach((label, index) => {
      const processedLabel = formatter
        ? formatter({ value: label, dataIndex: index })
        : label.split(",").slice(1).join(",").trim();

      const metrics = context.measureText(processedLabel);
      maxWidth = Math.max(maxWidth, metrics.width);
    });

    return Math.min(maxWidth + 30, 300);
  }, [labels, formatter]);

  // Вычисляем максимальную длину значений для определения отступа справа
  const maxValueWidth = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return 50;

    context.font = "12px sans-serif";

    let maxWidth = 0;
    values.forEach((value) => {
      const formattedValue = `${formatNumber(value, formatNumbers)} ${getUnitWithPlural(value)}`;
      const metrics = context.measureText(formattedValue);
      maxWidth = Math.max(maxWidth, metrics.width);
    });

    return Math.min(maxWidth + 20, 100);
  }, [values, unit, formatNumbers, pluralForms]);

  if (isLoading) {
    return <BarHorizontalChartSkeleton count={labels.length || 7} />;
  }

  // Фильтруем null значения для вычисления максимума
  const validValues = values.filter((v): v is number => v != null);
  const max = validValues.length > 0 ? Math.max(...validValues, 1) : 1;
  const normalized = values.map((v) => (v != null ? (v / max) * 100 : 0));

  const option: EChartsOption = {
    grid: {
      top: 10,
      bottom: 10,
      left: maxLabelWidth,
      right: maxValueWidth,
      containLabel: false,
    },
    tooltip: {
      trigger: "item",
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      borderRadius: 12,
      textStyle: { color: colors.text, fontSize: 10 },
      formatter: (params: any) => {
        const value = values[params.dataIndex];
        const name = labels[params.dataIndex];
        const formattedValue = formatNumber(value, formatNumbers);
        const unitText = getUnitWithPlural(value);
        return `<b>${name}</b><br />${formattedValue} ${unitText}`;
      },
    },

    xAxis: {
      type: "value",
      max: 100,
      min: 0,
      show: false,
    },
    yAxis: {
      type: "category",
      data: labels,
      show: true,
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: colors.text,
        fontSize: 12,
        margin: 10,
        align: "right",
        formatter: formatter
          ? (value: string, index: number) =>
              formatter({ value, dataIndex: index })
          : (value: string) => value.split(",").slice(1).join(",").trim(),
      },
    },
    series: [
      {
        type: "bar",
        data: normalized,
        barCategoryGap: barCategoryGap,
        itemStyle: {
          borderRadius: 10,
          color: (params: any) => {
            if (itemColors && itemColors[params.dataIndex]) {
              return itemColors[params.dataIndex] || colors.series[0];
            }
            return colors.series[0];
          },
        },
        label: {
          show: true,
          position: "right",
          formatter: (params: any) => {
            const value = values[params.dataIndex];
            const formattedValue = formatNumber(value, formatNumbers);
            const unitText = getUnitWithPlural(value);
            return `${formattedValue} ${unitText}`;
          },
          color: colors.text,
          fontSize: 12,
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: `100%` }} />
  );
};

export default BarHorizontalChart;
