import { useMemo, useState } from "react";
import { format, startOfMonth, endOfDay } from "date-fns";
import { Header } from "@widgets/header";
import { type AttendanceFiltersValue } from "./ui/filters";
import { Statistics } from "./ui/statistics";
import { Events } from "./ui/events";
import { useCameraStats, useCameraStores } from "./api/controller";
import type { CameraStatsRequest } from "./api/types";
import { Graph } from "./ui/graph";

function getDefaultAttendanceFilters(): AttendanceFiltersValue {
  const now = new Date();
  return {
    dateRange: {
      from: startOfMonth(now),
      to: endOfDay(now),
    },
    way: "all",
    sort: "desc",
  };
}

const formatDateTime = (date: Date) => format(date, "yyyy-MM-dd HH:mm:ss");

export const Attendance = () => {
  const [filters, setFilters] = useState<AttendanceFiltersValue>(
    getDefaultAttendanceFilters,
  );
  const [showFilters, setShowFilters] = useState(false);

  const statsParams: CameraStatsRequest | undefined = useMemo(() => {
    if (!filters.dateRange?.from || !filters.dateRange?.to) return undefined;

    const start = new Date(filters.dateRange.from);
    start.setHours(0, 0, 0, 0);

    const end = new Date(filters.dateRange.to);
    end.setHours(23, 59, 59, 999);

    return {
      way: filters.way === "all" ? undefined : filters.way,
      idStore: filters.idStore,
      startDateTime: formatDateTime(start),
      endDateTime: formatDateTime(end),
    };
  }, [filters]);

  const eventsBaseParams = useMemo(() => {
    if (!statsParams || !filters.sort) return undefined;
    return { ...statsParams, sort: filters.sort };
  }, [statsParams, filters.sort]);

  const storesQuery = useCameraStores();
  const statsQuery = useCameraStats(statsParams as CameraStatsRequest, {
    enabled: !!statsParams,
  });

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Посещаемость" />
      <div className="rounded-3xl px-4 py-4 h-full bg-background overflow-y-auto flex flex-col gap-4">
        <Statistics
          filters={filters}
          onFiltersChange={setFilters}
          showFilters={showFilters}
          onShowFiltersChange={setShowFilters}
          stores={storesQuery.data}
          statsParams={statsParams}
          statsData={statsQuery.data}
          statsLoading={statsQuery.isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 flex-1 min-h-0">
          <div className="min-h-0 flex flex-col min-w-0">
            <Events
              eventsBaseParams={eventsBaseParams}
              sort={filters.sort ?? "desc"}
              onSortChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
            />
          </div>
          <div className="min-h-0 flex flex-col min-w-0">
            <Graph statsParams={statsParams} />
          </div>
        </div>
      </div>
    </div>
  );
};
