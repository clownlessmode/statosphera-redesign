import { Button } from "@shared/ui/button";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
import { useSearchParams } from "react-router";
import { useCallback } from "react";
import { useSummaryController } from "@pages/summary/api/controller";
import { useSummaryStore, useSummaryVersionStore } from "@pages/summary/model";
import { useCountStore } from "@pages/report/model/usCountStore";

export const CombinedSubmitButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bumpDataVersion } = useSummaryVersionStore();
  const {
    getApiPayload,
    filters,
    filterDate,
    groups,
    values,
    sorts,
    limit,
    offset,
  } = useSummaryFiltersStore();
  const { setCards, setTotal, setTable, setError, clearAll, setNomenklatura } =
    useSummaryStore();
  const { setCount } = useCountStore();
  const { getTable, getNomenklatura } = useSummaryController();

  // 🔄 Всегда актуальные данные для disabled
  const isDisabled = useCallback(() => {
    const { groups } = getApiPayload();

    // Для summary достаточно только группировок
    return groups.length === 0;
  }, [getApiPayload]);

  const handleSubmit = async () => {
    clearAll();
    const allData = getApiPayload();
    console.log("ALLDATA", allData);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("open", "false");
    setSearchParams(newParams);

    try {
      //   const cardsResponse = await getCards(allData);
      //   setCards(cardsResponse);
    } catch (error) {
      console.error("❌ Error fetching cards:", error);
    }

    try {
      const nomenklaturaResponse = await getNomenklatura(allData);
      setNomenklatura(nomenklaturaResponse);
    } catch (error) {
      console.error("❌ Error fetching nomenklatura:", error);
    }

    bumpDataVersion();
  };

  return (
    <Button onClick={handleSubmit} disabled={isDisabled()}>
      Получить отчет по сводке
    </Button>
  );
};
