import { api } from "@shared/api/api";
import { NightEntriesRequest } from "./types/request";
import { NightEntriesResponse, NightStoresResponse } from "./types/response";

export class NightEntriesService {
  static async getNightEntries(
    request: NightEntriesRequest,
  ): Promise<NightEntriesResponse[]> {
    const { id_store, pagination, card_number } = request;
    const response = await api.post<NightEntriesResponse[]>("/night-entries", {
      id_store,
      card_number,
      limit: pagination!.limit,
      offset: pagination!.offset,
    });
    return response.data;
  }

  static async getNightStores(): Promise<NightStoresResponse[]> {
    const response = await api.get<NightStoresResponse[]>(
      "/night-entries/stores",
    );
    return response.data;
  }
}
