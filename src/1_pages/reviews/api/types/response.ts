export interface ReviewsAppStoreResponse {
  id: number;
  author_name: string;
  rating: number;
  title: string;
  review_text: string;
  review_date: string;
  review_hash: string;
  created_at: string;
  is_replied: boolean;
}

export interface ReviewsGooglePlayResponse {
  id: number;
  author_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  thumbs_up: number;
  review_hash: string;
  created_at: string;
  is_replied: boolean;
}

export interface ReviewsYandexResponse {
  id: number;
  store_id: number;
  author_name: string;
  rating: number;
  review_date_parsed: string;
  review_text: string;
  review_date: string;
  review_hash: string;
  created_at: string;
  is_replied: boolean;
  store_name: string;
  store_url: string;
}

export interface YandexStores {
  id: number;
  ord_id: string;
  slug: string;
  name: string;
  url: string;
  created_at: string;
}
