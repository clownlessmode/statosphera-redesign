//import ReactECharts from "echarts-for-react";
//import { EChartsOption } from "echarts";
//import { useCallback, useMemo, useState } from "react";
//import { useGraphColors } from "@shared/hooks";
//
//type SeriesData = {
//  name: string;
//  data: number[];
//};
//
//type BarMultiDrilldownChartProps = {
//  xAxisData: string[];
//  allSeries: SeriesData[];
//  title?: string;
//  formatter?: (params: any) => string;
//  grid?: {
//    bottom?: number;
//  };
//};
//
//export const BarMultiDrilldownChart = ({
//  xAxisData,
//  allSeries,
//  formatter,
//  title,
//  grid,
//}: BarMultiDrilldownChartProps) => {
//  const [history, setHistory] = useState<string[]>([]);
//  const [current, setCurrent] = useState<string>("things"); //Устанавливаем верхний уровень, как текущий
//  const colors = useGraphColors();
//
//  const labelOption = {
//    show: true,
//    position: "insideBottom" as const,
//    distance: 15,
//    align: "top" as const,
//    verticalAlign: "center" as const,
//    rotate: 90,
//    fontSize: 12,
//    color: "#ffffff",
//    textBorderColor: "#383838C2",
//    formatter: "{c}",
//    rich: {
//      name: {},
//    },
//  };
//
//  const goBack = useCallback(() => {
//    if (history.length === 0) {
//      return;
//    }
//    // Создаем копию стека, чтобы не мутировать состояние напрямую
//    const newStack = [...history];
//    const prevOptionId = newStack.pop(); // Извлекаем ID предыдущего уровня
//
//    if (prevOptionId) {
//      setHistory(newStack);
//      setCurrent(prevOptionId);
//    }
//  }, [history]);
//
//  const goForward = useCallback(
//    (nextOptionId: string) => {
//      setHistory((prev) => [...prev, current]);
//      setCurrent(nextOptionId);
//    },
//    [current],
//  );
//
//  const allOptions = useMemo(() => {
//    const options: Record<string, EChartsOption> = {};
//
//    allSeries.forEach((data) => {
//      // ID уровня берется из третьего элемента первой строки данных
//      const optionId = data[0][2] as string;
//      const option: EChartsOption = {
//        id: optionId,
//        backgroundColor: "transparent",
//        toolbox: {
//          show: false,
//        },
//        title: title
//          ? {
//              text: title,
//              left: "center",
//              textStyle: {
//                color: colors.text,
//                fontSize: 16,
//              },
//            }
//          : undefined,
//        tooltip: {
//          trigger: "axis",
//          axisPointer: { type: "shadow" },
//          backgroundColor: colors.tooltipBg,
//          borderColor: colors.tooltipBorder,
//          borderRadius: 12,
//          textStyle: { color: colors.text, fontSize: 12 },
//          formatter: formatter ? formatter : undefined,
//        },
//        xAxis: [
//          {
//            type: "category",
//            axisTick: { show: false },
//            data: xAxisData,
//            axisLabel: {
//              color: colors.text,
//              fontSize: 12,
//              interval: 0,
//            },
//            axisLine: { show: false },
//          },
//        ],
//        yAxis: [
//          {
//            type: "value",
//            show: false,
//          },
//        ],
//        animationDurationUpdate: 500,
//        grid: {
//          top: 80,
//          left: 10,
//          right: 10,
//          bottom: grid?.bottom || 20,
//        },
//        series: {
//          type: "bar",
//          id: "drilldown-series",
//          label: labelOption,
//          dimensions: ["x", "y", "groupId", "childGroupId"],
//          encode: {
//            x: "x",
//            y: "y",
//            itemGroupId: "groupId",
//            itemChildGroupId: "childGroupId",
//          },
//          data,
//          universalTransition: {
//            enabled: true,
//            divideShape: "clone",
//          },
//        },
//      };
//      options[optionId] = option;
//    });
//
//    return options;
//  }, [xAxisData, allSeries, formatter, title, grid]);
//
//  // Обработчик клика по столбцу диаграммы
//  const onChartClick = useCallback(
//    (params: any) => {
//      const dataItem = params.data;
//      // Четвертый элемент (индекс 3) - это ID дочернего уровня
//      if (dataItem && dataItem[3]) {
//        const nextOptionId = dataItem[3];
//        goForward(nextOptionId);
//      }
//    },
//    [goForward],
//  );
//
//  // Собираем финальную опцию для рендеринга
//  const optionToRender = useMemo(() => {
//    const currentOption = allOptions[current];
//    if (!currentOption) return {};
//
//    // Динамически добавляем кнопку "Назад", если мы не на корневом уровне
//    const graphic =
//      history.length > 0
//        ? [
//            {
//              type: "text" as const,
//              left: 50,
//              top: 20,
//              style: {
//                text: "Назад",
//                fontSize: 18,
//                fill: colors.text,
//                cursor: "pointer",
//              },
//              onclick: goBack,
//            },
//          ]
//        : [];
//
//    return { ...currentOption, graphic };
//  }, [current, allOptions, history.length, goBack]);
//
//  return (
//    <ReactECharts
//      option={optionToRender}
//      style={{ height: "100%", width: "100%" }}
//      className="w-full h-full"
//      onEvents={{
//        click: onChartClick,
//      }}
//    />
//  );
//};
