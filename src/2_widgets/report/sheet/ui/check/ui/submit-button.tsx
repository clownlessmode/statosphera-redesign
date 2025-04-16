import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../model/store";

export const CombinedSubmitButton = () => {
  const { getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  const disabled = allData.groups.length == 0 || allData.values.length == 0;
  const handleSubmit = () => {
    console.log(allData);
  };

  return (
    <Button onClick={handleSubmit} disabled={disabled}>
      Получить отчет
    </Button>
  );
};
