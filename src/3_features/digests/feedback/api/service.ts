import { api } from "@shared/api/api";
import { FormValues } from "../config";

export class FeedbackService {
  static async sendFeedback(data: FormValues, id: string) {
    const response = await api.post(`daydjest/feedback/${id}`, data);
    return response.data;
  }
}
