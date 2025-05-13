import { CSSProperties, useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts"; // обязательно импортируем core ECharts
import { Card } from "@shared/ui/card";
import { getOptionChart } from "./get-option-chart";
import { cn } from "@shared/lib/utils";

interface CustomChartComponentProps {
  option: echarts.EChartsOption | any;
  style?: CSSProperties;
  className?: string;
  /** если передать одно и то же число в mirror у двух графиков, они синхронизируются */
  mirror?: number;
}

export default function StackedLine({
  option,
  style,
  mirror,
  className,
}: CustomChartComponentProps) {
  const chartRef = useRef<ReactECharts>(null);
  const optionCharts = useMemo(() => getOptionChart(option), [option]);

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
    return () => {
      // при размонтировании можно отключить эту группу
      echarts.disConnect(groupId);
    };
  }, [mirror]);

  return (
    <Card className={cn("w-full h-full pt-1", className)}>
      <ReactECharts
        ref={chartRef}
        option={optionCharts}
        style={style ?? { height: "100%" }}
      />
    </Card>
  );
}
const generateSmoothPath = (points: number[]) => {
  const step = 100 / (points.length - 1);
  let d = `M 0,${100 - points[0]}`;
  for (let i = 1; i < points.length; i++) {
    const x = i * step;
    const prevY = 100 - points[i - 1];
    const currY = 100 - points[i];
    const midX = x - step / 2;
    d += ` C ${midX},${prevY} ${midX},${currY} ${x},${currY}`;
  }
  return d;
};

const generatePoints = () =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 30); // от 30% до 90%

StackedLine.Skeleton = () => {
  const line1 = useMemo(() => generatePoints(), []);
  const line2 = useMemo(() => generatePoints(), []);
  return (
    <div className="w-full h-[300px] relative animate-pulse">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full text-muted-foreground"
      >
        <path
          d={generateSmoothPath(line1)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d={generateSmoothPath(line2)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
