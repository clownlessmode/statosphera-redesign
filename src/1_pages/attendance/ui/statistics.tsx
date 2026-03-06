import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Skeleton } from "@shared/ui/skeleton";
import { FilterIcon } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { AttendanceFilters } from "./filters";
import type { AttendanceFiltersValue } from "./filters";
import type {
  CameraStatsRequest,
  CameraStatsResponse,
  CameraStoreItem,
} from "../api/types";

const formatTimeHuman = (iso: string) =>
  format(new Date(iso), "d MMM yyyy, HH:mm", { locale: ru });

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

interface SummaryStatProps {
  label: string;
  value: string | number;
}

const SummaryStat = ({ label, value }: SummaryStatProps) => (
  <div className="rounded-lg border border-muted bg-muted/40 p-3 flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-lg font-semibold">{value}</span>
  </div>
);

export interface StatisticsProps {
  filters: AttendanceFiltersValue;
  onFiltersChange: (value: AttendanceFiltersValue) => void;
  showFilters: boolean;
  onShowFiltersChange: (value: boolean) => void;
  stores: CameraStoreItem[] | undefined;
  statsParams: CameraStatsRequest | undefined;
  statsData: CameraStatsResponse | undefined;
  statsLoading: boolean;
}

export const Statistics = ({
  filters,
  onFiltersChange,
  showFilters,
  onShowFiltersChange,
  stores,
  statsParams,
  statsData,
  statsLoading,
}: StatisticsProps) => {
  return (
    <Card className="w-full gap-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle>Статистика по магазинам</CardTitle>
        </div>
        <CardAction className="row-span-1 self-center">
          <Button
            variant={showFilters ? "outline" : "secondary"}
            size="sm"
            onClick={() => onShowFiltersChange(!showFilters)}
          >
            <FilterIcon className="mr-1 size-4" />
            {showFilters ? "Скрыть фильтр" : "Фильтр"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-4 space-y-4">
        {showFilters && (
          <AttendanceFilters
            value={filters}
            onChange={onFiltersChange}
            stores={stores}
            showSort={false}
          />
        )}

        {!statsParams && (
          <p className="text-sm text-muted-foreground">
            Задай период и при необходимости магазин или направление, чтобы
            увидеть статистику по камерам.
          </p>
        )}

        {statsParams && statsLoading && (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {statsParams && statsData && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <SummaryStat
                label="Всего событий"
                value={statsData.reduce((acc, row) => acc + row.count, 0)}
              />
              <SummaryStat
                label="Уникальных магазинов"
                value={new Set(statsData.map((row) => row.idStore)).size}
              />
              <SummaryStat label="Событие" value={wayLabel(statsParams.way)} />
            </div>

            <div className="max-h-[200px] overflow-y-auto rounded-md border border-muted">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Магазин</TableHead>
                    <TableHead>Событие</TableHead>
                    <TableHead>Событий</TableHead>
                    <TableHead>Первое</TableHead>
                    <TableHead>Последнее</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statsData.map((row) => (
                    <TableRow key={`${row.idStore}-${row.way}`}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {row.storeName || `ID ${row.idStore}`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            row.way === "in"
                              ? "bg-green-600 text-white"
                              : row.way === "passing"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-600 text-white",
                          )}
                        >
                          {wayLabel(row.way)}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatTimeHuman(row.firstTime)}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatTimeHuman(row.lastTime)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
