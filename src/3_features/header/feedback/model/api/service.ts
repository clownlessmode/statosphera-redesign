import { api } from "@shared/api/api";
import { FormValues } from "../types";
import { FEEDBACK_TYPES } from "./controller";
export class FeedbackService {
  static async sendFeedback(data: FormValues & { type: FEEDBACK_TYPES }) {
    const response = await api.post("/feedback/global", data);
    return response.data;
  }
}
