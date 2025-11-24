import { Header } from "@widgets/header";
import { useIM } from "../api/controller";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { DaysFilter } from "./filters/days-filter";
import { ShopsFilter } from "./filters/shops-filter";
import GroupingFilter from "./filters/grouping-filter";
import { useLoyaltyFiltersStore } from "./filters/filters-store";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@shared/ui/button";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import UniversalTable from "@pages/report/ui/table";
import { calculateTotalRow } from "@pages/report/ui/table/utils";
import { columnDefs } from "@shared/constants/table-columns";

export const IMReport = () => {
  const { filterDate, groups } = useLoyaltyFiltersStore();
  const [isGroupingModalOpen, setIsGroupingModalOpen] = useState(false);
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

  const {
    shareIM,
    avgCheck,
    ordersCountAll,
    avgCheckCount,
    discreteness,
    percentCancellationAll,
    percentCancellationPickup,
    percentCancellationOrdinary,
    deliveryImCount,
  } = useIM(mock);

  // Автоматически открываем модалку группировок, если групп нет
  useEffect(() => {
    if (groups.length === 0 && !isGroupingModalOpen) {
      setIsGroupingModalOpen(true);
    }
  }, [groups.length]);

  // Объединяем данные shareIM, avgCheck, ordersCountAll, avgCheckCount, discreteness, percentCancellationAll, percentCancellationPickup, percentCancellationOrdinary и deliveryImCount по ключу группировки
  const combinedData = useMemo(() => {
    const sources = [
      shareIM,
      avgCheck,
      ordersCountAll,
      avgCheckCount,
      discreteness,
      percentCancellationAll,
      percentCancellationPickup,
      percentCancellationOrdinary,
      deliveryImCount,
    ];
    const dataSources = sources.filter(Boolean);
    if (dataSources.length === 0) return [];

    const combinedMap = new Map();

    // Объединяем данные из всех источников
    dataSources.forEach((data) => {
      if (!data) return;
      const sourceIndex = sources.findIndex((d) => d === data);

      data.forEach((item: any) => {
        const key =
          item.day ||
          item.week ||
          item.month ||
          item.quarter ||
          item.year ||
          "";
        if (key) {
          const existing = combinedMap.get(key) || {};
          // Для percentCancellationPickup переименовываем cancellationPercentage в cancellationPercentagePickup
          if (sourceIndex === 6 && item.cancellationPercentage !== undefined) {
            const { cancellationPercentage, ...rest } = item;
            combinedMap.set(key, {
              ...existing,
              ...rest,
              cancellationPercentagePickup: cancellationPercentage,
            });
          } else if (
            sourceIndex === 7 &&
            item.cancellationPercentage !== undefined
          ) {
            // Для percentCancellationOrdinary переименовываем cancellationPercentage в cancellationPercentageOrdinary
            const { cancellationPercentage, ...rest } = item;
            combinedMap.set(key, {
              ...existing,
              ...rest,
              cancellationPercentageOrdinary: cancellationPercentage,
            });
          } else {
            combinedMap.set(key, { ...existing, ...item });
          }
        }
      });
    });

    return Array.from(combinedMap.values());
  }, [
    shareIM,
    avgCheck,
    ordersCountAll,
    avgCheckCount,
    discreteness,
    percentCancellationAll,
    percentCancellationPickup,
    percentCancellationOrdinary,
    deliveryImCount,
  ]);

  // Вычисляем итоговую строку с суммой всех числовых полей
  const totalData = useMemo(() => {
    if (!combinedData || combinedData.length === 0) return [];
    const total = calculateTotalRow(combinedData);
    // Округляем все числовые значения до 2 знаков после запятой для корректного отображения
    const formattedTotal: Record<string, any> = {};
    Object.keys(total).forEach((key) => {
      const value = total[key];
      if (typeof value === "number") {
        formattedTotal[key] = Math.round(value * 100) / 100;
      } else {
        formattedTotal[key] = value;
      }
    });
    return [formattedTotal];
  }, [combinedData]);

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
              <div className="flex gap-2 max-2xl:hidden">
                <DaysFilter />
                <ShopsFilter />
                <GroupingFilter
                  open={isGroupingModalOpen}
                  onOpenChange={setIsGroupingModalOpen}
                />
              </div>
            </>
          ),
        }}
      />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 gap-4 flex flex-col max-md:gap-2">
        <div className="flex flex-row justify-end gap-2 2xl:hidden">
          <DaysFilter />
          <ShopsFilter />
          <GroupingFilter
            open={isGroupingModalOpen}
            onOpenChange={setIsGroupingModalOpen}
          />
        </div>
        {groups.length === 0 && !isGroupingModalOpen ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg font-medium">Нет данных для отображения</p>
              <p className="text-sm mb-2">
                Выберите группировки для отображения данных
              </p>
            </div>
            <GroupingFilter
              open={isGroupingModalOpen}
              onOpenChange={setIsGroupingModalOpen}
            />
          </div>
        ) : (
          <UniversalTable
            selectionType="multiple"
            data={combinedData as any}
            totalData={totalData as any}
            columnDefs={columnDefs}
            data-testid="data-table"
          />
        )}
      </div>
    </div>
  );
};
