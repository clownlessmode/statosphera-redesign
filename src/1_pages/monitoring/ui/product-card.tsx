import { memo } from "react";
import {
  ShopProduct,
  YarcheProduct,
  YarcheCategory,
  MagnitProduct,
  MetroProduct,
} from "../config/types";
import { formatImageUrl, removeUnitsFromName, getWeight } from "./cards/utils";
import { ProductCardData } from "./cards/types";
import { YarcheCard } from "./cards/yarche-card";
import { MagnitCard } from "./cards/magnit-card";
import { MetroCard } from "./cards/metro-card";

interface ProductCardProps {
  product: ShopProduct;
  variant?: "grid" | "list" | "table";
  onRemove?: (id: string | number) => void;
}

const getProductType = (
  product: ShopProduct,
): "yarche" | "magnit" | "metro" => {
  // YarcheProduct имеет уникальные поля: code, weight_unit, volume_unit
  if (
    "code" in product &&
    "weight_unit" in product &&
    "volume_unit" in product
  ) {
    return "yarche";
  }

  // MetroProduct имеет уникальные поля: slug, article, packing, prices
  if (
    "slug" in product &&
    "article" in product &&
    "packing" in product &&
    "prices" in product
  ) {
    return "metro";
  }

  // По умолчанию Magnit
  return "magnit";
};

export const ProductCard = memo(
  ({ product, variant = "grid", onRemove }: ProductCardProps) => {
    const type = getProductType(product);
    let cardData: ProductCardData;

    if (type === "yarche") {
      const yarcheProduct = product as YarcheProduct;
      const image = formatImageUrl(yarcheProduct.image);
      const weight = yarcheProduct.weight_unit
        ? yarcheProduct.weight_unit
        : getWeight(yarcheProduct.name);
      const name = removeUnitsFromName(yarcheProduct.name);
      const brand = yarcheProduct.brand
        ? yarcheProduct.brand
        : "Бренд не указан";
      const price = yarcheProduct.price;
      const previous_price = yarcheProduct.previous_price
        ? yarcheProduct.previous_price
        : 0;

      // Нормализуем categories: новый формат - массив объектов {id, code, name, parent_tree_id}
      let categories: string[] = [];
      if (Array.isArray(yarcheProduct.categories)) {
        // Проверяем, это новый формат (объекты) или старый (строки)
        if (yarcheProduct.categories.length > 0) {
          const firstItem = yarcheProduct.categories[0];
          if (typeof firstItem === "object" && "name" in firstItem) {
            // Новый формат: массив объектов с полем name
            categories = (yarcheProduct.categories as YarcheCategory[]).map(
              (cat) => cat.name,
            );
          } else {
            // Старый формат: массив строк
            categories = yarcheProduct.categories as string[];
          }
        } else {
          categories = [];
        }
      } else if (typeof yarcheProduct.categories === "string") {
        // Пытаемся распарсить JSON строку (старый формат)
        if (yarcheProduct.categories.startsWith("[")) {
          try {
            const parsed = JSON.parse(yarcheProduct.categories);
            if (Array.isArray(parsed)) {
              // Проверяем формат элементов
              if (
                parsed.length > 0 &&
                typeof parsed[0] === "object" &&
                "name" in parsed[0]
              ) {
                categories = (parsed as YarcheCategory[]).map(
                  (cat) => cat.name,
                );
              } else {
                categories = parsed;
              }
            } else {
              categories = [parsed];
            }
          } catch {
            categories = [yarcheProduct.categories];
          }
        } else {
          categories = [yarcheProduct.categories];
        }
      } else {
        categories = [];
      }

      cardData = {
        image,
        weight,
        name,
        brand,
        price,
        previous_price,
        categories,
        id: product.id,
      };

      return (
        <YarcheCard
          data={cardData}
          product={yarcheProduct}
          variant={variant}
          onRemove={onRemove}
        />
      );
    }

    if (type === "magnit") {
      const magnitProduct = product as MagnitProduct;
      const image = formatImageUrl(magnitProduct.images);
      const weight = magnitProduct.weight
        ? magnitProduct.weight
        : getWeight(magnitProduct.name);
      const name = removeUnitsFromName(magnitProduct.name);
      const brand = magnitProduct.brand ? magnitProduct.brand : "";
      const price = magnitProduct.price;
      const previous_price = magnitProduct.old_price
        ? magnitProduct.old_price
        : 0;

      cardData = {
        image,
        weight,
        name,
        brand,
        price,
        previous_price,
        categories: [],
        id: product.id,
      };

      return (
        <MagnitCard data={cardData} variant={variant} onRemove={onRemove} />
      );
    }

    // MetroProduct
    const metroProduct = product as MetroProduct;
    const image = formatImageUrl(metroProduct.images);

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
    const weight = packingWeight || getWeight(metroProduct.name);

    const name = removeUnitsFromName(metroProduct.name);
    const brand = metroProduct.manufacturer
      ? metroProduct.manufacturer
      : "Бренд не указан";

    // Парсим prices для цены
    let price = 0;
    let previous_price = 0;
    try {
      const prices = JSON.parse(metroProduct.prices);
      price = prices.price;
      previous_price = prices.old_price ? prices.old_price : 0;
    } catch {
      price = 0;
      previous_price = 0;
    }

    cardData = {
      image,
      weight,
      name,
      brand,
      price,
      previous_price,
      categories: [],
      id: product.id,
    };

    return <MetroCard data={cardData} variant={variant} onRemove={onRemove} />;
  },
);

ProductCard.displayName = "ProductCard";
