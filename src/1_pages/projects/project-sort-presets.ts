import {
  DEFAULT_PROJECT_SORT,
  ProjectColumn,
  type ProjectSort,
} from "./api/types/requests";

export type ProjectSortPresetId =
  | "created_new_first"
  | "created_old_first"
  | "end_nearest_first"
  | "end_farthest_first"
  | "start_earliest_first"
  | "start_latest_first";

type Preset = {
  id: ProjectSortPresetId;
  sort: ProjectSort;
  label: string;
  group: "Создание" | "Окончание" | "Начало";
};

export const PROJECT_SORT_PRESETS: readonly Preset[] = [
  {
    id: "created_new_first",
    sort: { colId: ProjectColumn.CREATED_AT, sort: "desc" },
    label: "Сначала новые проекты",
    group: "Создание",
  },
  {
    id: "created_old_first",
    sort: { colId: ProjectColumn.CREATED_AT, sort: "asc" },
    label: "Сначала старые проекты",
    group: "Создание",
  },
  {
    id: "end_nearest_first",
    sort: { colId: ProjectColumn.END_DATE, sort: "asc" },
    label: "По сроку окончания: ближайшие сверху",
    group: "Окончание",
  },
  {
    id: "end_farthest_first",
    sort: { colId: ProjectColumn.END_DATE, sort: "desc" },
    label: "По сроку окончания: поздние сверху",
    group: "Окончание",
  },
  {
    id: "start_earliest_first",
    sort: { colId: ProjectColumn.START_DATE, sort: "asc" },
    label: "По дате начала: ранние сверху",
    group: "Начало",
  },
  {
    id: "start_latest_first",
    sort: { colId: ProjectColumn.START_DATE, sort: "desc" },
    label: "По дате начала: поздние сверху",
    group: "Начало",
  },
];

const PRESET_BY_ID: Record<ProjectSortPresetId, Preset> = Object.fromEntries(
  PROJECT_SORT_PRESETS.map((p) => [p.id, p]),
) as Record<ProjectSortPresetId, Preset>;

export function sortFromPresetId(id: ProjectSortPresetId): ProjectSort {
  return PRESET_BY_ID[id].sort;
}

export function presetIdFromSort(
  sort: ProjectSort | undefined,
): ProjectSortPresetId {
  const target = sort ?? DEFAULT_PROJECT_SORT;
  const found = PROJECT_SORT_PRESETS.find(
    (p) => p.sort.colId === target.colId && p.sort.sort === target.sort,
  );
  return found?.id ?? "created_new_first";
}
