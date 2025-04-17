import { CSSProperties, useMemo } from "react";
import { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { getOptionChart } from "./get-option-chart";

interface CustomChartComponentProps {
  option: EChartsOption;
  style?: CSSProperties;
}

const StackedLine = ({ option }: CustomChartComponentProps) => {
  const optionCharts = useMemo(() => getOptionChart(option), [option]);

  return (
    <div className="w-full h-full">
      <ReactECharts option={optionCharts} />
    </div>
  );
};

export default StackedLine;
