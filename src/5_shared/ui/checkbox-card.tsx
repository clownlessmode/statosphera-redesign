import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@shared/lib/utils";
import { Check, LucideIcon } from "lucide-react";
import type { FC } from "react";

interface CheckboxCardProps {
  label: string;
  name?: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  disableCheckIcon?: boolean;
}

const CheckboxCard: FC<CheckboxCardProps> = ({
  label,
  name,
  value,
  defaultValue,
  onChange,
  icon: Icon,
  disabled = false,

  disableCheckIcon = false,
}) => {
  const handleChange = (checked: boolean) => {
    onChange?.(checked);
  };

  return (
    <CheckboxPrimitive.Root
      name={name}
      checked={value}
      defaultChecked={defaultValue}
      onCheckedChange={handleChange}
      disabled={disabled}
      className={cn(
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-xs data-[state=checked]:hover:bg-primary/90",
        "h-9 px-4 py-2 has-[>svg]:px-3",
        "border border-input bg-background shadow-xs hover:border-muted-foreground ",
        "relative flex transition-all active:scale-[0.99] hover:shadow-sm cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium  disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon
            className={cn(
              "size-4 shrink-0",
              "group-data-[state=checked]:text-primary-foreground",
              "group-hover:text-accent-foreground"
            )}
          />
        )}
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      </div>

      {!disableCheckIcon && (
        <CheckboxPrimitive.Indicator className="absolute top-1/2 -translate-y-1/2 right-4">
          <Check className=" text-primary-foreground" strokeWidth={2} />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
};

export default CheckboxCard;
