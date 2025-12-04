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
    const response = await api.post<any>("/iiko-write-off/filters_group", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          idGroupProduct: [],
        },
      },
      values: [
        "costPrice",
        "costPriceLY",
        "costPriceYoY",
        "costPriceYoYPercent",
        "costPriceLM",
        "costPriceMoM",
        "costPriceMoMPercent",
      ],
    });
    return response.data;
  }
  static async getSubGroup(dto: any): Promise<SubgroupFilterResponse[]> {
    const response = await api.post<any>(
      "/iiko-write-off/filters_one_lvl_group",
      {
        ...dto,
        filters: {
          ...dto.filters,
          product: {
            ...dto.filters.product,
            oneLvlGroupProduct: [],
          },
        },
        values: [
          "costPrice",
          "costPriceLY",
          "costPriceYoY",
          "costPriceYoYPercent",
          "costPriceLM",
          "costPriceMoM",
          "costPriceMoMPercent",
        ],
      },
    );
    return response.data;
  }
  static async getSubSubGroup(dto: any): Promise<SubSubGroupFilterResponse[]> {
    const response = await api.post<any>(
      "/iiko-write-off/filters_two_lvl_group",
      {
        ...dto,
        filters: {
          ...dto.filters,
          product: {
            ...dto.filters.product,
            twoLvlGroupProduct: [],
          },
        },
        values: [
          "costPrice",
          "costPriceLY",
          "costPriceYoY",
          "costPriceYoYPercent",
          "costPriceLM",
          "costPriceMoM",
          "costPriceMoMPercent",
        ],
      },
    );
    return response.data;
  }
  static async getSubSubSubGroup(
    dto: any,
  ): Promise<SubSubSubGroupFilterResponse[]> {
    const response = await api.post<any>(
      "/iiko-write-off/filters_three_lvl_group",
      {
        ...dto,
        filters: {
          ...dto.filters,
          product: {
            ...dto.filters.product,
            threeLvlGroupProduct: [],
          },
        },
        values: [
          "costPrice",
          "costPriceLY",
          "costPriceYoY",
          "costPriceYoYPercent",
          "costPriceLM",
          "costPriceMoM",
          "costPriceMoMPercent",
        ],
      },
    );
    return response.data;
  }
  static async getNomenklatura(
    dto: any,
  ): Promise<NomenklaturaFilterResponse[]> {
    const response = await api.post<any>("/iiko-write-off/filters_product", {
      ...dto,
      filters: {
        ...dto.filters,
        product: {
          ...dto.filters.product,
          idProduct: [],
        },
      },
      values: [
        "costPrice",
        "costPriceLY",
        "costPriceYoY",
        "costPriceYoYPercent",
        "costPriceLM",
        "costPriceMoM",
        "costPriceMoMPercent",
      ],
    });
    return response.data;
  }
}
