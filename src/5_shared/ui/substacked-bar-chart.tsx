import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useGraphColors } from "@shared/hooks/use-graph-colors";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@shared/hooks/use-mobile";
import * as echarts from "echarts";

type SeriesData = {
  name: string;
  data: number[];
};

type BarChartMultiSeriesProps = {
  xAxisData: string[];
  series: SeriesData[];
  showLegend?: boolean;
  title?: string;
  formatter?: (params: any) => string;
  grid?: {
    bottom?: number;
  };
  customColors?: string[];
  mirror?: number;
};

export const BarChartMultiSeries = ({
  xAxisData,
  series,
  showLegend = true,
  formatter,
  title,
  grid,
  customColors,
  mirror,
}: BarChartMultiSeriesProps) => {
  const colors = useGraphColors();
  const chartRef = useRef<ReactECharts>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (mirror === undefined) return;
    const groupId = mirror.toString();
    const instance = chartRef.current?.getEchartsInstance();
    if (instance) {
      // даём каждому чарту одну и ту же группу
      instance.group = groupId;
      // подключаем синхронизацию по группе
      echarts.connect(groupId);
    }

    if (isMobile) instance?.resize();

    return () => {
      // при размонтировании можно отключить эту группу
      echarts.disConnect(groupId);
    };
  }, [mirror, isMobile]);

  // Базовые настройки для label
  const labelOption = {
    show: true,
    position: "insideBottom" as const,
    distance: 15,
    align: "top" as const,
    verticalAlign: "center" as const,
    rotate: 90,
    fontSize: 12,
    color: colors.text,
    textBorderColor: "#383838C2",
    formatter: formatter ? formatter : "{c}  {name|{a}}",

    rich: {
      name: {},
    },
  };

  const option: EChartsOption = {
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
    legend: {
      show: showLegend,
      data: series.map((s) => s.name),
      textStyle: { color: colors.text },
      top: 40,
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: xAxisData,
        axisLabel: {
          color: colors.text,
          fontSize: 12,
          hideOverlap: true,
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
    grid: {
      top: 80,
      left: 10,
      right: 10,
      bottom: grid?.bottom || 20,
    },
    series: series.map((s, idx) => ({
      name: s.name,
      type: "bar",
      barGap: 0,
      label: labelOption,
      emphasis: { focus: "series" },
      data: s.data,
      itemStyle: {
        color: customColors?.[idx] || colors.series[idx % colors.series.length],
        borderRadius: 4,
      },
    })) as any,
  };

  return (
    <div className="w-full h-full">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "100%", width: "100%" }}
        className="w-full h-full"
      />
    </div>
  );
};
