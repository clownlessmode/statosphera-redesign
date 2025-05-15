import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { MultiSelect, MultiSelectOption } from "@shared/ui/multiselect";

import { FC, useEffect, useMemo } from "react";
import { useFiltersStore } from "../../../../model/filters-store";
import useForm from "../model/hook";

import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
import {
  healthy,
  useDirection,
  useEconomist,
  useFranchise,
  useGroup,
  useSeason,
  useSubdivision,
  useSubgroup,
  useSubsubgroup,
  useTeam,
  useAutoManager,
  useTypeSender,
  useNomenklatura,
} from "../model/mock";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { create } from "zustand";
interface SelectedOptionsState {
  autoManager: MultiSelectOption[];
  typeSender: MultiSelectOption[];
  seasons: MultiSelectOption[];
  economist: MultiSelectOption[];
  franchise: MultiSelectOption[];
  teams: MultiSelectOption[];
  directions: MultiSelectOption[];
  groups: MultiSelectOption[];
  subgroups: MultiSelectOption[];
  subsubgroups: MultiSelectOption[];
  subdivision: MultiSelectOption[];
  nomenklatura: MultiSelectOption[];
  setFranchise: (opts: MultiSelectOption[]) => void;
  setAutoManager: (opts: MultiSelectOption[]) => void;
  setTypeSender: (opts: MultiSelectOption[]) => void;
  setSeasons: (opts: MultiSelectOption[]) => void;
  setEconomist: (opts: MultiSelectOption[]) => void;
  setSubdivision: (opts: MultiSelectOption[]) => void;
  setTeams: (opts: MultiSelectOption[]) => void;
  setDirections: (opts: MultiSelectOption[]) => void;
  setGroups: (opts: MultiSelectOption[]) => void;
  setSubgroups: (opts: MultiSelectOption[]) => void;
  setSubsubgroups: (opts: MultiSelectOption[]) => void;
  setNomenklatura: (opts: MultiSelectOption[]) => void;
}

// Global store for selected options labels
export const useSelectedOptionsStore = create<SelectedOptionsState>(
  (set: any) => ({
    franchise: [],
    teams: [],
    directions: [],
    groups: [],
    subgroups: [],
    subsubgroups: [],
    subdivision: [],
    economist: [],
    autoManager: [],
    typeSender: [],
    seasons: [],
    nomenklatura: [],
    setFranchise: (opts: MultiSelectOption[]) => set({ franchise: opts }),
    setAutoManager: (opts: MultiSelectOption[]) => set({ autoManager: opts }),
    setTypeSender: (opts: MultiSelectOption[]) => set({ typeSender: opts }),
    setSeasons: (opts: MultiSelectOption[]) => set({ seasons: opts }),
    setEconomist: (opts: MultiSelectOption[]) => set({ economist: opts }),
    setSubdivision: (opts: MultiSelectOption[]) => set({ subdivision: opts }),
    setNomenklatura: (opts: MultiSelectOption[]) => set({ nomenklatura: opts }),
    setTeams: (opts: MultiSelectOption[]) => set({ teams: opts }),
    setDirections: (opts: MultiSelectOption[]) => set({ directions: opts }),
    setGroups: (opts: MultiSelectOption[]) => set({ groups: opts }),
    setSubgroups: (opts: MultiSelectOption[]) => set({ subgroups: opts }),
    setSubsubgroups: (opts: MultiSelectOption[]) => set({ subsubgroups: opts }),
  })
);
const Products: FC = () => {
  const form = useForm();
  const addReset = useFormResetStore((s) => s.addReset);
  const removeReset = useFormResetStore((s) => s.removeReset);

  useEffect(() => {
    addReset(form.reset);
    return () => {
      removeReset(form.reset);
    };
  }, [form.reset, addReset, removeReset]);
  const { updateProductFilter, getApiPayload } = useFiltersStore();
  const allData = getApiPayload();

  const { franchiseOptions, handleOpenFranchiseSelect, isFranchiseLoading } =
    useFranchise(allData);
  const {
    handleOpenSubdivisionsSelect,
    isSubdivisionsLoading,
    subdivisionOptions,
  } = useSubdivision(allData);
  const { handleOpenTeamsSelect, isTeamLoading, teamOptions } =
    useTeam(allData);
  const { directionOptions, handleOpenDirectionsSelect, isDirectionLoading } =
    useDirection(allData);
  const { economistOptions, handleOpenEconomistsSelect, isEconomistLoading } =
    useEconomist(allData);
  const { handleOpenSeasonsSelect, isSeasonsLoading, seasonsOptions } =
    useSeason(allData);
  const { groupOptions, handleOpenGroupsSelect, isGroupsLoading } =
    useGroup(allData);
  const { handleOpenSubgroupsSelect, isSubGroupsLoading, subgroupOptions } =
    useSubgroup(allData);
  const {
    handleOpenSubsubgroupsSelect,
    isSubsubgroupsLoading,
    subsubgroupOptions,
  } = useSubsubgroup(allData);
  const {
    handleOpenAutoManagerSelect,
    isAutoManagerLoading,
    autoManagerOptions,
  } = useAutoManager(allData);
  const { handleOpenTypeSenderSelect, isTypeSenderLoading, typeSenderOptions } =
    useTypeSender(allData);
  const {
    handleOpenNomenklaturaSelect,
    isNomenklaturaLoading,
    nomenklaturaOptions,
  } = useNomenklatura(allData);
  const {
    economist,
    franchise,
    subdivision,
    setFranchise,
    setSubdivision,
    teams,
    setTeams,
    directions,
    setDirections,
    groups,
    setGroups,
    subgroups,
    setSubgroups,
    subsubgroups,
    setEconomist,
    setSubsubgroups,
    autoManager,
    setAutoManager,
    typeSender,
    setTypeSender,
    seasons,
    setSeasons,
    nomenklatura,
    setNomenklatura,
  } = useSelectedOptionsStore();

  // effective options = merge API + stored
  const effective = (
    apiOpts: MultiSelectOption[],
    stored: MultiSelectOption[]
  ) => {
    const map = new Map<string, MultiSelectOption>();
    apiOpts.forEach((o) => map.set(o.value, o));
    stored.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  };

  const effFranchise = useMemo(
    () => effective(franchiseOptions, franchise),
    [franchiseOptions, franchise]
  );
  const effSubdivision = useMemo(
    () => effective(subdivisionOptions, subdivision),
    [subdivisionOptions, subdivision]
  );
  const effTeams = useMemo(
    () => effective(teamOptions, teams),
    [teamOptions, teams]
  );
  const effDirections = useMemo(
    () => effective(directionOptions, directions),
    [directionOptions, directions]
  );
  const effEconomist = useMemo(
    () => effective(economistOptions, economist),
    [economistOptions, economist]
  );
  const effSeasons = useMemo(
    () => effective(seasonsOptions, seasons),
    [seasonsOptions, seasons]
  );
  const effGroups = useMemo(
    () => effective(groupOptions, groups),
    [groupOptions, groups]
  );
  const effSubgroups = useMemo(
    () => effective(subgroupOptions, subgroups),
    [subgroupOptions, subgroups]
  );
  const effSubsubgroups = useMemo(
    () => effective(subsubgroupOptions, subsubgroups),
    [subsubgroupOptions, subsubgroups]
  );
  const effAutoManager = useMemo(
    () => effective(autoManagerOptions, autoManager),
    [autoManagerOptions, autoManager]
  );
  const effTypeSender = useMemo(
    () => effective(typeSenderOptions, typeSender),
    [typeSenderOptions, typeSender]
  );
  const effNomenklatura = useMemo(
    () => effective(nomenklaturaOptions, nomenklatura),
    [nomenklaturaOptions, nomenklatura]
  );

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Продукты</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по продуктам</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="groupFranchise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структура продаж</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effFranchise}
                      isLoading={isFranchiseLoading}
                      onOpenChange={(open) => handleOpenFranchiseSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("groupFranchise", numericValues);
                        setFranchise(
                          effFranchise.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите структуру продаж"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subDivisionProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структурное подразделение</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled
                      value={field.value?.map(String) || []}
                      options={effSubdivision}
                      isLoading={isSubdivisionsLoading}
                      onOpenChange={(open) =>
                        handleOpenSubdivisionsSelect(open)
                      }
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter(
                          "subDivisionProducts",
                          numericValues
                        );
                        setSubdivision(
                          effSubdivision.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите структурное подразделение"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Команда</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled
                      value={field.value?.map(String) || []}
                      options={effTeams}
                      isLoading={isTeamLoading}
                      onOpenChange={(open) => handleOpenTeamsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("teamProducts", numericValues);
                        setTeams(
                          effTeams.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите команду"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="directionProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Направление</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled
                      value={field.value?.map(String) || []}
                      options={effDirections}
                      isLoading={isDirectionLoading}
                      onOpenChange={(open) => handleOpenDirectionsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("directionProducts", numericValues);
                        setDirections(
                          effDirections.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите направление"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupsEconomist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Справочник экономиста</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effEconomist}
                      isLoading={isEconomistLoading}
                      onOpenChange={(open) => handleOpenEconomistsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("groupsEconomist", numericValues);
                        setEconomist(
                          effEconomist.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите справочник экономиста"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="managerAuto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Менеджер автозаказа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effAutoManager}
                      isLoading={isAutoManagerLoading}
                      onOpenChange={(open) => handleOpenAutoManagerSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("managerAuto", numericValues);
                        setAutoManager(
                          effAutoManager.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите менеджера автозаказа"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="typeProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип поставщика</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effTypeSender}
                      isLoading={isTypeSenderLoading}
                      onOpenChange={(open) => handleOpenTypeSenderSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("typeProducts", numericValues);
                        setTypeSender(
                          effTypeSender.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите тип поставщика"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ppProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип продукта</FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={healthy}
                      className="grid-cols-3"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seasonalityProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сезонность</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effSeasons}
                      isLoading={isSeasonsLoading}
                      onOpenChange={(open) => handleOpenSeasonsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter(
                          "seasonalityProducts",
                          numericValues
                        );
                        setSeasons(
                          effSeasons.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите сезонность"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idGroupMain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Группа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effGroups}
                      isLoading={isGroupsLoading}
                      onOpenChange={(open) => handleOpenGroupsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("idGroupMain", numericValues);
                        setGroups(
                          effGroups.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите группу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subGroups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effSubgroups}
                      isLoading={isSubGroupsLoading}
                      onOpenChange={(open) => handleOpenSubgroupsSelect(open)}
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("subGroups", numericValues);
                        setSubgroups(
                          effSubgroups.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите подгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subSubGroups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подподгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={effSubsubgroups}
                      isLoading={isSubsubgroupsLoading}
                      onOpenChange={(open) =>
                        handleOpenSubsubgroupsSelect(open)
                      }
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("subSubGroups", numericValues);
                        setSubsubgroups(
                          effSubsubgroups.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите подподгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номенклатура</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      isLoading={isNomenklaturaLoading}
                      options={effNomenklatura}
                      onOpenChange={(open) =>
                        handleOpenNomenklaturaSelect(open)
                      }
                      onValueChange={(value) => {
                        const numericValues = value.map(String);
                        field.onChange(numericValues);
                        updateProductFilter("idProduct", numericValues);
                        setNomenklatura(
                          effNomenklatura.filter((o) => value.includes(o.value))
                        );
                      }}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите номенклатуру"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Products;
