import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class RfmService {
  static async getNameSegment() {
    const response = await api.get("/rfm/get-name-segment");
    return response.data;
  }

  static async getAgePeriod() {
    const response = await api.get("/rfm/get-age-period");
    return response.data;
  }

  static async getAllGistogram(dto: RequestDto) {
    const response = await api.post("/rfm/all-gistogram", dto);
    return response.data;
  }

  static async getDrilldownRfmDayWeekTime(dto: RequestDto) {
    const response = await api.post("/rfm/drilldown-rfm-day-week-time", dto);
    return response.data;
  }

  static async getDrilldownTimeDayWeekRfm(dto: RequestDto) {
    const response = await api.post("/rfm/drilldown-time-day-week-rfm", dto);
    return response.data;
  }

  static async getTreemapTopGroupProduct(dto: RequestDto) {
    const response = await api.post("/rfm/treemap-top10-group-product", dto);
    return response.data;
  }

  static async getTreemapTopBonuses(dto: RequestDto) {
    const response = await api.post("/rfm/treemap-top10-bonuses", dto);
    return response.data;
  }

  static async getRadarCountUniqGroupAndProduct(dto: RequestDto) {
    const response = await api.post(
      "/rfm/radar-count-uniq-group-and-product",
      dto,
    );
    return response.data;
  }

  static async getTreemapRfmOrderDelivery(dto: RequestDto) {
    const response = await api.post("/rfm/treemap-rfm-order-delivery", dto);
    return response.data;
  }

  static async getDrilldownRfmRegionCityStore(dto: RequestDto) {
    const response = await api.post(
      "/rfm/drilldown-rfm-region-city-store",
      dto,
    );
    return response.data;
  }

  static async getSankeyMigrationClientPerSegments(dto: RequestDto) {
    const response = await api.post(
      "/rfm/sankey-migration-client-per-segments",
      dto,
    );
    return response.data;
  }

  static async getHeatmapMigrationPerSegment(dto: RequestDto) {
    const response = await api.post("/rfm/heatmap-migration-per-segment", dto);
    return response.data;
  }

  static async getMainDataSegment(dto: RequestDto) {
    const response = await api.post("/rfm/main-data-segment", dto);
    return response.data;
  }

  static async getMainAllDataSegment(dto: RequestDto) {
    const response = await api.post("/rfm/main-all-data-segment", dto);
    return response.data;
  }

  static async getComparisonTwoRfm(dto: RequestDto) {
    const response = await api.post("/rfm/comparison-two-rfm", dto);
    return response.data;
  }
}
