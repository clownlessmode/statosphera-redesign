import { Card, CardContent, CardDescription, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import {
  ShopProduct,
  YarcheProduct,
  MagnitProduct,
  MetroProduct,
} from "../config/types";
import { TrendingDown, X } from "lucide-react";
import { Button } from "@shared/ui/button";
import { memo } from "react";

const formatImageUrl = (imageUrl: string | string[]): string => {
  // Если это JSON строка массива (для Magnit и Metro), парсим ее
  if (typeof imageUrl === "string" && imageUrl.startsWith("[")) {
    try {
      const parsed = JSON.parse(imageUrl);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : "";
    } catch {
      return imageUrl;
    }
  }

  // Если массив, берем первый элемент
  const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;

  // Извлекаем число из URL вида https://yarcheplus.ru/images/76256
  const match = url.match(/\/images\/(\d+)/);
  if (!match) return url;

  const fullNumber = match[1]; // "76256"
  const firstTwo = fullNumber.slice(0, 2); // "76"
  const rest = fullNumber.slice(2); // "256"

  return `https://api.yarcheplus.ru/thumbnail/768x768/${firstTwo}/${rest}/${fullNumber}.webp`;
};

const removeUnitsFromName = (name: string): string => {
  // Удаляем единицы измерения: г, кг, л, мл, шт, штук, штуки и т.д.
  // Паттерн: число (с запятой/точкой) + единица измерения
  return name
    .replace(/«[^»]*»/g, "") // Удаляем текст в кавычках «...»
    .replace(
      /\d+([,.]\d+)?\s*(г|кг|л|мл|шт|штук|штуки?|кг\.|г\.|л\.|мл\.)/gi,
      "",
    )
    .replace(/,\s*$/g, "") // Убираем запятую в конце строки
    .replace(/\s+/g, " ") // Убираем множественные пробелы
    .trim(); // Убираем пробелы в начале и конце
};

const getWeight = (name: string): string => {
  const match = name.match(
    /\d+([,.]\d+)?\s*(г|кг|л|мл|шт|штук|штуки?|кг\.|г\.|л\.|мл\.)/gi,
  );
  if (!match) return "";

  const weight = match[0];
  return weight;
};

interface ProductCardProps {
  product: ShopProduct;
  type: "yarche" | "magnit" | "metro";
  variant?: "grid" | "list" | "table";
  onRemove?: (id: string | number) => void;
}

export const ProductCard = memo(
  ({ product, type, variant = "grid", onRemove }: ProductCardProps) => {
    let image;
    let weight;
    let name;
    let brand;
    let price;
    let previous_price;
    let categories: string[] = [];
    //   let is_available = false;
    //   let url = "";
    //   let updated_at = "";
    //   let created_at = "";
    if (type === "yarche") {
      const yarcheProduct = product as YarcheProduct;
      image = formatImageUrl(yarcheProduct.image);
      weight = yarcheProduct.weight_unit
        ? yarcheProduct.weight_unit
        : getWeight(yarcheProduct.name);
      name = removeUnitsFromName(yarcheProduct.name);
      brand = yarcheProduct.brand ? yarcheProduct.brand : "Бренд не указан";
      price = yarcheProduct.price;
      previous_price = yarcheProduct.previous_price
        ? yarcheProduct.previous_price
        : 0;
      // Нормализуем categories: если строка JSON - парсим, если массив - оставляем, если обычная строка - в массив
      if (Array.isArray(yarcheProduct.categories)) {
        categories = yarcheProduct.categories;
      } else if (typeof yarcheProduct.categories === "string") {
        // Пытаемся распарсить JSON строку
        if (yarcheProduct.categories.startsWith("[")) {
          try {
            const parsed = JSON.parse(yarcheProduct.categories);
            categories = Array.isArray(parsed) ? parsed : [parsed];
          } catch {
            categories = [yarcheProduct.categories];
          }
        } else {
          categories = [yarcheProduct.categories];
        }
      } else {
        categories = [];
      }
    } else if (type === "magnit") {
      // MagnitProduct
      const magnitProduct = product as MagnitProduct;
      image = formatImageUrl(magnitProduct.images);
      weight = magnitProduct.weight
        ? magnitProduct.weight
        : getWeight(magnitProduct.name);
      name = removeUnitsFromName(magnitProduct.name);
      brand = magnitProduct.brand ? magnitProduct.brand : "";
      price = magnitProduct.price;
      previous_price = magnitProduct.old_price ? magnitProduct.old_price : 0;
    } else {
      // MetroProduct
      const metroProduct = product as MetroProduct;
      image = formatImageUrl(metroProduct.images);

      // Парсим packing для веса
      let packingWeight = "";
      try {
        const packing = JSON.parse(metroProduct.packing);
        if (packing.type === "шт") {
          packingWeight = `${packing.size} ${packing.type}`;
        } else if (packing.size) {
          packingWeight = `${packing.size} ${packing.type}`;
        }
      } catch {
        packingWeight = getWeight(metroProduct.name);
      }
      weight = packingWeight || getWeight(metroProduct.name);

      name = removeUnitsFromName(metroProduct.name);
      brand = metroProduct.manufacturer
        ? metroProduct.manufacturer
        : "Бренд не указан";

      // Парсим prices для цены
      try {
        const prices = JSON.parse(metroProduct.prices);
        price = prices.price;
        previous_price = prices.old_price ? prices.old_price : 0;
      } catch {
        price = 0;
        previous_price = 0;
      }
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onRemove) {
        onRemove(product.id);
      }
    };
    if (variant === "table") {
      return (
        <tr className="border-b hover:bg-muted/50 group">
          <td className="p-4">
            <img
              src={image}
              alt={name}
              width={60}
              height={60}
              loading="lazy"
              decoding="async"
              className="w-[60px] h-[60px] object-contain bg-white border border-border rounded-lg"
            />
          </td>
          <td className="p-4">
            <div className="text-sm text-muted-foreground font-light">
              {brand}
            </div>
            <div className="font-medium">{name}</div>
          </td>
          <td className="p-4">
            <div className="text-sm text-muted-foreground">{weight}</div>
          </td>
          <td className="p-4">
            <div className="text-primary text-lg font-bold">
              {price?.toLocaleString()} ₽
              {previous_price && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3" />
                  <span className="line-through">
                    {previous_price.toFixed(2)} ₽
                  </span>
                </div>
              )}
            </div>
          </td>
          {onRemove && (
            <td className="p-4">
              <Button
                variant="destructive"
                size="icon"
                className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </td>
          )}
        </tr>
      );
    }

    if (variant === "list") {
      return (
        <Card className="w-full relative group">
          {onRemove && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <CardContent className="flex flex-row gap-4 p-4 py-0">
            <img
              src={image}
              alt={name}
              width={100}
              height={100}
              loading="lazy"
              decoding="async"
              className="w-[100px] h-[100px] flex-shrink-0 object-contain bg-white border border-border rounded-2xl"
            />
            <div className="flex-1 flex flex-col">
              <div>
                <CardDescription className="text-sm text-muted-foreground font-light">
                  {brand}
                </CardDescription>
                <div className="flex flex-row gap-2">
                  <CardTitle className="line-clamp-2">{name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-light">
                    {weight}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-row justify-between items-start mt-1">
                <div className="flex flex-row gap-2 flex-wrap">
                  {categories &&
                    Array.isArray(categories) &&
                    categories.length > 0 &&
                    categories
                      .filter((cat) => cat && typeof cat === "string")
                      .map((category, idx) => (
                        <Badge key={idx} variant="outline">
                          {category}
                        </Badge>
                      ))}
                </div>
                <CardTitle className="text-primary text-2xl font-bold">
                  {price?.toLocaleString()} ₽
                  {previous_price ? (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3" />
                      <span className="line-through">
                        {previous_price.toFixed(2)} ₽
                      </span>
                    </div>
                  ) : null}
                </CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Grid (по умолчанию)
    return (
      <Card className="col-span-1 w-full gap-2 relative group">
        {onRemove && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardContent>
          <img
            src={image}
            alt={name}
            width={100}
            height={100}
            loading="lazy"
            decoding="async"
            className="w-full aspect-square object-contain bg-white border border-border rounded-2xl overflow-hidden"
          />
        </CardContent>
        <CardContent className="py-0">
          <CardDescription className="text-sm text-muted-foreground font-light">
            {brand}
          </CardDescription>
          <CardTitle className="line-clamp-2">{name}</CardTitle>
        </CardContent>
        <CardContent className="py-0 mt-auto flex flex-row justify-between items-center">
          <CardTitle className="text-primary text-2xl font-bold items-start">
            {price?.toLocaleString()} ₽
            {previous_price ? (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3" />
                <span className="line-through">
                  {previous_price.toFixed(2)} ₽
                </span>
              </div>
            ) : null}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-light">
            {weight}
          </CardDescription>
        </CardContent>
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";
