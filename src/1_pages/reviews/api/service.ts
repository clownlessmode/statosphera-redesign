import { api } from "@shared/api/api";
import { ReviewsAppStoreRequest, ReviewsAppStoreResponse } from "./types";
import {
  ReviewsGooglePlayRequest,
  ReviewsUpdateRequest,
} from "./types/request";
import { ReviewsGooglePlayResponse } from "./types/response";
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
