//import { useEffect } from "react";
//import { zodResolver } from "@hookform/resolvers/zod";
//import { useForm as useHookForm } from "react-hook-form";
//import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
//import { defaultValues, FormValues, schema } from "../../config";
//
//export const useForm = () => {
//  const indicators = useFiltersStore((state) => state.indicators);
//  const updateIndicators = useFiltersStore((state) => state.updateIndicators);
//
//  const form = useHookForm<FormValues>({
//    resolver: zodResolver(schema),
//    defaultValues: {
//      proceeds:
//        indicators && indicators.length > 0
//          ? indicators
//          : defaultValues.proceeds,
//    },
//    mode: "all",
//  });
//
//  useEffect(() => {
//    const resolved =
//      indicators && indicators.length > 0 ? indicators : defaultValues.proceeds;
//
//    form.reset({ proceeds: resolved });
//    updateIndicators(resolved);
//  }, []);
//
//  return form;
//};
