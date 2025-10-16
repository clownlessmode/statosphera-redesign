import { FirstCalculationResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card } from "@shared/ui/card";
import { BarChartMultiSeries } from "@shared/ui/substacked-bar-chart";
import useSafari from "@shared/hooks/use-safari";

export const FirstCalculation = ({
  graph,
  isLoading,
}: {
  graph: FirstCalculationResponse;
  isLoading: boolean;
}) => {
  const isSafari = useSafari();

  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="h-[400px]" />
      ) : (
        <Card className="h-[400px] col-span-2">
          <div style={{ height: 400, width: "100%" }}>
            <BarChartMultiSeries
              xAxisData={graph.categories}
              series={graph.series.map((item) => ({
                name: item.name,
                data: item.value,
              }))}
              grid={{
                bottom: isSafari ? 50 : 20,
              }}
              formatter={(params) => {
                if (Array.isArray(params)) {
                  return params
                    .map(
                      (item) =>
                        `${item.marker}${item.seriesName}: ${item.value}`,
                    )
                    .join("<br/>");
                }
                return `${params.value}`;
              }}
              title={"Количество выручки и прибыли"}
            />
          </div>
          {/*<div className="flex flex-col px-4">
            {graph.text.map((text) => (
              <p>{text}</p>
            ))}
          </div>*/}
        </Card>
      )}
    </>
  );
};
