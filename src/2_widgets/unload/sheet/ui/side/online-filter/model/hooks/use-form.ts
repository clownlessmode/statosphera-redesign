import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { processArrayableValue } from "@shared/lib/arrayable-string";

export const useForm = () => {
  const {
    imDeliveryMethod,
    imPaymentMethod,
    imPromo,
    imReceiveInterval,
    imStatusOrder,
    imTypeOrder,
    isIm,
  } = useFiltersStore((state) => state.filters.onlineStore);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      imDeliveryMethod: imDeliveryMethod || defaultValues.imDeliveryMethod,
      imPaymentMethod: imPaymentMethod || defaultValues.imPaymentMethod,
      imPromo: processArrayableValue(imPromo, defaultValues.imPromo),
      imReceiveInterval: processArrayableValue(
        imReceiveInterval,
        defaultValues.imReceiveInterval,
      ),
      imStatusOrder: processArrayableValue(
        imStatusOrder,
        defaultValues.imStatusOrder,
      ),
      imTypeOrder: imTypeOrder || defaultValues.imTypeOrder,
      isIm: isIm ?? defaultValues.isIm,
    },
    mode: "all",
  });

  return form;
};
