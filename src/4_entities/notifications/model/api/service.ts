import { api } from "@shared/api/api";
import { Notification } from "./types";

export class NotificationService {
  static async getNotifications(
    limit: number,
    offset: number,
  ): Promise<Notification[]> {
    const response = await api.get<Notification[]>(
      `notifications/all?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  }

  static async getCountNotifications(): Promise<number> {
    const response = await api.get<number>(`notifications`);
    return response.data;
  }
  static async readNotification(id: number): Promise<Notification> {
    const response = await api.patch<Notification>(`notifications/${id}/read`);
    return response.data;
  }
}
