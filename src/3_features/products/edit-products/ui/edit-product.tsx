import { FC } from "react";
import {
  useForm,
  useFranchise,
  useSubgroup,
  useAutoManager,
  useDirection,
  useEconomist,
  useGroup,
  useSeason,
  useSubdivision,
  useSubsubgroup,
  useTeam,
  useTypeSender,
} from "../model";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";
import { Settings } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import CheckboxCard from "@shared/ui/checkbox-card";
import { FormValues, UpdateProductPayload } from "../config";
import { MultiSelect } from "@shared/ui/multiselect";
import { useUpdateProduct } from "../api";
import { extractProductLabels } from "@pages/products/utils/labels";

interface Props {
  product: FormValues;
  productName: string;
  productCode: string;
  productLabels?: ReturnType<typeof extractProductLabels>;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const EditProduct: FC<Props> = ({
  product,
  productName,
  productCode,
  productLabels,
  onClose,
  onSuccess,
}) => {
  const form = useForm({ product });
  const { isFormValid, getFieldError, fieldsWithErrors } = form;
  console.log(product);
  const { franchiseOptions, handleOpenFranchiseSelect, isFranchiseLoading } =
    useFranchise();

  const { groupOptions, handleOpenGroupsSelect, isGroupsLoading } = useGroup();

  const { handleOpenSubgroupsSelect, isSubGroupsLoading, subgroupOptions } =
    useSubgroup();

  const {
    handleOpenSubsubgroupsSelect,
    isSubsubgroupsLoading,
    subsubgroupOptions,
  } = useSubsubgroup();

  const {
    autoManagerOptions,
    handleOpenAutoManagerSelect,
    isAutoManagerLoading,
  } = useAutoManager();

  const {
    handleOpenSubdivisionsSelect,
    isSubdivisionsLoading,
    subdivisionOptions,
  } = useSubdivision();

  const { handleOpenTeamsSelect, isTeamLoading, teamOptions } = useTeam();

  const { directionOptions, handleOpenDirectionsSelect, isDirectionLoading } =
    useDirection();

  const { handleOpenTypeSenderSelect, isTypeSenderLoading, typeSenderOptions } =
    useTypeSender();

  const { handleOpenSeasonsSelect, isSeasonsLoading, seasonsOptions } =
    useSeason();

  const { economistOptions, handleOpenEconomistsSelect, isEconomistLoading } =
    useEconomist();

  const { isUpdateLoading, update } = useUpdateProduct();

  const mapFormToPayload = (form: FormValues): UpdateProductPayload => ({
    groupFranchise: form.groupFranchise,
    ppProducts: form.ppProducts,
    isImProducts: form.isImProducts,
    subDivisionProducts: form.subDivisionProducts,
    subGroups: form.subGroups,
    subSubGroups: form.subSubGroups,
    typeProducts: form.typeProducts,
    teamProducts: form.teamProducts,
    directionProducts: form.directionProducts,
    groupsEconomist: form.groupsEconomist,
    idGroupMain: form.idGroupMain,
    idProduct: form.idProduct,
    seasonalityProducts: form.seasonalityProducts,
    managerAuto: form.managerAuto,
  });
  const handleSubmit = async (data: FormValues) => {
    if (!isFormValid) {
      console.error("Не все обязательные поля заполнены:", fieldsWithErrors);
      return;
    }

    try {
      const payload = mapFormToPayload(data);
      console.log("Payload для update:", payload);
      await update(payload);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleValueChange = (fieldOnChange: (value: any) => void) => {
    return (value: string[]) => {
      if (value.length === 0) {
        fieldOnChange(["0"]);
        return;
      }

      const filteredValue = value.filter(
        (val: any) =>
          val !== "0" &&
          val !== 0 &&
          val !== "" &&
          val !== null &&
          val !== undefined,
      );

      if (filteredValue.length === 0 && value.length > 0) {
        fieldOnChange(["0"]);
      } else {
        fieldOnChange(filteredValue.map(String));
      }
    };
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose?.()}>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-xl border-none  max-w-[1200px] lg:min-w-[800px] ">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="max-w-xs">
              {productName ? productName : "Имя продукта не задано"}
            </CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>Код номенклатуры: {productCode}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-2 w-full"
              >
                <Card className="bg-background">
                  <CardContent className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="ppProducts"
                      render={({ field }) => (
                        <FormItem>
                          <CheckboxCard
                            label="ПП Продукт"
                            value={field.value as boolean}
                            onChange={(value: boolean) => {
                              field.onChange(value);
                            }}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isImProducts"
                      render={({ field }) => (
                        <FormItem>
                          <CheckboxCard
                            label="Интернет магазин"
                            value={field.value as boolean}
                            onChange={(value: boolean) => {
                              field.onChange(value);
                            }}
                          />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-2">
                  <Card className="bg-background gap-2">
                    <CardContent className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="groupFranchise"
                        render={({ field }) => {
                          const hasError = getFieldError("groupFranchise");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Структура продаж
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={franchiseOptions}
                                  isLoading={isFranchiseLoading}
                                  onOpenChange={handleOpenFranchiseSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.groupsFranchise ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите структуру продаж"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="idGroupMain"
                        render={({ field }) => {
                          const hasError = getFieldError("idGroupMain");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Группа
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={groupOptions}
                                  isLoading={isGroupsLoading}
                                  onOpenChange={handleOpenGroupsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.groupsMain ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите группу"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="subGroups"
                        render={({ field }) => {
                          const hasError = getFieldError("subGroups");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Подгруппа
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={subgroupOptions}
                                  isLoading={isSubGroupsLoading}
                                  onOpenChange={handleOpenSubgroupsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.subGroups ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите подгруппу"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />

                      {/* Заблокировать */}
                      <FormField
                        control={form.control}
                        name="subSubGroups"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Подподгруппа</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  disabled
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={subsubgroupOptions}
                                  isLoading={isSubsubgroupsLoading}
                                  onOpenChange={handleOpenSubsubgroupsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.subSubGroups ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите подподгруппу"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />

                      {/* Заблокировать */}
                      <FormField
                        control={form.control}
                        name="managerAuto"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Менеджер автозаказа</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  disabled
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={autoManagerOptions}
                                  isLoading={isAutoManagerLoading}
                                  onOpenChange={handleOpenAutoManagerSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.managerAuto ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите менеджера автозаказа"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-background gap-2">
                    <CardContent className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="subDivisionProducts"
                        render={({ field }) => {
                          const hasError = getFieldError("subDivisionProducts");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Структурное подразделение
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={subdivisionOptions}
                                  isLoading={isSubdivisionsLoading}
                                  onOpenChange={handleOpenSubdivisionsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.subDivisionProducts ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите структурное ..."
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="teamProducts"
                        render={({ field }) => {
                          const hasError = getFieldError("teamProducts");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Команда
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={teamOptions}
                                  isLoading={isTeamLoading}
                                  onOpenChange={handleOpenTeamsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.teamProducts ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите команду"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="directionProducts"
                        render={({ field }) => {
                          const hasError = getFieldError("directionProducts");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Направление
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={directionOptions}
                                  isLoading={isDirectionLoading}
                                  onOpenChange={handleOpenDirectionsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.directionProducts ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите направление"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="typeProducts"
                        disabled
                        render={({ field }) => {
                          const hasError = getFieldError("typeProducts");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Тип поставщика
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={typeSenderOptions}
                                  isLoading={isTypeSenderLoading}
                                  onOpenChange={handleOpenTypeSenderSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.typeProducts ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите поставщика"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="seasonalityProducts"
                        render={({ field }) => {
                          const hasError = getFieldError("seasonalityProducts");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Сезон
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={seasonsOptions}
                                  isLoading={isSeasonsLoading}
                                  onOpenChange={handleOpenSeasonsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.seasonalityProducts ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите сезонность"
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="groupsEconomist"
                        render={({ field }) => {
                          const hasError = getFieldError("groupsEconomist");
                          return (
                            <FormItem>
                              <FormLabel
                                className={hasError ? "text-destructive" : ""}
                              >
                                Справочник экономиста
                              </FormLabel>
                              <FormControl>
                                <MultiSelect
                                  maxCount={1}
                                  value={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  options={economistOptions}
                                  isLoading={isEconomistLoading}
                                  onOpenChange={handleOpenEconomistsSelect}
                                  onValueChange={handleValueChange(
                                    field.onChange,
                                  )}
                                  externalLabels={
                                    productLabels?.groupsEconomist ?? []
                                  }
                                  defaultValue={
                                    Array.isArray(field.value)
                                      ? field.value.map(String)
                                      : []
                                  }
                                  placeholder="Выберите справочник ..."
                                  className={
                                    hasError ? "border-destructive" : ""
                                  }
                                />
                              </FormControl>
                              {hasError && (
                                <p className="text-[12px] text-destructive">
                                  Обязательно для заполнения
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-background">
                  <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"> Отмена </Button>
                    <Button
                      disabled={!form.formState.isValid}
                      loading={isUpdateLoading}
                    >
                      Сохранить
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
