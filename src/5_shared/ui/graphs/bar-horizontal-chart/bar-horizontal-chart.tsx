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
};

export const BarHorizontalChart = ({
  labels,
  values,
  itemColors,
  isLoading = false,
  unit = "%",
  barCategoryGap = "30%", // значение по умолчанию
  formatter,
}: BarHorizontalChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  // Вычисляем максимальную длину текста для определения отступа слева
  const maxLabelWidth = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return 150;

    context.font = "12px sans-serif"; // тот же размер шрифта, что и в графике

    let maxWidth = 0;
    labels.forEach((label, index) => {
      const processedLabel = formatter
        ? formatter({ value: label, dataIndex: index })
        : label.split(",").slice(1).join(",").trim();

      const metrics = context.measureText(processedLabel);
      maxWidth = Math.max(maxWidth, metrics.width);
    });

    // Добавляем отступы: 20px для margin + 10px запас
    return Math.min(maxWidth + 30, 300); // ограничиваем максимум 300px
  }, [labels, formatter]);

  // Вычисляем максимальную длину значений для определения отступа справа
  const maxValueWidth = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return 50;

    context.font = "12px sans-serif"; // тот же размер шрифта, что и в графике

    let maxWidth = 0;
    values.forEach((value) => {
      // Добавляем проверку на null
      const formattedValue =
        value != null ? `${value.toFixed(1)} ${unit}` : `0 ${unit}`;
      const metrics = context.measureText(formattedValue);
      maxWidth = Math.max(maxWidth, metrics.width);
    });

    // Добавляем отступы: 10px запас
    return Math.min(maxWidth + 20, 100); // ограничиваем максимум 100px
  }, [values, unit]);

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
      left: maxLabelWidth, // используем вычисленную ширину
      right: maxValueWidth, // используем вычисленную ширину для значений
      containLabel: false, // меняем на false, чтобы контролировать отступы вручную
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
        // Добавляем проверку на null
        return `<b>${name}</b><br />${value != null ? value.toFixed(1) : "0"} ${unit}`;
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
      show: true, // показываем ось Y
      inverse: true,
      axisLine: {
        show: false, // скрываем линию оси
      },
      axisTick: {
        show: false, // скрываем засечки
      },
      axisLabel: {
        color: colors.text,
        fontSize: 12,
        margin: 10, // отступ от графика
        align: "right", // выравнивание по правому краю
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
            // Если передан массив цветов и есть цвет для этого элемента, используем его
            if (itemColors && itemColors[params.dataIndex]) {
              return itemColors[params.dataIndex] || colors.series[0];
            }
            // Иначе используем стандартный цвет
            return colors.series[0];
          },
        },
        label: {
          show: true,
          position: "right", // показываем значения справа от полосок
          formatter: (params: any) => {
            const value = values[params.dataIndex];
            // Добавляем проверку на null
            return `${value != null ? value.toFixed(1) : "0"} ${unit}`;
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
