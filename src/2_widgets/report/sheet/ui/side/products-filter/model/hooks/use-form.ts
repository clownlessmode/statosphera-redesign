import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";

export const useForm = () => {
  const {
    directionProducts,
    groupFranchise,
    groupsEconomist,
    idGroupMain,
    idProduct,
    managerAuto,
    ppProducts,
    seasonalityProducts,
    subDivisionProducts,
    subGroups,
    subSubGroups,
    teamProducts,
    typeProducts,
  } = useFiltersStore((state) => state.filters.product);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      directionProducts: directionProducts || defaultValues.directionProducts,
      groupFranchise: groupFranchise || defaultValues.groupFranchise,
      groupsEconomist: groupsEconomist || defaultValues.groupsEconomist,
      idGroupMain: idGroupMain || defaultValues.idGroupMain,
      idProduct: idProduct || defaultValues.idProduct,
      managerAuto: managerAuto || defaultValues.managerAuto,
      ppProducts: ppProducts || defaultValues.ppProducts,
      seasonalityProducts:
        seasonalityProducts || defaultValues.seasonalityProducts,
      subDivisionProducts:
        subDivisionProducts || defaultValues.subDivisionProducts,
      subGroups: subGroups || defaultValues.subGroups,
      subSubGroups: subSubGroups || defaultValues.subSubGroups,
      teamProducts: teamProducts || defaultValues.teamProducts,
      typeProducts: typeProducts || defaultValues.typeProducts,
    },
    mode: "onSubmit",
  });

  return form;
};
