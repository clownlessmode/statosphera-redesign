export interface ReviewsAppStoreRequest {
  rating?: number;
  is_replied?: boolean;
  order: "asc" | "desc";
}

export interface ReviewsGooglePlayRequest {
  rating?: number;
  is_replied?: boolean;
  order: "asc" | "desc";
}

export interface ReviewsUpdateRequest {
  id: number;
  is_replied: boolean;
}
