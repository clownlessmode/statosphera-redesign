import { AllStackedGistogramResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardHeader, CardTitle } from "@shared/ui/card";
import { FC, useState } from "react";
import { Button } from "@shared/ui/button";
import { StackedBarChart } from "@shared/ui/graphs/stacked-bars/stacked-bars";

interface Props {
  graph: AllStackedGistogramResponse;
  isLoading: boolean;
}

export const AllStackedGistogram: FC<Props> = ({ graph, isLoading }) => {
  const [sexGistogram, setSexGistogram] = useState(true);

  if (
    isLoading ||
    graph.sexGistogram.series.length === 0 ||
    graph.ageGistogram.series.length === 0
  ) {
    return <StackedLineSkeleton className="h-[400px] col-span-2" />;
  }

  return (
    <Card className="h-[400px] col-span-2">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold">
          График по
        </CardTitle>
        <Button
          variant="outline"
          className="w-max text-lg font-semibold px-1.5"
          onClick={() => setSexGistogram(!sexGistogram)}
        >
          {sexGistogram ? "полу" : "возрасту"}
        </Button>
      </CardHeader>
      <div className="px-4" style={{ height: 400, width: "100%" }}>
        <StackedBarChart
          xAxis={
            sexGistogram
              ? graph.sexGistogram.segments
              : graph.ageGistogram.segments
          }
          series={
            sexGistogram ? graph.sexGistogram.series : graph.ageGistogram.series
          }
          labelData={{
            show: false,
          }}
        />
      </div>
    </Card>
  );
};
