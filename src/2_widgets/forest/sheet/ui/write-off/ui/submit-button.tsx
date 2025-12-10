import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../../../model/filters-store";
import { useWriteOffController } from "@entities/forest/model/api/filters/data-write-off/controller";
import { useForestStore } from "../../../model/forest-store";
import { useSearchParams } from "react-router";
import { useDateFilterStore } from "@pages/forest/ui/date-dropdown";
import { ApiError } from "@shared/api/types";
import { useCallback } from "react";
import { useTableVersionStore } from "@pages/forest/ui/forest";
import { parseISO, isValid } from "date-fns";

// Константы для валидации дат
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
  const { getApiPayload, filters } = useFiltersStore();
  const { setGraph, setTotal, setTable, setError, clearAll } = useForestStore();
  const { getGraph, getTable, getTotal } = useWriteOffController();
  const { value: dateGrouping } = useDateFilterStore();

  const isDisabled = useCallback(() => {
    // Для списаний indicators (values) фиксированы или не обязательны для выбора пользователем,
    // поэтому проверяем только группировки и даты
    const { groups } = getApiPayload();
    return (
      groups.length === 0 ||
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
          groups: [dateGrouping],
          sorts: { colId: ["costPrice"], sort: "desc" },
        }),
        getTotal({
          ...allData,
          sorts: { colId: ["costPrice"], sort: "desc" },
        }),
        getTable({
          ...allData,
          sorts: { colId: ["costPrice"], sort: "desc" },
        }),
      ]);

      setGraph(graph);
      setTotal(total);
      setTable(table);
      bumpDataVersion();
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
