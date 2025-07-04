import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XCircle, ArrowRight } from "lucide-react";
import { cn } from "@shared/lib/utils";

import { Button } from "@shared/ui/button";
import { Badge } from "@shared/ui/badge";
import { Input } from "@shared/ui/input";

const multipleInputVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground/10 text-foreground bg-background",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface MultipleInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "value" | "onChange"
    >,
    VariantProps<typeof multipleInputVariants> {
  value?: (string | number)[];
  onValueChange?: (value: (string | number)[]) => void;
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "inverted";
  type?: "string" | "number";
}

export const MultipleInput = React.forwardRef<
  HTMLInputElement,
  MultipleInputProps
>(
  (
    {
      value = [],
      onValueChange,
      variant,
      placeholder = "Введите значение",
      animation = 0,
      maxCount = 2,
      className,
      type = "string",
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleAddValue = () => {
      if (inputValue.trim() && !value.includes(inputValue.trim())) {
        if (type === "number") {
          const numValue = Number(inputValue.trim());
          if (isNaN(numValue)) return;
          onValueChange?.([...value, numValue]);
        } else {
          onValueChange?.([...value, inputValue.trim()]);
        }
        setInputValue("");
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (type === "number") {
        // Allow only numbers
        if (/^\d*$/.test(newValue)) {
          setInputValue(newValue);
        }
      } else {
        // Allow only latin letters and numbers for string type
        if (/^[a-zA-Z0-9]*$/.test(newValue)) {
          setInputValue(newValue);
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddValue();
      }
    };

    const removeValue = (valueToRemove: string | number) => {
      onValueChange?.(value.filter((v) => v !== valueToRemove));
    };

    const clearExtraOptions = () => {
      onValueChange?.(value.slice(0, maxCount));
    };

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex gap-2">
          <Input
            ref={ref}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            type={type}
            className="flex-1 border-foreground/10 text-foreground bg-background"
            {...props}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAddValue}
            disabled={!inputValue.trim()}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {value.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {value.slice(0, maxCount).map((item) => (
              <Badge
                key={item}
                className={cn(
                  multipleInputVariants({ variant }),
                  "cursor-pointer",
                )}
                style={{ animationDuration: `${animation}s` }}
                onClick={() => removeValue(item)}
              >
                {item}
                <XCircle className="ml-2 h-4 w-4" />
              </Badge>
            ))}
            {value.length > maxCount && (
              <Badge
                className={cn(
                  "bg-transparent text-foreground border-foreground/1 hover:bg-transparent cursor-pointer",
                  multipleInputVariants({ variant }),
                )}
                style={{ animationDuration: `${animation}s` }}
                onClick={clearExtraOptions}
              >
                {`+ ${value.length - maxCount} знач.`}
                <XCircle className="ml-2 h-4 w-4" />
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  },
);

MultipleInput.displayName = "MultipleInput";
