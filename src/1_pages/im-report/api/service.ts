import { api } from "@shared/api/api";
import { RequestDto } from "../config/types";

export class IMService {
  // Карточки
  static async getMainCards(dto: RequestDto) {
    const response = await api.post("online-store/cards", dto);
    return response.data;
  }
  static async getOurselvesCards(dto: RequestDto) {
    const response = await api.post("online-store/cards-ourselves", dto);
    return response.data;
  }
  static async getOrdinariesCards(dto: RequestDto) {
    const response = await api.post("online-store/cards-ordinaries", dto);
    return response.data;
  }
  static async getPickupCards(dto: RequestDto) {
    const response = await api.post("online-store/cards-pickup", dto);
    return response.data;
  }

  // Графики
  static async getOrderProcessingGraph(dto: RequestDto) {
    const response = await api.post("online-store/graph-order-proccesing", dto);
    return response.data;
  }
  static async getProceedsGraph(dto: RequestDto) {
    const response = await api.post("online-store/graph-proceeds", dto);
    return response.data;
  }
  static async getChannelsGraph(dto: RequestDto) {
    const response = await api.post("online-store/graph-channels", dto);
    return response.data;
  }
  static async getChannelsAgeGraph(dto: RequestDto) {
    const response = await api.post("online-store/graph-channels-age", dto);
    return response.data;
  }
  static async getStoreOrdinaryTable(dto: RequestDto) {
    const response = await api.post("online-store/tbl-store-ordinary", dto);
    return response.data;
  }
  static async getStorePickupTable(dto: RequestDto) {
    const response = await api.post("online-store/tbl-store-pickup", dto);
    return response.data;
  }
  static async getTopNomenclature(dto: RequestDto) {
    const response = await api.post("online-store/top-nomenclature", dto);
    return response.data;
  }
  static async getPenetrationOffline(dto: RequestDto) {
    const response = await api.post("online-store/penetration-offline", dto);
    return response.data;
  }
  static async getWorstOnlineOffline(dto: RequestDto) {
    const response = await api.post("online-store/worst-online-offline", dto);
    return response.data;
  }
  static async getAntitopOrderCancell(dto: RequestDto) {
    const response = await api.post("online-store/antitop-order-cancell", dto);
    return response.data;
  }
  static async getTopPaymentMethod(dto: RequestDto) {
    const response = await api.post("online-store/top-payment-method", dto);
    return response.data;
  }

  // Единый эндпоинт для таблицы отчетов ИМ
  static async getIMTable(dto: RequestDto) {
    const response = await api.post("online-store/tbl", dto);
    return response.data;
  }

  // Экспорт отчета ИМ
  static async exportIMTable(dto: RequestDto) {
    const response = await api.post("online-store/tbl", {
      ...dto,
      exportFile: true,
    });
    return response.data;
  }
}
