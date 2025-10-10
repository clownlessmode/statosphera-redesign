import { api } from "@shared/api/api";
import { Notification, CreateNotificationData } from "./types";

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

  // Admin methods
  static async createNotification(
    data: CreateNotificationData,
  ): Promise<Notification> {
    console.log("📡 API: createNotification", data);
    const response = await api.post<Notification>(`notifications/create`, data);
    console.log("📡 API: createNotification response", response.data);
    return response.data;
  }

  static async createNotificationForEveryone(
    data: Omit<CreateNotificationData, "user">,
  ): Promise<Notification> {
    console.log("📡 API: createNotificationForEveryone", data);
    const response = await api.post<Notification>(
      `notifications/createEverything`,
      data,
    );
    console.log(
      "📡 API: createNotificationForEveryone response",
      response.data,
    );
    return response.data;
  }

  static async getNotificationById(id: number): Promise<Notification> {
    const response = await api.get<Notification>(`notifications/${id}`);
    return response.data;
  }

  static async deleteNotification(id: number): Promise<void> {
    await api.delete(`notifications/${id}`);
  }

  static async getUserNotifications(data: {
    emotion?: string;
    limit: number;
    offset: number;
  }): Promise<Notification[]> {
    const response = await api.post<Notification[]>(`notifications/user`, data);
    return response.data;
  }

  // Получение статистики уведомлений
  static async getNotificationsStats(): Promise<{
    total_count: number;
    unread_count: number;
    read_count: number;
  }> {
    const response = await api.get<number>(`notifications`);
    const totalCount = response.data;

    // Получаем список всех уведомлений для подсчета прочитанных/непрочитанных
    const notifications = await this.getNotifications(1000, 0);
    const readCount = notifications.filter((n) => n.is_read).length;
    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return {
      total_count: totalCount,
      read_count: readCount,
      unread_count: unreadCount,
    };
  }
}
