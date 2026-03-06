"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/ui/button";

const MAX_STARS = 5;

const SORT_OPTIONS = [
  { value: "desc", label: "Сначала новые" },
  { value: "asc", label: "Сначала старые" },
] as const;

export interface FiltersValues {
  rating?: number;
  is_replied?: boolean;
  order: "asc" | "desc";
}

interface FiltersProps {
  value: FiltersValues;
  onChange: (value: FiltersValues) => void;
}

export const Filters = ({ value, onChange }: FiltersProps) => {
  const [hoverStar, setHoverStar] = useState<number | null>(null);

  const effectiveStars = hoverStar ?? value.rating;

  const handleStarClick = (stars: number) => {
    const next = value.rating === stars ? undefined : stars;
    onChange({ ...value, rating: next });
  };

  const handleOrderChange = (order: "asc" | "desc") => {
    onChange({ ...value, order });
  };

  const handleIsRepliedChange = (is_replied: boolean) => {
    onChange({ ...value, is_replied });
  };

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Рейтинг — звёзды с hover */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Рейтинг
        </span>
        <div
          className="flex items-center gap-0.5"
          onMouseLeave={() => setHoverStar(null)}
        >
          {Array.from({ length: MAX_STARS }, (_, i) => {
            const starValue = i + 1;
            const filled =
              effectiveStars != null && starValue <= effectiveStars;
            return (
              <button
                key={starValue}
                type="button"
                className={cn(
                  "p-0.5 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  filled && "text-amber-500",
                )}
                onMouseEnter={() => setHoverStar(starValue)}
                onClick={() => handleStarClick(starValue)}
                aria-label={
                  value.rating == null
                    ? `Показать от ${starValue} звезды`
                    : value.rating === starValue
                      ? "Сбросить фильтр по рейтингу"
                      : `Фильтр: ${starValue} звезд`
                }
              >
                <Star
                  className={cn(
                    "size-6 transition-colors",
                    filled
                      ? "text-amber-500 fill-amber-500"
                      : "text-muted-foreground/50 hover:text-amber-500/70",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Сортировка по дате */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Сортировка
        </span>
        <Select
          value={value.order}
          onValueChange={(v) => handleOrderChange(v as "asc" | "desc")}
        >
          <SelectTrigger className="w-[170px] bg-muted/50 border-muted-foreground/20">
            <SelectValue placeholder="Выберите порядок" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Ответили
        </span>
        <Button
          variant="outline"
          size="sm"
          className={cn(value.is_replied === true && "bg-green-500 text-white")}
          onClick={() => handleIsRepliedChange(true)}
        >
          Да
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn(value.is_replied === false && "bg-red-500 text-white")}
          onClick={() => handleIsRepliedChange(false)}
        >
          Нет
        </Button>
      </div>
    </div>
  );
};
