import { useEffect, useRef } from "react";
import { Header } from "@widgets/header";
import { CardProject } from "./ui/card-project";
import { useGetProjects } from "./api/controller";

export const Projects = () => {
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetProjects();
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
        className="rounded-3xl px-4 py-4 flex-1 min-h-0 bg-background overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start auto-rows-max">
          {isPending && <div>Загрузка проектов...</div>}
          {!isPending && projects.length === 0 && <div>Проекты не найдены</div>}
          {projects.map((project) => (
            <CardProject key={project.id} project={project} />
          ))}
        </div>
        {hasNextPage && <div ref={sentinelRef} className="h-4" />}
        {isFetchingNextPage && (
          <div className="flex justify-center py-3 text-sm text-muted-foreground">
            Загружаем еще проекты...
          </div>
        )}
      </div>
    </div>
  );
};
