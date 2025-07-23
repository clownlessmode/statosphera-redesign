import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { FC } from "react";
import ClearFilters from "./clear-filter";
import {
  FormControl,
  Form,
  FormItem,
  FormField,
  FormLabel,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";
import {
  useForm,
  useSeason,
  useGroup,
  useSubgroup,
  useDirection,
  useEconomist,
  useTeam,
  useSubdivision,
  useFranchise,
  useTypeSender,
  useAutoManager,
  useSubsubgroup,
} from "../model";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
import { HEALTHY } from "../config";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { cn } from "@shared/lib/utils";

interface Props {
  className?: string;
}

const ProductsFilter: FC<Props> = ({ className }) => {
  const { updateProductFilter, getApiPayload } = useSummaryFiltersStore();
  const payload = getApiPayload();
  const form = useForm();

  const {
    savedFranchiseLabels,
    franchiseOptions,
    handleOpenFranchiseSelect,
    isFranchiseLoading,
  } = useFranchise(payload);

  const {
    savedSubdivisionLabels,
    subdivisionOptions,
    handleOpenSubdivisionsSelect,
    isSubdivisionsLoading,
  } = useSubdivision(payload);

  const { savedTeamLabels, teamOptions, handleOpenTeamsSelect, isTeamLoading } =
    useTeam(payload);

  const {
    savedDirectionLabels,
    directionOptions,
    handleOpenDirectionsSelect,
    isDirectionLoading,
  } = useDirection(payload);

  const {
    savedEconomistLabels,
    economistOptions,
    handleOpenEconomistsSelect,
    isEconomistLoading,
  } = useEconomist(payload);

  const {
    savedSeasonLabels,
    seasonsOptions,
    handleOpenSeasonsSelect,
    isSeasonsLoading,
  } = useSeason(payload);

  const {
    savedGroupLabels,
    groupOptions,
    handleOpenGroupsSelect,
    isGroupsLoading,
  } = useGroup(payload);

  const {
    savedSubgroupLabels,
    subgroupOptions,
    handleOpenSubgroupsSelect,
    isSubGroupsLoading,
  } = useSubgroup(payload);

  const {
    savedSubsubgroupLabels,
    subsubgroupOptions,
    handleOpenSubsubgroupsSelect,
    isSubsubgroupsLoading,
  } = useSubsubgroup(payload);

  const {
    savedAutoManagerLabels,
    autoManagerOptions,
    handleOpenAutoManagerSelect,
    isAutoManagerLoading,
  } = useAutoManager(payload);

  const {
    savedTypeSenderLabels,
    typeSenderOptions,
    handleOpenTypeSenderSelect,
    isTypeSenderLoading,
  } = useTypeSender(payload);

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
          <form className={cn("flex flex-col gap-4 w-full", className)}>
            <FormField
              control={form.control}
              name="groupFranchise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структура продаж</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={franchiseOptions}
                      isLoading={isFranchiseLoading}
                      onOpenChange={handleOpenFranchiseSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("groupFranchise", numeric);
                      }}
                      externalLabels={savedFranchiseLabels}
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
                      options={subdivisionOptions}
                      isLoading={isSubdivisionsLoading}
                      onOpenChange={handleOpenSubdivisionsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("subDivisionProducts", numeric);
                      }}
                      externalLabels={savedSubdivisionLabels}
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
                      options={teamOptions}
                      isLoading={isTeamLoading}
                      onOpenChange={handleOpenTeamsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("teamProducts", numeric);
                      }}
                      externalLabels={savedTeamLabels}
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
                      value={field.value?.map(String) || []}
                      options={directionOptions}
                      isLoading={isDirectionLoading}
                      onOpenChange={handleOpenDirectionsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("directionProducts", numeric);
                      }}
                      externalLabels={savedDirectionLabels}
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
                      options={economistOptions}
                      isLoading={isEconomistLoading}
                      onOpenChange={handleOpenEconomistsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("groupsEconomist", numeric);
                      }}
                      externalLabels={savedEconomistLabels}
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
                      options={autoManagerOptions}
                      isLoading={isAutoManagerLoading}
                      onOpenChange={handleOpenAutoManagerSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("managerAuto", numeric);
                      }}
                      externalLabels={savedAutoManagerLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите структурное подразделение"
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
                      options={typeSenderOptions}
                      isLoading={isTypeSenderLoading}
                      onOpenChange={handleOpenTypeSenderSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("typeProducts", numeric);
                      }}
                      externalLabels={savedTypeSenderLabels}
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
                      options={HEALTHY}
                      className="grid-cols-3 [&_*]:text-[12px]"
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
                      options={seasonsOptions}
                      isLoading={isSeasonsLoading}
                      onOpenChange={handleOpenSeasonsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("seasonalityProducts", numeric);
                      }}
                      externalLabels={savedSeasonLabels}
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
                      options={groupOptions}
                      isLoading={isGroupsLoading}
                      onOpenChange={handleOpenGroupsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("idGroupMain", numeric);
                      }}
                      externalLabels={savedGroupLabels}
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
                      options={subgroupOptions}
                      isLoading={isSubGroupsLoading}
                      onOpenChange={handleOpenSubgroupsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("subGroups", numeric);
                      }}
                      externalLabels={savedSubgroupLabels}
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
                      options={subsubgroupOptions}
                      isLoading={isSubsubgroupsLoading}
                      onOpenChange={handleOpenSubsubgroupsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("subSubGroups", numeric);
                      }}
                      externalLabels={savedSubsubgroupLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите подподгруппу"
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

export default ProductsFilter;
