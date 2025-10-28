import { TreemapTopGroupProductResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { TreemapChart } from "@shared/ui/treemap-chart";
import { Button } from "@shared/ui/button";
import { FC, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";

interface Props {
  graph: TreemapTopGroupProductResponse;
  isLoading: boolean;
}

export const TreemapTopGroupProduct: FC<Props> = ({ graph, isLoading }) => {
  const [value, setValue] = useState<
    typeof graph.childrenProceed | undefined
  >();
  const [visible, setVisible] = useState(true);
  let timer: NodeJS.Timeout;
  const isSafari = useSafari();

  useEffect(() => {
    if (graph && graph.childrenProceed) {
      setValue(graph.childrenProceed);
    }
  }, [graph]);

  if (
    isLoading ||
    !value ||
    graph?.childrenProceed.length === 0 ||
    graph?.childrenProfit.length === 0 ||
    graph.childrenCount.length === 0
  ) {
    return <StackedLineSkeleton className="h-[600px] col-span-2" />;
  }

  const options = [
    {
      label: "по выручке",
      value: graph.childrenProceed,
    },
    {
      label: "по прибыли",
      value: graph.childrenProfit,
    },
    {
      label: "по количеству чеков",
      value: graph.childrenCount,
    },
  ];

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Card className="h-[600px] col-span-2 gap-0">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold">
          Самые популярные группы продуктов
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-1.5 text-lg font-semibold" variant="outline">
              {selectedLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>График</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {options.map((option) => (
              <DropdownMenuItem
                onClick={() => setValue(option.value)}
                key={option.label}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        onMouseEnter={() => {
          timer = setTimeout(() => setVisible(false), 500); // исчезает через 500vc
        }}
        onMouseLeave={() => {
          clearTimeout(timer);
          setVisible(true); // возвращается, если ушёл раньше
        }}
        className="h-full w-full relative"
      >
        {/*Обертка что не мешать скроллу страницы*/}
        {visible && <div className="absolute inset-0 z-100" />}
        <TreemapChart
          series={{
            data: value,
            rootLevel: "Сегменты",
          }}
          grid={{
            bottom: isSafari ? 50 : 20,
          }}
          formatter={(params) => {
            return `
                  Cегмент: ${params.data.rfmName ? params.data.rfmName : "Все"}<br />
                  Группа: ${params.name}<br />
                  Прибыль: ${Math.round(params.value)
                    .toLocaleString()
                    .replace(/,/g, " ")}<br />
                `;
          }}
        />
      </CardContent>
    </Card>
  );
};
