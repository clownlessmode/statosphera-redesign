import { useEffect, useRef, useState } from "react";
import { Header } from "@widgets/header";
import {
  useInfiniteFarmerApplications,
  FarmerApplication,
} from "@entities/farmer";
import { Button } from "@shared/ui/button";
import Spinner from "@shared/ui/spinner";
import { ApplicationCard } from "./application-card";
import { ApplicationsSkeleton } from "./applications-skeleton";
import { ApplicationDetail } from "./application-detail";
import { Inbox } from "lucide-react";

export const FarmerApplications = () => {
  const [selectedApplication, setSelectedApplication] =
    useState<FarmerApplication | null>(null);

  const {
    applications,
    isApplicationsLoading,
    isApplicationsError,
    isApplicationsFetchingNextPage,
    isApplicationsFetchNextPageError,
    fetchNextPage,
    hasNextPage,
    refetchApplications,
  } = useInfiniteFarmerApplications({ limit: 12 });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollContainerRef.current;
    const target = loadMoreRef.current;
    if (
      !root ||
      !target ||
      !hasNextPage ||
      isApplicationsFetchingNextPage ||
      isApplicationsFetchNextPageError
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) fetchNextPage();
      },
      { root, rootMargin: "400px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isApplicationsFetchingNextPage,
    isApplicationsFetchNextPageError,
    selectedApplication,
  ]);

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Заявки на новинки" />

      <div
        ref={scrollContainerRef}
        className="flex flex-1 min-h-0 flex-col gap-4 overflow-y-auto rounded-3xl bg-background p-4"
      >
        {selectedApplication ? (
          <ApplicationDetail
            application={selectedApplication}
            onBack={() => setSelectedApplication(null)}
          />
        ) : isApplicationsLoading ? (
          <ApplicationsSkeleton />
        ) : isApplicationsError ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm font-bold">Не удалось загрузить заявки</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchApplications()}
            >
              Повторить
            </Button>
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <Inbox className="size-8 text-muted-foreground" />
            <p className="text-sm font-bold">Заявок не найдено</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.itemId}
                  application={application}
                  onOpenDetails={(app) => setSelectedApplication(app)}
                />
              ))}
            </div>

            <div ref={loadMoreRef} className="h-px w-full" />

            {isApplicationsFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Spinner className="size-5" />
              </div>
            )}

            {isApplicationsFetchNextPageError && (
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-xs text-destructive">
                  Не удалось загрузить следующие заявки
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchNextPage()}
                >
                  Повторить
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
