import { NotFoundRow } from "@shared/ui/table/not-found-row";
import { FC, ReactNode } from "react";

interface KeyValueProps {
  label: string;
  value?: string | number | boolean | null | undefined | any[];
  renderValue?: (value: any) => ReactNode;
}

export const KeyValue: FC<KeyValueProps> = ({ label, value, renderValue }) => {
  if (renderValue) {
    return (
      <div className="flex flex-row justify-between w-full">
        <p className="text-muted-foreground pl-3">{label}:</p>
        {renderValue(value)}
      </div>
    );
  }

  let displayValue: ReactNode;

  if (value === undefined || value === null) {
    displayValue = "-";
  } else if (Array.isArray(value)) {
    displayValue = value.length > 0 ? value.join(", ") : "-";
  } else if (typeof value === "boolean") {
    displayValue = value ? "Да" : "Нет";
  } else {
    displayValue = String(value);
  }

  return (
    <div className="flex flex-row justify-between w-full">
      <p className="text-muted-foreground pl-3">{label}:</p>
      <NotFoundRow value={displayValue} className="font-medium" />
    </div>
  );
};
