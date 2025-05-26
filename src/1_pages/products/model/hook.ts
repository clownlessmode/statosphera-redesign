import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { Product } from "../ui/edit-product";

const useForm = (product: Product) => {
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ppProducts: product.ppProducts || defaultValues.ppProducts,
      isIm: product.isIm || defaultValues.isIm,
      groupsFranchise: product.idGroupsFranchise,
      subGroups: product.subGroups,
      subSubGroups: product.subSubGroups,
      typeProducts: product.typeProducts,
      teamProducts: product.teamProducts,
      directionProducts: product.directionProducts,
      groupsMain: product.groupsMain,
      groupsEconomist: product.groupsEconomist,
      seasonalityProducts: product.seasonalityProducts,
      managerAuto: product.managerAuto,
      subDivisionProducts: product.subDivisionProducts
    },
    mode: "all",
  });

  return form;
};

export default useForm;
