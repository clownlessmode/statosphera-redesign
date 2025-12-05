import { api } from "@shared/api/api";

export class SessionService {
  static async updateSession() {
    const response = await api.get("/session-auth/update-session");
    return response.data;
  }
}
