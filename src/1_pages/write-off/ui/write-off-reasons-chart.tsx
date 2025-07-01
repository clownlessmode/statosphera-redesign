import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { X } from "lucide-react";
import { WriteOffReason } from "../api/types";
import { DonutChart } from "./filters/ui/donut-chart";
import { Skeleton } from "@shared/ui/skeleton";

interface WriteOffReasonsChartProps {
  isLoading: boolean;
  data: WriteOffReason[] | undefined;
  selectedStore?: any;
  selectedRows?: any[];
  onClearSelectedStore?: () => void;
  forceResize?: boolean;
  currentGroups?: string[];
}

const WriteOffReasonsChart: React.FC<WriteOffReasonsChartProps> = React.memo(
  ({
    isLoading,
    data,
    selectedStore,
    selectedRows = [],
    onClearSelectedStore,
    forceResize = false,
    currentGroups = [],
  }) => {
    // Преобразуем данные для DonutChart с мемоизацией
    const chartData = useMemo(
      () =>
        data?.map((item) => ({
          name: item.name,
          value: item.value,
        })) || [],
      [data],
    );

    const getTitle = useMemo(() => {
      if (selectedRows.length > 0) {
        if (selectedRows.length === 1) {
          const item = selectedRows[0];

          // Определяем тип выбранного элемента на основе группировки
          if (currentGroups.length > 0) {
            // Определяем приоритетную группировку (магазин в приоритете)
            let primaryGroup = currentGroups[0];
            if (
              currentGroups.includes("store") &&
              currentGroups[0] !== "store"
            ) {
              primaryGroup = "store";
            }

            // Маппинг группировок к их отображаемым названиям и полям
            const groupDisplayMap: Record<
              string,
              { label: string; field: string }
            > = {
              // Группировки по местоположению
              city: { label: "город", field: "city" },
              region: { label: "регион", field: "region" },

              // Группировки по магазину
              store: { label: "магазин", field: "store" },
              channel: { label: "канал", field: "channel" },
              ageGroup: { label: "возраст магазина", field: "ageGroup" },
              storeCondition: {
                label: "статус магазина",
                field: "storeCondition",
              },
              legalEntity: { label: "юр. лицо", field: "legalEntity" },
              nameManager: { label: "партнер", field: "nameManager" },
              formatStore: { label: "формат магазина", field: "formatStore" },

              // Группировки по продукту
              groupsFranchise: {
                label: "структура продаж",
                field: "groupsFranchise",
              },
              group: { label: "группа", field: "group" },
              subGroups: { label: "подгруппа", field: "groupsSub" },
              directionProducts: {
                label: "направление",
                field: "directionProducts",
              },
              subSubGroups: { label: "подподгруппа", field: "groupsSubSub" },
              typeProducts: { label: "тип поставщика", field: "typeProducts" },
              product: { label: "продукт", field: "product" },
              seasonalityProducts: {
                label: "сезонность",
                field: "seasonalityProducts",
              },
              managerAuto: {
                label: "менеджер автозаказа",
                field: "managerAuto",
              },
              groupsEconomist: {
                label: "справочник экономистов",
                field: "groupsEconomist",
              },

              // Группировка по типу списания
              writeOffType: { label: "тип списания", field: "ops" },
              ops: { label: "тип списания", field: "ops" },

              // Временные группировки
              day: { label: "день", field: "date_group" },
              week: { label: "неделя", field: "date_group" },
              month: { label: "месяц", field: "date_group" },
              quarter: { label: "квартал", field: "date_group" },
              year: { label: "год", field: "date_group" },
            };

            const groupConfig = groupDisplayMap[primaryGroup];
            if (groupConfig) {
              let value = item[groupConfig.field];

              // Специальная обработка для некоторых полей
              if (
                (primaryGroup === "nameManager" ||
                  primaryGroup === "legalEntity") &&
                value === 0
              ) {
                value = "Не указано";
              } else if (value === null || value === undefined) {
                value = "Не указано";
              }

              return `Причины списаний - ${groupConfig.label}: ${value}`;
            }
          }

          // Fallback к магазину если группировка не определена
          return `Причины списаний - ${item.store || item.storeName || item.store_name || `Магазин ${item.store_id || item.idStore}`}`;
        } else {
          // Множественный выбор
          let primaryGroup = currentGroups[0] || "store";
          if (currentGroups.includes("store") && currentGroups[0] !== "store") {
            primaryGroup = "store";
          }
          const groupLabels: Record<string, string> = {
            city: "городов",
            region: "регионов",
            store: "магазинов",
            channel: "каналов",
            ageGroup: "возрастов магазинов",
            storeCondition: "статусов магазинов",
            legalEntity: "юр. лиц",
            nameManager: "партнеров",
            formatStore: "форматов магазинов",
            groupsFranchise: "структур продаж",
            group: "групп",
            subGroups: "подгрупп",
            directionProducts: "направлений",
            subSubGroups: "подподгрупп",
            typeProducts: "типов поставщиков",
            product: "продуктов",
            seasonalityProducts: "сезонностей",
            managerAuto: "менеджеров автозаказа",
            groupsEconomist: "справочников экономистов",
            writeOffType: "типов списаний",
            ops: "типов списаний",
            day: "дней",
            week: "недель",
            month: "месяцев",
            quarter: "кварталов",
            year: "лет",
          };

          const label = groupLabels[primaryGroup] || "элементов";
          return `Причины списаний - ${selectedRows.length} ${label}`;
        }
      }
      if (selectedStore) {
        return `Причины списаний - ${selectedStore.storeName || selectedStore.store_name || selectedStore.store || `Магазин ${selectedStore.store_id}`}`;
      }
      return "Причины списаний";
    }, [selectedRows, selectedStore, currentGroups]);

    // Показываем кнопку очистки если есть выбранные строки или выбранный магазин
    const shouldShowClearButton = selectedRows.length > 0 || selectedStore;

    return (
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{getTitle}</CardTitle>
          {shouldShowClearButton && onClearSelectedStore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelectedStore}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Skeleton className="h-[300px] w-[300px] rounded-full" />
            </div>
          ) : chartData.length > 0 ? (
            <DonutChart
              isLoading={false}
              data={chartData}
              forceResize={forceResize}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-muted-foreground text-sm">
                Нет данных для отображения
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    // Кастомная функция сравнения для оптимизации рендеров
    return (
      prevProps.isLoading === nextProps.isLoading &&
      JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
      prevProps.selectedRows?.length === nextProps.selectedRows?.length &&
      prevProps.selectedStore === nextProps.selectedStore &&
      prevProps.forceResize === nextProps.forceResize &&
      JSON.stringify(prevProps.currentGroups) ===
        JSON.stringify(nextProps.currentGroups)
    );
  },
);

WriteOffReasonsChart.displayName = "WriteOffReasonsChart";

export default WriteOffReasonsChart;
