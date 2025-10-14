//import { SecondCalculationResponse } from "../../config";
//import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
//import { Card } from "@shared/ui/card";
//import useSafari from "@shared/hooks/use-safari";
//import { BarMultiDrilldownChart } from "@shared/ui/bar-multi-drilldown-chart";
//
//export const SecondCalculation = ({
//  graph,
//  isLoading,
//}: {
//  graph: SecondCalculationResponse;
//  isLoading: boolean;
//}) => {
//  const isSafari = useSafari();
//
//  return (
//    <>
//      {isLoading ? (
//        <StackedLineSkeleton className="h-[400px]" />
//      ) : (
//        <Card className="h-[400px]">
//          <div style={{ height: 400, width: "100%" }}>
//            <BarMultiDrilldownChart
//              series={graph.data}
//              grid={{
//                bottom: isSafari ? 50 : 20,
//              }}
//              formatter={(params) => {
//                if (Array.isArray(params)) {
//                  return params
//                    .map(
//                      (item) =>
//                        `${item.marker}${item.seriesName}: ${item.value}`
//                    )
//                    .join("<br/>");
//                }
//                return `${params.value}`;
//              }}
//              title={"Количества чеков, выручки и прибыли"}
//            />
//          </div>
//        </Card>
//      )}
//    </>
//  );
//};
