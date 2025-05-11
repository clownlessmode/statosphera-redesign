import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { EChartsOption } from "echarts";
import { useMemo, useState } from "react";
import { graphColors } from "@shared/constants/graph-colors";
import { Skeleton } from "@shared/ui/skeleton";

type DonutChartProps = {
  data: { name: string; value: number }[];
  title?: string;
  isLoading?: boolean;
};

export const DonutChart = ({
  data,
  title,
  isLoading = false,
}: DonutChartProps) => {
  const { theme } = useTheme();
  const colors = theme === "light" ? graphColors.light : graphColors.dark;

  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(data.map((item) => [item.name, true]))
  );

  const total = useMemo(
    () =>
      data.reduce(
        (sum, item) => (visibleMap[item.name] ? sum + item.value : sum),
        0
      ),
    [data, visibleMap]
  );

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      title: {
        text: `${total}`,
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 28,
          fontWeight: "bold",
          color: colors.text,
        },
        subtextStyle: {
          fontSize: 12,
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
          `${params.name}<br />${params.value.toLocaleString()} (${
            params.percent
          }%)`,
      },
      legend: {
        orient: "horizontal",
        top: 0,
        left: "center",
        textStyle: {
          color: colors.text,
          fontSize: 12,
        },
        icon: "roundRect",
      },
      color: colors.series,
      series: [
        {
          name: title,
          type: "pie",
          radius: ["50%", "80%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
            color: colors.text,
            fontSize: 12,
            formatter: "{c}",
          },
          labelLine: {
            show: true,
            smooth: true,
          },
          itemStyle: {
            borderRadius: 12,
          },
          data,
          animation: true,
          animationDurationUpdate: 500,
          animationEasingUpdate: "cubicOut",
        },
      ],
    }),
    [data, colors, total, title]
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
        <DonutChart.Skeleton />
      ) : (
        <ReactECharts
          option={option}
          onEvents={onEvents}
          notMerge={false}
          lazyUpdate={true}
          style={{ height: "100%", width: "100%" }}
          className="w-full h-full"
        />
      )}
    </div>
  );
};

DonutChart.Skeleton = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative ">
      <div className="absolute w-[70%] aspect-square rounded-full bg-muted-foreground animate-pulse" />
      <div className="absolute w-[40%] aspect-square rounded-full bg-muted z-10" />
    </div>
  );
};
