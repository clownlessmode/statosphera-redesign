import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Button } from "@shared/ui/button";
import { Cog, Eraser, X } from "lucide-react";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { useWriteOffStore } from "@pages/write-off/model/write-off-store";
import { useWriteOffVersionStore } from "@pages/write-off/model/write-off-version-store";
import { useWriteOffReasonsStore } from "@pages/write-off/model/write-off-reasons-store";
import { useWriteOffReasonsController } from "@pages/write-off/model/write-off-reasons-controller";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import WriteOffReasonsChart from "./write-off-reasons-chart";
import WriteOffStatsCards from "./write-off-stats-cards";
import { WriteOffFilters } from "./write-off-filters";
import DateDropdown, { useWriteOffDateFilterStore } from "./date-dropdown";
import { useWriteOffController } from "@pages/write-off/api/controller";
import UniversalTable from "@pages/report/ui/table";
import { columnDefs } from "@shared/constants/table-columns";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Input } from "@shared/ui/input";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import { AnimatePresence } from "motion/react";
import FiltersAccordeon from "@pages/report/ui/filters";
import NotFoundFilters from "@shared/assets/capibara/not-found-filters";
import { WriteOffTotalResponse } from "@pages/write-off/api/types";

// Функция для умного извлечения фильтров на основе текущих группировок
function extractFiltersBasedOnGrouping(
  selectedRows: any[],
  currentGroups: string[],
) {
  const filters: any = {
    store: {
      idStore: [],
      idCity: [],
      idRegion: [],
      idManager: [],
      storeCondition: [],
      ageGroup: [],
      idLegalEntity: [],
      channel: [],
      district: [],
    },
    product: {
      idProduct: [],
      idGroupMain: [],
      groupFranchise: [],
      subGroups: [],
      subSubGroups: [],
      typeProducts: [],
      teamProducts: [],
      directionProducts: [],
      groupsEconomist: [],
      seasonalityProducts: [],
      managerAuto: [],
    },
    check: {
      tabNumber: [],
      cashBox: [],
      checkNumber: [],
      numberfield: [],
      type: [],
    },
    loyal: {
      cardNumber: [],
      sex: [],
      guidDiscount: [],
      guidBonus: [],
      groupAge: [],
    },
    onlineStore: {
      imTypeOrder: [],
      imDeliveryMethod: [],
      imPaymentMethod: [],
      imStatusOrder: [],
      imPromo: [],
      imReceiveInterval: [],
    },
    writeoff: {
      article: [],
    },
  };

  // Маппинг группировок к полям в данных и соответствующим фильтрам
  const groupingToFilterMap: Record<
    string,
    {
      dataFields: string[];
      filterCategory: string;
      filterField: string;
    }
  > = {
    // Группировки по местоположению и магазину
    store: {
      dataFields: ["idStore", "store_id", "id_store"],
      filterCategory: "store",
      filterField: "idStore",
    },
    city: {
      dataFields: ["idCity", "city_id", "id_city"],
      filterCategory: "store",
      filterField: "idCity",
    },
    region: {
      dataFields: ["idRegion", "region_id", "id_region"],
      filterCategory: "store",
      filterField: "idRegion",
    },
    nameManager: {
      dataFields: ["idManager", "manager_id", "id_manager"],
      filterCategory: "store",
      filterField: "idManager",
    },
    legalEntity: {
      dataFields: ["idLegalEntity", "id_legal_entity"],
      filterCategory: "store",
      filterField: "idLegalEntity",
    },
    channel: {
      dataFields: ["channel"],
      filterCategory: "store",
      filterField: "channel",
    },
    ageGroup: {
      dataFields: ["ageGroup"],
      filterCategory: "store",
      filterField: "ageGroup",
    },
    storeCondition: {
      dataFields: ["storeCondition"],
      filterCategory: "store",
      filterField: "storeCondition",
    },
    formatStore: {
      dataFields: ["formatStore"],
      filterCategory: "store",
      filterField: "formatStore",
    },

    // Группировки по продуктам
    product: {
      dataFields: ["idProduct", "product_id", "id_product"],
      filterCategory: "product",
      filterField: "idProduct",
    },
    group: {
      dataFields: ["idGroupMain", "group_id"],
      filterCategory: "product",
      filterField: "idGroupMain",
    },
    groupsFranchise: {
      dataFields: ["idGroupsFranchise"],
      filterCategory: "product",
      filterField: "groupFranchise",
    },
    subGroups: {
      dataFields: ["idSubGroups"],
      filterCategory: "product",
      filterField: "subGroups",
    },
    subSubGroups: {
      dataFields: ["idSubSubGroups"],
      filterCategory: "product",
      filterField: "subSubGroups",
    },
    typeProducts: {
      dataFields: ["idTypeProducts"],
      filterCategory: "product",
      filterField: "typeProducts",
    },
    teamProducts: {
      dataFields: ["idTeamProducts"],
      filterCategory: "product",
      filterField: "teamProducts",
    },
    directionProducts: {
      dataFields: ["idDirectionProducts"],
      filterCategory: "product",
      filterField: "directionProducts",
    },
    groupsEconomist: {
      dataFields: ["idGroupsEconomist"],
      filterCategory: "product",
      filterField: "groupsEconomist",
    },
    seasonalityProducts: {
      dataFields: ["idSeasonalityProducts"],
      filterCategory: "product",
      filterField: "seasonalityProducts",
    },
    managerAuto: {
      dataFields: ["idManagerAuto"],
      filterCategory: "product",
      filterField: "managerAuto",
    },

    // Группировки по чекам
    tabNumber: {
      dataFields: ["tabNumber"],
      filterCategory: "check",
      filterField: "tabNumber",
    },
    cashBox: {
      dataFields: ["cashBox"],
      filterCategory: "check",
      filterField: "cashBox",
    },

    // Группировка по типу списания
    writeOffType: {
      dataFields: ["ops"],
      filterCategory: "writeoff",
      filterField: "article",
    },
    ops: {
      dataFields: ["ops"],
      filterCategory: "writeoff",
      filterField: "article",
    },

    // Временные группировки - не извлекаем фильтры, так как это уже отфильтровано по времени
  };

  // Извлекаем фильтры для текущих группировок или автоматически определяем
  for (const currentRow of selectedRows) {
    // Сначала попробуем найти фильтры для текущих группировок
    let foundAnyFilter = false;
    for (const groupName of currentGroups) {
      const mapping = groupingToFilterMap[groupName];
      if (!mapping) continue; // Пропускаем временные группировки

      // Ищем значение в любом из возможных полей
      let value = null;
      for (const field of mapping.dataFields) {
        if (currentRow[field] !== undefined && currentRow[field] !== null) {
          value = currentRow[field];

          break;
        }
      }

      // Добавляем значение в соответствующий фильтр
      if (value !== null && value !== undefined) {
        const filterCategory = filters[mapping.filterCategory];
        const filterField = filterCategory[mapping.filterField];

        if (filterField && !filterField.includes(value)) {
          filterField.push(value);
          foundAnyFilter = true;
        }
      }
    }

    // Если не нашли фильтры для заданных группировок, попробуем автоматически
    if (!foundAnyFilter) {
      // Автоматически определяем доступные фильтры
      const autoMappings = [
        // Store fields
        { field: "idStore", filterCategory: "store", filterField: "idStore" },
        { field: "store_id", filterCategory: "store", filterField: "idStore" },
        { field: "idCity", filterCategory: "store", filterField: "idCity" },
        { field: "city_id", filterCategory: "store", filterField: "idCity" },
        { field: "idRegion", filterCategory: "store", filterField: "idRegion" },
        {
          field: "region_id",
          filterCategory: "store",
          filterField: "idRegion",
        },
        {
          field: "idManager",
          filterCategory: "store",
          filterField: "idManager",
        },
        {
          field: "manager_id",
          filterCategory: "store",
          filterField: "idManager",
        },
        {
          field: "idLegalEntity",
          filterCategory: "store",
          filterField: "idLegalEntity",
        },
        {
          field: "id_legal_entity",
          filterCategory: "store",
          filterField: "idLegalEntity",
        },
        { field: "channel", filterCategory: "store", filterField: "channel" },
        { field: "ageGroup", filterCategory: "store", filterField: "ageGroup" },
        {
          field: "storeCondition",
          filterCategory: "store",
          filterField: "storeCondition",
        },
        { field: "district", filterCategory: "store", filterField: "district" },

        // Product fields
        {
          field: "idProduct",
          filterCategory: "product",
          filterField: "idProduct",
        },
        {
          field: "product_id",
          filterCategory: "product",
          filterField: "idProduct",
        },
        {
          field: "id_product",
          filterCategory: "product",
          filterField: "idProduct",
        },
        {
          field: "idGroupMain",
          filterCategory: "product",
          filterField: "idGroupMain",
        },
        {
          field: "group_id",
          filterCategory: "product",
          filterField: "idGroupMain",
        },
        {
          field: "idSubGroups",
          filterCategory: "product",
          filterField: "subGroups",
        },
        {
          field: "idSubSubGroups",
          filterCategory: "product",
          filterField: "subSubGroups",
        },
        {
          field: "idGroupsEconomist",
          filterCategory: "product",
          filterField: "groupsEconomist",
        },
        {
          field: "idGroupsFranchise",
          filterCategory: "product",
          filterField: "groupFranchise",
        },
        {
          field: "idTypeProducts",
          filterCategory: "product",
          filterField: "typeProducts",
        },
        {
          field: "idTeamProducts",
          filterCategory: "product",
          filterField: "teamProducts",
        },
        {
          field: "idDirectionProducts",
          filterCategory: "product",
          filterField: "directionProducts",
        },
        {
          field: "idSeasonalityProducts",
          filterCategory: "product",
          filterField: "seasonalityProducts",
        },
        {
          field: "idManagerAuto",
          filterCategory: "product",
          filterField: "managerAuto",
        },

        // Check fields
        {
          field: "tabNumber",
          filterCategory: "check",
          filterField: "tabNumber",
        },
        { field: "cashBox", filterCategory: "check", filterField: "cashBox" },
        {
          field: "checkNumber",
          filterCategory: "check",
          filterField: "checkNumber",
        },
        {
          field: "numberfield",
          filterCategory: "check",
          filterField: "numberfield",
        },
        { field: "type", filterCategory: "check", filterField: "type" },

        // Write-off type fields
        { field: "ops", filterCategory: "writeoff", filterField: "article" },

        // Loyal fields
        {
          field: "cardNumber",
          filterCategory: "loyal",
          filterField: "cardNumber",
        },
        { field: "sexLoyal", filterCategory: "loyal", filterField: "sex" },
        { field: "sex", filterCategory: "loyal", filterField: "sex" },
        {
          field: "guidDiscount",
          filterCategory: "loyal",
          filterField: "guidDiscount",
        },
        {
          field: "guidBonus",
          filterCategory: "loyal",
          filterField: "guidBonus",
        },
        { field: "groupAge", filterCategory: "loyal", filterField: "groupAge" },

        // Online store fields
        {
          field: "imTypeOrder",
          filterCategory: "onlineStore",
          filterField: "imTypeOrder",
        },
        {
          field: "imDeliveryMethod",
          filterCategory: "onlineStore",
          filterField: "imDeliveryMethod",
        },
        {
          field: "imPaymentMethod",
          filterCategory: "onlineStore",
          filterField: "imPaymentMethod",
        },
        {
          field: "imStatusOrder",
          filterCategory: "onlineStore",
          filterField: "imStatusOrder",
        },
        {
          field: "imPromo",
          filterCategory: "onlineStore",
          filterField: "imPromo",
        },
        {
          field: "imReceiveInterval",
          filterCategory: "onlineStore",
          filterField: "imReceiveInterval",
        },
      ];

      for (const autoMapping of autoMappings) {
        const value = currentRow[autoMapping.field];
        if (value !== undefined && value !== null) {
          const filterCategory = filters[autoMapping.filterCategory];
          const filterField = filterCategory[autoMapping.filterField];

          if (filterField && !filterField.includes(value)) {
            filterField.push(value);
            foundAnyFilter = true;
          }
        }
      }
    }
  }

  return filters;
}

// Функция для глубокого сравнения фильтров

// Функция для создания кастомных колонок на основе группировки

// Функция для агрегации дублирующихся записей
function aggregateDuplicateRows(data: any[], groups: string[]): any[] {
  if (!data || data.length === 0 || !groups || groups.length === 0) return data;

  // Определяем ключевые поля для всех группировок
  const groupingKeyMap: Record<string, string> = {
    store: "store_id",
    city: "idCity",
    region: "idRegion",
    nameManager: "idManager",
    legalEntity: "idLegalEntity",
    channel: "channel",
    ageGroup: "ageGroup",
    storeCondition: "storeCondition",
    formatStore: "formatStore",
    district: "district",
    subGroups: "idSubGroups",
    subSubGroups: "idSubSubGroups",
    groupsEconomist: "idGroupsEconomist",
    groupsFranchise: "idGroupsFranchise",
    typeProducts: "idTypeProducts",
    seasonalityProducts: "idSeasonalityProducts",
    teamProducts: "idTeamProducts",
    directionProducts: "idDirectionProducts",
    managerAuto: "idManagerAuto",
    tabNumber: "tabNumber",
    group: "group_id",
    product: "product_id",
    writeOffType: "ops",
    ops: "ops",
    day: "day",
    week: "week",
    month: "month",
    quarter: "quarter",
    year: "year",
  };

  // Создаем составной ключ из всех группировок
  const getCompositeKey = (row: any) => {
    const keys = groups
      .map((group) => {
        const keyField = groupingKeyMap[group];
        if (!keyField) return null;
        const value = row[keyField];
        return value !== undefined && value !== null ? value : null;
      })
      .filter((key) => key !== null);

    // Если нет валидных ключей, возвращаем null
    if (keys.length === 0) return null;

    // Создаем составной ключ
    return keys.join("|");
  };

  // Группируем данные по составному ключу
  const grouped = data.reduce(
    (acc, row) => {
      const compositeKey = getCompositeKey(row);
      if (!compositeKey) {
        return acc;
      }

      if (!acc[compositeKey]) {
        acc[compositeKey] = { ...row };
      } else {
        // Агрегируем числовые поля списаний
        Object.keys(row).forEach((field) => {
          if (typeof row[field] === "number" && field.startsWith("writeOff")) {
            // Обработка null/undefined значений
            const currentValue = acc[compositeKey][field];
            const newValue = row[field];

            if (currentValue === null || currentValue === undefined) {
              acc[compositeKey][field] = newValue;
            } else if (newValue !== null && newValue !== undefined) {
              acc[compositeKey][field] = currentValue + newValue;
            }
          }
        });
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const result = Object.values(grouped);

  return result;
}

// Функция для агрегации данных выбранных строк для статистики
function aggregateSelectedRowsStats(
  selectedRows: any[],
): WriteOffTotalResponse | null {
  if (!selectedRows || selectedRows.length === 0) {
    return null;
  }

  // Инициализируем аккумулятор
  const aggregated: WriteOffTotalResponse = {
    writeOff: 0,
    writeOffCount: 0,
    writeOffWeight: 0,
    writeOffLM: 0,
    writeOffCountLM: 0,
    writeOffWeightLM: 0,
    writeOffLY: 0,
    writeOffCountLY: 0,
    writeOffWeightLY: 0,
    writeOffMoM: 0,
    writeOffCountMoM: 0,
    writeOffWeightMoM: 0,
    writeOffMoMPercent: 0,
    writeOffCountMoMPercent: 0,
    writeOffWeightMoMPercent: 0,
    writeOffYoY: 0,
    writeOffCountYoY: 0,
    writeOffWeightYoY: 0,
    writeOffYoYPercent: 0,
    writeOffCountYoYPercent: 0,
    writeOffWeightYoYPercent: 0,
  };

  // Суммируем все абсолютные значения
  for (const row of selectedRows) {
    // Основные показатели
    aggregated.writeOff += row.writeOff || 0;
    aggregated.writeOffCount += row.writeOffCount || 0;
    aggregated.writeOffWeight += row.writeOffWeight || 0;

    // Прошлый месяц
    aggregated.writeOffLM += row.writeOffLM || 0;
    aggregated.writeOffCountLM += row.writeOffCountLM || 0;
    aggregated.writeOffWeightLM += row.writeOffWeightLM || 0;

    // Прошлый год
    aggregated.writeOffLY += row.writeOffLY || 0;
    aggregated.writeOffCountLY += row.writeOffCountLY || 0;
    aggregated.writeOffWeightLY += row.writeOffWeightLY || 0;

    // Абсолютные изменения
    aggregated.writeOffMoM += row.writeOffMoM || 0;
    aggregated.writeOffCountMoM += row.writeOffCountMoM || 0;
    aggregated.writeOffWeightMoM += row.writeOffWeightMoM || 0;

    aggregated.writeOffYoY += row.writeOffYoY || 0;
    aggregated.writeOffCountYoY += row.writeOffCountYoY || 0;
    aggregated.writeOffWeightYoY += row.writeOffWeightYoY || 0;
  }

  // Пересчитываем процентные показатели на основе агрегированных данных
  if (aggregated.writeOffLM > 0) {
    aggregated.writeOffMoMPercent =
      Math.round(
        ((aggregated.writeOff - aggregated.writeOffLM) /
          aggregated.writeOffLM) *
          100 *
          10,
      ) / 10;
  } else {
    aggregated.writeOffMoMPercent = 0;
  }

  if (aggregated.writeOffCountLM > 0) {
    aggregated.writeOffCountMoMPercent =
      Math.round(
        ((aggregated.writeOffCount - aggregated.writeOffCountLM) /
          aggregated.writeOffCountLM) *
          100 *
          10,
      ) / 10;
  } else {
    aggregated.writeOffCountMoMPercent = 0;
  }

  if (aggregated.writeOffWeightLM > 0) {
    aggregated.writeOffWeightMoMPercent =
      Math.round(
        ((aggregated.writeOffWeight - aggregated.writeOffWeightLM) /
          aggregated.writeOffWeightLM) *
          100 *
          10,
      ) / 10;
  } else {
    aggregated.writeOffWeightMoMPercent = 0;
  }

  if (aggregated.writeOffLY > 0) {
    aggregated.writeOffYoYPercent =
      Math.round(
        ((aggregated.writeOff - aggregated.writeOffLY) /
          aggregated.writeOffLY) *
          100 *
          10,
      ) / 10;
  } else {
    aggregated.writeOffYoYPercent = 0;
  }

  if (aggregated.writeOffCountLY > 0) {
    aggregated.writeOffCountYoYPercent =
      Math.round(
        ((aggregated.writeOffCount - aggregated.writeOffCountLY) /
          aggregated.writeOffCountLY) *
          100 *
          10,
      ) / 10;
  } else {
    aggregated.writeOffCountYoYPercent = 0;
  }

  if (aggregated.writeOffWeightLY > 0) {
    aggregated.writeOffWeightYoYPercent =
      Math.round(
        ((aggregated.writeOffWeight - aggregated.writeOffWeightLY) /
          aggregated.writeOffWeightLY) *
          100 *
          10,
      ) / 10;
  } else {
    aggregated.writeOffWeightYoYPercent = 0;
  }

  return aggregated;
}

interface AllWriteOffsProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
}

export const AllWriteOffs = ({
  isFiltersOpen,
  setIsFiltersOpen,
}: AllWriteOffsProps) => {
  const navigate = useNavigate();
  const { setTargetViewValue, tab } = useTabStore();
  const { resetAllFilters, getApiPayload, groups } = useFiltersStore();

  // Stores
  const { graph, table, total, clearAll, setGraph, setTable, setTotal, error } =
    useWriteOffStore();
  const { bumpDataVersion } = useWriteOffVersionStore();
  const { reasons, isLoading: isReasonsLoading } = useWriteOffReasonsStore();

  // Controllers
  const { fetchReasons } = useWriteOffReasonsController();
  const { getGraph, getTable, getEquipmentTable, getTotal, isGraphLoading } =
    useWriteOffController();

  // Hooks
  const prepareLine = usePreparedStackedLine();

  //TODO доделать передачу пустых данных ()
  // if (!graph) {
  //   return prepareLine([
  //     {
  //       name: "Текущий период",
  //       data: [[0, 1], [1, 0]],
  //     },
  //     {
  //       name: "Прошлый год",
  //       data: [[0, 1], [1, 0]],
  //     },
  //   ])
  // }

  // State
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [initialGraph, setInitialGraph] = useState<any>(null);
  const [hasLoadedInitialReasons, setHasLoadedInitialReasons] = useState(false);
  const [currentSort, setCurrentSort] = useState<{
    sort: "asc" | "desc";
    colId: string;
  } | null>(null);
  const isCompleted = graph && table && total;

  // Функция для получения отображаемого названия элемента с учетом приоритета
  const getDisplayName = useCallback((item: any, currentGroups: string[]) => {
    if (!currentGroups || currentGroups.length === 0) {
      return (
        item.store ||
        item.storeName ||
        item.store_name ||
        `Магазин ${item.store_id || item.idStore}`
      );
    }

    // Определяем приоритетную группировку (магазин в приоритете)
    let priorityGroup = currentGroups[0];
    if (currentGroups.includes("store") && currentGroups[0] !== "store") {
      priorityGroup = "store";
    }

    // Маппинг группировок к их отображаемым полям
    const groupFieldMap: Record<string, string[]> = {
      // Группировки по местоположению
      city: ["city"],
      region: ["region"],

      // Группировки по магазину
      store: ["store", "storeName", "store_name"],
      channel: ["channel"],
      ageGroup: ["ageGroup"],
      storeCondition: ["storeCondition"],
      legalEntity: ["legalEntity"],
      nameManager: ["nameManager"],
      formatStore: ["formatStore"],

      // Группировки по продукту
      groupsFranchise: ["groupsFranchise"],
      group: ["group"],
      subGroups: ["groupsSub", "subGroups"],
      directionProducts: ["directionProducts"],
      subSubGroups: ["groupsSubSub", "subSubGroups"],
      typeProducts: ["typeProducts"],
      product: ["product"],
      seasonalityProducts: ["seasonalityProducts"],
      managerAuto: ["managerAuto"],
      groupsEconomist: ["groupsEconomist"],

      // Группировка по типу списания
      writeOffType: ["ops"],
      ops: ["ops"],

      // Временные группировки
      day: ["date_group"],
      week: ["date_group"],
      month: ["date_group"],
      quarter: ["date_group"],
      year: ["date_group"],
    };

    const fields = groupFieldMap[priorityGroup];
    if (fields) {
      for (const field of fields) {
        if (item[field] !== undefined && item[field] !== null) {
          const value = item[field];

          // Специальная обработка для некоторых полей
          if (
            (priorityGroup === "nameManager" ||
              priorityGroup === "legalEntity") &&
            value === 0
          ) {
            return "Не указано";
          }

          if (typeof value === "string" && value.trim()) {
            return value.trim();
          } else if (typeof value === "number") {
            return value.toString();
          }
        }
      }
    }

    // Fallback
    return (
      item.store ||
      item.storeName ||
      item.store_name ||
      `Элемент ${item.id || "без ID"}`
    );
  }, []);

  // Функция для получения названия типа выбранных элементов
  const getSelectedItemsLabel = useCallback((currentGroups: string[]) => {
    if (!currentGroups || currentGroups.length === 0) {
      return "магазины";
    }

    // Определяем приоритетную группировку (магазин в приоритете)
    let priorityGroup = currentGroups[0];
    if (currentGroups.includes("store") && currentGroups[0] !== "store") {
      priorityGroup = "store";
    }

    const groupLabels: Record<string, string> = {
      city: "города",
      region: "регионы",
      store: "магазины",
      channel: "каналы",
      ageGroup: "возрасты магазинов",
      storeCondition: "статусы магазинов",
      legalEntity: "юр. лица",
      nameManager: "партнеры",
      formatStore: "форматы магазинов",
      groupsFranchise: "структуры продаж",
      group: "группы",
      subGroups: "подгруппы",
      directionProducts: "направления",
      subSubGroups: "подподгруппы",
      typeProducts: "типы поставщиков",
      product: "продукты",
      seasonalityProducts: "сезонности",
      managerAuto: "менеджеры автозаказа",
      groupsEconomist: "справочники экономистов",
      writeOffType: "типы списаний",
      ops: "типы списаний",
      day: "дни",
      week: "недели",
      month: "месяцы",
      quarter: "кварталы",
      year: "годы",
    };

    return groupLabels[priorityGroup] || "элементы";
  }, []);

  // Placeholder для поиска на основе группировки
  const searchPlaceholder = useMemo(() => {
    if (groups && groups.length > 0) {
      const primaryGroup = groups[0];
      const placeholderMap: Record<string, string> = {
        store: "Поиск по магазину",
        city: "Поиск по городу",
        region: "Поиск по региону",
        legalEntity: "Поиск по юр. лицу",
        nameManager: "Поиск по партнеру",
        formatStore: "Поиск по формату магазина",
        subGroups: "Поиск по подгруппе",
        subSubGroups: "Поиск по подподгруппе",
        groupsEconomist: "Поиск по справочнику экономистов",
        groupsFranchise: "Поиск по структуре продаж",
        typeProducts: "Поиск по типу поставщика",
        seasonalityProducts: "Поиск по сезонности",
        teamProducts: "Поиск по команде",
        directionProducts: "Поиск по направлению",
        channel: "Поиск по каналу",
        ageGroup: "Поиск по возрасту магазина",
        storeCondition: "Поиск по статусу магазина",
        tabNumber: "Поиск по кассиру",
        group: "Поиск по группе",
        product: "Поиск по продукту",
        managerAuto: "Поиск по менеджеру автозаказа",
        writeOffType: "Поиск по типу списания",
        ops: "Поиск по типу списания",
        // Временные группировки
        day: "Поиск по дню",
        week: "Поиск по неделе",
        month: "Поиск по месяцу",
        quarter: "Поиск по кварталу",
        year: "Поиск по году",
      };
      return placeholderMap[primaryGroup] || "Поиск";
    }
    return "Поиск по магазину";
  }, [groups]);

  // Сохраняем исходный график при первой загрузке
  useEffect(() => {
    if (graph && !initialGraph && selectedRows.length === 0) {
      setInitialGraph(graph);
    }
  }, [graph, initialGraph, selectedRows.length]);

  // Определяем заголовок графика на основе выбранного столбца
  const getGraphTitle = () => {
    // Маппинг colId к названиям для title
    const columnTitleMap: Record<string, string> = {
      writeOff: "Списания, руб.",
      writeOffWeight: "Списания, вес",
      writeOffCount: "Списания, кол-во",
    };

    // Если есть сортировка по определенному столбцу, используем его название
    if (currentSort && columnTitleMap[currentSort.colId]) {
      return columnTitleMap[currentSort.colId];
    }

    // Fallback к базовому названию
    return tab === "write-off-equip" ? "Списания по поломкам" : "Списания";
  };

  // Фильтрация таблицы по поиску (поддержка разных типов группировок)
  const filteredTable = useMemo(() => {
    if (!table?.data) return [];

    // Сначала агрегируем дублирующиеся записи
    const aggregatedData = aggregateDuplicateRows(table.data, groups);

    const term = searchTerm.trim().toLowerCase();
    if (!term) return aggregatedData;

    const tokens = term.split(/\s+/).filter((t) => t.length > 1);
    return aggregatedData.filter((row: any) => {
      // Определяем поле для поиска на основе группировки
      let searchField: any = "";

      if (groups && groups.length > 0) {
        const primaryGroup = groups[0];
        const searchFieldMap: Record<string, string[]> = {
          store: ["store", "storeName", "store_name"],
          city: ["city"],
          region: ["region"],
          legalEntity: ["legalEntity"],
          nameManager: ["nameManager"],
          formatStore: ["formatStore"],
          subGroups: ["groupsSub", "subGroups"],
          subSubGroups: ["groupsSubSub", "subSubGroups"],
          groupsEconomist: ["groupsEconomist"],
          groupsFranchise: ["groupsFranchise"],
          typeProducts: ["typeProducts"],
          seasonalityProducts: ["seasonalityProducts"],
          teamProducts: ["teamProducts"],
          directionProducts: ["directionProducts"],
          channel: ["channel"],
          ageGroup: ["ageGroup"],
          storeCondition: ["storeCondition"],
          tabNumber: ["tabNumber"],
          group: ["group"],
          product: ["product"],
          managerAuto: ["managerAuto"],
          writeOffType: ["ops"],
          ops: ["ops"],
          // Временные группировки
          day: ["date_group"],
          week: ["date_group"],
          month: ["date_group"],
          quarter: ["date_group"],
          year: ["date_group"],
        };

        const possibleFields = searchFieldMap[primaryGroup];
        if (possibleFields) {
          for (const field of possibleFields) {
            if (row[field]) {
              searchField = row[field];
              break;
            }
          }
        }
      }

      // Fallback к магазину если ничего не найдено
      if (!searchField) {
        searchField = row.store || row.storeName || row.store_name || "";
      }

      // Обработка числовых значений для поиска
      let name = "";
      if (typeof searchField === "number") {
        // Для числовых значений 0 в nameManager/legalEntity показываем "Не указано"
        if (
          (groups[0] === "nameManager" || groups[0] === "legalEntity") &&
          searchField === 0
        ) {
          name = "не указано";
        } else {
          name = searchField.toString();
        }
      } else if (searchField !== null && searchField !== undefined) {
        name = String(searchField);
      }
      name = name.toLowerCase();

      // Если нет токенов (короткий поиск), ищем точное вхождение
      if (tokens.length === 0) {
        return name.includes(term);
      }

      // Проверяем, что все токены присутствуют
      const fullMatch = tokens.every((token) => name.includes(token));
      if (fullMatch) return true;

      // Нечеткий поиск
      let idx = 0;
      for (let i = 0; i < term.length; i++) {
        const char = term[i];
        idx = name.indexOf(char, idx);
        if (idx === -1) return false;
        idx++;
      }
      return true;
    });
  }, [table?.data, searchTerm, groups]);

  const handleOpenSheet = (type: string) => {
    // Логика из Report.tsx - открываем боковую панель через URL
    if (type) {
      setTargetViewValue(type);
      navigate(`/write-off?open=true&tab=${tab || "write-off"}`);
    }
  };

  const handleClearFilters = () => {
    resetAllFilters();
    clearAll();
    setSelectedStore(null);
    setSelectedRows([]);
    setSearchTerm("");
    setInitialGraph(null);
    setCurrentSort(null);
    bumpDataVersion();
    setIsFiltersOpen(true);
  };

  // Обработчик изменения сортировки
  const handleSortChange = useCallback(
    async (sortInfo: { sort: "asc" | "desc"; colId: string }) => {
      console.log("handleSortChange called with:", sortInfo);
      console.log("Current tab:", tab);
      setCurrentSort(sortInfo);

      // Получаем текущий payload и обновляем сортировку
      const payload = getApiPayload();

      const updatedPayload = {
        ...payload,
        sorts: {
          sort: sortInfo.sort,
          colId: [sortInfo.colId], // Должен быть массив строк
        },
      };

      console.log("Updated payload:", updatedPayload);

      try {
        console.log("Making table request with sort...");
        // Обновляем таблицу с новой сортировкой в зависимости от таба
        let tableRes;
        if (tab === "write-off-equip") {
          console.log("Using getEquipmentTable for equipment tab");
          tableRes = await getEquipmentTable(updatedPayload);
        } else {
          console.log("Using getTable for write-off tab");
          tableRes = await getTable(updatedPayload);
        }

        if (tableRes) {
          // Обновляем данные в store
          setTable(tableRes);
        }

        console.log("Making total request with sort...");
        // Также обновляем total данные
        const totalRes = await getTotal(updatedPayload);
        if (totalRes) {
          setTotal(totalRes);
        }
      } catch (error) {
        console.error("Error updating table with sort:", error);
      }
    },
    [
      getApiPayload,
      getTable,
      getEquipmentTable,
      getTotal,
      setTable,
      setTotal,
      tab,
    ],
  );

  // Функция для сброса выбранного магазина
  const handleClearSelectedStore = useCallback(async () => {
    setSelectedStore(null);
    setSelectedRows([]); // Очищаем выбор строк

    // Если ничего не выбрано, делаем новый запрос для получения исходного графика
    const payload = getApiPayload();

    // Получаем текущую группировку из DateDropdown
    const currentDateGrouping = useWriteOffDateFilterStore.getState().value;

    // Формируем payload для графика с исходными фильтрами
    const graphPayload = {
      ...payload,
      groups: [currentDateGrouping],
      type: tab === "write-off-equip" ? "equipment" : "write_off",
    };

    try {
      const graphRes = await getGraph(graphPayload);
      if (graphRes) {
        setGraph(graphRes);
      }
    } catch (error) {
      console.error("Error restoring graph:", error);
    }

    // Загружаем общие reasons при очистке выбора
    fetchReasons(payload as any);
  }, [getApiPayload, fetchReasons, getGraph, setGraph, tab]);

  // Обработчик изменения выбора строк (как в sales-dynamics)
  const handleSelectionChange = useCallback(
    async (selectedRows: any[]) => {
      setSelectedRows(selectedRows);

      // Если выбрана только одна строка, устанавливаем её как selectedStore
      if (selectedRows.length === 1) {
        setSelectedStore(selectedRows[0]);
      } else {
        setSelectedStore(null);
      }

      // Получаем текущую группировку из DateDropdown
      const currentDateGrouping = useWriteOffDateFilterStore.getState().value;

      // Обновляем график на основе выбранных строк
      if (selectedRows.length > 0) {
        const payload = getApiPayload();

        // Извлекаем фильтры на основе текущих группировок
        const extractedFilters = extractFiltersBasedOnGrouping(
          selectedRows,
          groups,
        );

        // Создаем новые фильтры, объединяя текущие с извлеченными
        const mergedFilters = {
          ...payload.filters,
          store: {
            ...payload.filters.store,
            // Используем извлеченные фильтры если они есть, иначе оставляем текущие
            idStore:
              extractedFilters.store.idStore.length > 0
                ? extractedFilters.store.idStore
                : payload.filters.store.idStore,
            idCity:
              extractedFilters.store.idCity.length > 0
                ? extractedFilters.store.idCity
                : payload.filters.store.idCity,
            idRegion:
              extractedFilters.store.idRegion.length > 0
                ? extractedFilters.store.idRegion
                : payload.filters.store.idRegion,
            idManager:
              extractedFilters.store.idManager.length > 0
                ? extractedFilters.store.idManager
                : payload.filters.store.idManager,
            storeCondition:
              extractedFilters.store.storeCondition.length > 0
                ? extractedFilters.store.storeCondition
                : payload.filters.store.storeCondition,
            ageGroup:
              extractedFilters.store.ageGroup.length > 0
                ? extractedFilters.store.ageGroup
                : payload.filters.store.ageGroup,
            idLegalEntity:
              extractedFilters.store.idLegalEntity.length > 0
                ? extractedFilters.store.idLegalEntity
                : payload.filters.store.idLegalEntity,
            channel:
              extractedFilters.store.channel.length > 0
                ? extractedFilters.store.channel
                : payload.filters.store.channel,
            district:
              extractedFilters.store.district.length > 0
                ? extractedFilters.store.district
                : payload.filters.store.district,
          },
          product: {
            ...payload.filters.product,
            idProduct:
              extractedFilters.product.idProduct.length > 0
                ? extractedFilters.product.idProduct
                : payload.filters.product.idProduct,
            idGroupMain:
              extractedFilters.product.idGroupMain.length > 0
                ? extractedFilters.product.idGroupMain
                : payload.filters.product.idGroupMain,
            groupFranchise:
              extractedFilters.product.groupFranchise.length > 0
                ? extractedFilters.product.groupFranchise
                : payload.filters.product.groupFranchise,
            subGroups:
              extractedFilters.product.subGroups.length > 0
                ? extractedFilters.product.subGroups
                : payload.filters.product.subGroups,
            subSubGroups:
              extractedFilters.product.subSubGroups.length > 0
                ? extractedFilters.product.subSubGroups
                : payload.filters.product.subSubGroups,
            typeProducts:
              extractedFilters.product.typeProducts.length > 0
                ? extractedFilters.product.typeProducts
                : payload.filters.product.typeProducts,
            teamProducts:
              extractedFilters.product.teamProducts.length > 0
                ? extractedFilters.product.teamProducts
                : payload.filters.product.teamProducts,
            directionProducts:
              extractedFilters.product.directionProducts.length > 0
                ? extractedFilters.product.directionProducts
                : payload.filters.product.directionProducts,
            groupsEconomist:
              extractedFilters.product.groupsEconomist.length > 0
                ? extractedFilters.product.groupsEconomist
                : payload.filters.product.groupsEconomist,
            seasonalityProducts:
              extractedFilters.product.seasonalityProducts.length > 0
                ? extractedFilters.product.seasonalityProducts
                : payload.filters.product.seasonalityProducts,
            managerAuto:
              extractedFilters.product.managerAuto.length > 0
                ? extractedFilters.product.managerAuto
                : payload.filters.product.managerAuto,
          },
          check: {
            ...payload.filters.check,
            tabNumber:
              extractedFilters.check.tabNumber.length > 0
                ? extractedFilters.check.tabNumber
                : payload.filters.check.tabNumber,
            cashBox:
              extractedFilters.check.cashBox.length > 0
                ? extractedFilters.check.cashBox
                : payload.filters.check.cashBox,
            checkNumber:
              extractedFilters.check.checkNumber.length > 0
                ? extractedFilters.check.checkNumber
                : payload.filters.check.checkNumber,
            numberfield:
              extractedFilters.check.numberfield.length > 0
                ? extractedFilters.check.numberfield
                : payload.filters.check.numberfield,
            type:
              extractedFilters.check.type.length > 0
                ? extractedFilters.check.type
                : payload.filters.check.type,
          },
          loyal: {
            ...payload.filters.loyal,
            cardNumber:
              extractedFilters.loyal.cardNumber.length > 0
                ? extractedFilters.loyal.cardNumber
                : payload.filters.loyal.cardNumber,
            sex:
              extractedFilters.loyal.sex.length > 0
                ? extractedFilters.loyal.sex
                : payload.filters.loyal.sex,
            guidDiscount:
              extractedFilters.loyal.guidDiscount.length > 0
                ? extractedFilters.loyal.guidDiscount
                : payload.filters.loyal.guidDiscount,
            guidBonus:
              extractedFilters.loyal.guidBonus.length > 0
                ? extractedFilters.loyal.guidBonus
                : payload.filters.loyal.guidBonus,
            groupAge:
              extractedFilters.loyal.groupAge.length > 0
                ? extractedFilters.loyal.groupAge
                : payload.filters.loyal.groupAge,
          },
          onlineStore: {
            ...payload.filters.onlineStore,
            imTypeOrder:
              extractedFilters.onlineStore.imTypeOrder.length > 0
                ? extractedFilters.onlineStore.imTypeOrder
                : payload.filters.onlineStore.imTypeOrder,
            imDeliveryMethod:
              extractedFilters.onlineStore.imDeliveryMethod.length > 0
                ? extractedFilters.onlineStore.imDeliveryMethod
                : payload.filters.onlineStore.imDeliveryMethod,
            imPaymentMethod:
              extractedFilters.onlineStore.imPaymentMethod.length > 0
                ? extractedFilters.onlineStore.imPaymentMethod
                : payload.filters.onlineStore.imPaymentMethod,
            imStatusOrder:
              extractedFilters.onlineStore.imStatusOrder.length > 0
                ? extractedFilters.onlineStore.imStatusOrder
                : payload.filters.onlineStore.imStatusOrder,
            imPromo:
              extractedFilters.onlineStore.imPromo.length > 0
                ? extractedFilters.onlineStore.imPromo
                : payload.filters.onlineStore.imPromo,
            imReceiveInterval:
              extractedFilters.onlineStore.imReceiveInterval.length > 0
                ? extractedFilters.onlineStore.imReceiveInterval
                : payload.filters.onlineStore.imReceiveInterval,
          },
          writeoff: {
            ...payload.filters.writeoff,
            article:
              extractedFilters.writeoff &&
              extractedFilters.writeoff.article &&
              extractedFilters.writeoff.article.length > 0
                ? extractedFilters.writeoff.article
                : payload.filters.writeoff
                  ? payload.filters.writeoff.article
                  : [],
          },
        };

        // Обновляем график с правильным type
        const graphPayload = {
          ...payload,
          filters: mergedFilters,
          groups: [currentDateGrouping],
          values: payload.values,
          type: tab === "write-off-equip" ? "equipment" : "write_off", // Передаем правильный type
        };

        try {
          const graphRes = await getGraph(graphPayload);
          if (graphRes) {
            setGraph(graphRes);
          }
        } catch (error) {
          console.error("Error updating graph:", error);
        }

        // Загружаем reasons с теми же фильтрами что и график при выборе строк
        const reasonsPayload = {
          ...payload,
          filters: mergedFilters, // Используем те же фильтры что и для графика
        };

        fetchReasons(reasonsPayload as any);
      } else {
        // Если ничего не выбрано, делаем новый запрос для получения исходного графика
        const payload = getApiPayload();

        // Получаем текущую группировку из DateDropdown
        const currentDateGrouping = useWriteOffDateFilterStore.getState().value;

        // Формируем payload для графика с исходными фильтрами
        const graphPayload = {
          ...payload,
          groups: [currentDateGrouping],
          type: tab === "write-off-equip" ? "equipment" : "write_off",
        };

        try {
          const graphRes = await getGraph(graphPayload);
          if (graphRes) {
            setGraph(graphRes);
          }
        } catch (error) {
          console.error("Error restoring graph:", error);
        }

        // Загружаем общие reasons при очистке выбора
        fetchReasons(payload as any);
      }
    },
    [getApiPayload, fetchReasons, getGraph, setGraph, tab],
  );

  // Эффект для подготовки графика
  useEffect(() => {
    // График готов для отображения
  }, [graph, isGraphLoading, prepareLine]);

  // Сброс поиска и выбранных строк при изменении группировок
  useEffect(() => {
    setSearchTerm("");
    setSelectedRows([]);
    setSelectedStore(null);
    setInitialGraph(null); // Сбрасываем исходный график
  }, [groups]);

  // Эффект для автоскрытия фильтров после загрузки данных
  useEffect(() => {
    // Автоматически скрываем фильтры после получения данных
    if (isCompleted && !hasLoadedInitialReasons && selectedRows.length === 0) {
      setHasLoadedInitialReasons(true);
      setIsFiltersOpen(false);
    }
  }, [
    isCompleted,
    hasLoadedInitialReasons,
    selectedRows.length,
    setIsFiltersOpen,
  ]); // При завершении загрузки

  // Эффект для обработки total данных
  useEffect(() => {
    // Total данные готовы
  }, [total]);

  // Вычисляем данные для карточек статистики
  // Если есть выбранные строки - показываем агрегированную статистику по ним
  // Иначе показываем общую статистику
  const statsData = useMemo(() => {
    if (selectedRows.length > 0) {
      // Если есть выбранные строки, агрегируем их данные
      return aggregateSelectedRowsStats(selectedRows);
    }
    // Иначе используем общий total
    return total;
  }, [selectedRows, total]);

  // Показываем общую заглушку, если нет данных
  if (!isCompleted) {
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-row gap-1 items-center justify-end">
          <DateDropdown />
          <Button
            className="w-fit"
            size="sm"
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            {!isFiltersOpen ? (
              <>
                Изменить фильтры <Cog className="text-primary/80" />
              </>
            ) : (
              <>
                Показать график <Cog className="text-primary/80" />
              </>
            )}
          </Button>
          <Button size="sm" onClick={handleClearFilters} variant="outline">
            Очистить фильтры <Eraser className="text-primary/80" />
          </Button>
        </div>

        {isFiltersOpen && (
          <WriteOffFilters
            isOpen={isFiltersOpen}
            onOpenSheet={handleOpenSheet}
          />
        )}
        <div className="flex flex-row gap-2 h-full dark:opacity-70 w-full justify-center items-end mb-[10%]">
          {error ? <NotFoundFilters /> : <NotSelectedFilters />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 h-full">
      {/* Левая часть: График и Таблица */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Верхняя панель с кнопками */}
        <div className="flex flex-row gap-1 justify-end mb-4">
          <DateDropdown />
          <Button
            className="w-fit"
            size="sm"
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            {!isFiltersOpen ? (
              <>
                Изменить фильтры <Cog className="text-primary/80" />
              </>
            ) : (
              <>
                Показать график <Cog className="text-primary/80" />
              </>
            )}
          </Button>
          <Button size="sm" onClick={handleClearFilters} variant="outline">
            Очистить фильтры <Eraser className="text-primary/80" />
          </Button>
        </div>

        {/* График или Фильтры */}
        <div className="flex-shrink-0 mb-4">
          {!isFiltersOpen ? (
            graph ? (
              <div className="h-64 w-full">
                <StackedLine
                  key={`graph-${JSON.stringify(graph).slice(0, 100)}-${currentSort?.colId || "default"}`}
                  option={{
                    title: {
                      text: getGraphTitle(),
                    },
                    legend: {
                      data: ["Текущий период", "Прошлый год"],
                    },
                    series: graph
                      ? prepareLine(graph)
                      : [
                          [0, 1],
                          [1, 0],
                        ],
                  }}
                />
              </div>
            ) : (
              <div className="h-64 w-full">
                <AnimatePresence>
                  <FiltersAccordeon
                    defaultOpen={!isCompleted}
                    isOpen={isFiltersOpen}
                  />
                </AnimatePresence>
              </div>
            )
          ) : (
            <WriteOffFilters
              isOpen={isFiltersOpen}
              onOpenSheet={handleOpenSheet}
            />
          )}
        </div>

        {/* Таблица */}
        <div className="flex-1 min-h-0 flex flex-col">
          {/* Поиск и фильтры */}
          <div className="flex-shrink-0 mb-2 h-10 gap-2 flex items-center">
            <Input
              placeholder={searchPlaceholder}
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {selectedRows.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Выбранные {getSelectedItemsLabel(groups)}:{" "}
                    {selectedRows.length}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col gap-2">
                    {selectedRows.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 gap-8 w-full"
                      >
                        <span className="col-span-4">
                          {getDisplayName(row, groups)}
                        </span>
                        <X
                          className="cursor-pointer"
                          onClick={() => {
                            const newSelectedRows = selectedRows.filter(
                              (_, i) => i !== index,
                            );
                            setSelectedRows(newSelectedRows);
                            handleSelectionChange(newSelectedRows);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {/* Таблица */}
          <div className="flex-1 min-h-0">
            {table && total ? (
              <UniversalTable
                selectionType="multiple"
                onSelectionChange={handleSelectionChange}
                onSortChange={handleSortChange}
                data={filteredTable as any}
                totalData={total ? [total] : undefined}
                columnDefs={columnDefs}
              />
            ) : (
              <div className="flex flex-row gap-2 h-full dark:opacity-70 w-full justify-center items-end mb-[10%]">
                {error ? <NotFoundFilters /> : <NotSelectedFilters />}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Правая часть: Карточки и Круговой график */}
      {tab === "write-off" && (
        <>
          <div className="w-110 flex-shrink-0 flex flex-col min-h-0 gap-4">
            {/* Карточки */}
            <div>
              <WriteOffStatsCards data={statsData} />
            </div>

            {/* Круговой график */}
            <div className="flex-1 min-h-0">
              <WriteOffReasonsChart
                key={`reasons-${selectedRows.length}-${groups.join("-")}`}
                isLoading={isReasonsLoading}
                data={reasons || undefined}
                selectedStore={selectedStore}
                selectedRows={selectedRows}
                onClearSelectedStore={handleClearSelectedStore}
                forceResize={isFiltersOpen}
                currentGroups={groups}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
