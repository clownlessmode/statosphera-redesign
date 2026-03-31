import ReactEcharts from "echarts-for-react";
import type {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import type { EChartsOption } from "echarts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useMemo } from "react";
import { useGetGraph } from "../api/controller";
import type { Graph } from "../api/types/response";

const PRIORITY_COLOR: Record<string, string> = {
  Высокий: "#dc2626",
  Средний: "#ca8a04",
  Низкий: "#16a34a",
};

/** Дата начала полосы (начало календарного дня). */
const dayStartMs = (iso: string) =>
  new Date(iso.length > 10 ? iso : `${iso}T00:00:00`).getTime();

/** Конец календарного дня окончания (полоса включает день end_date). */
const dayEndMs = (iso: string) =>
  new Date(iso.length > 10 ? iso : `${iso}T23:59:59.999`).getTime();

const dataTimeBounds = (rows: Graph[]) => {
  let minT = Infinity;
  let maxT = -Infinity;
  for (const p of rows) {
    const a = dayStartMs(p.start_date);
    const b = dayEndMs(p.end_date);
    minT = Math.min(minT, a);
    maxT = Math.max(maxT, b);
  }
  return { minT, maxT };
};

/** Нормализация приоритета с бэка (регистр, пробелы, латиница). */
const getPriorityColor = (proj: Graph | undefined): string => {
  if (!proj) return "#6b7280";
  const raw = proj.priority?.trim();
  if (!raw) return "#6b7280";

  if (PRIORITY_COLOR[raw]) return PRIORITY_COLOR[raw];

  const k = raw.toLowerCase();
  if (k.includes("высок") || k === "high") return PRIORITY_COLOR.Высокий;
  if (k.includes("средн") || k === "medium") return PRIORITY_COLOR.Средний;
  if (k.includes("низк") || k === "low") return PRIORITY_COLOR.Низкий;

  return "#6b7280";
};

type GanttDatum = {
  value: [number, number, number];
  project: Graph;
};

/** Цвет из порядка строк — в custom-серии `params.data` не всегда содержит itemStyle. */
const createRenderGanttItem = (ordered: Graph[]) => {
  return (
    params: CustomSeriesRenderItemParams,
    api: CustomSeriesRenderItemAPI,
  ) => {
    const categoryIndex = api.value(0) as number;
    const start = api.coord([api.value(1), categoryIndex]);
    const end = api.coord([api.value(2), categoryIndex]);
    const band = typeof api.size === "function" ? api.size([0, 1]) : undefined;
    const bandH = Array.isArray(band) ? band[1] : 0;
    const height = bandH * 0.55;

    if (!start || !end || height <= 0) {
      return;
    }

    const idx =
      typeof params.dataIndex === "number"
        ? params.dataIndex
        : (categoryIndex ?? 0);
    const fill = getPriorityColor(ordered[idx]);

    return {
      type: "rect" as const,
      shape: {
        x: start[0],
        y: start[1] - height / 2,
        width: Math.max(end[0] - start[0], 2),
        height,
      },
      style: {
        fill,
        opacity: 0.92,
      },
    };
  };
};

const Y_SCROLL_THRESHOLD = 12;

const buildOption = (
  rows: Graph[],
  xMin: number,
  xMax: number,
): EChartsOption => {
  const sorted = [...rows].sort(
    (a, b) => dayStartMs(a.start_date) - dayStartMs(b.start_date),
  );
  const categories = sorted.map((p) => p.name);
  const seriesData: GanttDatum[] = sorted.map((p, index) => ({
    value: [index, dayStartMs(p.start_date), dayEndMs(p.end_date)],
    project: p,
  }));

  const showYZoom = sorted.length > Y_SCROLL_THRESHOLD;

  return {
    tooltip: {
      trigger: "item",
      enterable: true,
      confine: true,
      formatter: (params) => {
        if (!params || typeof params !== "object" || !("data" in params)) {
          return "";
        }
        const datum = params.data as GanttDatum;
        const proj = datum?.project;
        if (!proj) return "";
        const title = proj.name.replace(/</g, "&lt;");
        return [
          `<div style="font-weight:600;max-width:280px">${title}</div>`,
          `Этап: ${proj.stage}`,
          `Приоритет: ${proj.priority ?? "—"}`,
          `Начало: ${proj.start_date.split("T")[0]}`,
          `Окончание: ${proj.end_date.split("T")[0]}`,
        ].join("<br/>");
      },
    },
    dataZoom: [
      { type: "inside", xAxisIndex: [0, 1], filterMode: "weakFilter" },
      {
        type: "slider",
        xAxisIndex: [0, 1],
        height: 22,
        bottom: showYZoom ? 32 : 8,
        filterMode: "weakFilter",
      },
      ...(showYZoom
        ? ([
            {
              type: "slider" as const,
              yAxisIndex: 0,
              width: 22,
              right: 8,
              top: 52,
              bottom: 100,
              showDetail: false,
              filterMode: "weakFilter" as const,
            },
          ] as const)
        : []),
    ],
    grid: {
      left: 12,
      right: showYZoom ? 40 : 20,
      top: 48,
      bottom: showYZoom ? 100 : 56,
      containLabel: true,
    },
    xAxis: [
      {
        type: "time",
        gridIndex: 0,
        position: "top",
        min: xMin,
        max: xMax,
        axisLabel: {
          showMinLabel: true,
          showMaxLabel: true,
          formatter: (value: number) =>
            format(value, "LLLL yyyy", { locale: ru }),
        },
        splitLine: {
          show: true,
          lineStyle: { type: "dashed", opacity: 0.35 },
        },
      },
      {
        type: "time",
        gridIndex: 0,
        position: "bottom",
        min: xMin,
        max: xMax,
        axisLabel: {
          formatter: (value: number) => format(value, "d MMM", { locale: ru }),
        },
      },
    ],
    yAxis: {
      type: "category",
      data: categories,
      inverse: true,
      axisLabel: {
        width: 220,
        overflow: "truncate",
        margin: 10,
      },
    },
    series: [
      {
        type: "custom",
        xAxisIndex: 0,
        yAxisIndex: 0,
        clip: true,
        renderItem: createRenderGanttItem(sorted),
        encode: { x: [1, 2], y: 0 },
        data: seriesData,
      },
    ],
  };
};

export const GraphProjects = () => {
  const { data, isPending, isError } = useGetGraph();

  const { xMin, xMax } = useMemo(() => {
    if (!data?.length) {
      return { xMin: 0, xMax: 0 };
    }
    const { minT, maxT } = dataTimeBounds(data);
    const pad = (maxT - minT) * 0.02 || 86_400_000;
    return {
      xMin: minT - pad,
      xMax: maxT + pad,
    };
  }, [data]);

  const option = useMemo(
    () => (data?.length ? buildOption(data, xMin, xMax) : null),
    [data, xMin, xMax],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 w-full">
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground shrink-0">
        <span className="font-medium text-foreground">Приоритет:</span>
        {(
          [
            ["Высокий", PRIORITY_COLOR.Высокий],
            ["Средний", PRIORITY_COLOR.Средний],
            ["Низкий", PRIORITY_COLOR.Низкий],
          ] as const
        ).map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block size-2.5 rounded-sm bg-muted-foreground/50"
            aria-hidden
          />
          не указан / другое
        </span>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">Загрузка графика…</p>
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-destructive">
            Не удалось загрузить данные графика.
          </p>
        </div>
      )}
      {!isPending && !isError && !option && (
        <p className="text-sm text-muted-foreground">
          Нет проектов для диаграммы.
        </p>
      )}
      {option && (
        <div className="flex-1 min-h-0 w-full rounded-2xl border bg-card overflow-hidden">
          <ReactEcharts
            option={option}
            style={{ height: "100%", width: "100%" }}
            notMerge
            lazyUpdate
            opts={{ renderer: "canvas" }}
          />
        </div>
      )}
    </div>
  );
};
