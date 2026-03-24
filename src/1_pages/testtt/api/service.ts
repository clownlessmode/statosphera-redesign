import { api } from "@shared/api/api";
import { TestttRequest } from "./types/request";
import { TestttResponse, TestttStores } from "./types/response";

export class TestttService {
  static async getTesttt(request: TestttRequest): Promise<TestttResponse[]> {
    const { id_store, pagination } = request;
    const response = await api.post<TestttResponse[]>("/testtt", {
      id_store,
      limit: pagination!.limit,
      offset: pagination!.offset,
    });
    return response.data;
  }

  static async getTestttStores(): Promise<TestttStores[]> {
    const response = await api.get<TestttStores[]>("/testtt/stores");
    return response.data;
  }
}
