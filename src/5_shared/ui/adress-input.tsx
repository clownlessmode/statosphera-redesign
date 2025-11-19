import * as React from "react";
import { Input } from "@shared/ui/input";
import { cn } from "@shared/lib/utils";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverAnchor, // Используем Anchor для привязки к Input
} from "@shared/ui/popover";
import { Command, CommandItem, CommandList } from "@shared/ui/command";

// Тип для ответа от API Яндекса
interface YandexSuggestion {
  title: string;
  subtitle: string;
  value: string; // Полный адрес
}

export interface AddressInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
}

const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>(
  ({ className, value = "", onValueChange, ...props }, ref) => {
    const [suggestions, setSuggestions] = React.useState<YandexSuggestion[]>(
      [],
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;

    React.useEffect(() => {
      if (value.length < 3 || !apiKey) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      const debounceTimeout = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://suggest-maps.yandex.ru/v1/suggest`,
            {
              params: {
                apikey: apiKey,
                text: value,
                types: "house,street,locality", // Искать дома, улицы, населенные пункты
                lang: "ru_RU",
              },
            },
          );

          const fetchedSuggestions = response.data.results.map((item: any) => ({
            title: item.title.text,
            subtitle: item.subtitle?.text || "",
            value:
              item.title.text +
              (item.subtitle?.text ? `, ${item.subtitle.text}` : ""),
          }));

          setSuggestions(fetchedSuggestions);
          setIsOpen(fetchedSuggestions.length > 0);
        } catch (error) {
          console.error(
            "Ошибка при получении подсказок адреса от Яндекса:",
            error,
          );
          setSuggestions([]);
          setIsOpen(false);
        }
      }, 300); // Задержка 300 мс

      return () => clearTimeout(debounceTimeout);
    }, [value, apiKey]);

    const handleSelect = (suggestion: YandexSuggestion) => {
      onValueChange?.(suggestion.value);
      setIsOpen(false);
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverAnchor asChild>
          <Input
            ref={ref}
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            className={cn("bg-background", className)}
            autoComplete="off"
            {...props}
          />
        </PopoverAnchor>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          onOpenAutoFocus={(e) => e.preventDefault()} // Предотвращаем фокус на списке
        >
          <Command>
            <CommandList>
              {suggestions.length === 0 && (
                <div className="p-2 text-sm text-muted-foreground">
                  Ничего не найдено
                </div>
              )}
              {suggestions.map((s, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelect(s)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <span>{s.title}</span>
                  {s.subtitle && (
                    <span className="text-xs text-muted-foreground">
                      {s.subtitle}
                    </span>
                  )}
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

export { AddressInput };
