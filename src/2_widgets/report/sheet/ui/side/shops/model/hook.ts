// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import {
  CitiesFilterResponse,
  PartnersFilterResponse,
  RegionsFilterResponse,
  ShopsFilterResponse,
} from "@entities/report/model/api/filters/shops/service";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
const useForm = () => {
  const {
    ageGroup,
    channel,
    district,
    idCity,
    idLegalEntity,
    idManager,
    idRegion,
    idStore,
    storeCondition,
  } = useFiltersStore((state) => state.filters.store);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ageGroup: ageGroup || defaultValues.ageGroup,
      channel: channel || defaultValues.channel,
      district: district || defaultValues.district,
      idCity: idCity || defaultValues.idCity,
      idLegalEntity: idLegalEntity || defaultValues.idLegalEntity,
      idManager: idManager || defaultValues.idManager,
      idRegion: idRegion || defaultValues.idRegion,
      idStore: idStore || defaultValues.idStore,
      storeCondition: storeCondition || defaultValues.storeCondition,
    },
    mode: "all",
  });

  return form;
};

export default useForm;

export const usePartners = (allData: any) => {
  const [partnerOptions, setPartnerOptions] = useState<MultiSelectOption[]>([]);
  const { getPartners, isPartnersLoading } = useFilters();

  const handleOpenPartnersSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPartners(allData);
      const apiOptions = response.map((partner: PartnersFilterResponse) => ({
        label: partner.nameManager,
        value: String(partner.idManager?.[0] || ""),
      }));
      setPartnerOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке партнёров:", error);
    }
  };

  return { partnerOptions, handleOpenPartnersSelect, isPartnersLoading };
};

export const useCities = (allData: any) => {
  const [citiesOptions, setCitiesOptions] = useState<MultiSelectOption[]>([]);
  const { getCities, isCitiesLoading } = useFilters();

  const handleOpenCitiesSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getCities(allData);
      const apiOptions = response.map((city: CitiesFilterResponse) => ({
        label: city.storeCity,
        value: String(city.cityId || ""),
      }));
      setCitiesOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке городов:", error);
    }
  };

  return { citiesOptions, handleOpenCitiesSelect, isCitiesLoading };
};

export const useRegions = (allData: any) => {
  const [regionsOptions, setRegionsOptions] = useState<MultiSelectOption[]>([]);
  const { getRegions, isRegionsLoading } = useFilters();

  const handleOpenRegionsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getRegions(allData);
      const apiOptions = response.map((region: RegionsFilterResponse) => ({
        label: region.storeRegion,
        value: String(region.regionId || ""),
      }));
      setRegionsOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке регионов:", error);
    }
  };

  return { regionsOptions, handleOpenRegionsSelect, isRegionsLoading };
};

export const useShops = (allData: any) => {
  const [shopsOptions, setShopsOptions] = useState<MultiSelectOption[]>([]);
  const { getShops, isShopsLoading } = useFilters();

  const handleOpenShopsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getShops(allData);
      const apiOptions = response.map((shop: ShopsFilterResponse) => ({
        label: shop.storeName,
        value: String(shop.idStore?.[0] || ""),
      }));
      setShopsOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке магазинов:", error);
    }
  };

  return { shopsOptions, handleOpenShopsSelect, isShopsLoading };
};
