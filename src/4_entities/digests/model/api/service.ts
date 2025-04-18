import { api } from "@shared/api/api";
import { GetDigestResponse, GetDigestsResponse } from "../types";

export class DigestsService {
  static async getDigests(): Promise<GetDigestsResponse> {
    const response = await api.get<GetDigestsResponse>("daydjest");
    return response.data;
  }
  static async getDigest(id: string): Promise<GetDigestResponse> {
    const response = await api.get<GetDigestResponse>(`daydjest/views/${id}`);
    return response.data;
  }
}
