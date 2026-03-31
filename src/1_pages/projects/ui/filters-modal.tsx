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
import { cn } from "@shared/lib/utils";

function countActiveFilters(f: ProjectsFilters): number {
  return (
    (f.stage?.length ?? 0) +
    (f.priority?.length ?? 0) +
    (f.quarterFilter ? 1 : 0)
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Фильтры</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-6">
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
            <Label>Календарный квартал</Label>
            <p className="text-xs text-muted-foreground">
              Укажите год и квартал или оставьте пустым, если фильтр не нужен.
            </p>
            <div className="flex flex-wrap gap-2">
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
                <SelectContent>
                  <SelectItem value="1">I квартал</SelectItem>
                  <SelectItem value="2">II квартал</SelectItem>
                  <SelectItem value="3">III квартал</SelectItem>
                  <SelectItem value="4">IV квартал</SelectItem>
                </SelectContent>
              </Select>
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
