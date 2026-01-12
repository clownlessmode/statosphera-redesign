import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";
import { useTabStore } from "@widgets/report/sheet/model/url-store";

export const useForm = () => {
  const indicators = useFiltersStore((state) => state.indicators);
  const updateIndicators = useFiltersStore((state) => state.updateIndicators);
  const { nightShops } = useFiltersStore();
  const { tab } = useTabStore();

  useEffect(() => {
    if (nightShops && tab === "check") {
      updateIndicators(defaultValues.nightProceeds);
    } else {
      updateIndicators(defaultValues.proceeds);
    }
  }, [nightShops, tab]);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      proceeds:
        indicators && indicators.length > 0
          ? indicators
          : nightShops
            ? defaultValues.nightProceeds
            : defaultValues.proceeds,
    },
    mode: "all",
  });

  useEffect(() => {
    const resolved =
      indicators && indicators.length > 0
        ? indicators
        : nightShops
          ? defaultValues.nightProceeds
          : defaultValues.proceeds;

    form.reset({ proceeds: resolved });
    updateIndicators(resolved);
  }, [indicators]);

  return form;
};
