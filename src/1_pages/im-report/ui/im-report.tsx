import { Header } from "@widgets/header";
import { useIM } from "../api/controller";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { DaysFilter } from "./filters/days-filter";
import { ShopsFilter } from "./filters/shops-filter";
import GroupingFilter from "./filters/grouping-filter";
import { useLoyaltyFiltersStore } from "./filters/filters-store";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
import { useMemo } from "react";
import { Button } from "@shared/ui/button";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import UniversalTable from "@pages/report/ui/table";
import { columnDefs } from "@shared/constants/table-columns";

export const IMReport = () => {
  const { filterDate, groups } = useLoyaltyFiltersStore();
  const store = useSalesDynamicsFiltersStore((state) => state.filters);
  const filters = useSalesDynamicsFiltersStore((state) => state.filters);

  const mock: any = useMemo(
    () => ({
      store,
      filters,
      filterDate: {
        dateStart: filterDate.dateStart,
        dateEnd: filterDate.dateEnd,
      },
      groups: groups.length > 0 ? groups : [],
    }),
    [store, filters, filterDate, groups],
  );

  const { shareIM, avgCheck } = useIM(mock);

  // Объединяем данные shareIM и avgCheck по ключу группировки
  const combinedData = useMemo(() => {
    if (!shareIM || !avgCheck) return shareIM || avgCheck || [];

    const combinedMap = new Map();

    // Добавляем данные из shareIM
    shareIM.forEach((item: any) => {
      const key =
        item.day || item.week || item.month || item.quarter || item.year || "";
      if (key) {
        combinedMap.set(key, { ...item });
      }
    });

    // Объединяем с данными из avgCheck
    avgCheck.forEach((item: any) => {
      const key =
        item.day || item.week || item.month || item.quarter || item.year || "";
      if (key) {
        const existing = combinedMap.get(key) || {};
        combinedMap.set(key, { ...existing, ...item });
      }
    });

    return Array.from(combinedMap.values());
  }, [shareIM, avgCheck]);

  const isMobile = useIsMobile();

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header
        title="Интернет-магазин"
        actions={{
          left: !isMobile && (
            <>
              <div className=" -mb-4 flex flex-row gap-1">
                <Link to={ROUTES_PATH.IM}>
                  <Button
                    variant="outline"
                    className="border-b-0! rounded-b-none! opacity-50"
                  >
                    Дашборд
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-b-0! rounded-b-none!"
                >
                  Отчет
                </Button>
              </div>
              <div className="flex gap-2">
                <DaysFilter />
                <ShopsFilter />
                <GroupingFilter />
              </div>
            </>
          ),
        }}
      />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 gap-4 flex flex-col max-md:gap-2">
        <UniversalTable
          selectionType="multiple"
          data={combinedData as any}
          totalData={combinedData as any}
          columnDefs={columnDefs}
          data-testid="data-table"
        />
      </div>
    </div>
  );
};
