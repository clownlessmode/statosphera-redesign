import { useState, useMemo } from "react";
import { Header } from "@widgets/header";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Card } from "@shared/ui/card";
import {
  Search,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  Clock,
  Inbox,
  Filter,
  X,
} from "lucide-react";
import { useFarmer } from "@entities/farmer";
import { ApplicationCard } from "./application-card";
import { ApplicationsSkeleton } from "./applications-skeleton";
import { getStage } from "../config/stage-flow";
import { cn } from "@shared/lib/utils";

type FilterTab = "all" | "action_required" | "in_progress" | "completed";

export const FarmerApplications = () => {
  const { applications, isApplicationsLoading } = useFarmer();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");

  const stats = useMemo(() => {
    const list = applications ?? [];
    let actionRequired = 0;
    let inProgress = 0;
    let completed = 0;

    list.forEach((app) => {
      const category = getStage(app.stageKey, app.stageId)?.category;
      if (category === "action_required") actionRequired++;
      else if (category === "success" || category === "fail") completed++;
      else if (category === "in_progress") inProgress++;
    });

    return {
      all: list.length,
      action_required: actionRequired,
      in_progress: inProgress,
      completed,
    } satisfies Record<FilterTab, number>;
  }, [applications]);

  const availableStages = useMemo(() => {
    const map = new Map<string, string>();
    (applications ?? []).forEach((app) => {
      if (app.stageKey) {
        const shortName = getStage(app.stageKey, app.stageId)?.shortName;
        if (shortName) map.set(app.stageKey, shortName);
      }
    });
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    let list = applications ?? [];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter((app) => {
        const idMatch = app.itemId?.toString().toLowerCase().includes(query);
        const taskMatch = app.technical_task?.toLowerCase().includes(query);
        const stageMatch = getStage(app.stageKey, app.stageId)
          ?.shortName.toLowerCase()
          .includes(query);
        return idMatch || taskMatch || stageMatch;
      });
    }

    if (activeTab !== "all") {
      list = list.filter((app) => {
        const category = getStage(app.stageKey, app.stageId)?.category;
        if (activeTab === "action_required")
          return category === "action_required";
        if (activeTab === "in_progress") return category === "in_progress";
        if (activeTab === "completed") {
          return category === "success" || category === "fail";
        }
        return true;
      });
    }

    if (stageFilter !== "all") {
      list = list.filter(
        (app) =>
          (app.stageKey ?? "").toUpperCase() === stageFilter.toUpperCase(),
      );
    }

    return list;
  }, [applications, searchQuery, activeTab, stageFilter]);

  const hasFilters =
    Boolean(searchQuery) || activeTab !== "all" || stageFilter !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
    setStageFilter("all");
  };

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Заявки на новинки" />

      <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-y-auto rounded-3xl bg-background p-4">
        {isApplicationsLoading ? (
          <ApplicationsSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                onClick={() => setActiveTab("all")}
                className={cn(
                  "cursor-pointer gap-2 p-4",
                  activeTab === "all" && "border-primary",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    Всего заявок
                  </span>
                  <ClipboardList className="size-4 text-muted-foreground" />
                </div>
                <span className="text-2xl font-bold">{stats.all}</span>
              </Card>

              <Card
                onClick={() => setActiveTab("action_required")}
                className={cn(
                  "cursor-pointer gap-2 p-4",
                  activeTab === "action_required" && "border-primary",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    Требуют решения
                  </span>
                  <AlertCircle className="size-4 text-primary" />
                </div>
                <span className="text-2xl font-bold">
                  {stats.action_required}
                </span>
              </Card>

              <Card
                onClick={() => setActiveTab("in_progress")}
                className={cn(
                  "cursor-pointer gap-2 p-4",
                  activeTab === "in_progress" && "border-primary",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    В процессе
                  </span>
                  <Clock className="size-4 text-muted-foreground" />
                </div>
                <span className="text-2xl font-bold">{stats.in_progress}</span>
              </Card>

              <Card
                onClick={() => setActiveTab("completed")}
                className={cn(
                  "cursor-pointer gap-2 p-4",
                  activeTab === "completed" && "border-primary",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    Завершено
                  </span>
                  <CheckCircle2 className="size-4 text-muted-foreground" />
                </div>
                <span className="text-2xl font-bold">{stats.completed}</span>
              </Card>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по номеру, ТЗ или этапу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <Filter className="size-4 text-muted-foreground" />
                    <SelectValue placeholder="Все этапы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все этапы</SelectItem>
                    {availableStages.map(({ key, label }) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Сбросить
                  </Button>
                )}
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
                <Inbox className="size-8 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">Заявок не найдено</p>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    {hasFilters
                      ? "По выбранным фильтрам ничего не найдено."
                      : "Пока нет активных заявок."}
                  </p>
                </div>
                {hasFilters && (
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredApplications.map((app) => (
                  <ApplicationCard
                    key={app.itemId}
                    application={app}
                    onOpenDetails={() => {}}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FarmerApplications;
