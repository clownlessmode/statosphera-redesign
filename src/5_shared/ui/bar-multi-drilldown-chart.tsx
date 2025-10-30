import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { Fragment, useCallback, useMemo, useState } from "react";
import { useGraphColors, useIsMobile } from "@shared/hooks";
import { Button } from "./button";

type SeriesData = [number | string, number, string, string | null][];

interface BarMultiDrilldownChartProps {
  allSeries: SeriesData[];
  rootId: string;
  rootName: string;
  title?: string;
  formatter?: (params: any) => string;
  grid?: {
    bottom?: number;
  };
}

export const BarMultiDrilldownChart = ({
  allSeries,
  rootName,
  rootId,
  formatter,
  title,
  grid,
}: BarMultiDrilldownChartProps) => {
  const [history, setHistory] = useState([{ id: rootId, name: rootName }]); // устанавливаем rootId(третий элемент первого массива), как начальный id
  const current = history[history.length - 1].id; //Устанавливаем верхний уровень, как текущий
  const isMobile = useIsMobile();
  const colors = useGraphColors();

  const labelOption = {
    show: true,
    position: "insideBottom" as const,
    distance: 15,
    align: "left" as const,
    verticalAlign: "middle" as const,
    rotate: 90,
    fontSize: 12,
    color: colors.text,
    textBorderColor: "#383838C2",
    formatter: formatter ? formatter : "{c}",
  };

  const goForward = useCallback(
    (nextId: string, nextName: string) => {
      setHistory((prev) => [...prev, { id: nextId, name: nextName }]);
    },
    [isMobile],
  );

  const jumpToLevel = (index: number) => {
    if (index === history.length - 1) return;
    setHistory((prev) => prev.slice(0, index + 1));
  };

  // Обработчик клика по столбцу диаграммы
  const onChartClick = useCallback(
    (params: any) => {
      const dataItem = params.data;
      if (dataItem && dataItem[3]) {
        const nextOptionId = dataItem[3];
        const nextOptionName = params.name; // Получаем имя из кликнутого элемента
        goForward(nextOptionId, nextOptionName);
      }
    },
    [goForward, isMobile],
  );

  const allOptions = useMemo(() => {
    const options: Record<string, EChartsOption> = {};
    allSeries.forEach((data) => {
      const maxValue = Math.max(...data.map((d) => d[1]));
      const optionId = data[0][2]; // ID уровня берется из третьего элемента первой строки данных
      const option: EChartsOption = {
        id: optionId,
        backgroundColor: "transparent",
        toolbox: {
          show: false,
        },
        title: title
          ? {
              text: title,
              left: "center",
              textStyle: {
                color: colors.text,
                fontSize: 16,
              },
            }
          : undefined,
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: colors.tooltipBg,
          borderColor: colors.tooltipBorder,
          borderRadius: 12,
          textStyle: { color: colors.text, fontSize: 12 },
          formatter: formatter ? formatter : undefined,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLabel: {
              color: colors.text,
              fontSize: 12,
              hideOverlap: true,
              formatter: (value, index) => {
                return (index === 0 || index === data.length - 1) &&
                  data.length > 4 &&
                  value.length > 15
                  ? ""
                  : value;
              },
            },
            axisLine: { show: false },
          },
        ],
        yAxis: [
          {
            type: "value",
            show: false,
          },
        ],
        animationDurationUpdate: 500,
        grid: {
          top: 80,
          left: 10,
          right: 10,
          bottom: grid?.bottom || 20,
        },
        series: isMobile
          ? [
              // специальная серия прозрачными столбцами с максимальной высотой для наложения поверх основных для мобилки
              {
                type: "bar",
                id: "drilldown-series",
                label: labelOption,
                dimensions: ["x", "y", "groupId", "childGroupId"],
                encode: {
                  x: "x",
                  y: "y",
                  itemGroupId: "groupId",
                  itemChildGroupId: "childGroupId",
                },
                data,
                itemStyle: {
                  color: colors.series[history.length - 1],
                  borderRadius: 4,
                },
                universalTransition: {
                  enabled: true,
                  divideShape: "clone",
                },
                z: 10,
              },
              {
                type: "bar",
                stack: "mainStack",
                barGap: "-100%",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                },
                silent: false,
                data: data.map((item) => [
                  item[0],
                  maxValue * 1.1,
                  item[2],
                  item[3],
                ]),
                dimensions: ["x", "y", "groupId", "childGroupId"],
                encode: {
                  x: "x",
                  y: "y",
                  itemGroupId: "groupId",
                  itemChildGroupId: "childGroupId",
                },
                tooltip: { show: false },
                label: { show: false },
              },
            ]
          : {
              type: "bar",
              id: "drilldown-series",
              label: labelOption,
              dimensions: ["x", "y", "groupId", "childGroupId"],
              encode: {
                x: "x",
                y: "y",
                itemGroupId: "groupId",
                itemChildGroupId: "childGroupId",
              },
              data,
              itemStyle: {
                color: colors.series[history.length - 1],
                borderRadius: 4,
              },
              universalTransition: {
                enabled: true,
                divideShape: "clone",
              },
            },
      };
      options[optionId] = option;
    });

    return options;
  }, [allSeries, formatter, title, grid, history.length, colors, isMobile]);

  // Собираем финальную опцию для рендеринга
  const optionToRender = useMemo(() => {
    const currentOption = allOptions[current];
    if (!currentOption) return {};
    return { ...currentOption };
  }, [current, allOptions, isMobile]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Блок с "хлебными крошками" */}
      <div className="flex items-center gap-2 p-4 text-sm max-md:gap-1 max-md:overflow-x-auto max-md:overflow-y-hidden max-md:flex-nowrap">
        {history.map((level, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <span className={`text-muted-foreground select-none`}>/</span>
            )}
            <Button
              variant="ghost"
              onClick={() => jumpToLevel(index)}
              disabled={index === history.length - 1}
              className={`
              transition-colors px-2 py-1 max-md:text-xs
              ${
                index === history.length - 1
                  ? `cursor-default text-foreground` // Стиль для текущего уровня
                  : `text-muted-foreground hover:bg-foreground hover:text-background` // Стиль для предыдущих
              }
            `}
            >
              {level.name}
            </Button>
          </Fragment>
        ))}
      </div>
      <ReactECharts
        option={optionToRender}
        style={{ height: "100%", width: "100%" }}
        className="w-full h-full"
        onEvents={{
          click: onChartClick,
        }}
      />
    </div>
  );
};
