import { ThirdCalculationResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { TreemapChart } from "@shared/ui/treemap-chart";
import { Button } from "@shared/ui/button";
import { useState } from "react";

export const ThirdCalculation = ({
  graph,
  isLoading,
}: {
  graph: ThirdCalculationResponse;
  isLoading: boolean;
}) => {
  const [proceed, setProceed] = useState(true);
  const isSafari = useSafari();

  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="h-[600px] col-span-2" />
      ) : (
        <Card className="h-[600px] col-span-2 gap-0">
          <CardHeader className="flex flex-row justify-center items-center gap-1">
            <CardTitle className="text-center text-lg font-semibold">
              Treemap самых популярных групп продуктов по
            </CardTitle>
            <Button
              variant="outline"
              className="w-max text-lg font-semibold px-1.5"
              onClick={() => setProceed(!proceed)}
            >
              {proceed ? "выручке" : "прибыли"}
            </Button>
          </CardHeader>
          <div style={{ height: 600, width: "100%" }}>
            <TreemapChart
              series={{
                data: proceed ? graph.childrenProceed : graph.childrenProfit,
                name: "Сегменты",
              }}
              grid={{
                bottom: isSafari ? 50 : 20,
              }}
              formatter={(params) => {
                return `
                  ${params.marker}Cегмент: ${params.data.rfmName}<br />
                  ${params.marker}Группа: ${params.name}<br />
                  ${params.marker}Прибыль: ${Math.round(params.value)
                    .toLocaleString()
                    .replace(/,/g, " ")}<br />
                `;
              }}
            />
          </div>
        </Card>
      )}
    </>
  );
};
