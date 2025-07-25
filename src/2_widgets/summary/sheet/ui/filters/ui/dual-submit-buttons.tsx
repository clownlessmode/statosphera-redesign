import { DataSubmitButton } from "./data-submit-button";
import { GroupingSubmitButton } from "./grouping-submit-button";

export const DualSubmitButtons = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Основная кнопка для обновления данных */}
      <DataSubmitButton />

      {/* Вторичная кнопка для обновления группировок */}
      <GroupingSubmitButton />
    </div>
  );
};
