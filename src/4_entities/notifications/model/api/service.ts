import { api } from "@shared/api/api";
import {
  Notification,
  CreateNotificationData,
} from "./types";

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
    const response = await api.post<Notification>(`notifications/create`, data);
    return response.data;
  }

  static async createNotificationForEveryone(
    data: Omit<CreateNotificationData, "user">,
  ): Promise<Notification> {
    const response = await api.post<Notification>(
      `notifications/createEverything`,
      data,
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
}
