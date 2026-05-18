import { useEffect, useRef, useState } from "react";
import { Header } from "@widgets/header";
import { CardProject } from "./ui/card-project";
import { useGetProjects } from "./api/controller";
import { ModalLoadExcel } from "./ui/modal-load-excel";
import { CreateProjectForm } from "./ui/create-project-form";
import { FiltersModal } from "./ui/filters-modal";
import type { ProjectsFilters } from "./api/types/requests";
import { Button } from "@shared/ui/button";
import { GraphProjects } from "./ui/graph-projects";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import {
  PROJECT_SORT_PRESETS,
  type ProjectSortPresetId,
  presetIdFromSort,
  sortFromPresetId,
} from "./project-sort-presets";
import { useSession } from "@entities/session";
import { FormSelectDropdown } from "./ui/form-select-dropdown";

export const Projects = () => {
  const [filters, setFilters] = useState<ProjectsFilters>({});
  const { session } = useSession();
  const idUser = session?.idUser;
  const [showGraph, setShowGraph] = useState(false);
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetProjects(filters);
  const projects = data?.pages.flat() ?? [];
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
      <Header title="Проекты" />
      <div
        ref={scrollContainerRef}
        className={`rounded-3xl px-4 py-4 flex-1 min-h-0 bg-background flex flex-col ${
          showGraph ? "min-h-0 overflow-hidden" : "overflow-y-auto"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4 shrink-0">
          <FiltersModal value={filters} onApply={setFilters} />
          <div className="flex flex-wrap items-center gap-2">
            {/* <span className="text-sm font-light text-muted-foreground whitespace-nowrap">
              Порядок:
            </span> */}
            <Select
              value={presetIdFromSort(filters.sort)}
              onValueChange={(id) =>
                setFilters({
                  ...filters,
                  sort: sortFromPresetId(id as ProjectSortPresetId),
                })
              }
            >
              <SelectTrigger
                size="sm"
                className="min-w-[200px] max-w-[min(100vw-2rem,22rem)] w-fit"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                align="start"
                className="max-w-[min(100vw-2rem,22rem)]"
              >
                {(["Создание", "Окончание", "Начало"] as const).map((group) => (
                  <SelectGroup key={group}>
                    <SelectLabel className="text-xs">{group}</SelectLabel>
                    {PROJECT_SORT_PRESETS.filter((p) => p.group === group).map(
                      (p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="font-light">Этапы:</p>
            <Button
              size={"sm"}
              variant={filters.isActive ? "default" : "outline"}
              onClick={() => setFilters({ ...filters, isActive: true })}
            >
              Активные
            </Button>
            <Button
              size={"sm"}
              variant={filters.isActive ? "outline" : "default"}
              onClick={() => setFilters({ ...filters, isActive: false })}
            >
              Все
            </Button>
          </div>
          <FormSelectDropdown />
          <div className="flex flex-row gap-2">
            {(idUser === 2875 || idUser === 2808 || idUser === 2879) && (
              <CreateProjectForm />
            )}
            {(idUser === 2875 || idUser === 2808 || idUser === 2879) && (
              <ModalLoadExcel />
            )}

            <Button variant="outline" onClick={() => setShowGraph(!showGraph)}>
              <span>
                {showGraph
                  ? "Скрыть диаграмму Ганта"
                  : "Показать диаграмму Ганта"}
              </span>
            </Button>
          </div>
        </div>
        {showGraph ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <GraphProjects />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start auto-rows-max">
            {isPending && <div>Загрузка проектов...</div>}
            {!isPending && projects.length === 0 && (
              <div>Проекты не найдены</div>
            )}
            {projects.map((project) => (
              <CardProject key={project.id} project={project} />
            ))}
          </div>
        )}
        {!showGraph && hasNextPage && <div ref={sentinelRef} className="h-4" />}
        {!showGraph && isFetchingNextPage && (
          <div className="flex justify-center py-3 text-sm text-muted-foreground">
            Загружаем еще проекты...
          </div>
        )}
      </div>
    </div>
  );
};
