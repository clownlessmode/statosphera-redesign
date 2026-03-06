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
