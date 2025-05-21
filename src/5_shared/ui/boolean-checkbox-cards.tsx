import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@shared/lib/utils";
import { Check, LucideIcon } from "lucide-react";
import type { FC } from "react";

interface Option {
  label: string;
  value: any;
  disabled?: boolean;
  icon?: LucideIcon;
  disableCheck?: boolean;
}

interface Props
  extends Omit<CheckboxPrimitive.CheckboxProps, "onChange" | "checked"> {
  options: Option[];
  className?: string;
  disableCheck?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const BooleanCheckboxCard: FC<Props> = ({
  options,
  className,
  disableCheck = false,
  value = null,
  onChange,
}) => {
  const handleClick = (optionValue: any) => {
    // Переключаем выбор: если уже выбран - снимаем, иначе выбираем
    const newValue = value === optionValue ? null : optionValue;
    onChange?.(newValue);
  };

  return (
    <div className={cn("w-full grid grid-cols-2 gap-2", className)}>
      {options.map((option) => (
        <CheckboxPrimitive.Root
          disabled={option.disabled}
          key={option.value}
          checked={value === option.value}
          onCheckedChange={() => handleClick(option.value)}
          className={cn(
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            "h-9 px-4 py-2 has-[>svg]:px-3",
            "border border-input bg-background hover:border-muted-foreground",
            "relative flex transition-all active:scale-[0.99] cursor-pointer",
            "items-center justify-center gap-1 whitespace-nowrap rounded-md",
            "text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
            "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {option.icon && <option.icon />}
          {option.label}
          {!disableCheck && !option.disableCheck && (
            <CheckboxPrimitive.Indicator className="absolute top-1/2 -translate-y-1/2 right-4">
              <Check className="text-primary-foreground" strokeWidth={2} />
            </CheckboxPrimitive.Indicator>
          )}
        </CheckboxPrimitive.Root>
      ))}
    </div>
  );
};

export default BooleanCheckboxCard;
