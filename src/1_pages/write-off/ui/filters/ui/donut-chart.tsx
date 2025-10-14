import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useMemo, useState, useEffect, useRef } from "react";
import { useGraphColors } from "@shared/hooks/use-graph-colors";
import DonutChartSkeleton from "@shared/ui/graphs/donut-chart/donut-chart-skeleton";

type DonutChartProps = {
  data: { name: string; value: number }[];
  title?: string;
  isLoading?: boolean;
  forceResize?: boolean;
};

export const DonutChart = ({
  data,
  title,
  isLoading = false,
  forceResize = false,
}: DonutChartProps) => {
  const colors = useGraphColors();
  const chartRef = useRef<ReactECharts>(null);

  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});

  // Обновляем visibleMap при изменении данных
  useEffect(() => {
    setVisibleMap(Object.fromEntries(data.map((item) => [item.name, true])));
  }, [data]);

  // Принудительный resize при изменении размеров контейнера
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const echartsInstance = chartRef.current.getEchartsInstance();
        if (echartsInstance) {
          // Небольшая задержка для корректного пересчета размеров
          setTimeout(() => {
            echartsInstance.resize();
          }, 100);
        }
      }
    };

    // Слушаем изменения размеров окна
    window.addEventListener("resize", handleResize);

    // Также вызываем resize при монтировании компонента
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Принудительный resize при изменении forceResize пропа
  useEffect(() => {
    if (chartRef.current) {
      const echartsInstance = chartRef.current.getEchartsInstance();
      if (echartsInstance) {
        // Множественные вызовы resize с разными задержками для надежности
        setTimeout(() => echartsInstance.resize(), 50);
        setTimeout(() => echartsInstance.resize(), 150);
        setTimeout(() => echartsInstance.resize(), 300);
      }
    }
  }, [forceResize, data]); // Добавили data в зависимости

  const total = useMemo(
    () =>
      data.reduce(
        (sum, item) =>
          visibleMap[item.name] !== false ? sum + item.value : sum,
        0,
      ),
    [data, visibleMap],
  );

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      title: {
        //перекидывать пропсами целое/дробное число
        text: `${total.toLocaleString("ru-RU")}`,
        left: "center",
        top: "57%",
        textStyle: {
          fontSize: 22,
          fontWeight: "bold",
          color: colors.text,
        },
        subtextStyle: {
          fontSize: 10,
          color: colors.text,
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderRadius: 12,
        textStyle: { color: colors.text, fontSize: 10 },
        formatter: (params: any) =>
          `${params.name}<br />${params.value.toLocaleString("ru-RU")} (${
            params.percent
          }%)`,
      },
      legend: {
        orient: "horizontal",
        top: 0,
        left: "center",
        textStyle: {
          color: colors.text,
          fontSize: 10,
        },
        icon: "roundRect",
        selected: visibleMap,
      },
      color: colors.series,
      series: [
        {
          name: title || "Причины списаний",
          type: "pie",
          radius: ["50%", "70%"],
          center: ["50%", "60%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
            color: colors.text,
            fontSize: 12,
            formatter: "{d}%",
          },
          labelLine: {
            show: true,
            smooth: true,
          },
          itemStyle: {
            borderRadius: 12,
          },
          data: data,
          animation: true,
          animationDurationUpdate: 300,
          animationEasingUpdate: "cubicOut",
        },
      ],
    }),
    [data, colors, total, title, visibleMap],
  );

  const onEvents = useMemo(() => {
    return {
      legendselectchanged: (params: any) => {
        setVisibleMap((prev) => ({
          ...prev,
          ...params.selected,
        }));
      },
    };
  }, []);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <DonutChartSkeleton />
      ) : (
        <ReactECharts
          ref={chartRef}
          option={option}
          onEvents={onEvents}
          notMerge={true}
          lazyUpdate={false}
          style={{ height: "100%", width: "100%" }}
          className="w-full h-full"
        />
      )}
    </div>
  );
};
