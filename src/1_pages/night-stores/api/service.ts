import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class NightStoresService {
  static async getTopNightStore(dto: RequestDto) {
    const response = await api.post("night-store/top-night-store", dto);
    return response.data;
  }

  static async getTopNomenclature(dto: RequestDto) {
    const response = await api.post("night-store/top-5-nomenclature", dto);
    return response.data;
  }

  static async getTopSubgroups(dto: RequestDto) {
    const response = await api.post("night-store/top-5-subgroups", dto);
    return response.data;
  }

  static async getNightSalesWeekday(dto: RequestDto) {
    const response = await api.post("night-store/night-sales-by-weekday", dto);
    return response.data;
  }

  static async getNightSalesWeekdayNomenclature(dto: RequestDto) {
    const response = await api.post(
      "night-store/night-sales-by-weekday-nomenclature",
      dto,
    );
    return response.data;
  }

  static async getAgeProceedsGraph(dto: RequestDto) {
    const response = await api.post("night-store/age-proceeds-graph", dto);
    return response.data;
  }

  static async getAgeCountCheckGraph(dto: RequestDto) {
    const response = await api.post("night-store/age-count-check-graph", dto);
    return response.data;
  }

  static async getAgeAvgCheckGraph(dto: RequestDto) {
    const response = await api.post("night-store/age-avg-check-graph", dto);
    return response.data;
  }

  static async getHourProceedsGraph(dto: RequestDto) {
    const response = await api.post("night-store/hour-proceeds-graph", dto);
    return response.data;
  }

  static async getUniqueCheckGraph(dto: RequestDto) {
    const response = await api.post("night-store/unique-check-graph", dto);
    return response.data;
  }

  static async getProceedsGraph(dto: RequestDto) {
    const response = await api.post("night-store/graph-proceeds", dto);
    return response.data;
  }

  static async getAllCard(dto: RequestDto) {
    const response = await api.post("night-store/all-card-data", dto);
    return response.data;
  }

  static async getPartners(dto: Pick<RequestDto, "filters">) {
    const response = await api.post("store/night-manager", dto);
    return response.data;
  }
  static async getRegions(dto: Pick<RequestDto, "filters">) {
    const response = await api.post("filters/night-region", dto);
    return response.data;
  }
  static async getCities(dto: Pick<RequestDto, "filters">) {
    const response = await api.post("filters/night-city", dto);
    return response.data;
  }
  static async getShops(dto: Pick<RequestDto, "filters">) {
    const response = await api.post(
      "store/night-store-shop",
      dto.filters.store,
    );
    return response.data;
  }
}
