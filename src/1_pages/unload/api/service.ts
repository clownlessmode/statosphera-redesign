import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class RfmService {
  static async getNameSegment() {
    const response = await api.get("/rfm/get-name-segment");
    return response.data;
  }

  static async getTreemapRfmOrderDelivery(dto: RequestDto) {
    const response = await api.post("/rfm/treemap-rfm-order-delivery", dto);
    return response.data;
  }
}
