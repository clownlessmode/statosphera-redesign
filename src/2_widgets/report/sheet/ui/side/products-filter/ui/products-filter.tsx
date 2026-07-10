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
  useProduct,
} from "../model";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { HEALTHY } from "../config";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { cn } from "@shared/lib/utils";
import {
  useFilterDateOverride,
  useIsProductsOverride,
} from "./filter-date-override-context";

interface Props {
  className?: string;
}

const ProductsFilter: FC<Props> = ({ className }) => {
  const { updateProductFilter, getApiPayload } = useFiltersStore();
  const basePayload = getApiPayload();
  const dateOverride = useFilterDateOverride();
  const isProductsOverride = useIsProductsOverride();

  const payload = {
    ...basePayload,
    ...(dateOverride && { filterDate: dateOverride }),
    ...(typeof isProductsOverride === "boolean" && {
      is_products: isProductsOverride,
    }),
  };
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

  const {
    handleOpenProductSelect,
    isProductLoading,
    productOptions,
    savedProductLabels,
  } = useProduct(payload);

  return (
    <Card className="w-full md:mr-4 max-md:overflow-y-auto scrollbar-hide">
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
                        updateProductFilter("groupFranchise", value);
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
                        updateProductFilter("subDivisionProducts", value);
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
                      value={field.value?.map(String) || []}
                      options={teamOptions}
                      isLoading={isTeamLoading}
                      onOpenChange={handleOpenTeamsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("teamProducts", value);
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
                        updateProductFilter("directionProducts", value);
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
                        updateProductFilter("groupsEconomist", value);
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
                        updateProductFilter("managerAuto", value);
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
                        updateProductFilter("typeProducts", value);
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
                      options={seasonsOptions}
                      isLoading={isSeasonsLoading}
                      onOpenChange={handleOpenSeasonsSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("seasonalityProducts", value);
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
                        updateProductFilter("idGroupMain", value);
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
              render={({ field }) => {
                const currentValues = field.value?.map(String) || [];

                // Нормализуем разбитые ID, объединяя их обратно в группы
                const normalizeValues = (
                  values: string[],
                  savedLabels: any[],
                ): string[] => {
                  const result: string[] = [];

                  values.forEach((value) => {
                    // Ищем точное совпадение
                    if (savedLabels.find((label) => label.value === value)) {
                      result.push(value);
                      return;
                    }

                    // Если точного совпадения нет, ищем одиночные ID в группах
                    try {
                      const parsedValue = JSON.parse(value);
                      if (
                        Array.isArray(parsedValue) &&
                        parsedValue.length === 1
                      ) {
                        const matchingLabel = savedLabels.find((label) => {
                          try {
                            const labelIds = JSON.parse(label.value);
                            return (
                              Array.isArray(labelIds) &&
                              labelIds.includes(parsedValue[0])
                            );
                          } catch {
                            return false;
                          }
                        });
                        if (matchingLabel) {
                          result.push(matchingLabel.value);
                        }
                      }
                    } catch {
                      result.push(value);
                    }
                  });

                  return [...new Set(result)];
                };

                const normalizedValues = normalizeValues(
                  currentValues,
                  savedSubsubgroupLabels,
                );

                return (
                  <FormItem>
                    <FormLabel>Подподгруппа</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={normalizedValues}
                        options={subsubgroupOptions}
                        isLoading={isSubsubgroupsLoading}
                        onOpenChange={handleOpenSubsubgroupsSelect}
                        onValueChange={(value) => {
                          const numeric = value.map(String);
                          field.onChange(numeric);
                          updateProductFilter("subSubGroups", numeric);
                        }}
                        externalLabels={savedSubsubgroupLabels}
                        defaultValue={normalizedValues}
                        placeholder="Выберите подподгруппу"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
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
                      options={productOptions}
                      isLoading={isProductLoading}
                      onOpenChange={handleOpenProductSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateProductFilter("idProduct", value);
                      }}
                      externalLabels={savedProductLabels}
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

export default ProductsFilter;
