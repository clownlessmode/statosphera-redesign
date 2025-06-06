import { api } from "@shared/api/api";
import { EmployeeNameFilterResponse } from "./types";

export class CheckFilterService {
  static async getEmployeeName(
    dto: any,
  ): Promise<EmployeeNameFilterResponse[]> {
    const response = await api.post<any>("filters/employee-name", dto);
    return response.data;
  }
}
