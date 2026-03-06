import { api } from "@shared/api/api";
import type {
  CameraStatsRequest,
  CameraEventsRequest,
  CameraStatsResponse,
  CameraEventsResponse,
  CameraStoresResponse,
  CameraGraphRequest,
  CameraGraphResponses,
} from "./types";

export class CameraService {
  static async getStores(): Promise<CameraStoresResponse> {
    const response = await api.get<CameraStoresResponse>("/camera/stores");
    return response.data;
  }

  static async getStats(
    data: CameraStatsRequest,
  ): Promise<CameraStatsResponse> {
    const response = await api.post<CameraStatsResponse>("/camera/stats", data);
    return response.data;
  }

  static async getEvents(
    data: CameraEventsRequest,
  ): Promise<CameraEventsResponse[]> {
    const response = await api.post<CameraEventsResponse[]>(
      "/camera/events",
      data,
    );
    return response.data;
  }

  static async getGraph(
    data: CameraGraphRequest,
  ): Promise<CameraGraphResponses> {
    const response = await api.post<CameraGraphResponses>(
      "/camera/graph",
      data,
    );
    return response.data;
  }
}
