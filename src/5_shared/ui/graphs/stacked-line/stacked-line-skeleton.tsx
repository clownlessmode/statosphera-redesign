// StackedLineSkeleton.tsx
import { useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@app/providers/theme-provider";
import { cn } from "@shared/lib/utils";
import { Card } from "@shared/ui/card";

interface StackedLineSkeletonProps {
  className?: string;
}

export default function StackedLineSkeleton({
  className,
}: StackedLineSkeletonProps) {
  const { theme } = useTheme();
  const chartRef = useRef<ReactECharts>(null);

  const optionCharts = useMemo(() => {
    const timeLabels = [];
    for (let hour = 7; hour <= 20; hour++) {
      timeLabels.push(hour);
    }

    const currentData = timeLabels.map(
      () => Math.floor(Math.random() * 23000) + 2000,
    );
    const previousData = timeLabels.map(
      () => Math.floor(Math.random() * 23000) + 2000,
    );

    return {
      backgroundColor: "transparent",
      color: [
        theme === "light" ? "#acaaa7" : "#636363",
        theme === "light" ? "#acaaa7cc" : "#636363cc",
      ],
      grid: { top: 50, left: 50, right: 50, bottom: 0, containLabel: true },
      toolbox: { show: false },
      xAxis: { type: "category", data: timeLabels, boundaryGap: false },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      series: [
        {
          type: "line",
          data: currentData,
          smooth: true,
          lineStyle: { width: 4 },
        },
        {
          type: "line",
          data: previousData,
          smooth: true,
          lineStyle: { width: 2, type: "dashed" },
        },
      ],
    };
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      const instance = chartRef.current?.getEchartsInstance();
      if (instance) {
        const timeLabels = [];
        for (let hour = 7; hour <= 20; hour++) {
          timeLabels.push(hour);
        }

        const currentData = timeLabels.map(
          () => Math.floor(Math.random() * 23000) + 2000,
        );
        const previousData = timeLabels.map(
          () => Math.floor(Math.random() * 23000) + 2000,
        );

        instance.setOption({
          series: [{ data: currentData }, { data: previousData }],
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn("w-full h-full", className)}>
      <ReactECharts
        ref={chartRef}
        option={optionCharts}
        style={{ height: "100%", backgroundColor: "transparent" }}
      />
    </Card>
  );
}
