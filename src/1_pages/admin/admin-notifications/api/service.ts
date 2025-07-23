import { api } from "@shared/api/api";

export class AdminNotificationsService {
  static async getUsers() {
    const response = await api.get("/users");
    return response.data;
  }
}
