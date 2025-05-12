import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";
import { useMemo } from "react";
import { graphColors } from "@shared/constants/graph-colors";
import { Skeleton } from "@shared/ui/skeleton";

type BarData = {
  name: string;
  proceeds: number;
  writeOff: number;
};

type DoubleHorizontalBarChartProps = {
  data: BarData[];
  title?: string;
  isLoading?: boolean;
};

export const DoubleHorizontalBarChart = ({
  data,
  title,
  isLoading = false,
}: DoubleHorizontalBarChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const option: EChartsOption = useMemo(() => {
    return {
      backgroundColor: "transparent",
      title: title
        ? {
            text: title,
            left: "center",
            top: 0,
            textStyle: { color: colors.text, fontSize: 16 },
          }
        : undefined,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderRadius: 12,
        textStyle: { color: colors.text },
        formatter: (params: any) =>
          params
            .map(
              (p: any) =>
                `<strong>${p.seriesName}:</strong> ${p.value.toLocaleString()}`
            )
            .join("<br />"),
      },
      legend: {
        data: ["Выручка", "Списания"],
        top: 0, // отступ сверху
        left: "center",
        icon: "roundRect",
        textStyle: { color: colors.text },
      },
      grid: {
        left: 0,
        right: 60,
        top: 20,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: "category",
        data: data.map((item) => item.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false }, // <== убрали отображение названий
      },
      series: [
        {
          name: "Выручка",
          type: "bar",
          data: data.map((item) => item.proceeds),
          barWidth: 12,
          itemStyle: {
            borderRadius: 6,
            color: colors.series[0],
          },
          label: {
            show: true,
            position: "right",
            color: colors.text,
            fontSize: 10,
            formatter: ({ value }: any) => value.toLocaleString(),
          },
        },
        {
          name: "Списания",
          type: "bar",
          data: data.map((item) => item.writeOff),
          barWidth: 12,
          itemStyle: {
            borderRadius: 6,
            color: colors.series[1],
          },
          label: {
            show: true,
            position: "right",
            color: colors.text,
            fontSize: 10,
            formatter: ({ value }: any) => value.toLocaleString(),
          },
        },
      ],
    };
  }, [data, colors, title]);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <DoubleHorizontalBarChart.Skeleton />
      ) : (
        <ReactECharts
          option={option}
          notMerge
          lazyUpdate
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </div>
  );
};

DoubleHorizontalBarChart.Skeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[10px] items-start justify-end animate-pulse pb-1">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div className="flex flex-col gap-1">
          <Skeleton
            className="h-[10px] rounded-md bg-muted-foreground"
            style={{ width: `${50 + Math.random() * 150}px` }}
          />
          <Skeleton
            className="h-[10px] rounded-md bg-muted-foreground"
            style={{ width: `${50 + Math.random() * 150}px` }}
          />
        </div>
      ))}
    </div>
  );
};
