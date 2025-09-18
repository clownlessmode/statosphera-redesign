import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { cn } from "@shared/lib/utils";
import { Badge, Check, LucideIcon } from "lucide-react";
import type { FC } from "react";

interface Option {
  label: string;
  value: any;
  defaultChecked?: boolean;
  disableCheck?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
}

interface Props extends Omit<CheckboxPrimitive.CheckboxProps, "onChange"> {
  options: Option[];
  className?: string;
  disableCheck?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  selectAll?: boolean;
  defaultSelectAllValue?: string;
}

const CheckboxCards: FC<Props> = ({
  options,
  className,
  disableCheck = false,
  value,
  onChange,
  disabled = false,
  selectAll = false,
  defaultSelectAllValue = "all",
}) => {
  const handleClick = (optionValue: string) => {
    if (optionValue === defaultSelectAllValue) {
      onChange?.([]);
      return;
    }

    const currentValue = value || [];
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter((v) => v !== optionValue)
      : [...currentValue, optionValue];

    onChange?.(newValue);
  };

  const allOptions = selectAll
    ? [
        {
          label: "Все",
          value: defaultSelectAllValue,
          icon: Badge,
        },
        ...options,
      ]
    : options;

  // Set default value to empty array if selectAll is true and no value is provided
  const defaultValue = value || [];

  const isAllSelected = selectAll && defaultValue.length === 0;
  const isMobile = useIsMobile();
  return (
    <div className={cn("w-full grid grid-cols-2 gap-2", className)}>
      {allOptions.map((option) => (
        <CheckboxPrimitive.Root
          disabled={option.disabled || disabled}
          key={option.value}
          checked={
            option.value === defaultSelectAllValue
              ? isAllSelected
              : defaultValue.includes(option.value)
          }
          onCheckedChange={() => handleClick(option.value)}
          className={cn(
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-xs data-[state=checked]:hover:bg-primary/90",
            "h-9 px-4 py-2 has-[>svg]:px-3",
            "border border-input bg-background shadow-xs hover:border-muted-foreground ",
            "relative flex transition-all active:scale-[0.99] hover:shadow-sm cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium  disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            isMobile && option.label?.length > 15 && "col-span-2",
          )}
        >
          {option.icon && <option.icon />}
          {option.label}
          {!disableCheck && !option.disableCheck && (
            <CheckboxPrimitive.Indicator className="absolute top-1/2 -translate-y-1/2 right-4">
              <Check className=" text-primary-foreground" strokeWidth={2} />
            </CheckboxPrimitive.Indicator>
          )}
        </CheckboxPrimitive.Root>
      ))}
    </div>
  );
};

export default CheckboxCards;
