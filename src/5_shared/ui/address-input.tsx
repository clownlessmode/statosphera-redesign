import { Input } from "@shared/ui/input";
import { cn } from "@shared/lib/utils";
import axios from "axios";
import { Popover, PopoverContent, PopoverAnchor } from "@shared/ui/popover";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@shared/ui/command";
import useDebounce from "@shared/ui/debounce";
import { forwardRef, useState, useEffect } from "react";

interface DaDataSuggestion {
  value: string;
  unrestricted_value: string;
  data: any;
}

interface AddressInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
}

const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  (
    {
      className,
      value = "",
      onValueChange,
      placeholder = "Начните вводить адрес...",
      ...props
    },
    ref,
  ) => {
    const [suggestions, setSuggestions] = useState<DaDataSuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const apiKey = import.meta.env.VITE_DADATA_API_KEY;

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const debouncedValue = useDebounce(inputValue, 300);

    useEffect(() => {
      // Если текущее значение совпадает с внешним value - значит, это или инициализация,
      // или мы только что выбрали значение из списка. В обоих случаях поиск не нужен.
      if (debouncedValue === value) {
        return;
      }

      if (!debouncedValue || debouncedValue.length < 3 || !apiKey) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      const fetchSuggestions = async () => {
        try {
          const response = await axios.post(
            "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
            { query: debouncedValue, count: 5 },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${apiKey}`,
              },
            },
          );

          const items = response.data.suggestions || [];
          console.log(items);
          setSuggestions(items);
          setIsOpen(items.length > 0);
        } catch (error) {
          console.error("DaData error:", error);
          setSuggestions([]);
          setIsOpen(false);
        }
      };

      fetchSuggestions();
    }, [debouncedValue, apiKey, value]); // Добавляем value в зависимости

    const handleSelect = (suggestion: any) => {
      const {
        postal_code,
        region_with_type,
        city_with_type,
        settlement_with_type,
        street_with_type,
        house,
        house_type,
        block,
        block_type,
        flat,
        flat_type,
      } = suggestion;

      const addressParts = [
        postal_code,
        region_with_type,
        city_with_type,
        settlement_with_type,
        street_with_type,
        house && house_type ? `${house_type} ${house}` : null,
        block && block_type ? `${block_type} ${block}` : null,
        flat && flat_type ? `${flat_type} ${flat}` : null,
      ].filter(Boolean);

      const fullAddress = addressParts.join(", ");

      onValueChange?.(fullAddress);
      // Мы не вызываем setInputValue здесь, потому что он обновится через useEffect([value])
      // Но для плавности UI можно оставить, если useEffect срабатывает с задержкой
      setInputValue(fullAddress);

      // Проверяем, есть ли минимально необходимые поля (регион, город, улица и дом)
      if (
        region_with_type &&
        city_with_type &&
        (street_with_type || settlement_with_type) &&
        house
      ) {
        setIsOpen(false);
        return;
      }
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <PopoverAnchor asChild>
          <Input
            {...props}
            ref={ref}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (e.target.value === "") {
                onValueChange?.("");
              }
            }}
            onBlur={(e) => {
              if (inputValue !== value) {
                setInputValue(value);
              }
              props.onBlur?.(e);
            }}
            placeholder={placeholder}
            className={cn("bg-background", className)}
            autoComplete="off"
          />
        </PopoverAnchor>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          sideOffset={5}
        >
          <Command>
            <CommandList>
              <CommandEmpty>Ничего не найдено</CommandEmpty>
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.value}
                  value={suggestion.value}
                  onSelect={() => {
                    handleSelect(suggestion.data);
                  }}
                  className="cursor-pointer"
                >
                  {suggestion.value}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

AddressInput.displayName = "AddressInput";
export default AddressInput;
