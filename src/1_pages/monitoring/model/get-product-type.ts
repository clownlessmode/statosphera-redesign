import { ShopProduct } from "../config";

export const getProductType = (
  product: ShopProduct,
): "yarche" | "magnit" | "metro" | "lenta" => {
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
  return "magnit";
};
