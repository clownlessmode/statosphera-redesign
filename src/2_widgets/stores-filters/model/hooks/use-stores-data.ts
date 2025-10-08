// Hook для загрузки данных для фильтров магазинов
// Использует API reports для получения списков магазинов, городов и регионов

import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import {
  ShopsFilterResponse,
  CitiesFilterResponse,
  RegionsFilterResponse,
  PartnersFilterResponse,
} from "@entities/report/model/api/filters/shops/service";

// Store для сохранения загруженных лейблов магазинов
interface StoresDataStore {
  savedShopLabels: MultiSelectOption[];
  setShopLabels: (options: MultiSelectOption[]) => void;
  savedCityLabels: MultiSelectOption[];
  setCityLabels: (options: MultiSelectOption[]) => void;
  savedRegionLabels: MultiSelectOption[];
  setRegionLabels: (options: MultiSelectOption[]) => void;
  savedPartnerLabels: MultiSelectOption[];
  setPartnerLabels: (options: MultiSelectOption[]) => void;
}

export const useStoresDataStore = create<StoresDataStore>((set) => ({
  savedShopLabels: [],
  setShopLabels: (options) => set({ savedShopLabels: options }),
  savedCityLabels: [],
  setCityLabels: (options) => set({ savedCityLabels: options }),
  savedRegionLabels: [],
  setRegionLabels: (options) => set({ savedRegionLabels: options }),
  savedPartnerLabels: [],
  setPartnerLabels: (options) => set({ savedPartnerLabels: options }),
}));

// Hook для загрузки магазинов
export const useStoresForFilter = (allData: any) => {
  const [storesOptions, setStoresOptions] = useState<MultiSelectOption[]>([]);
  const { getShops, isShopsLoading } = useFilters();
  const { setShopLabels, savedShopLabels } = useStoresDataStore();

  const handleOpenStoresSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getShops(processFiltersDto(allData));
      const apiOptions = response.map((shop: ShopsFilterResponse) => ({
        label: shop.storeName,
        value: String(JSON.stringify(shop.idStore || [])),
      }));

      setStoresOptions(apiOptions);
      setShopLabels(apiOptions);
    } catch (error) {
      setStoresOptions([]);
      setShopLabels([]);
      console.error("Ошибка при загрузке магазинов:", error);
    }
  };

  return {
    storesOptions,
    handleOpenStoresSelect,
    isStoresLoading: isShopsLoading,
    savedShopLabels,
  };
};

// Hook для загрузки городов
export const useCitiesForFilter = (allData: any) => {
  const [citiesOptions, setCitiesOptions] = useState<MultiSelectOption[]>([]);
  const { getCities, isCitiesLoading } = useFilters();
  const { setCityLabels, savedCityLabels } = useStoresDataStore();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getCities(processFiltersDto(allData));
      const apiOptions = response.map((city: CitiesFilterResponse) => ({
        label: city.storeCity,
        value: String(JSON.stringify(city.cityId || [])),
      }));

      setCitiesOptions(apiOptions);
      setCityLabels(apiOptions);
    } catch (error) {
      setCitiesOptions([]);
      setCityLabels([]);
      console.error("Ошибка при загрузке городов:", error);
    }
  };

  return {
    citiesOptions,
    handleOpenCitiesSelect,
    isCitiesLoading,
    savedCityLabels,
  };
};

// Hook для загрузки регионов
export const useRegionsForFilter = (allData: any) => {
  const [regionsOptions, setRegionsOptions] = useState<MultiSelectOption[]>([]);
  const { getRegions, isRegionsLoading } = useFilters();
  const { setRegionLabels, savedRegionLabels } = useStoresDataStore();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getRegions(processFiltersDto(allData));
      const apiOptions = response.map((region: RegionsFilterResponse) => ({
        label: region.storeRegion,
        value: String(JSON.stringify(region.regionId || [])),
      }));

      setRegionsOptions(apiOptions);
      setRegionLabels(apiOptions);
    } catch (error) {
      setRegionsOptions([]);
      setRegionLabels([]);
      console.error("Ошибка при загрузке регионов:", error);
    }
  };

  return {
    regionsOptions,
    handleOpenRegionsSelect,
    isRegionsLoading,
    savedRegionLabels,
  };
};

// Hook для загрузки партнеров
export const usePartnersForFilter = (allData: any) => {
  const [partnerOptions, setPartnerOptions] = useState<MultiSelectOption[]>([]);
  const { getPartners, isPartnersLoading } = useFilters();
  const { setPartnerLabels, savedPartnerLabels } = useStoresDataStore();

  const handleOpenPartnersSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPartners(processFiltersDto(allData));
      const apiOptions = response.map((partner: PartnersFilterResponse) => ({
        label: partner.nameManager,
        value: String(JSON.stringify(partner.idManager || [])),
      }));

      setPartnerOptions(apiOptions);
      setPartnerLabels(apiOptions);
    } catch (error) {
      setPartnerOptions([]);
      setPartnerLabels([]);
      console.error("Ошибка при загрузке партнёров:", error);
    }
  };

  return {
    partnerOptions,
    handleOpenPartnersSelect,
    isPartnersLoading,
    savedPartnerLabels,
  };
};
