import { api } from "@shared/api/api";
import { ReviewsAppStoreRequest, ReviewsAppStoreResponse } from "./types";
import {
  ReviewsGooglePlayRequest,
  ReviewsUpdateRequest,
  ReviewsYandexRequest,
} from "./types/request";
import {
  ReviewsGooglePlayResponse,
  ReviewsYandexResponse,
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

  static async getYandexStores(): Promise<YandexStores[]> {
    const response = await api.get<YandexStores[]>("/reviews/stores-yandex");
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
}
