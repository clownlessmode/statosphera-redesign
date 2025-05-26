import { api } from "@shared/api/api";
import { AutoManagerFilterResponse, DirectionFilterResponse, FranchiseFilterResponse, GroupEconomistFilterResponse, GroupMainFilterResponse, NomenklaturaFilterResponse, SeasonFilterResponse, SubdivisionFilterResponse, SubgroupFilterResponse, SubSubGroupFilterResponse, TeamFilterResponse, TypeSenderFilterResponse } from "./types";

export class GetProductsService {
    static async getFranchise(): Promise<FranchiseFilterResponse[]> {
      const response = await api.get<any>("products-fr/all")
      return response.data;
    }
    static async getGroup(): Promise<TeamFilterResponse[]> {
        const response = await api.get<any>("products-team/all")
        return response.data;
      }
      static async getDirection(): Promise<DirectionFilterResponse[]> {
        const response = await api.get<any>("products-dir/all")
        return response.data;
      }
    static async getEconomist(): Promise<GroupEconomistFilterResponse[]> {
        const response = await api.get<any>("products-eco/all")
        return response.data;
    }

    static async getSeasons(): Promise<SeasonFilterResponse[]> {
        const response = await api.get<any>("products-seas/all")
        return response.data;
    }

    static async getGroupMain(): Promise<GroupMainFilterResponse[]> {
        const response = await api.get<any>("products-main/all")
        return response.data;
    }

    static async getSubGroup(): Promise<SubgroupFilterResponse[]> {
        const response = await api.get<any>("products-sub/all")
        return response.data;
    }

    static async getSubSubGroup(): Promise<SubSubGroupFilterResponse[]> {
        const response = await api.get<any>("products-sub-sub/all")
        return response.data;
    }

    static async getSubdivision(): Promise<SubdivisionFilterResponse[]> {
        const response = await api.get<any>("products-subdiv/all")
        return response.data;
    }

    static async getAutoManager(): Promise<AutoManagerFilterResponse[]> {
        const response = await api.get<any>("products/all")
        return response.data;
    }

    static async getTypeSender(): Promise<TypeSenderFilterResponse[]> {
        const response = await api.get<any>("products-type/all")
        return response.data;
    }

    static async getNomenklatura(): Promise<NomenklaturaFilterResponse[]> {
        const response = await api.get<any>("products/filter-get")
        return response.data;
    }
}