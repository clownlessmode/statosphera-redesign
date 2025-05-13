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
} from "./types";

export class FiltersProductsService {
  static async getFranchise(dto: any): Promise<FranchiseFilterResponse[]> {
    const response = await api.post<any>("products/franchise", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupFranchise: [],
        },
      },
    });
    return response.data;
  }
  static async getSubdivision(dto: any): Promise<SubdivisionFilterResponse[]> {
    const response = await api.post<any>("products/subdivision", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupSubdivision: [],
        },
      },
    });
    return response.data;
  }
  static async getTeam(dto: any): Promise<TeamFilterResponse[]> {
    const response = await api.post<any>("products/team", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupTeam: [],
        },
      },
    });
    return response.data;
  }
  static async getDirection(dto: any): Promise<DirectionFilterResponse[]> {
    const response = await api.post<any>("products/direction", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupDirection: [],
        },
      },
    });
    return response.data;
  }
  static async getEconomist(dto: any): Promise<GroupEconomistFilterResponse[]> {
    const response = await api.post<any>("products-eco/economist", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupEconomist: [],
        },
      },
    });
    return response.data;
  }
  static async getAutoManager(dto: any): Promise<AutoManagerFilterResponse[]> {
    const response = await api.post<any>("products/manager-auto", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupAutoManager: [],
        },
      },
    });
    return response.data;
  }
  static async getTypeSender(dto: any): Promise<TypeSenderFilterResponse[]> {
    const response = await api.post<any>("products-type/type", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupTypeSender: [],
        },
      },
    });
    return response.data;
  }
  static async getSeasons(dto: any): Promise<SeasonFilterResponse[]> {
    const response = await api.post<any>("products-seas/seasonality", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupSeasonality: [],
        },
      },
    });
    return response.data;
  }
  static async getGroup(dto: any): Promise<GroupMainFilterResponse[]> {
    const response = await api.post<any>("products-main/main", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupMain: [],
        },
      },
    });
    return response.data;
  }
  static async getSubGroup(dto: any): Promise<SubgroupFilterResponse[]> {
    const response = await api.post<any>("products-sub/sub", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupSub: [],
        },
      },
    });
    return response.data;
  }
  static async getSubSubGroup(dto: any): Promise<SubSubGroupFilterResponse[]> {
    const response = await api.post<any>("products-sub-sub/sub-sub", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupSubSub: [],
        },
      },
    });
    return response.data;
  }
  static async getNomenklatura(
    dto: any
  ): Promise<NomenklaturaFilterResponse[]> {
    const response = await api.post<any>("products/filter", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          groupNomenklatura: [],
        },
      },
    });
    return response.data;
  }
}
