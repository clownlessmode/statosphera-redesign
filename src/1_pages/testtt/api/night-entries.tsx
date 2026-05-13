import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { Header } from "@widgets/header";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table";

import Spinner from "@shared/ui/spinner";

import { useGetNightEntries, useGetNightStores } from "./controller";

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
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [cardNumberInput, setCardNumberInput] = useState<string>("");
  const [appliedCardNumber, setAppliedCardNumber] = useState<
    number | undefined
  >();

  const { data: stores, isPending: isStoresPending } = useGetNightStores();

  const idStore = selectedStore === "all" ? undefined : Number(selectedStore);
  const isCardNumberLengthValid =
    cardNumberInput.length === 0 || cardNumberInput.length >= 9;

  const applyCardFilter = () => {
    const trimmed = cardNumberInput.trim();
    if (!trimmed) {
      setAppliedCardNumber(undefined);
      return;
    }
    if (trimmed.length < 9) return;

    setAppliedCardNumber(Number(trimmed));
  };

  const {
    data,

    isPending,

    hasNextPage,

    isFetchingNextPage,

    fetchNextPage,
  } = useGetNightEntries({
    id_store: idStore,
    card_number: appliedCardNumber,
  });

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
      <Header title="Ночные посещения" />

      <div className="rounded-3xl px-4 py-4 flex flex-col gap-3 flex-1 min-h-0 bg-background">
        <div className="shrink-0 flex flex-col gap-2 md:flex-row md:items-end">
          <div className="flex flex-col gap-2 w-full max-w-md">
            <label className="text-sm text-muted-foreground">Магазин</label>

            {isStoresPending ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner />
                Загрузка списка магазинов...
              </div>
            ) : (
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Все магазины" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">Все магазины</SelectItem>
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

          <div className="flex flex-col gap-2 w-full max-w-md">
            <label className="text-sm text-muted-foreground">
              Номер карты
              <span className="ml-2 text-xs text-muted-foreground">
                (минимум 9 цифр, максимум 13)
              </span>
            </label>
            <div className="flex items-center gap-2">
              <Input
                value={cardNumberInput}
                onChange={(e) =>
                  setCardNumberInput(
                    e.target.value.replace(/\D/g, "").slice(0, 13),
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applyCardFilter();
                  }
                }}
                inputMode="numeric"
                minLength={9}
                maxLength={13}
                placeholder="Введите номер карты"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={applyCardFilter}
                disabled={!isCardNumberLengthValid}
              >
                <Check className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-border/60 bg-muted/30 p-3"
        >
          {isPending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner />
              Загрузка...
            </div>
          )}

          {!isPending && rows.length === 0 && (
            <p className="text-sm text-muted-foreground">Записей не найдено.</p>
          )}

          {rows.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[80px]">#</TableHead> */}
                  <TableHead>Магазин</TableHead>
                  <TableHead>Номер карты</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Время</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={`${row.card_number}-${row.time_open_door}-${index}`}
                  >
                    {/* <TableCell>{index + 1}</TableCell> */}
                    <TableCell>{row.store_name}</TableCell>
                    <TableCell className="font-mono">
                      {row.card_number}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          row.status
                            ? "inline-flex w-fit rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200"
                            : "inline-flex w-fit rounded-md border border-red-600/30 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-foreground"
                        }
                      >
                        {row.status ? "Пропущен" : "Не пропущен"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDoorTime(row.time_open_door)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {hasNextPage && <div ref={sentinelRef} className="h-4" />}

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
