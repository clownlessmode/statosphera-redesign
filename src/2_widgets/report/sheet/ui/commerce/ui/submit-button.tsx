import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../../../model/filters-store";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import { useReportStore } from "../../../model/report-store";
import { useSearchParams } from "react-router";
import { useDateFilterStore } from "@pages/report/ui/date-dropdown";
export const CombinedSubmitButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { getApiPayload } = useFiltersStore();
  const { setGraph, setTotal, setTable } = useReportStore();

  const allData = getApiPayload();
  const { value } = useDateFilterStore();
  const disabled = allData.groups.length === 0 || allData.values.length === 0;
  const { getGraph, getTable, getTotal } = useReport();

  const handleSubmit = async () => {
    try {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("open", "false");
      setSearchParams(newParams);
      const [graph, total, table] = await Promise.all([
        getGraph({
          ...allData,
          values: [allData.values[0]],
          groups: [value],
          sorts: { colId: [allData.values[0]], sort: "asc" },
        }),
        getTotal({
          ...allData,
          sorts: { colId: [allData.values[0]], sort: "asc" },
        }),
        getTable({
          ...allData,
          sorts: { colId: [allData.values[0]], sort: "asc" },
        }),
      ]);

      setGraph(graph);
      setTotal(total);
      setTable(table);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <Button onClick={handleSubmit} disabled={disabled}>
      Получить отчет
    </Button>
  );
};
