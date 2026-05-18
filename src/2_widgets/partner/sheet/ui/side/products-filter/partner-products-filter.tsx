import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";
import { FC } from "react";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import {
  useDirection,
  useForm,
  useFranchise,
  useGroup,
  useProduct,
  useSubgroup,
  useSubsubgroup,
  useTypeSender,
} from "@widgets/write-off/sheet/ui/side/products-filter/model";
import { PartnerProductsClearFilter } from "./partner-products-clear-filter";

export const PartnerProductsFilter: FC = () => {
  const { updateProductFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();
  const form = useForm();

  const {
    savedFranchiseLabels,
    franchiseOptions,
    handleOpenFranchiseSelect,
    isFranchiseLoading,
  } = useFranchise(payload);

  const {
    savedDirectionLabels,
    directionOptions,
    handleOpenDirectionsSelect,
    isDirectionLoading,
  } = useDirection(payload);

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
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Продукты</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по продуктам</CardDescription>
          <PartnerProductsClearFilter form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("idProduct", next);
                      }}
                      externalLabels={savedProductLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите номенклатуру"
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("subSubGroups", next);
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("subGroups", next);
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("idGroupMain", next);
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("directionProducts", next);
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("groupFranchise", next);
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
                        const next = value.map(String);
                        field.onChange(next);
                        updateProductFilter("typeProducts", next);
                      }}
                      externalLabels={savedTypeSenderLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите тип поставщика"
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
