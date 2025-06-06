import { ProductResponse } from "../api/types";
import { MultiSelectOption } from "@shared/ui/multiselect";

const fieldMapping: Record<string, string> = {
  idGroupsFranchise: "groupsFranchise",
  idSubSubGroups: "subSubGroups",
  idSubGroups: "subGroups",
  idGroupsMain: "groupsMain",
  idGroupsEconomist: "groupsEconomist",
  idTypeProducts: "typeProducts",
  idSeasonalityProducts: "seasonalityProducts",
  idSubdivisionProducts: "subDivisionProducts",
  idTeamProducts: "teamProducts",
  idDirectionProducts: "directionProducts",
  idManagerAuto: "managerAuto",
};

export const extractProductLabels = (product: ProductResponse): Record<string, MultiSelectOption[]> => {
  const result: Record<string, MultiSelectOption[]> = {};

  for (const [idField, labelField] of Object.entries(fieldMapping)) {
    const ids = (product as any)[idField];
    const labels = (product as any)[labelField];

    if (!ids || !labels) continue;

    const options: MultiSelectOption[] = Array.isArray(ids)
      ? ids.map((id: number | string, idx: number) => ({
          value: String(id),
          label: Array.isArray(labels) ? labels[idx] : labels,
        }))
      : [
          {
            value: String(ids),
            label: labels,
          },
        ];

    result[labelField] = options;
  }

  return result;
};
