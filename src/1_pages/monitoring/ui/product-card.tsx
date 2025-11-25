import { memo } from "react";
import {
  ShopProduct,
  YarcheProduct,
  YarcheCategory,
  MagnitProduct,
  MetroProduct,
  LentaProduct,
  PyaterochkaProduct,
  ZhiznmartProduct,
} from "../config/types";
import { formatImageUrl, removeUnitsFromName, getWeight } from "./cards/utils";
import { ProductCardData } from "./cards/types";
import { YarcheCard } from "./cards/yarche-card";
import { MagnitCard } from "./cards/magnit-card";
import { MetroCard } from "./cards/metro-card";
import { LentaCard } from "./cards/lenta-card";
import { PyaterochkaCard } from "./cards/pyaterochka-card";
import { ZhiznmartCard } from "./cards/zhiznmart-card";

interface ProductCardProps {
  product: ShopProduct;
  variant?: "grid" | "list" | "table";
  onRemove?: (id: string | number) => void;
}

const getProductType = (
  product: ShopProduct,
): "yarche" | "magnit" | "metro" | "lenta" | "pyaterochka" | "zhiznmart" => {
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

  // LentaProduct имеет уникальные поля: category_id, category_name, price_regular
  if (
    "category_id" in product &&
    "category_name" in product &&
    "price_regular" in product
  ) {
    return "lenta";
  }

  // PyaterochkaProduct имеет уникальные поля: plu, image_links, uom, prices
  if (
    "plu" in product &&
    "image_links" in product &&
    "uom" in product &&
    "prices" in product &&
    typeof product.prices === "object" &&
    product.prices !== null &&
    "regular" in product.prices
  ) {
    return "pyaterochka";
  }

  // ZhiznmartProduct имеет уникальные поля: photo, photos, min_price, info
  if (
    "photo" in product &&
    "photos" in product &&
    "min_price" in product &&
    "info" in product &&
    typeof product.info === "object" &&
    product.info !== null &&
    "weight" in product.info
  ) {
    return "zhiznmart";
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
        <MagnitCard
          data={cardData}
          product={magnitProduct}
          variant={variant}
          onRemove={onRemove}
        />
      );
    }

    if (type === "metro") {
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

      return (
        <MetroCard
          data={cardData}
          product={metroProduct}
          variant={variant}
          onRemove={onRemove}
        />
      );
    }

    if (type === "lenta") {
      // LentaProduct
      const lentaProduct = product as LentaProduct;

      // Обрабатываем images - может быть массивом или JSON строкой
      let image = "";
      if (Array.isArray(lentaProduct.images)) {
        image =
          lentaProduct.images.length > 0
            ? lentaProduct.images[0].preview || lentaProduct.images[0].medium
            : "";
      } else if (typeof lentaProduct.images === "string") {
        try {
          const parsed = JSON.parse(lentaProduct.images);
          if (Array.isArray(parsed) && parsed.length > 0) {
            image = parsed[0].preview || parsed[0].medium || "";
          }
        } catch {
          image = "";
        }
      }

      // Получаем вес из dimensions или из названия
      let weight = "";
      try {
        const dimensions =
          typeof lentaProduct.dimensions === "string"
            ? JSON.parse(lentaProduct.dimensions)
            : lentaProduct.dimensions;
        if (
          dimensions &&
          (dimensions.width || dimensions.height || dimensions.length)
        ) {
          // Можно использовать dimensions для веса, но обычно вес в названии
          weight = getWeight(lentaProduct.name);
        } else {
          weight = getWeight(lentaProduct.name);
        }
      } catch {
        weight = getWeight(lentaProduct.name);
      }

      const name = removeUnitsFromName(lentaProduct.name);
      const brand = ""; // У Ленты нет поля brand в структуре
      const price = lentaProduct.price;
      const previous_price =
        lentaProduct.price_regular &&
        lentaProduct.price_regular > lentaProduct.price
          ? lentaProduct.price_regular
          : 0;

      cardData = {
        image: image || "",
        weight,
        name,
        brand,
        price,
        previous_price,
        categories: lentaProduct.category_name
          ? [lentaProduct.category_name]
          : [],
        id: lentaProduct.id,
      };

      return (
        <LentaCard
          data={cardData}
          product={lentaProduct}
          variant={variant}
          onRemove={onRemove}
        />
      );
    }

    if (type === "pyaterochka") {
      // PyaterochkaProduct
      const pyaterochkaProduct = product as PyaterochkaProduct;

      // Получаем изображение из image_links
      const image =
        pyaterochkaProduct.image_links?.normal?.[0] ||
        pyaterochkaProduct.image_links?.small?.[0] ||
        "";

      // Получаем вес из property_clarification или из названия
      const weight =
        pyaterochkaProduct.property_clarification ||
        getWeight(pyaterochkaProduct.name);

      const name = removeUnitsFromName(pyaterochkaProduct.name);
      const brand = ""; // У Пятерочки нет поля brand в структуре

      // Обрабатываем цены: regular - базовая цена, discount и cpd_promo_price - скидочные цены
      const regularPrice = parseFloat(
        pyaterochkaProduct.prices?.regular || "0",
      );
      const discountPrice = pyaterochkaProduct.prices?.discount
        ? parseFloat(pyaterochkaProduct.prices.discount)
        : null;
      const promoPrice = pyaterochkaProduct.prices?.cpd_promo_price
        ? parseFloat(pyaterochkaProduct.prices.cpd_promo_price)
        : null;

      // Текущая цена - минимальная из всех доступных цен
      const prices = [regularPrice, discountPrice, promoPrice].filter(
        (p): p is number => p !== null && p > 0,
      );
      const price = prices.length > 0 ? Math.min(...prices) : regularPrice;

      // Предыдущая цена - regularPrice, если есть скидка или промо меньше regularPrice
      const previous_price =
        (discountPrice && discountPrice < regularPrice) ||
        (promoPrice && promoPrice < regularPrice)
          ? regularPrice
          : 0;

      cardData = {
        image: image || "",
        weight,
        name,
        brand,
        price,
        previous_price,
        categories: pyaterochkaProduct.category_name
          ? [pyaterochkaProduct.category_name]
          : [],
        id: pyaterochkaProduct.id,
      };

      return (
        <PyaterochkaCard
          data={cardData}
          product={pyaterochkaProduct}
          variant={variant}
          onRemove={onRemove}
        />
      );
    }

    // ZhiznmartProduct
    const zhiznmartProduct = product as ZhiznmartProduct;

    // Получаем изображение из photo или photos
    const image = zhiznmartProduct.photo || zhiznmartProduct.photos?.[0] || "";

    // Получаем вес из info.weight или из названия
    const weight =
      zhiznmartProduct.info?.weight || getWeight(zhiznmartProduct.name);

    const name = removeUnitsFromName(zhiznmartProduct.name);
    const brand = zhiznmartProduct.contractor || ""; // Используем contractor как бренд
    const price = zhiznmartProduct.price;
    const previous_price = zhiznmartProduct.price_before_discount || 0;

    cardData = {
      image: image || "",
      weight,
      name,
      brand,
      price,
      previous_price,
      categories: [], // У Жизньмарт categories_ids - это массив чисел, без названий
      id: zhiznmartProduct.id,
    };

    return (
      <ZhiznmartCard
        data={cardData}
        product={zhiznmartProduct}
        variant={variant}
        onRemove={onRemove}
      />
    );
  },
);

ProductCard.displayName = "ProductCard";
