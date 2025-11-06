import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";

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
      directionProducts: processArrayableValue(
        directionProducts,
        defaultValues.directionProducts,
      ),
      groupFranchise: processArrayableValue(
        groupFranchise,
        defaultValues.groupFranchise,
      ),
      groupsEconomist: processArrayableValue(
        groupsEconomist,
        defaultValues.groupsEconomist,
      ),
      idGroupMain: processArrayableValue(
        idGroupMain,
        defaultValues.idGroupMain,
      ),
      idProduct: processArrayableValue(idProduct, defaultValues.idProduct),
      managerAuto: managerAuto || defaultValues.managerAuto,
      ppProducts: ppProducts || defaultValues.ppProducts,
      seasonalityProducts: processArrayableValue(
        seasonalityProducts,
        defaultValues.seasonalityProducts,
      ),
      subDivisionProducts: processArrayableValue(
        subDivisionProducts,
        defaultValues.subDivisionProducts,
      ),
      subGroups: processArrayableValue(subGroups, defaultValues.subGroups),
      subSubGroups: processArrayableValue(
        subSubGroups,
        defaultValues.subSubGroups,
      ),
      teamProducts: processArrayableValue(
        teamProducts,
        defaultValues.teamProducts,
      ),
      typeProducts: processArrayableValue(
        typeProducts,
        defaultValues.typeProducts,
      ),
    },
    mode: "onSubmit",
  });

  return form;
};
