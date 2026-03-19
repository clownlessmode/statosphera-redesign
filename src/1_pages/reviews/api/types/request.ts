export interface ReviewsAppStoreRequest {
  rating?: number;
  is_replied?: boolean;
  order: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface ReviewsGooglePlayRequest {
  rating?: number;
  is_replied?: boolean;
  order: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface ReviewsYandexRequest {
  rating?: number;
  is_replied?: boolean;
  order: "asc" | "desc";
  idStore?: number;
  limit?: number;
  offset?: number;
}

export interface ReviewsUpdateRequest {
  id: number;
  is_replied: boolean;
}
