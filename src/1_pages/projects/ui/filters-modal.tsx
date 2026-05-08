"use client";

import { useState } from "react";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Filter } from "lucide-react";
import type { ProjectsFilters } from "../api/types/requests";
import {
  PRIORITY_PROJECT_OPTIONS,
  STAGE_PROJECT_OPTIONS,
  type PriorityProject,
  type StageProject,
} from "../api/types/project-filters";
import { Label } from "@shared/ui/label";
import { Checkbox } from "@shared/ui/checkbox";
import { Input } from "@shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { DatePicker } from "@shared/ui/date-picker";
import { cn } from "@shared/lib/utils";
import { format, parse, parseISO } from "date-fns";
import { useGetPmName, useGetResponsibleName } from "../api/controller";

/** Только для фильтров: календарный день без сдвига −1 из‑за toISOString/UTC. */
function filterRangeDateFromApi(raw: string): Date {
  const trimmed = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return parse(trimmed, "yyyy-MM-dd", new Date());
  }
  const d = parseISO(trimmed);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function filterRangeDateToApi(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

const NONE = "__none__";

function countActiveFilters(f: ProjectsFilters): number {
  return (
    (f.stage?.length ?? 0) +
    (f.priority?.length ?? 0) +
    (f.quarterFilter ? 1 : 0) +
    (f.pm_name?.trim() ? 1 : 0) +
    (f.responsible_name?.trim() ? 1 : 0) +
    (f.start_date?.trim() ? 1 : 0) +
    (f.end_date?.trim() ? 1 : 0)
  );
}

function toggleInList<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

type FiltersModalProps = {
  value: ProjectsFilters;
  onApply: (next: ProjectsFilters) => void;
};

export const FiltersModal = ({ value, onApply }: FiltersModalProps) => {
  const [open, setOpen] = useState(false);
  const [stages, setStages] = useState<StageProject[]>([]);
  const [priorities, setPriorities] = useState<PriorityProject[]>([]);
  const [quarterYear, setQuarterYear] = useState("");
  const [quarter, setQuarter] = useState<string>("");
  const [pmName, setPmName] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [pmSelectOpen, setPmSelectOpen] = useState(false);
  const [responsibleSelectOpen, setResponsibleSelectOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: pmList = [] } = useGetPmName(pmSelectOpen);
  const { data: responsibleList = [] } = useGetResponsibleName(
    responsibleSelectOpen,
  );

  const openSync = (nextOpen: boolean) => {
    if (nextOpen) {
      setStages(value.stage ?? []);
      setPriorities(value.priority ?? []);
      setQuarterYear(
        value.quarterFilter ? String(value.quarterFilter.year) : "",
      );
      setQuarter(
        value.quarterFilter ? String(value.quarterFilter.quarter) : "",
      );
      setPmName(value.pm_name?.trim() ?? "");
      setResponsibleName(value.responsible_name?.trim() ?? "");
      setStartDate(
        value.start_date?.trim()
          ? filterRangeDateFromApi(value.start_date)
          : undefined,
      );
      setEndDate(
        value.end_date?.trim()
          ? filterRangeDateFromApi(value.end_date)
          : undefined,
      );
    }
    setOpen(nextOpen);
  };

  const handleApply = () => {
    const next: ProjectsFilters = {};
    if (value.sort) next.sort = value.sort;
    if (value.isActive !== undefined) next.isActive = value.isActive;

    if (stages.length) next.stage = stages;
    if (priorities.length) next.priority = priorities;

    const year = Number(quarterYear);
    const q = Number(quarter);
    if (
      quarterYear.trim() !== "" &&
      quarter !== "" &&
      Number.isInteger(year) &&
      year >= 1970 &&
      year <= 2100 &&
      [1, 2, 3, 4].includes(q)
    ) {
      next.quarterFilter = { year, quarter: q };
    }

    const pm = pmName.trim();
    const lead = responsibleName.trim();
    if (pm) next.pm_name = pm;
    if (lead) next.responsible_name = lead;

    if (startDate) next.start_date = filterRangeDateToApi(startDate);
    if (endDate) next.end_date = filterRangeDateToApi(endDate);
    onApply(next);
    setOpen(false);
  };

  const handleReset = () => {
    onApply({});
    setOpen(false);
  };

  const active = countActiveFilters(value);

  return (
    <Dialog open={open} onOpenChange={openSync}>
      <DialogTrigger asChild>
        <Button variant={active ? "default" : "secondary"} className="gap-2">
          <Filter className="size-4" />
          Фильтры
          {active > 0 ? (
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-medium",
                active
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "",
              )}
            >
              {active}
            </span>
          ) : null}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Фильтры</DialogTitle>
        </DialogHeader>
        <DialogBody className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="col-span-1 flex min-w-0 flex-col gap-6">
            <div className="space-y-3">
              <Label>Начальная дата</Label>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                placeholder="Выберите дату"
                className="bg-background w-full max-w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Проджект-менеджер</Label>
              <Select
                value={pmName ? pmName : NONE}
                onValueChange={(v) => setPmName(v === NONE ? "" : v)}
                onOpenChange={setPmSelectOpen}
              >
                <SelectTrigger className="bg-background w-full max-w-full">
                  <SelectValue placeholder="Не выбрано" />
                </SelectTrigger>
                <SelectContent className="max-h-66">
                  <SelectItem value={NONE}>Не выбрано</SelectItem>
                  {pmList.map((row) => (
                    <SelectItem key={row.pm_name} value={row.pm_name}>
                      {row.pm_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Этап проекта</Label>
              <div className="flex flex-col gap-2 rounded-md border border-border p-3">
                <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
                  {STAGE_PROJECT_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={stages.includes(opt.value)}
                        onCheckedChange={() =>
                          setStages((s) => toggleInList(s, opt.value))
                        }
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex min-w-0 flex-col gap-6">
            <div className="space-y-3">
              <Label>Конечная дата</Label>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                placeholder="Выберите дату"
                className="bg-background w-full max-w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Ответственный (лидер)</Label>
              <Select
                value={responsibleName ? responsibleName : NONE}
                onValueChange={(v) => setResponsibleName(v === NONE ? "" : v)}
                onOpenChange={setResponsibleSelectOpen}
              >
                <SelectTrigger className="bg-background w-full max-w-full">
                  <SelectValue placeholder="Не выбрано" />
                </SelectTrigger>
                <SelectContent className="max-h-66">
                  <SelectItem value={NONE}>Не выбрано</SelectItem>
                  {responsibleList.map((row) => (
                    <SelectItem
                      key={row.responsible_name}
                      value={row.responsible_name}
                    >
                      {row.responsible_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Приоритет</Label>
              <div className="flex flex-col gap-2 rounded-md border border-border p-3">
                {PRIORITY_PROJECT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <Checkbox
                      checked={priorities.includes(opt.value)}
                      onCheckedChange={() =>
                        setPriorities((p) => toggleInList(p, opt.value))
                      }
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="mb-1">Календарный квартал</Label>
              <p className="text-xs text-muted-foreground max-w-md mb-1">
                Укажите год и квартал или оставьте пустым, если фильтр не нужен.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Input
                  type="number"
                  min={1970}
                  max={2100}
                  placeholder="Год"
                  className="bg-background w-[120px]"
                  value={quarterYear}
                  onChange={(e) => setQuarterYear(e.target.value)}
                />
                <Select value={quarter || undefined} onValueChange={setQuarter}>
                  <SelectTrigger className="bg-background w-[160px]">
                    <SelectValue placeholder="Квартал" />
                  </SelectTrigger>
                  <SelectContent side="top" sideOffset={4}>
                    <SelectItem value="1">I квартал</SelectItem>
                    <SelectItem value="2">II квартал</SelectItem>
                    <SelectItem value="3">III квартал</SelectItem>
                    <SelectItem value="4">IV квартал</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="gap-2 sm:justify-between">
          <Button type="button" variant="ghost" onClick={handleReset}>
            Сбросить
          </Button>
          <Button type="button" onClick={handleApply}>
            Применить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
