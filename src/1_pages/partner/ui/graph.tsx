import { useMemo } from "react";
import { X } from "lucide-react";
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
import { Badge } from "@shared/ui/badge";
import {
  PARTNER_GRAPH_GRANULARITY,
  PARTNER_GRAPH_METRICS,
  type GraphPartnerPoint,
  type PartnerGraphGranularity,
  type PartnerGraphMetric,
} from "../api/types";
import {
  PARTNER_GRAPH_METRIC_LABELS,
  PARTNER_DIMENSION_LABELS,
} from "../lib/labels";

type PartnerGraphProps = {
  data?: GraphPartnerPoint[];
  isLoading: boolean;
  granularity: PartnerGraphGranularity;
  metric: PartnerGraphMetric;
  rowFocusLabel?: string;
  rowFocusHint?: string;
  onGranularityChange: (g: PartnerGraphGranularity) => void;
  onMetricChange: (m: PartnerGraphMetric) => void;
  onClearRowFocus?: () => void;
};

export const PartnerGraph = ({
  data,
  isLoading,
  granularity,
  metric,
  rowFocusLabel,
  rowFocusHint,
  onGranularityChange,
  onMetricChange,
  onClearRowFocus,
}: PartnerGraphProps) => {
  const prepareLine = usePreparedStackedLine();

  const option = useMemo(() => {
    if (!data?.length) return null;

    const periods = data.map((d) => d.period);
    const current = data.map((d) => d.currentValue);
    const prevYear = data.map((d) => d.prevYearValue);

    return {
      title: { text: PARTNER_GRAPH_METRIC_LABELS[metric] ?? metric },
      legend: { data: ["Текущий период", "Прошлый год"] },
      xAxis: {
        type: "category" as const,
        data: periods,
        axisLabel: { rotate: periods.length > 12 ? 45 : 0 },
      },
      series: prepareLine([
        { name: "Текущий период", type: "line", data: current },
        { name: "Прошлый год", type: "line", data: prevYear },
      ]),
    };
  }, [data, metric, prepareLine]);

  return (
    <div className="flex flex-col gap-2 h-64 shrink-0">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={granularity}
          onValueChange={(v) =>
            onGranularityChange(v as PartnerGraphGranularity)
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Шаг по времени" />
          </SelectTrigger>
          <SelectContent>
            {PARTNER_GRAPH_GRANULARITY.map((g) => (
              <SelectItem key={g} value={g}>
                {PARTNER_DIMENSION_LABELS[g] ?? g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={metric}
          onValueChange={(v) => onMetricChange(v as PartnerGraphMetric)}
        >
          <SelectTrigger className="w-[240px] bg-background">
            <SelectValue placeholder="Метрика графика" />
          </SelectTrigger>
          <SelectContent>
            {PARTNER_GRAPH_METRICS.map((m) => (
              <SelectItem key={m} value={m}>
                {PARTNER_GRAPH_METRIC_LABELS[m]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
          <span className="text-xs text-muted-foreground">
            Весь отчёт по фильтру
          </span>
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
