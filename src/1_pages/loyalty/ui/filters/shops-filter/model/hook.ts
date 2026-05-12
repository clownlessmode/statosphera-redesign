// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";

import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";

import { useSalesDynamicsController } from "@pages/sales-dynamics/model/api/controller";
import {
  PartnersFilterResponse,
  CitiesFilterResponse,
  RegionsFilterResponse,
  ShopsFilterResponse,
  SectorsFilterResponse,
} from "@pages/sales-dynamics/model/api/service";
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
    sector,
  } = useSalesDynamicsFiltersStore((state) => state.filters);
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
      sector: sector || defaultValues.sector,
    },
    mode: "all",
  });

  return form;
};

export default useForm;

export const usePartners = (allData: any) => {
  const [partnerOptions, setPartnerOptions] = useState<MultiSelectOption[]>([]);
  const { getPartners, isPartnersLoading } = useSalesDynamicsController();

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
  const { getCities, isCitiesLoading } = useSalesDynamicsController();

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
  const { getRegions, isRegionsLoading } = useSalesDynamicsController();

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

export const useSectors = () => {
  const [sectorsOptions, setSectorsOptions] = useState<MultiSelectOption[]>([]);
  const { sectors, isSectorsLoading } = useSalesDynamicsController();

  const handleOpenSectorsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const apiOptions = sectors.map((sector: SectorsFilterResponse) => ({
        label: sector.sector,
        value: sector.sector,
      }));

      setSectorsOptions(apiOptions);
    } catch (error) {
      setSectorsOptions([]);
      console.error("Ошибка при загрузке секторов:", error);
    }
  };

  return {
    sectorsOptions,
    handleOpenSectorsSelect,
    isSectorsLoading,
  };
};

export const useShops = (allData: any) => {
  const [shopsOptions, setShopsOptions] = useState<MultiSelectOption[]>([]);
  const { getShops, isShopsLoading } = useSalesDynamicsController();

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
