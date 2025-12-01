import { api } from "@shared/api/api";
import {
  GroupMainFilterResponse,
  SubgroupFilterResponse,
  SubSubGroupFilterResponse,
  SubSubSubGroupFilterResponse,
  NomenklaturaFilterResponse,
} from "./types";

export class FiltersProductsService {
  static async getGroup(dto: any): Promise<GroupMainFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_group", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          idGroupProduct: [],
        },
      },
    });
    return response.data;
  }
  static async getSubGroup(dto: any): Promise<SubgroupFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_one_lvl_group", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          oneLvlGroupProduct: [],
        },
      },
    });
    return response.data;
  }
  static async getSubSubGroup(dto: any): Promise<SubSubGroupFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_two_lvl_group", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          twoLvlGroupProduct: [],
        },
      },
    });
    return response.data;
  }
  static async getSubSubSubGroup(
    dto: any,
  ): Promise<SubSubSubGroupFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_three_lvl_group", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          threeLvlGroupProduct: [],
        },
      },
    });
    return response.data;
  }
  static async getNomenklatura(
    dto: any,
  ): Promise<NomenklaturaFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_product", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          idProduct: [],
        },
      },
    });
    return response.data;
  }
}
