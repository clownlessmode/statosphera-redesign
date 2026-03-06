import { useMemo, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { useCameraGraph } from "../api/controller";
import type { CameraGraphRequest, CameraStatsRequest } from "../api/types";

const GROUP_BY_OPTIONS: {
  value: CameraGraphRequest["groupBy"];
  label: string;
}[] = [
  { value: "hour", label: "По часу" },
  { value: "day", label: "По дню" },
  { value: "week", label: "По неделе" },
  { value: "month", label: "По месяцу" },
  { value: "year", label: "По году" },
];

export interface GraphProps {
  statsParams: CameraStatsRequest | undefined;
}

export const Graph = ({ statsParams }: GraphProps) => {
  const [groupBy, setGroupBy] =
    useState<CameraGraphRequest["groupBy"]>("month");

  const wayLabel = (way: string | undefined) => {
    switch (way) {
      case "all":
        return "Все";
      case "in":
        return "Вошли";
      case "out":
        return "Вышли";
      case "passing":
        return "Прошли";
      default:
        return "Все";
    }
  };

  const graphParams: CameraGraphRequest | undefined = useMemo(
    () => (statsParams ? { ...statsParams, groupBy } : undefined),
    [statsParams, groupBy],
  );

  const prepareLine = usePreparedStackedLine();
  const graphQuery = useCameraGraph(graphParams);

  const option = useMemo(() => {
    const data = graphQuery.data;
    if (!data || data.length === 0) return null;

    const periods = data.map((d) => d.period);
    const counts = data.map((d) => d.count);

    const series = prepareLine([
      {
        name: statsParams?.way ?? "События",
        type: "line",
        data: counts,
      },
    ]);

    return {
      grid: {
        top: 20,
        left: 12,
        right: 12,
        bottom: 20,
        containLabel: true,
      },
      legend: { show: false },
      tooltip: {
        trigger: "axis",
        formatter: (params: unknown) => {
          const items = Array.isArray(params) ? params : [params];
          const first = items[0] as
            | { axisValue?: string; value?: unknown }
            | undefined;
          const label = first?.axisValue ?? "";
          const value = Array.isArray(first?.value)
            ? first.value[1]
            : first?.value;
          const num = typeof value === "number" ? value : Number(value);
          return `<strong>${label}</strong><br/>${wayLabel(statsParams?.way)}: ${Number.isNaN(num) ? "—" : num.toLocaleString("ru-RU")}`;
        },
      },
      xAxis: {
        type: "category",
        data: periods,
        axisLabel: { rotate: periods.length > 12 ? 45 : 0 },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { opacity: 0.2 } },
      },
      series,
    };
  }, [graphQuery.data, prepareLine]);

  if (!statsParams) {
    return (
      <Card className="w-full h-full min-h-[300px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-base">График по периоду</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Задай период в фильтрах выше, чтобы увидеть график.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (graphQuery.isLoading) {
    return (
      <Card className="w-full h-full min-h-[300px]">
        <CardHeader>
          <CardTitle className="text-base">График по периоду</CardTitle>
        </CardHeader>
        <CardContent>
          <StackedLineSkeleton className="min-h-[260px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full min-h-[300px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-base">График по периоду</CardTitle>
        <CardAction className="self-center">
          <div className="flex flex-row items-center gap-2">
            <p className="text-[14px] font-light">Группировка: </p>
            <Select
              value={groupBy}
              onValueChange={(v) =>
                setGroupBy(v as CameraGraphRequest["groupBy"])
              }
            >
              <SelectTrigger
                size="sm"
                className="text-[14px] font-light bg-muted/50 border-muted-foreground/20"
              >
                <SelectValue placeholder="Группировка" />
              </SelectTrigger>
              <SelectContent>
                {GROUP_BY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pt-0">
        {option ? (
          <StackedLine
            option={option}
            style={{ height: "100%", minHeight: 240 }}
            className="border-0 shadow-none"
          />
        ) : (
          <div className="flex items-center justify-center h-[240px]">
            <p className="text-sm text-muted-foreground">
              Нет данных за выбранный период
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
