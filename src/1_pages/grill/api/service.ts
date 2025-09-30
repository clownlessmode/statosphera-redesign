import { api } from "@shared/api/api";
import { GraphData, GrillProductRo } from "./types/responses";

export class GrillService {
  static async getProducts(): Promise<GrillProductRo[]> {
    const response = await api.get("/grill");
    return response.data;
  }

  static async addProductIm(payload: { idProduct: number[] }): Promise<any> {
    const response = await api.post("/grill", payload);
    return response.data;
  }

  static async addProductLeftover(
    id: number,
    payload: { count: number },
  ): Promise<any> {
    const response = await api.patch(`/grill/${id}`, payload);
    return response.data;
  }

  static async deleteProductIm(id: number): Promise<any> {
    const response = await api.delete(`/grill/row/${id}`);
    return response.data;
  }

  static async getTable(): Promise<any> {
    const response = await api.get("/grill/tbl");
    return response.data;
  }

  static async getStatistic(payload: { idProduct: number[] }): Promise<any> {
    const response = await api.post("/grill/statistic", payload);
    return response.data;
  }

  static async getGraph(payload: { idProduct: number[] }): Promise<GraphData> {
    const response = await api.post("/grill/graph", payload);
    return response.data;
  }
}
