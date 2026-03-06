import { useEffect, useMemo, useRef, useState } from "react";
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
import { Skeleton } from "@shared/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { cn } from "@shared/lib/utils";
import { useCameraEventsInfinite } from "../api/controller";
import type { CameraEventsRequest } from "../api/types";

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
      return "Неизвестно";
  }
};

export interface EventsProps {
  eventsBaseParams: Omit<CameraEventsRequest, "pagination"> | undefined;
  sort: "asc" | "desc";
  onSortChange: (sort: "asc" | "desc") => void;
}

export const Events = ({
  eventsBaseParams,
  sort,
  onSortChange,
}: EventsProps) => {
  const loadMoreRef = useRef<HTMLTableRowElement | null>(null);
  const [eventsScrollRoot, setEventsScrollRoot] =
    useState<HTMLDivElement | null>(null);

  const eventsQuery = useCameraEventsInfinite(eventsBaseParams);

  const eventsList = useMemo(
    () => eventsQuery.data?.pages.flat() ?? [],
    [eventsQuery.data],
  );

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    const root = eventsScrollRoot;
    if (
      !sentinel ||
      !root ||
      !eventsQuery.hasNextPage ||
      eventsQuery.isFetchingNextPage
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) eventsQuery.fetchNextPage();
      },
      { root, rootMargin: "100px", threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    eventsScrollRoot,
    eventsQuery.hasNextPage,
    eventsQuery.isFetchingNextPage,
    eventsQuery.fetchNextPage,
  ]);

  return (
    <Card className="w-full flex-1 gap-2">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle>События по камерам</CardTitle>
        </div>
        <CardAction className="row-span-1 self-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Сортировка</span>
            <Select
              value={sort}
              onValueChange={(value) => onSortChange(value as "asc" | "desc")}
            >
              <SelectTrigger className="w-[190px] bg-muted/50 border-muted-foreground/20">
                <SelectValue placeholder="Выберите порядок" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">От новых к старым</SelectItem>
                <SelectItem value="asc">От старых к новым</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-4">
        {!eventsBaseParams && (
          <p className="text-sm text-muted-foreground">
            Задай период в фильтрах выше, чтобы увидеть список событий.
          </p>
        )}
        {eventsBaseParams && eventsQuery.isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        )}
        {eventsBaseParams &&
          (eventsList.length > 0 || eventsQuery.isLoading) && (
            <div
              ref={setEventsScrollRoot}
              className="max-h-[480px] overflow-y-auto rounded-lg border border-muted"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Время</TableHead>
                    <TableHead>Магазин</TableHead>
                    <TableHead>Событие</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsList.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-sm font-light">
                        {formatTimeHuman(event.createAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{event.storeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            event.way === "in"
                              ? "bg-green-600 text-white"
                              : event.way === "passing"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-600 text-white",
                          )}
                        >
                          {wayLabel(event.way)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {eventsQuery.hasNextPage && (
                    <TableRow ref={loadMoreRef}>
                      <TableCell
                        colSpan={3}
                        className="h-12 text-center text-muted-foreground text-sm"
                      >
                        {eventsQuery.isFetchingNextPage
                          ? "Загрузка…"
                          : "\u00a0"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
      </CardContent>
    </Card>
  );
};
