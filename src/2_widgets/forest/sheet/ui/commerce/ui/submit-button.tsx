import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../../../model/filters-store";
import { useForest } from "@entities/forest/model/api/filters/data/controller";
import { useForestStore } from "../../../model/forest-store";
import { useSearchParams } from "react-router";
import { useDateFilterStore } from "@pages/forest/ui/date-dropdown";
import { ApiError } from "@shared/api/types";
import { useCallback } from "react";
import {
  useGraphVersionStore,
  useTableVersionStore,
} from "@pages/forest/ui/forest";
import { useCountStore } from "@pages/forest/model/usCountStore";
import { parseISO, isValid } from "date-fns";

// Константы для валидации дат (аналогично другим модулям)
const MIN_DATE = new Date(2018, 4, 1); // 1 мая 2018
const MAX_DATE = new Date(); // Сегодняшняя дата

// Функция для валидации даты
const isValidDate = (dateString: string): boolean => {
  if (!dateString || dateString.trim() === "") {
    return false;
  }

  // Проверяем формат даты (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  // Парсим дату и проверяем валидность
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return false;
  }

  // Проверяем диапазон дат
  if (date < MIN_DATE || date > MAX_DATE) {
    return false;
  }

  return true;
};

export const CombinedSubmitButton = ({
  className,
}: React.ComponentProps<"button">) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bumpDataVersion } = useTableVersionStore();
  const { bumpGraphVersion } = useGraphVersionStore();
  const { getApiPayload, filters } = useFiltersStore();
  const { setGraph, setTotal, setTable, setError, clearAll } = useForestStore();
  const { getGraph, getTable, getTotal } = useForest();
  const { setCount } = useCountStore();
  const { value } = useDateFilterStore();

  // 🔄 Всегда актуальные данные для disabled
  const isDisabled = useCallback(() => {
    const { groups, values } = getApiPayload();
    return (
      groups.length === 0 ||
      values.length === 0 ||
      !isValidDate(filters.filterDate.dateStart) ||
      !isValidDate(filters.filterDate.dateEnd)
    );
  }, [getApiPayload, filters.filterDate.dateStart, filters.filterDate.dateEnd]);

  const handleSubmit = async () => {
    clearAll();
    try {
      const allData = getApiPayload();

      const newParams = new URLSearchParams(searchParams);
      newParams.set("open", "false");
      setSearchParams(newParams);

      const [graph, total, table] = await Promise.all([
        getGraph({
          ...allData,
          values: [allData.values[0]],
          groups: [value],
          filters: {
            ...allData.filters,
            //loyal: {
            //  ...allData.filters.loyal,
            //  ageStart:
            //    allData.filters.loyal.ageStart === 0 &&
            //    allData.filters.loyal.ageEnd === 100
            //      ? null
            //      : allData.filters.loyal.ageStart,
            //  ageEnd:
            //    allData.filters.loyal.ageStart === 0 &&
            //    allData.filters.loyal.ageEnd === 100
            //      ? null
            //      : allData.filters.loyal.ageEnd,
            //},
          },
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
        getTotal({
          ...allData,
          filters: {
            ...allData.filters,
            //loyal: {
            //  ...allData.filters.loyal,
            //  ageStart:
            //    allData.filters.loyal.ageStart === 0 &&
            //    allData.filters.loyal.ageEnd === 100
            //      ? null
            //      : allData.filters.loyal.ageStart,
            //  ageEnd:
            //    allData.filters.loyal.ageStart === 0 &&
            //    allData.filters.loyal.ageEnd === 100
            //      ? null
            //      : allData.filters.loyal.ageEnd,
            //},
          },
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
        getTable({
          ...allData,
          filters: {
            ...allData.filters,
            //loyal: {
            //  ...allData.filters.loyal,
            //  ageStart:
            //    allData.filters.loyal.ageStart === 0 &&
            //    allData.filters.loyal.ageEnd === 100
            //      ? null
            //      : allData.filters.loyal.ageStart,
            //  ageEnd:
            //    allData.filters.loyal.ageStart === 0 &&
            //    allData.filters.loyal.ageEnd === 100
            //      ? null
            //      : allData.filters.loyal.ageEnd,
            //},
          },
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
      ]);

      setGraph(graph);
      setTotal(total);
      setTable(table);
      setCount(table.totalRows);
      bumpDataVersion();
      bumpGraphVersion();
    } catch (error) {
      console.error("Error fetching report:", error);
      setError(error as ApiError);
    }
  };

  return (
    <Button
      className={className}
      onClick={handleSubmit}
      disabled={isDisabled()}
    >
      Получить отчет
    </Button>
  );
};
