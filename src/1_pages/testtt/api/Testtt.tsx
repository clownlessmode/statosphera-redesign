import { useEffect, useRef, useState } from "react";

import { Header } from "@widgets/header";

import { Card, CardContent, CardHeader } from "@shared/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

import Spinner from "@shared/ui/spinner";

import { useGetTesttt, useGetTestttStores } from "./controller";

const formatDoorTime = (iso: string) => {
  if (!iso) return "";

  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",

      month: "2-digit",

      year: "numeric",

      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",
    });
  } catch {
    return iso;
  }
};

export const Testtt = () => {
  const [idStore, setIdStore] = useState<number | undefined>();

  const { data: stores, isPending: isStoresPending } = useGetTestttStores();

  const {
    data,

    isPending,

    hasNextPage,

    isFetchingNextPage,

    fetchNextPage,
  } = useGetTesttt(
    { id_store: idStore ?? 0 },

    { enabled: idStore != null },
  );

  const rows = data?.pages.flat() ?? [];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage || isFetchingNextPage) return;

    const root = scrollContainerRef.current;

    const target = sentinelRef.current;

    if (!root || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },

      { root, rootMargin: "120px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Тест" />

      <div className="rounded-3xl px-4 py-4 flex flex-col gap-3 flex-1 min-h-0 bg-background">
        <div className="shrink-0 flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">Магазин</label>

          {isStoresPending ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner />
              Загрузка списка магазинов...
            </div>
          ) : (
            <Select
              value={idStore !== undefined ? String(idStore) : undefined}
              onValueChange={(v) => setIdStore(Number(v))}
            >
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Выберите магазин" />
              </SelectTrigger>

              <SelectContent>
                {stores?.map((store) => (
                  <SelectItem
                    key={store.id_store}
                    value={String(store.id_store)}
                  >
                    {store.store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-border/60 bg-muted/30 p-3"
        >
          {!idStore && (
            <p className="text-sm text-muted-foreground">
              Выберите магазин, чтобы загрузить данные.
            </p>
          )}

          {idStore && isPending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner />
              Загрузка...
            </div>
          )}

          {idStore && !isPending && rows.length === 0 && (
            <p className="text-sm text-muted-foreground">Записей не найдено.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start auto-rows-max">
            {rows.map((row) => (
              <Card
                key={`${row.card_number}-${row.time_open_door}`}
                className="overflow-hidden border-border/80 shadow-sm"
              >
                <CardHeader className="space-y-2 pb-3">
                  <p className="font-mono text-[20px]">
                    Номер карты: {row.card_number}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 pt-0">
                  <span
                    className={
                      row.status
                        ? "inline-flex w-fit rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-sm font-medium text-emerald-800 dark:text-emerald-200"
                        : "inline-flex w-fit rounded-md border border-border bg-muted/80 px-2.5 py-1.5 text-sm font-medium text-foreground"
                    }
                  >
                    {row.status ? "Дверь открыта" : "Дверь не открыта"}
                  </span>

                  <div className="rounded-md bg-background/80 px-3 py-2.5 ring-1 ring-border/60">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Время
                    </p>

                    <p className="mt-1 text-base font-semibold tabular-nums tracking-tight text-foreground">
                      {formatDoorTime(row.time_open_door)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {hasNextPage && idStore && <div ref={sentinelRef} className="h-4" />}

          {isFetchingNextPage && (
            <div className="flex justify-center py-3 text-sm text-muted-foreground">
              Загружаем ещё...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
