import { CSSProperties, useMemo } from "react";
import { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { getOptionChart } from "./get-option-chart";
import { Card } from "@shared/ui/card";

interface CustomChartComponentProps {
  option: EChartsOption;
  style?: CSSProperties;
}

const StackedLine = ({ option }: CustomChartComponentProps) => {
  const optionCharts = useMemo(() => getOptionChart(option), [option]);

  return (
    <Card className="w-full h-full pt-1">
      <ReactECharts option={optionCharts} style={{ height: "100%" }} />
    </Card>
  );
};

export default StackedLine;
