import { FC, CSSProperties, useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts"; // обязательно импортируем core ECharts
import { Card } from "@shared/ui/card";
import { getOptionChart } from "./get-option-chart";

interface CustomChartComponentProps {
  option: echarts.EChartsOption;
  style?: CSSProperties;
  /** если передать одно и то же число в mirror у двух графиков, они синхронизируются */
  mirror?: number;
}

const StackedLine: FC<CustomChartComponentProps> = ({
  option,
  style,
  mirror,
}) => {
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
    <Card className="w-full h-full pt-1">
      <ReactECharts
        ref={chartRef}
        option={optionCharts}
        style={style ?? { height: "100%" }}
      />
    </Card>
  );
};

export default StackedLine;
