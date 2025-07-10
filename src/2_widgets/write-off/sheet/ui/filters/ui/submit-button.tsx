import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../../../model/filters-store";
import { useWriteOffStore } from "@pages/write-off/model/write-off-store";
import { useSearchParams } from "react-router";
import { useCallback } from "react";
import { useWriteOffVersionStore } from "@pages/write-off/model/write-off-version-store";
import { useCountStore } from "@pages/report/model/usCountStore";
import { useTabStore } from "../../../model/url-store";
import { useWriteOffDateFilterStore } from "@pages/write-off/ui/date-dropdown";
import { useWriteOffController } from "@pages/write-off/api/controller";
import { useWriteOffReasonsController } from "@pages/write-off/model/write-off-reasons-controller";

export const CombinedSubmitButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bumpDataVersion } = useWriteOffVersionStore();
  const {
    getApiPayload,
    filters,
    filterDate,
    groups,
    values,
    sorts,
    limit,
    offset,
  } = useFiltersStore();
  const { setGraph, setTotal, setTable, setError, clearAll } =
    useWriteOffStore();
  const { setCount } = useCountStore();
  const { tab } = useTabStore();
  const { value: dateGrouping } = useWriteOffDateFilterStore();
  const { getGraph, getTable, getEquipmentTable, getTotal } =
    useWriteOffController();
  const { fetchReasons } = useWriteOffReasonsController();

  // Определяем тип на основе выбранного таба
  const getType = () => {
    return tab === "write-off-equip" ? "equipment" : "write_off";
  };

  // Выбираем правильный метод для таблицы на основе таба
  const getTableMethod = () => {
    return tab === "write-off-equip" ? getEquipmentTable : getTable;
  };

  // 🔄 Всегда актуальные данные для disabled
  const isDisabled = useCallback(() => {
    const { groups } = getApiPayload();

    // Для списаний достаточно только группировок, так как у нас фиксированный индикатор
    return groups.length === 0;
  }, [getApiPayload]);

  const handleSubmit = async () => {
    clearAll();
    const allData = getApiPayload();
    const type = getType();
    const tableMethod = getTableMethod();

    const newParams = new URLSearchParams(searchParams);
    newParams.set("open", "false");
    setSearchParams(newParams);

    // Формируем payload для таблиц (с группировками из фильтров)
    const tablePayload = {
      ...allData,
      type: type, // Добавляем тип
    };

    // Формируем payload для графиков (с группировкой из DateDropdown)
    const graphPayload = {
      ...allData,
      groups: [dateGrouping], // Используем группировку из DateDropdown
      type: type, // Добавляем тип
    };

    // Отладочная информация

    // Делаем запросы отдельно, чтобы ошибки в одном не прерывали другие
    try {
      const graphResponse = await getGraph(graphPayload);

      setGraph(graphResponse);
    } catch (error) {
      console.error("❌ Error fetching graph:", error);
      setError("Ошибка при загрузке графика");
    }

    try {
      const totalResponse = await getTotal(tablePayload);

      setTotal(totalResponse);
    } catch (error) {
      console.error("❌ Error fetching total:", error);
      // Не устанавливаем ошибку, так как график уже может быть загружен
    }

    try {
      const tableResponse = await tableMethod(tablePayload);

      setTable(tableResponse);
      setCount(tableResponse.totalRows);
    } catch (error) {
      console.error("❌ Error fetching table:", error);
      // Не устанавливаем ошибку, так как график уже может быть загружен
    }

    // Загружаем reasons только при нажатии кнопки "Получить отчет по списаниям"
    try {
      // Создаем объект с нужными полями для fetchReasons
      const filtersState = {
        filters,
        filterDate,
        groups,
        values,
        sorts,
        limit,
        offset,
        uniques: [],
        indicators: [],
        filterTime: { timeStart: "", timeEnd: "" },
        updateStoreFilter: () => {},
        updateProductFilter: () => {},
        updateCheckFilter: () => {},
        updateLoyalFilter: () => {},
        updateOnlineStoreFilter: () => {},
        updateWriteoffFilter: () => {},
        updateDateFilter: () => {},
        updateTimeFilter: () => {},
        updateSorts: () => {},
        updatePagination: () => {},
        updateGroups: () => {},
        updateUniques: () => {},
        updateIndicators: () => {},
        resetAllFilters: () => {},
        getApiPayload: () => allData,
      };

      await fetchReasons(filtersState);
    } catch (error) {
      console.error("❌ Error fetching reasons:", error);
      // Не устанавливаем ошибку, так как основные данные уже могут быть загружены
    }

    bumpDataVersion();
  };

  return (
    <Button onClick={handleSubmit} disabled={isDisabled()}>
      Получить отчет по списаниям
    </Button>
  );
};
