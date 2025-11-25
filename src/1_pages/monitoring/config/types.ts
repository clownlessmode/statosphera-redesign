export interface YarcheCategory {
  id: number;
  code: string;
  name: string;
  parent_tree_id: number | null;
}

export interface YarcheProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  previous_price: number | null;
  item_sum?: number;
  previous_item_sum?: number | null;
  is_available: boolean;
  is_adult?: boolean;
  is_new?: boolean;
  is_hit?: boolean;
  is_vkusvill?: boolean;
  is_favorite?: boolean;
  is_subscribed?: boolean;
  is_veterinary_control?: boolean;
  url: string;
  image: string;
  images?: number[];
  brand: string | null;
  weight_unit: string;
  volume_unit: string | null;
  categories: YarcheCategory[] | string | string[];
  rating?: number;
  number_of_ratings?: number;
  promos?: any;
  quant?: {
    code: string;
    type: string;
    unit: string;
    currency: string;
    fullName?: string | null;
    multiple: number;
    unitCode: string;
    maxAmount: number;
    minAmount: number;
    shortName?: string | null;
    stepAmount: number;
    pricePerUnit: number;
    amountPerQuant: number;
    previousPricePerUnit?: number | null;
  };
  agreement?: {
    seller?: {
      name: string;
    };
    minimalOrderSum?: number;
  };
  min_delivery_time?: string | null;
  max_delivery_time?: string | null;
  property_values?: {
    [key: string]: string | undefined;
    at_pack?: string;
    shelf_life?: string;
    composition?: string;
    fat_content?: string;
    weight_unit?: string;
    energy_value?: string;
    manufacturer?: string;
    article_number?: string;
    own_trade_mark?: string;
    protein_content?: string;
    carbohydrate_content?: string;
    country_of_manufacture?: string;
    obrabotka_molochnogo_producta?: string;
  };
  meta_tags?: {
    title?: string;
    description?: string;
  };
  unavailable_reason?: string | null;
  catalogs?: any;
  energy_value_per_serving?: number | null;
  protein_content_per_serving?: number | null;
  fat_content_per_serving?: number | null;
  carbohydrate_content_per_serving?: number | null;
  delivery_slot?: any;
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

export interface LentaImage {
  id: number;
  icon: string;
  large: string;
  medium: string;
  preview: string;
  original: string;
  position: number;
}

export interface LentaBadge {
  title: string;
  tooltip: {
    description: string;
  };
  backgroundColor: string;
}

export interface LentaBadges {
  image: any[];
  discount: LentaBadge[];
}

export interface LentaFeatures {
  isAdult: boolean;
  isPromo: boolean;
  isPinned: boolean;
  isWeight: boolean;
  markType?: string;
  isAlcohol: boolean;
  isPartner: boolean;
  isTobacco: boolean;
  isFavorite: boolean;
  isMarkType: boolean;
  isMercurial: boolean;
  isPurchased: boolean;
  isOnlyPickup: boolean;
  isReviewable: boolean;
  isIndividualAcc: boolean;
  isPersonalPrice: boolean;
  isBlockedForSale: boolean;
  isQuantityDiscount: boolean;
}

export interface LentaDimensions {
  width: number;
  height: number;
  length: number;
}

export interface LentaRating {
  rate: number;
  votes: number;
}

export interface LentaPersonalization {
  ruleId: string;
  modelType: string;
}

export interface LentaProduct {
  id: number;
  name: string;
  category_id: number | null;
  category_name: string | null;
  price: number;
  price_regular: number;
  cost: number;
  cost_regular: number;
  is_loyalty_card_price: boolean;
  is_promoaction_price: boolean;
  images: LentaImage[] | string; // JSONB или массив
  badges: LentaBadges | string; // JSONB или объект
  features: LentaFeatures | string; // JSONB или объект
  dimensions: LentaDimensions | string; // JSONB или объект
  rating: LentaRating | string; // JSONB или объект
  count: number;
  chips_prices: any | null;
  quantity_discount: any | null;
  quantity_discount_promo: any | null;
  personalization: LentaPersonalization | string; // JSONB или объект
  url: string;
  updated_at: string;
  created_at: string;
}

export interface PyaterochkaImageLinks {
  small: string[];
  normal: string[];
}

export interface PyaterochkaPrices {
  regular: string;
  discount: string | null;
  cpd_promo_price: string | null;
}

export interface PyaterochkaProduct {
  id: string;
  plu: string;
  name: string;
  category_id: string;
  category_name: string;
  image_links: PyaterochkaImageLinks;
  uom: string;
  step: number;
  rating: number | null;
  promo: any | null;
  prices: PyaterochkaPrices;
  labels: any | null;
  property_clarification: string | null;
  url: string;
  updated_at: string;
  created_at: string;
}

export interface ZhiznmartProductInfo {
  weight: string;
  weight_value: number;
}

export interface ZhiznmartProduct {
  id: string;
  name: string;
  price: number;
  min_price: number;
  price_before_discount: number | null;
  description: string;
  consist: string;
  photo: string;
  photos: string[];
  categories_ids: number[];
  tags: any | null;
  rating: number;
  avg_score: number | null;
  scores_count: number | null;
  info: ZhiznmartProductInfo;
  max_quantity: number;
  count_step: number;
  is_countable: boolean;
  contractor: string;
  url: string;
  updated_at: string;
  created_at: string;
}

export interface AzbukaVkusaImage {
  url: string;
  format: string;
  imageType: string;
}

export interface AzbukaVkusaProduct {
  id: string;
  name: string;
  category_slug: string;
  price: number | null;
  old_price: number | null;
  discount_percent: number | null;
  // images может быть массивом строк (URL) или массивом объектов
  images: string[] | AzbukaVkusaImage[];
  description: string;
  brand: string;
  weight: string;
  volume: string;
  barcode: string;
  in_stock: boolean;
  is_new: boolean;
  is_hit: boolean;
  rating: number | null;
  reviews_count: number | null;
  url: string;
  updated_at: string;
  created_at: string;
}

// Union type для продуктов разных магазинов
export type ShopProduct =
  | YarcheProduct
  | MagnitProduct
  | MetroProduct
  | LentaProduct
  | PyaterochkaProduct
  | ZhiznmartProduct
  | AzbukaVkusaProduct;

// Тип для ответа API - массив магазинов
export interface ShopProductsResponse {
  shop: string;
  data: ShopProduct[];
}

export interface DownloadReportRequest {
  yarche: string[];
  magnit: string[];
  metro: string[];
  lenta: string[];
  pyaterochka: string[];
  jiznmart: string[];
  azbuka_vkusa: string[];
}
