// features/combined-form-submit/ui/combined-submit-button.tsx
import { Button } from "@shared/ui/button";
import { useFiltersStore } from "../model/store";

export const CombinedSubmitButton = () => {
  const { getApiPayload } = useFiltersStore();
  const allData = getApiPayload();

  const handleSubmit = () => {
    console.log(allData.groups);
  };

  return (
    <Button onClick={handleSubmit} disabled={allData.groups.length == 0}>
      Получить отчет
    </Button>
  );
};
