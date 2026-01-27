import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";
import { useTabStore } from "@widgets/report/sheet/model/url-store";

export const useForm = () => {
  const indicators = useFiltersStore((state) => state.indicators);
  const { nightShops } = useFiltersStore();
  const { tab } = useTabStore();

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
    if (nightShops && tab === "check") {
      form.reset({ proceeds: defaultValues.nightProceeds });
    } else {
      form.reset({ proceeds: defaultValues.proceeds });
    }
  }, [nightShops, tab]);

  useEffect(() => {
    if (nightShops) {
      const resolved =
        indicators && indicators.length > 0
          ? indicators
          : defaultValues.nightProceeds;
      form.reset({ proceeds: resolved });
    }
  }, [indicators]);

  return form;
};
