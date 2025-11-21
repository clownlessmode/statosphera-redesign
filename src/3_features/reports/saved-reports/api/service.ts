import { api } from "@shared/api/api";

export class SavedReportsService {
  static async getSavedReports(): Promise<any> {
    const response = await api.get<any>("report/my");
    return response.data;
  }

  static async deleteReport(id: number): Promise<void> {
    await api.delete(`report/${id}`);
  }
}
