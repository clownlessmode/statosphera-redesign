import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../../../model/filters-store";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import { useReportStore } from "../../../model/report-store";
import { useSearchParams } from "react-router";
import { useDateFilterStore } from "@pages/report/ui/date-dropdown";
import { ApiError } from "@shared/api/types";
import { useCallback } from "react";
import { useTableVersionStore } from "@pages/report/ui/report";

export const CombinedSubmitButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bumpDataVersion } = useTableVersionStore();
  const { getApiPayload } = useFiltersStore();
  const { setGraph, setTotal, setTable, setError, clearAll } = useReportStore();
  const { getGraph, getTable, getTotal } = useReport();
  const { value } = useDateFilterStore();

  // 🔄 Всегда актуальные данные для disabled
  const isDisabled = useCallback(() => {
    const { groups, values } = getApiPayload();
    return groups.length === 0 || values.length === 0;
  }, [getApiPayload]);

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
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
        getTotal({
          ...allData,
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
        getTable({
          ...allData,
          filters: {
            ...allData.filters,
            loyal: {
              ...allData.filters.loyal,
              ageStart:
                allData.filters.loyal.ageStart === 0 &&
                allData.filters.loyal.ageEnd === 100
                  ? null
                  : allData.filters.loyal.ageStart,
              ageEnd:
                allData.filters.loyal.ageStart === 0 &&
                allData.filters.loyal.ageEnd === 100
                  ? null
                  : allData.filters.loyal.ageEnd,
            },
          },
          sorts: { colId: [allData.values[0]], sort: "desc" },
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
    <Button onClick={handleSubmit} disabled={isDisabled()}>
      Получить отчет
    </Button>
  );
};
