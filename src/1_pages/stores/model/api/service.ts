import { api } from "@shared/api/api";
import { Coordinates, Store } from "../types";

interface StoreFilters {
  idStore: number[];
  idCity: number[];
  idRegion: number[];
  idManager: number[];
  ageGroup: string[];
  idLegalEntity: number[];
  channel: string[];
  district: number[];
  storeCondition: string[];
  nightStore: boolean | null;
  shopOnAuto: boolean | null;
  deliveryIm: boolean | null;
  walkingDelivery: boolean | null;
  grill: boolean | null;
  dopeki: boolean | null;
  bakehouse: boolean | null;
  brazier: boolean | null;
  camera: boolean | null;
  coffee: boolean | null;
  typeCoffee: string[];
  ownershipCoffee: string[];
  milkRefrigerator: boolean | null;
  pizzaCm: string[];
  pizzaDaysSchedule: string[];
  pizzaHoursSchedule: string[];
  maxPower: string[];
  format: string[];
  discountTime: string[];
  startDate: string;
  endDate: string;
}

export class StoresService {
  static async getStores() {
    const filters: StoreFilters = {
      idStore: [],
      idCity: [],
      idRegion: [],
      idManager: [],
      ageGroup: [],
      idLegalEntity: [],
      channel: [],
      district: [],
      storeCondition: [],
      nightStore: null,
      shopOnAuto: null,
      deliveryIm: null,
      walkingDelivery: null,
      grill: null,
      dopeki: null,
      bakehouse: null,
      brazier: null,
      camera: null,
      coffee: null,
      typeCoffee: [],
      ownershipCoffee: [],
      milkRefrigerator: null,
      pizzaCm: [],
      pizzaDaysSchedule: [],
      pizzaHoursSchedule: [],
      maxPower: [],
      format: [],
      discountTime: [],
      startDate: "2009-01-03",
      endDate: "2025-06-10",
    };

    const response = await api.post<Store[]>("store/all", filters);
    return response.data;
  }
  static async getStore(id: number) {
    const response = await api.get<Store[]>(`store/${id}`);
    return response.data[0];
  }
  static async getMap() {
    const response = await api.get<Coordinates[]>(`store/coordinates`);
    return response.data;
  }
}
