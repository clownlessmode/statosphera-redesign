import { RequestDto } from "@pages/night-stores/config";
import { api } from "@shared/api/api";
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
export interface SectorsFilterResponse {
  sector: string;
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
        dateStart: dto.filterDate.dateStart,
        dateEnd: dto.filterDate.dateEnd,
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
        dateStart: dto.filterDate.dateStart,
        dateEnd: dto.filterDate.dateEnd,
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

  static async getSectors(): Promise<SectorsFilterResponse[]> {
    const response = await api.get("/sector");
    return response.data;
  }

  static async getPartnersNightStores(dto: Pick<RequestDto, "filters">) {
    const response = await api.post("store/night-manager", dto);
    return response.data;
  }

  static async getRegionsNightStores(dto: Pick<RequestDto, "filters">) {
    const response = await api.post("filters/night-region", dto);
    return response.data;
  }

  static async getCitiesNightStores(dto: Pick<RequestDto, "filters">) {
    const response = await api.post("filters/night-city", dto);
    return response.data;
  }

  static async getShopsNightStores(dto: Pick<RequestDto, "filters">) {
    const response = await api.post(
      "store/night-store-shop",
      dto.filters.store,
    );
    return response.data;
  }
}
