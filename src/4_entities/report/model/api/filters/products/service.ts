import { api } from "@shared/api/api";
export interface FranchiseFilterResponse {
  groupsFranchise: string;
  idGroupsFranchise: number[];
}
export interface SubdivisionFilterResponse {
  groupsFranchise: string;
  idGroupsFranchise: number[];
}
export interface TeamFilterResponse {
  teamProducts: string;
  idTeamProducts: number[];
}
export interface DirectionFilterResponse {
  directionProducts: string;
  idDirectionProducts: number[];
}
export interface GroupEconomistFilterResponse {
  groupsEconomist: string;
  idGroupsEconomist: number[];
}
export interface AutoManagerFilterResponse {
  groupsFranchise: string;
  idGroupsFranchise: number[];
}
export interface TypeProductsFilterResponse {
  groupsFranchise: string;
  idGroupsFranchise: number[];
}
export interface SeasonFilterResponse {
  seasonalityProducts: string;
  idSeasonalityProducts: number[];
}
export interface GroupMainFilterResponse {
  groupsMain: string;
  idGroupsMain: number[];
}
export interface SubgroupFilterResponse {
  subGroups: string;
  idSubGroups: number[];
}
export interface SubSubGroupFilterResponse {
  subSubGroups: string;
  idSubSubGroups: number[];
}
export interface NomenklaturaFilterResponse {
  groupsFranchise: string;
  idGroupsFranchise: number[];
}
export class FiltersProductsService {
  static async getFranchise(dto: any): Promise<FranchiseFilterResponse[]> {
    const response = await api.post<any>(
      "products-franchise-groups/product-franchise-filter",
      dto
    );
    return response.data;
  }
  static async getSubdivision(dto: any): Promise<SubdivisionFilterResponse[]> {
    const response = await api.post<any>(
      "products-subdivision-groups/product-subdivision-filter",
      dto
    );
    return response.data;
  }
  static async getTeam(dto: any): Promise<TeamFilterResponse[]> {
    const response = await api.post<any>(
      "products-team-groups/product-team-filter",
      dto
    );
    return response.data;
  }
  static async getDirection(dto: any): Promise<DirectionFilterResponse[]> {
    const response = await api.post<any>(
      "products-direction-groups/products-direction-filter",
      dto
    );
    return response.data;
  }
  static async getEconomist(dto: any): Promise<GroupEconomistFilterResponse[]> {
    const response = await api.post<any>(
      "products-economist-groups/product-economist-filter",
      dto
    );
    return response.data;
  }
  // static async getTypeSender(dto: any): Promise<TypeProductsFilterResponse[]> {
  //   const response = await api.post<any>(
  //     "products-manager-auto-groups/product-manager-auto-filter",
  //     dto
  //   );
  //   return response.data;
  // }
  static async getSeasons(dto: any): Promise<SeasonFilterResponse[]> {
    const response = await api.post<any>(
      "products-seasonality-groups/product-seasonality-filter",
      dto
    );
    return response.data;
  }
  static async getGroup(dto: any): Promise<GroupMainFilterResponse[]> {
    const response = await api.post<any>(
      "products-main-groups/product-main-filter",
      dto
    );
    return response.data;
  }
  static async getSubGroup(dto: any): Promise<SubgroupFilterResponse[]> {
    const response = await api.post<any>(
      "products-sub-groups/product-sub-filter",
      dto
    );
    return response.data;
  }
  static async getSubSubGroup(dto: any): Promise<SubSubGroupFilterResponse[]> {
    const response = await api.post<any>(
      "products-sub-sub-groups/product-sub-sub-filter",
      dto
    );
    return response.data;
  }
}
