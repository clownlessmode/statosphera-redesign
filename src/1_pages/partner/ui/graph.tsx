import { useMemo } from "react";
import { X } from "lucide-react";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Badge } from "@shared/ui/badge";
import {
  type GraphPartnerPoint,
  type PartnerGraphGranularity,
  type PartnerGraphMetric,
} from "../api/types";
import { PARTNER_GRAPH_METRIC_LABELS } from "../lib/labels";

type PartnerGraphProps = {
  data?: GraphPartnerPoint[];
  isLoading: boolean;
  granularity: PartnerGraphGranularity;
  metric: PartnerGraphMetric;
  rowFocusLabel?: string;
  rowFocusHint?: string;
  onMetricChange: (m: PartnerGraphMetric) => void;
  onClearRowFocus?: () => void;
};

const toGraphSeries = (data: GraphPartnerPoint[]) => [
  {
    name: "Выбранный период",
    type: "line" as const,
    encode: { x: 0, y: 1 },
    data: data.map((d) => [d.period, d.currentValue] as [string, number]),
  },
  {
    name: "Прошлый год",
    type: "line" as const,
    encode: { x: 0, y: 1 },
    data: data.map((d) => [d.period, d.prevYearValue] as [string, number]),
  },
];

export const PartnerGraph = ({
  data,
  isLoading,
  granularity,
  metric,
  rowFocusLabel,
  rowFocusHint,
  onClearRowFocus,
}: PartnerGraphProps) => {
  const prepareLine = usePreparedStackedLine();

  const option = useMemo(() => {
    if (!data?.length) return null;

    const graphSeries = toGraphSeries(data);

    return {
      title: { text: PARTNER_GRAPH_METRIC_LABELS[metric] ?? metric },
      legend: { data: ["Выбранный период", "Прошлый год"] },
      groupType: granularity,
      series: prepareLine(
        graphSeries,
        granularity === "month" && !isLoading
          ? {
              firstLineStyle: { width: 4, type: "solid" },
              secondLineStyle: { width: 3, type: "dashed" },
              thirdLineStyle: { width: 4, type: "solid" },
              fourthLineStyle: { width: 3, type: "dashed" },
            }
          : {},
      ),
    };
  }, [data, metric, granularity, isLoading, prepareLine]);

  return (
    <div className="flex flex-col gap-2 h-64 shrink-0">
      <div className="flex flex-wrap items-center gap-2">
        {rowFocusLabel ? (
          <Badge variant="secondary" className="gap-1 max-w-full truncate">
            Срез: {rowFocusLabel}
            {onClearRowFocus && (
              <button
                type="button"
                className="ml-1 rounded-sm hover:bg-muted"
                onClick={onClearRowFocus}
                aria-label="Сбросить срез"
              >
                <X className="size-3" />
              </button>
            )}
          </Badge>
        ) : (
          <></>
        )}
      </div>

      {rowFocusHint && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          {rowFocusHint}
        </p>
      )}

      <div className="flex-1 min-h-0">
        {isLoading ? (
          <StackedLineSkeleton />
        ) : option ? (
          <StackedLine option={option} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 text-sm text-muted-foreground text-center px-4">
            Нажмите «Получить отчёт» или кликните по строке таблицы для среза
          </div>
        )}
      </div>
    </div>
  );
};
