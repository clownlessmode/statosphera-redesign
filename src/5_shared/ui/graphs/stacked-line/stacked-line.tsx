import { CSSProperties, useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts"; // обязательно импортируем core ECharts
import { Card } from "@shared/ui/card";
import { getOptionChart } from "./get-option-chart";
import { cn } from "@shared/lib/utils";
import { useTheme } from "@app/providers/theme-provider";

interface CustomChartComponentProps {
  option: echarts.EChartsOption | any;
  style?: CSSProperties;
  className?: string;
  /** если передать одно и то же число в mirror у двух графиков, они синхронизируются */
  mirror?: number;
  customColors?: string[]; // Новый пропс
}

export default function StackedLine({
  option,
  style,
  mirror,
  className,
  customColors,
}: CustomChartComponentProps) {
  const { theme } = useTheme(); // ① получаем текущую тему
  const chartRef = useRef<ReactECharts>(null);

  // ② пересчитываем опции при смене option **или** theme
  const optionCharts = useMemo(
    () => getOptionChart(option, theme as string, customColors),
    [option, theme, customColors],
  );
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
