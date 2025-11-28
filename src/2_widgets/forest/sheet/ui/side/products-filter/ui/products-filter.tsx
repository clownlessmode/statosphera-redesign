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
  useGroup,
  useSubgroup,
  useSubsubgroup,
  useProduct,
} from "../model";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { cn } from "@shared/lib/utils";

interface Props {
  className?: string;
}

const ProductsFilter: FC<Props> = ({ className }) => {
  const { updateProductFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();
  const form = useForm();

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
                    <FormLabel>Подподподгруппа</FormLabel>
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
