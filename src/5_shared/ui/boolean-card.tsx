import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@shared/lib/utils";

export interface BooleanCardProps {
  /** текущее булево значение */
  value: boolean;
  /** onChange из FormField */
  onChange: (value: boolean) => void;
  /** onBlur из FormField, если нужно */
  onBlur?: () => void;
  /** надпись на карточке */
  label: string;
  /** опциональная иконка */
  icon?: React.ComponentType<any>;
  /** если true — не показывать галочку */
  disableCheck?: boolean;
  /** блокировка */
  disabled?: boolean;
  /** доп. классы */
  className?: string;
}

export const BooleanCard: React.FC<BooleanCardProps> = ({
  value,
  onChange,
  onBlur,
  label,
  icon: Icon,
  disableCheck = false,
  disabled = false,
  className,
}) => {
  return (
    <CheckboxPrimitive.Root
      checked={value}
      disabled={disabled}
      onCheckedChange={(state) => {
        onChange(state === true);
      }}
      onBlur={onBlur}
      className={cn(
        "h-9 px-4 py-2 border bg-background hover:border-muted-foreground",
        "relative flex items-center justify-center gap-1 whitespace-nowrap rounded-md",
        "text-sm font-medium cursor-pointer transition active:scale-[0.99]",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {Icon && <Icon />}
      {label}
      {!disableCheck && value && (
        <CheckboxPrimitive.Indicator className="absolute top-1/2 -translate-y-1/2 right-4">
          <Check strokeWidth={2} />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
};
