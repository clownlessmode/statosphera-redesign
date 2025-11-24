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
import { toast } from "sonner";
import { IMService } from "../api/service";
import { Download } from "lucide-react";

export const IMReport = () => {
  const { filterDate, groups } = useLoyaltyFiltersStore();
  const [isGroupingModalOpen, setIsGroupingModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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
      exportFile: false,
    }),
    [store, filters, filterDate, groups],
  );

  const { imTable } = useIM(mock);

  // Автоматически открываем модалку группировок, если групп нет
  useEffect(() => {
    if (groups.length === 0 && !isGroupingModalOpen) {
      setIsGroupingModalOpen(true);
    }
  }, [groups.length]);

  // Данные уже приходят объединенными из API
  const combinedData = useMemo(() => {
    return imTable || [];
  }, [imTable]);

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

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      await toast.promise(IMService.exportIMTable(mock), {
        loading: "Отправка запроса на экспорт...",
        success: "Запрос на экспорт отчета успешно отправлен",
        error: (error) => {
          console.error("Ошибка при экспорте:", error);
          return "Произошла ошибка при экспорте отчета";
        },
      });
    } catch (error) {
      console.error("Ошибка при экспорте:", error);
    } finally {
      setIsExporting(false);
    }
  };

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
          center: (
            <Button
              variant="outline"
              onClick={handleExportReport}
              disabled={isExporting || groups.length === 0}
              loading={isExporting}
            >
              <Download className="size-4" />
              Скачать отчет
            </Button>
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
