import { api } from "@shared/api/api";

import { AlertType } from "../config";

export class AlertTypeService {
  static async getAlertTypes(): Promise<AlertType[]> {
    const response = await api.get("/alert-types");
    return response.data;
  }
}
