"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { PeriodFilter } from "./period-filter";
import { ButtonGroup, ButtonGroupItem } from "@shared/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { cn } from "@shared/lib/utils";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  Layers,
} from "lucide-react";
import type { Way } from "../api/types";
import type { CameraStoreItem } from "../api/types";

export interface AttendanceFiltersValue {
  way?: Way;
  idStore?: number;
  dateRange?: DateRange;
  sort?: "asc" | "desc";
}

interface AttendanceFiltersProps {
  value: AttendanceFiltersValue;
  onChange: (value: AttendanceFiltersValue) => void;
  /** Список магазинов для выпадающего списка (загружается с GET /camera/stores) */
  stores?: CameraStoreItem[];
  showSort?: boolean;
  className?: string;
}

const SORT_OPTIONS = [
  { value: "desc", label: "От новых к старым" },
  { value: "asc", label: "От старых к новым" },
] as const;

/** Непустое значение для «Все магазины» — Radix Select не допускает value="" */
const STORE_ALL_VALUE = "all";

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  value,
  onChange,
  stores,
  showSort = true,
  className,
}) => {
  const handleChange = (patch: Partial<AttendanceFiltersValue>) => {
    onChange({ ...value, ...patch });
  };

  const storeValue =
    value.idStore != null ? String(value.idStore) : STORE_ALL_VALUE;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-muted bg-background/60 p-4",
        className,
      )}
    >
      {/* Первая строка: направление и магазин */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Событие
          </span>
          <ButtonGroup
            value={value.way ?? "all"}
            onValueChange={(val) => handleChange({ way: val as Way })}
          >
            <ButtonGroupItem
              value="all"
              icon={<Layers className="size-4" />}
              label="Все"
            />
            <ButtonGroupItem
              value="in"
              icon={<ArrowDownToLine className="size-4" />}
              label="Вошли"
            />
            <ButtonGroupItem
              value="out"
              icon={<ArrowUpFromLine className="size-4" />}
              label="Вышли"
            />
            <ButtonGroupItem
              value="passing"
              icon={<ArrowRightLeft className="size-4" />}
              label="Прошли"
            />
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-2 min-w-[200px]">
          <span className="text-sm font-medium text-muted-foreground">
            Магазин
          </span>
          {stores === undefined ? (
            <div
              className={cn(
                "flex h-9 w-[280px] items-center justify-between gap-2 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-muted-foreground",
              )}
            >
              Загрузка...
            </div>
          ) : (
            <Select
              value={storeValue}
              onValueChange={(v) =>
                handleChange({
                  idStore: v === STORE_ALL_VALUE ? undefined : Number(v),
                })
              }
            >
              <SelectTrigger className="w-[280px] bg-muted/50 border-muted-foreground/20">
                <SelectValue placeholder="Все магазины" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={STORE_ALL_VALUE} key={STORE_ALL_VALUE}>
                  Все магазины
                </SelectItem>
                {stores?.map((s) => (
                  <SelectItem key={s.idStore} value={String(s.idStore)}>
                    {s.store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-[240px]">
        <span className="text-sm font-medium text-muted-foreground">
          Период
        </span>
        <PeriodFilter
          value={value.dateRange}
          onChange={(dateRange) => handleChange({ dateRange })}
        />
      </div>

      {showSort && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Сортировка событий
          </span>
          <Select
            value={value.sort}
            onValueChange={(v) => handleChange({ sort: v as "asc" | "desc" })}
          >
            <SelectTrigger className="w-[200px] bg-muted/50 border-muted-foreground/20">
              <SelectValue placeholder="Выберите порядок" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
