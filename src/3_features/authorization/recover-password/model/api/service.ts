import { api } from "@shared/api/api";

export class RecoverPasswordService {
  static async recoverPassword(email: string) {
    const response = await api.post("session-auth/reset-pass", {
      email: email,
    });
    return response.data;
  }
}
