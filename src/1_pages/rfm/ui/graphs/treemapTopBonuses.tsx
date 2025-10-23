import { TreemapTopBonusesResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { TreemapChart } from "@shared/ui/treemap-chart";
import { Button } from "@shared/ui/button";
import { FC, useState } from "react";

interface Props {
  graph: TreemapTopBonusesResponse;
  isLoading: boolean;
}

export const TreemapTopBonuses: FC<Props> = ({ graph, isLoading }) => {
  const [proceed, setProceed] = useState(true);
  const isSafari = useSafari();

  if (
    isLoading ||
    graph?.childrenProceed.length === 0 ||
    graph?.childrenProfit.length === 0
  ) {
    return <StackedLineSkeleton className="h-[600px] col-span-2" />;
  }

  return (
    <Card className="h-[600px] col-span-2 gap-0">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold">
          Treemap самых популярных акций по
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
            rootLevel: "Сегменты",
          }}
          grid={{
            bottom: isSafari ? 50 : 20,
          }}
          formatter={(params) => {
            return `
                  Cегмент: ${params.data.rfmName ? params.data.rfmName : "Все"}<br />
                  Группа: ${params.name.replace(/\[[^\]]*\]/g, "")}<br />
                  Прибыль: ${Math.round(params.value)
                    .toLocaleString()
                    .replace(/,/g, " ")}<br />
                `;
          }}
        />
      </div>
    </Card>
  );
};
