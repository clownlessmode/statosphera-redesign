import { api } from "@shared/api/api";
import { UpdateFeedbackStatusRequest } from "./types/requests";
import { FeedbackAllResponse, FeedbackMyResponse } from "./types/response";

export class FeedbackService {
  static async getFeedbackMy(): Promise<FeedbackMyResponse[]> {
    const response = await api.get<FeedbackMyResponse[]>("feedback/my");
    return response.data;
  }

  static async getFeedbackAll(): Promise<FeedbackAllResponse[]> {
    const response = await api.get<FeedbackAllResponse[]>("feedback/all");
    return response.data;
  }

  static async updateFeedbackStatus(
    request: UpdateFeedbackStatusRequest,
  ): Promise<void> {
    const { id, status, comment } = request;
    const response = await api.patch<void>(`feedback/update/${id}`, {
      status,
      comment: comment ?? "",
    });
    return response.data;
  }
}
