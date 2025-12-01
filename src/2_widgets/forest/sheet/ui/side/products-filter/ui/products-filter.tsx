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
  useSubsubsubgroup,
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

  const {
    savedSubsubsubgroupLabels,
    subsubsubgroupOptions,
    handleOpenSubsubsubgroupsSelect,
    isSubSubSubGroupsLoading,
  } = useSubsubsubgroup(payload);

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
              name="idGroupProduct"
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
                        field.onChange(value);
                        updateProductFilter("idGroupProduct", value);
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
              name="oneLvlGroupProduct"
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
                        field.onChange(value);
                        updateProductFilter("oneLvlGroupProduct", value);
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
              name="twoLvlGroupProduct"
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
                        field.onChange(value);
                        updateProductFilter("twoLvlGroupProduct", value);
                      }}
                      externalLabels={savedSubsubgroupLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите подподгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="threeLvlGroupProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подподподгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={subsubsubgroupOptions}
                      isLoading={isSubSubSubGroupsLoading}
                      onOpenChange={handleOpenSubsubsubgroupsSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateProductFilter("threeLvlGroupProduct", value);
                      }}
                      externalLabels={savedSubsubsubgroupLabels}
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
                      options={productOptions}
                      isLoading={isProductLoading}
                      onOpenChange={handleOpenProductSelect}
                      onValueChange={(value) => {
                        field.onChange(value);
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
