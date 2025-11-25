import { ShopProduct } from "../config";

export const getProductType = (
  product: ShopProduct,
): "yarche" | "magnit" | "metro" | "lenta" | "pyaterochka" | "zhiznmart" => {
  if ("code" in product && "description" in product) {
    return "yarche";
  }
  if ("slug" in product && "article" in product && "manufacturer" in product) {
    return "metro";
  }
  if (
    "category_id" in product &&
    "category_name" in product &&
    "price_regular" in product
  ) {
    return "lenta";
  }
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
  return "magnit";
};
