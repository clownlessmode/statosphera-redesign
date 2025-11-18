import { MultiSelectOption } from "@shared/ui/multiselect";
import { useCallback, useEffect, useState } from "react";
import { useFilters } from "@entities/unload/model/api/filters/audience/controller";

export const useAudience = () => {
  const {
    getAudience,
    isAudienceLoading,
    audience: initialAudienceData,
  } = useFilters();
  const [audienceOptions, setAudienceOptions] = useState<MultiSelectOption[]>(
    [],
  );

  // 1. При первой загрузке компонента, заполняем опции начальными данными,
  // которые react-query уже мог загрузить.
  useEffect(() => {
    if (initialAudienceData?.data) {
      const initialOptions = initialAudienceData.data.map(
        (audience: { nameAudience: string; idAudience: number }) => ({
          label: audience.nameAudience,
          value: String(audience.idAudience),
        }),
      );
      setAudienceOptions(initialOptions);
    }
  }, [initialAudienceData]);

  // 2. Создаем функцию, которая будет принудительно обновлять данные
  const refreshAudienceOptions = useCallback(async () => {
    try {
      const { data: freshData } = await getAudience();

      const newOptions =
        freshData?.data?.map(
          (audience: { nameAudience: string; idAudience: number }) => ({
            label: audience.nameAudience,
            value: String(audience.idAudience),
          }),
        ) || [];

      setAudienceOptions(newOptions);

      // Возвращаем новые опции, чтобы компонент мог их использовать для синхронизации
      return newOptions;
    } catch (error) {
      console.error("Ошибка при обновлении аудиторий:", error);
      setAudienceOptions([]);
      return [];
    }
  }, [getAudience]);

  return {
    audienceOptions,
    isAudienceLoading,
    refreshAudienceOptions,
  };
};
