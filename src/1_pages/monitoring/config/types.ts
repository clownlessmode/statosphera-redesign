export interface YarcheProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  previous_price: number | null;
  is_available: boolean;
  url: string;
  image: string;
  brand: string | null;
  weight_unit: string;
  volume_unit: string | null;
  categories: string | string[];
  updated_at: string;
  created_at: string;
}

export interface MagnitProduct {
  id: string | number;
  name: string;
  price: number;
  old_price: number | null;
  images: string; // JSON строка массива
  brand: string | null;
  weight: string | null;
  url: string;
  updated_at: string;
  created_at: string;
}

export interface MetroProduct {
  id: string | number;
  name: string;
  slug: string;
  article: string;
  url: string;
  images: string; // JSON строка массива
  category: string | null;
  manufacturer: string | null;
  packing: string; // JSON строка
  prices: string; // JSON строка {"price": 228, "is_promo": false, "old_price": null}
  updated_at: string;
  created_at: string;
}

// Union type для продуктов разных магазинов
export type ShopProduct = YarcheProduct | MagnitProduct | MetroProduct;

// Тип для ответа API - массив магазинов
export interface ShopProductsResponse {
  shop: string;
  data: ShopProduct[];
}
