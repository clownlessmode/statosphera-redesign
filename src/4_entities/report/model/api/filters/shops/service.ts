import { api } from "@shared/api/api";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
export interface PartnersFilterResponse {
  nameManager: string;
  idManager: number[];
}
export interface RegionsFilterResponse {
  storeRegion: string;
  regionId: number;
}
export interface CitiesFilterResponse {
  storeCity: string;
  cityId: number;
}
export interface ShopsFilterResponse {
  storeName: string;
  idStore: number[];
}
export class FiltersShopsService {
  static async getPartners(dto: any): Promise<PartnersFilterResponse[]> {
    const response = await api.post<any>("store/manager", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idManager: [],
        },
      },
    });
    return response.data;
  }
  static async getRegions(dto: any): Promise<RegionsFilterResponse[]> {
    const response = await api.post<any>("filters/region", {
      filters: {
        store: {
          ...dto.filters.store,
          idRegion: [],
        },
        product: {
          groupFranchise: [],
          ppProducts: null,
          subDivisionProducts: [],
          subGroups: [],
          subSubGroups: [],
          typeProducts: [],
          teamProducts: [],
          directionProducts: [],
          groupsEconomist: [],
          groupsMain: [],
          idGroupMain: [],
          idProduct: [],
          seasonalityProducts: [],
          managerAuto: [],
        },
        check: {
          tabNumber: [],
          containsBankQr: null,
          paymentClass: null,
          shift: [],
          cashBox: [],
          checkNumber: [],
          numberfield: [],
          type: [],
        },
        loyal: {
          isLoyal: null,
          cardNumber: [],
          sex: null,
          guidDiscount: [],
          guidBonus: [],
          ageStart: null,
          ageEnd: null,
          colorsDiscount: [],
          groupAge: [],
        },
        onlineStore: {
          isIm: null,
          imTypeOrder: [],
          imDeliveryMethod: [],
          imPaymentMethod: [],
          imStatusOrder: [],
          imReceiveInterval: [],
          imPromo: [],
        },
        writeoff: {
          indicator: [],
          article: [],
        },
      },
      values: ["proceeds"],
      uniques: [],
      indicators: ["proceeds"],
      filterDate: {
        dateStart: format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
        dateEnd: format(endOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
      },
      filterTime: {
        timeStart: "",
        timeEnd: "",
      },
      sorts: {
        sort: "desc",
        colId: [],
      },
      limit: 100,
      offset: 0,
      groups: [],
    });
    return response.data;
  }
  static async getCities(dto: any): Promise<CitiesFilterResponse[]> {
    const response = await api.post<any>("filters/city", {
      filters: {
        store: {
          ...dto.filters.store,
          idCity: [],
        },
        product: {
          groupFranchise: [],
          ppProducts: null,
          subDivisionProducts: [],
          subGroups: [],
          subSubGroups: [],
          typeProducts: [],
          teamProducts: [],
          directionProducts: [],
          groupsEconomist: [],
          groupsMain: [],
          idGroupMain: [],
          idProduct: [],
          seasonalityProducts: [],
          managerAuto: [],
        },
        check: {
          tabNumber: [],
          containsBankQr: null,
          paymentClass: null,
          shift: [],
          cashBox: [],
          checkNumber: [],
          numberfield: [],
          type: [],
        },
        loyal: {
          isLoyal: null,
          cardNumber: [],
          sex: null,
          guidDiscount: [],
          guidBonus: [],
          ageStart: null,
          ageEnd: null,
          colorsDiscount: [],
          groupAge: [],
        },
        onlineStore: {
          isIm: null,
          imTypeOrder: [],
          imDeliveryMethod: [],
          imPaymentMethod: [],
          imStatusOrder: [],
          imReceiveInterval: [],
          imPromo: [],
        },
        writeoff: {
          indicator: [],
          article: [],
        },
      },
      values: ["proceeds"],
      uniques: [],
      indicators: ["proceeds"],
      filterDate: {
        dateStart: format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
        dateEnd: format(endOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
      },
      filterTime: {
        timeStart: "",
        timeEnd: "",
      },
      sorts: {
        sort: "desc",
        colId: [],
      },
      limit: 100,
      offset: 0,
      groups: [],
    });
    return response.data;
  }
  static async getShops(dto: any): Promise<ShopsFilterResponse[]> {
    const response = await api.post<any>("store/shop", {
      ...dto.filters.store,
      idStore: [],
    });
    return response.data;
  }
}
