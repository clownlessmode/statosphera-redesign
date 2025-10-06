import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class RfmService {
  static async getNameSegment() {
    const response = await api.get("/rfm/get-name-segment");
    return response.data;
  }

  static async getFirstCalculation(dto: RequestDto) {
    const response = await api.post("rfm/first-calculation-gistogram", dto);
    return response.data;
  }

  static async getSecondCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/second-calculation-gistogram", dto);
    return response.data;
  }

  static async getThirdCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/third-calculation-treemap", dto);
    return response.data;
  }

  static async getFourthCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/fourth-calculation-gistogram", dto);
    return response.data;
  }

  static async getFifthCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/fifth-calculation-treemap", dto);
    return response.data;
  }

  static async getSixthCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/sixth-calculation-radar", dto);
    return response.data;
  }

  static async getSeventhCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/seventh-calculation-sunburst", dto);
    return response.data;
  }
  static async getEighthCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/eighth-calculation-gistogram", dto);
    return response.data;
  }

  static async getNinthCalculation(dto: RequestDto) {
    const response = await api.post(
      "/rfm/ninth-calculation-drill-down-gistogram",
      dto,
    );
    return response.data;
  }
  static async getTenthCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/tenth-calculation-gistogram", dto);
    return response.data;
  }
  static async getEleventhCalculation(dto: RequestDto) {
    const response = await api.post("eleventh-calculation-gistogram", dto);
    return response.data;
  }

  static async getTwelfthCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/twelfth-calculation-gistogram", dto);
    return response.data;
  }

  static async getThirteenthCalculation(dto: RequestDto) {
    const response = await api.post(
      "/rfm/thirteenth-calculation-gistogram",
      dto,
    );
    return response.data;
  }

  static async getFourteenCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/fourteen-calculation-gistogram", dto);
    return response.data;
  }

  static async getFifteenCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/fifteen-calculation-gistogram", dto);
    return response.data;
  }

  static async getSixteenCalculation(dto: RequestDto) {
    const response = await api.post("/rfm/16-calculation-gistogram", dto);
    return response.data;
  }
}
