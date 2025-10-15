import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useCallback, useMemo, useState } from "react";
import { useGraphColors } from "@shared/hooks";

type SeriesData = [number | string, number, string, string | null][];

type BarMultiDrilldownChartProps = {
  allSeries: SeriesData[];
  rootLevel: string;
  title?: string;
  formatter?: (params: any) => string;
  grid?: {
    bottom?: number;
  };
};

export const BarMultiDrilldownChart = ({
  allSeries,
  rootLevel,
  formatter,
  title,
  grid,
}: BarMultiDrilldownChartProps) => {
  const [history, setHistory] = useState([{ id: "things", name: rootLevel }]);
  const current = history[history.length - 1].id; //Устанавливаем верхний уровень, как текущий
  const colors = useGraphColors();

  const labelOption = {
    show: true,
    position: "insideBottom" as const,
    distance: 15,
    align: "left" as const,
    verticalAlign: "middle" as const,
    rotate: 90,
    fontSize: 12,
    color: "#ffffff",
    textBorderColor: "#383838C2",
    formatter: formatter ? formatter : "{c}",
  };

  const goForward = useCallback((nextId: string, nextName: string) => {
    setHistory((prev) => [...prev, { id: nextId, name: nextName }]);
  }, []);

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
    [goForward],
  );

  const allOptions = useMemo(() => {
    const options: Record<string, EChartsOption> = {};
    allSeries.forEach((data) => {
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
              interval: 0,
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
        series: {
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
            color: colors.series[history.length - (1 % colors.series.length)],
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
  }, [allSeries, formatter, title, grid, history.length]);

  // Собираем финальную опцию для рендеринга
  const optionToRender = useMemo(() => {
    const currentOption = allOptions[current];
    if (!currentOption) return {};
    return { ...currentOption };
  }, [current, allOptions]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Блок с "хлебными крошками" */}
      <div className="flex items-center gap-2 p-4 text-sm">
        {history.map((level, index) => (
          <>
            {index > 0 && (
              <span className={`text-muted-foreground select-none`}>/</span>
            )}
            <button
              onClick={() => jumpToLevel(index)}
              disabled={index === history.length - 1}
              className={`
              transition-colors rounded px-2 py-1
              ${
                index === history.length - 1
                  ? `font-semibold cursor-default text-foreground` // Стиль для текущего уровня
                  : `text-muted-foreground hover:bg-foreground hover:text-background cursor-pointer` // Стиль для предыдущих
              }
            `}
            >
              {level.name}
            </button>
          </>
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
