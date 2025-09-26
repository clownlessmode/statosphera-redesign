import { cn } from "@shared/lib/utils";
import { DataSubmitButton } from "./data-submit-button";
import { GroupingSubmitButton } from "./grouping-submit-button";

export const DualSubmitButtons = ({
  className,
}: React.ComponentProps<"button">) => {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Основная кнопка для обновления данных */}
      <DataSubmitButton />

      {/* Вторичная кнопка для обновления группировок */}
      <GroupingSubmitButton />
    </div>
  );
};
