import { api } from "@shared/api/api";
import {
  FranchiseFilterResponse,
  GroupEconomistFilterResponse,
  GroupMainFilterResponse,
  SeasonFilterResponse,
  SubdivisionFilterResponse,
  SubgroupFilterResponse,
  SubSubGroupFilterResponse,
  TeamFilterResponse,
  DirectionFilterResponse,
  AutoManagerFilterResponse,
  TypeSenderFilterResponse,
  NomenklaturaFilterResponse,
  // NomenklaturaFilterResponse,
} from "./types";

export class FiltersProductsService {
  static async getFranchise(dto: any): Promise<FranchiseFilterResponse[]> {
    const response = await api.post<any>("products/franchise", dto);
    return response.data;
  }
  static async getSubdivision(dto: any): Promise<SubdivisionFilterResponse[]> {
    const response = await api.post<any>("products/subdivision", dto);
    return response.data;
  }
  static async getTeam(dto: any): Promise<TeamFilterResponse[]> {
    const response = await api.post<any>("products/team", dto);
    return response.data;
  }
  static async getDirection(dto: any): Promise<DirectionFilterResponse[]> {
    const response = await api.post<any>("products/direction", dto);
    return response.data;
  }
  static async getEconomist(dto: any): Promise<GroupEconomistFilterResponse[]> {
    const response = await api.post<any>("products/economist", dto);
    return response.data;
  }
  static async getAutoManager(dto: any): Promise<AutoManagerFilterResponse[]> {
    const response = await api.post<any>("products/manager-auto", dto);
    return response.data;
  }
  static async getTypeSender(dto: any): Promise<TypeSenderFilterResponse[]> {
    const response = await api.post<any>("products/type", dto);
    return response.data;
  }
  static async getSeasons(dto: any): Promise<SeasonFilterResponse[]> {
    const response = await api.post<any>("products/seasonality", dto);
    return response.data;
  }
  static async getGroup(dto: any): Promise<GroupMainFilterResponse[]> {
    const response = await api.post<any>("products/main", dto);
    return response.data;
  }
  static async getSubGroup(dto: any): Promise<SubgroupFilterResponse[]> {
    const response = await api.post<any>("products/sub", dto);
    return response.data;
  }
  static async getSubSubGroup(dto: any): Promise<SubSubGroupFilterResponse[]> {
    const response = await api.post<any>("products/sub-sub", dto);
    return response.data;
  }
  static async getNomenklatura(
    dto: any
  ): Promise<NomenklaturaFilterResponse[]> {
    const response = await api.post<any>("products/filter", dto);
    return response.data;
  }
}
