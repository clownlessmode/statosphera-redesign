import { TreemapRfmOrderDeliveryResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { TreemapChart } from "@shared/ui/treemap-chart";
import { FC } from "react";

interface Props {
  graph: TreemapRfmOrderDeliveryResponse;
  isLoading: boolean;
}

export const TreemapRfmOrderDelivery: FC<Props> = ({ graph, isLoading }) => {
  const isSafari = useSafari();

  if (isLoading || graph?.childrenProceed.length === 0) {
    return <StackedLineSkeleton className="h-[600px] col-span-2" />;
  }

  return (
    <Card className="h-[600px] col-span-2 gap-0">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold">
          Treemap самых популярных способов заказа и доставки
        </CardTitle>
      </CardHeader>
      <div style={{ height: 600, width: "100%" }}>
        <TreemapChart
          series={{
            data: graph.childrenProceed,
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
