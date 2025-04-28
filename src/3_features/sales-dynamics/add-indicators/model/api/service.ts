import { api } from "@shared/api/api";
import { GetIndicatorsResponse, UpdateIndicatorsRequest } from "./types";

export class IndicatorsService {
  static async getIndicators(): Promise<GetIndicatorsResponse> {
    const response = await api.get<GetIndicatorsResponse>(
      "Sales_dynamics/setting"
    );
    return response.data;
  }

  static async updateIndicators(
    request: UpdateIndicatorsRequest
  ): Promise<"Ok"> {
    const response = await api.patch<"Ok">("Sales_dynamics/update_setting", {
      groups: request.groups,
    });
    return response.data;
  }
}
