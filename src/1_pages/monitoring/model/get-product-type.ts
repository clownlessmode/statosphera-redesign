import { ShopProduct } from "../config";

export const getProductType = (
  product: ShopProduct,
): "yarche" | "magnit" | "metro" => {
  if ("code" in product && "description" in product) {
    return "yarche";
  }
  if ("slug" in product && "article" in product && "manufacturer" in product) {
    return "metro";
  }
  return "magnit";
};
