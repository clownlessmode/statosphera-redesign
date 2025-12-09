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
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

export class FiltersProductsService {
  static async getFranchise(dto: any): Promise<FranchiseFilterResponse[]> {
    const response = await api.post<any>("products-fr/franchise", {
      filters: {
        product: {
          ...dto.filters.product,
          groupFranchise: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getSubdivision(dto: any): Promise<SubdivisionFilterResponse[]> {
    const response = await api.post<any>("products/subdivision", {
      filters: {
        product: {
          ...dto.filters.product,
          groupSubdivision: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getTeam(dto: any): Promise<TeamFilterResponse[]> {
    const response = await api.post<any>("products/team", {
      filters: {
        product: {
          ...dto.filters.product,
          groupTeam: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getDirection(dto: any): Promise<DirectionFilterResponse[]> {
    const response = await api.post<any>("products-dir/direction", {
      filters: {
        product: {
          ...dto.filters.product,
          directionProducts: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getEconomist(dto: any): Promise<GroupEconomistFilterResponse[]> {
    const response = await api.post<any>("products-eco/economist", {
      filters: {
        product: {
          ...dto.filters.product,
          groupsEconomist: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getAutoManager(dto: any): Promise<AutoManagerFilterResponse[]> {
    const response = await api.post<any>("products/manager-auto", {
      filters: {
        product: {
          ...dto.filters.product,
          groupAutoManager: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getTypeSender(dto: any): Promise<TypeSenderFilterResponse[]> {
    const response = await api.post<any>("products-type/type", {
      filters: {
        product: {
          ...dto.filters.product,
          typeProducts: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getSeasons(dto: any): Promise<SeasonFilterResponse[]> {
    const response = await api.post<any>("products-seas/seasonality", {
      filters: {
        product: {
          ...dto.filters.product,
          seasonalityProducts: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getGroup(dto: any): Promise<GroupMainFilterResponse[]> {
    const response = await api.post<any>("products-main/main", {
      filters: {
        product: {
          ...dto.filters.product,
          idGroupMain: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getSubGroup(dto: any): Promise<SubgroupFilterResponse[]> {
    const response = await api.post<any>("products-sub/sub", {
      filters: {
        product: {
          ...dto.filters.product,
          subGroups: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getSubSubGroup(dto: any): Promise<SubSubGroupFilterResponse[]> {
    const response = await api.post<any>("products-sub-sub/sub-sub", {
      filters: {
        product: {
          ...dto.filters.product,
          subSubGroups: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
  static async getNomenklatura(
    dto: any,
  ): Promise<NomenklaturaFilterResponse[]> {
    const response = await api.post<any>("products/filter", {
      filters: {
        product: {
          ...dto.filters.product,
          idProduct: [],
        },
        store: {
          idStore: [],
          idCity: [],
          idRegion: [],
          idManager: [],
          storeCondition: [],
          ageGroup: [],
          idLegalEntity: [],
          channel: [],
          district: [],
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
}
