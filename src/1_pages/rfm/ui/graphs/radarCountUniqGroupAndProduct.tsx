import { RadarCountUniqGroupAndProductResponse } from "@pages/rfm/config";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { RadarChartRfm } from "@shared/ui/graphs/radar-chart/radar-chart-rfm";
import RadarChartSkeleton from "@shared/ui/graphs/radar-chart/radar-chart-skeleton";
import { Skeleton } from "@shared/ui/skeleton";
import { FC } from "react";

interface Props {
  isLoading: boolean;
  graph: RadarCountUniqGroupAndProductResponse;
}
export const RadarCountUniqGroupAndProduct: FC<Props> = ({
  isLoading,
  graph,
}) => {
  return (
    <>
      {!isLoading &&
      graph.CountUniqGroup?.series[0]?.data[0] &&
      graph.CountUniqGroup?.radar?.indicator &&
      graph.CountUniqProduct?.series[0]?.data[0] &&
      graph.CountUniqProduct?.radar?.indicator ? (
        <div className="w-full grid grid-cols-2 gap-4 col-span-2 max-md:grid-cols-1">
          <Card className="w-full flex flex-col h-[400px] overflow-visible">
            <CardHeader>
              <CardTitle className="text-center text-lg font-semibold max-md:text-sm">
                {graph.CountUniqGroup.legend.data[0]}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full w-full">
              {graph.CountUniqGroup?.series[0]?.data[0].value.length > 3 ? (
                <RadarChartRfm
                  indicator={graph?.CountUniqGroup.radar?.indicator.map(
                    (item) => {
                      if (graph.CountUniqGroup?.series[0]?.data[0].value) {
                        return {
                          name: item.name,
                          max: Math.max(
                            ...graph.CountUniqGroup.series[0].data[0].value,
                          ),
                        };
                      } else {
                        return {
                          name: item.name,
                        };
                      }
                    },
                  )}
                  value={graph.CountUniqGroup.series[0]?.data[0].value}
                  formatter={(params) => {
                    const values = Array.isArray(params)
                      ? params[0].value
                      : params.value;

                    const indicatorsText = graph.CountUniqGroup.radar?.indicator
                      .map(
                        (ind, i) =>
                          `Сегмент ${ind.name} - ${values[i].toLocaleString().replace(/,/g, " ")}`,
                      )
                      .join("<br/>");

                    return `${indicatorsText}`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-sm text-center text-muted-foreground">
                    Выберите не менее трёх сегментов для отображения графика
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full flex flex-col h-[400px] overflow-visible">
            <CardHeader>
              <CardTitle className="text-center text-lg font-semibold max-md:text-sm">
                {graph.CountUniqProduct.legend?.data[0]}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {graph.CountUniqProduct?.series[0]?.data[0].value.length > 3 ? (
                <RadarChartRfm
                  indicator={graph.CountUniqProduct.radar?.indicator.map(
                    (item) => {
                      if (graph.CountUniqProduct?.series[0]?.data[0].value) {
                        return {
                          name: item.name,
                          max: Math.max(
                            ...graph.CountUniqProduct.series[0].data[0].value,
                          ),
                        };
                      } else {
                        return {
                          name: item.name,
                        };
                      }
                    },
                  )}
                  value={graph.CountUniqProduct?.series[0]?.data[0].value}
                  formatter={(params) => {
                    const values = Array.isArray(params)
                      ? params[0].value
                      : params.value;

                    const indicatorsText =
                      graph?.CountUniqProduct.radar?.indicator
                        .map(
                          (ind, i) =>
                            `Сегмент ${ind.name} - ${values[i].toLocaleString().replace(/,/g, " ")}`,
                        )
                        .join("<br/>");

                    return `${indicatorsText}`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-sm text-center text-muted-foreground">
                    Выберите не менее трёх сегментов для отображения графика
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 col-span-2 max-md:grid-cols-1">
          <Card className="w-full flex flex-col h-[400px]">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 justify-center w-full items-center mx-auto flex relative">
              <RadarChartSkeleton />
            </CardContent>
          </Card>
          <Card className="w-full flex flex-col h-[400px]">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 justify-center w-full items-center mx-auto flex relative">
              <RadarChartSkeleton />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
