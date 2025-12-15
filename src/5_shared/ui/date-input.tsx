import { InputHTMLAttributes, forwardRef } from "react";
import { Input } from "./input";
import { format, isValid, parse } from "date-fns";
import { cn } from "@shared/lib/utils";

interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  placeholder?: string;
  className?: string;
  limitToday?: boolean; // Ограничивает дату сегодняшним днем
  onChange: (value: string) => void;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Введите дату",
      className,
      limitToday = true,
      ...props
    },
    ref,
  ) => {
    const formatDateOnInput = (value: string): string => {
      const digits = value.replace(/\D/g, "").substring(0, 8);

      let day = digits.slice(0, 2);
      let month = digits.slice(2, 4);
      const year = digits.slice(4, 8);

      // Ограничения на ввод дня и месяца
      if (parseInt(day, 10) > 31) day = "31";
      if (parseInt(month, 10) > 12) month = "12";

      // Проверка на будущую дату, если она полностью введена
      if (year.length === 4) {
        const enteredDate = parse(
          `${day}.${month}.${year}`,
          "dd.MM.yyyy",
          new Date(),
        );
        if (limitToday && isValid(enteredDate) && enteredDate > new Date()) {
          return format(new Date(), "dd.MM.yyyy"); // Возвращаем сегодняшнюю дату
        }
      }

      // Форматируем с точками
      if (digits.length > 4) return `${day}.${month}.${year}`;
      if (digits.length > 2) return `${day}.${month}`;
      return digits;
    };

    return (
      <Input
        type="text"
        ref={ref}
        placeholder={placeholder}
        className={cn("bg-background", className)}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= 10) {
            const formattedValue = formatDateOnInput(e.target.value);
            onChange(formattedValue);
          }
        }}
        {...props}
      />
    );
  },
);

DateInput.displayName = "DateInput";
export default DateInput;
