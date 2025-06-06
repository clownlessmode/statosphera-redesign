import { Button } from "@shared/ui/button";
import { FormLabel } from "@shared/ui/form";

export const BooleanFilter = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null | undefined;
  onChange: (value: boolean | null) => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <FormLabel>{label}</FormLabel>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={value === null ? "default" : "outline"}
          onClick={() => onChange(null)}
        >
          Все
        </Button>
        <Button
          type="button"
          size="sm"
          variant={value === true ? "default" : "outline"}
          onClick={() => onChange(true)}
        >
          Да
        </Button>
        <Button
          type="button"
          size="sm"
          variant={value === false ? "default" : "outline"}
          onClick={() => onChange(false)}
        >
          Нет
        </Button>
      </div>
    </div>
  );
};
