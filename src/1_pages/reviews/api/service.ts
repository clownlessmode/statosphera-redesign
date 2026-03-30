import { api } from "@shared/api/api";
import { ReviewsAppStoreRequest, ReviewsAppStoreResponse } from "./types";
import {
  Reviews2GISRequest,
  ReviewsGooglePlayRequest,
  ReviewsUpdateRequest,
  ReviewsYandexRequest,
} from "./types/request";
import {
  Reviews2GISResponse,
  ReviewsGooglePlayResponse,
  ReviewsYandexResponse,
  Stores2GIS,
  YandexStores,
} from "./types/response";
export class ReviewsService {
  static async getReviewsAppStore(
    data: ReviewsAppStoreRequest,
  ): Promise<ReviewsAppStoreResponse[]> {
    const response = await api.post<ReviewsAppStoreResponse[]>(
      "/reviews/app-store",
      data,
    );
    return response.data;
  }

  static async getReviewsGooglePlay(
    data: ReviewsGooglePlayRequest,
  ): Promise<ReviewsGooglePlayResponse[]> {
    const response = await api.post<ReviewsGooglePlayResponse[]>(
      "/reviews/google-play",
      data,
    );
    return response.data;
  }

  static async getReviewsYandex(
    data: ReviewsYandexRequest,
  ): Promise<ReviewsYandexResponse[]> {
    const response = await api.post<ReviewsYandexResponse[]>(
      "/reviews/yandex",
      data,
    );
    return response.data;
  }

  static async getReviews2GIS(
    data: Reviews2GISRequest,
  ): Promise<Reviews2GISResponse[]> {
    const response = await api.post<Reviews2GISResponse[]>(
      "/reviews/2gis",
      data,
    );
    return response.data;
  }

  static async getYandexStores(): Promise<YandexStores[]> {
    const response = await api.get<YandexStores[]>("/reviews/stores-yandex");
    return response.data;
  }

  static async get2GISStores(): Promise<Stores2GIS[]> {
    const response = await api.get<Stores2GIS[]>("/reviews/stores-2gis");
    return response.data;
  }

  static async updateRepliedGooglePlay(
    data: ReviewsUpdateRequest,
  ): Promise<void> {
    const response = await api.patch<void>(
      `/reviews/update-replied-google-play/${data.id}`,
      {
        is_replied: data.is_replied,
      },
    );
    return response.data;
  }

  static async updateRepliedAppStore(
    data: ReviewsUpdateRequest,
  ): Promise<void> {
    const response = await api.patch<void>(
      `/reviews/update-replied-app-store/${data.id}`,
      {
        is_replied: data.is_replied,
      },
    );
    return response.data;
  }

  static async updateRepliedYandex(data: ReviewsUpdateRequest): Promise<void> {
    const response = await api.patch<void>(
      `/reviews/update-replied-yandex/${data.id}`,
      {
        is_replied: data.is_replied,
      },
    );
    return response.data;
  }

  static async updateReplied2GIS(data: ReviewsUpdateRequest): Promise<void> {
    const response = await api.patch<void>(
      `/reviews/update-replied-2gis/${data.id}`,
      {
        is_replied: data.is_replied,
      },
    );
    return response.data;
  }
}
