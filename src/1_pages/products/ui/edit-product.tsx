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
  // FormControl,
  FormItem,
  FormLabel,
  // FormLabel,
} from "@shared/ui/form";
import { FC } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";
import { Settings } from "lucide-react";
import useForm from "../model/hook";

import CheckboxCard from "@shared/ui/checkbox-card";

import { MultiSelect } from "@shared/ui/multiselect";
;
import { useFranchise } from "../hooks/use-franchise";
import { useSubgroup } from "../hooks/use-subgroup";
import { useSubsubgroup } from "../hooks/use-subsubgroup";
import { useAutoManager } from "../hooks/use-automanager";
import { useSubdivision } from "../hooks/use-subdivision";
import { useTeam } from "../hooks/use-team";
import { useDirection } from "../hooks/use-direction";
import { useTypeSender } from "../hooks/use-typesender";
import { useSeason } from "../hooks/use-season";
import { useEconomist } from "../hooks/use-economist";
import { useProduct } from "../hooks/use-product";
import { useGroup } from "../hooks/use-group";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";


export interface Product {
  idProduct: number;
  productCode: string;
  productName: string | null;
  nameImProducts: string;
  idSubSubGroups: number;
  subSubGroups: string;
  idSubGroups: number;
  subGroups: string;
  idGroupsMain: number;
  groupsMain: string;
  idGroupsEconomist: number;
  groupsEconomist: string;
  idTypeProducts: number;
  typeProducts: string;
  idSeasonalityProducts: number;
  seasonalityProducts: string;
  idSubdivisionProducts: number;
  subDivisionProducts: string;
  idTeamProducts: number;
  teamProducts: string;
  idDirectionProducts: number;
  directionProducts: string;
  ppProducts: boolean | null;
  isIm: boolean | null;
  ed: string;
  idManagerAuto: number;
  managerAuto: string;
  idGroupsFranchise: number;
  groupsFranchise: string;
}

interface Props {
  product: Product;
}
const EditProduct: FC<Props> = ({ product }) => {
  const { updateProductFilter, updateOnlineStoreFilter } = useFiltersStore();
  const form = useForm(
product
  );

  const {
    savedFranchiseLabels,
    franchiseOptions,
    handleOpenFranchiseSelect,
    isFranchiseLoading,
  } = useFranchise();

  const {
    groupOptions,
    handleOpenGroupsSelect,
    isGroupsLoading,
    savedGroupLabels
  } = useGroup();

  const {
    handleOpenSubgroupsSelect,
    isSubGroupsLoading,
    savedSubgroupLabels, 
    subgroupOptions
  } = useSubgroup();

  const {
    handleOpenSubsubgroupsSelect,
    isSubsubgroupsLoading,
    savedSubsubgroupLabels,
    subsubgroupOptions,
  } = useSubsubgroup();

  const {
    autoManagerOptions,
    handleOpenAutoManagerSelect,
    isAutoManagerLoading,
    savedAutoManagerLabels,
  } = useAutoManager();

  const {
   handleOpenSubdivisionsSelect,
   isSubdivisionsLoading,
   savedSubdivisionLabels,
   subdivisionOptions,
  } = useSubdivision();

  const {
    handleOpenTeamsSelect,
    isTeamLoading,
    savedTeamLabels,
    teamOptions
   } = useTeam();

   const {
    directionOptions,
    handleOpenDirectionsSelect,
    isDirectionLoading,
    savedDirectionLabels,
   } = useDirection();

   const {
    handleOpenTypeSenderSelect,
    isTypeSenderLoading,
    savedTypeSenderLabels,
    typeSenderOptions
   } = useTypeSender();

   const {
    handleOpenSeasonsSelect,
    isSeasonsLoading,
    savedSeasonLabels,
    seasonsOptions,
   } = useSeason();

   const {
   economistOptions,
   handleOpenEconomistsSelect,
   isEconomistLoading,
   savedEconomistLabels
   } = useEconomist();

   const handleSave = () => {
    const filters = useFiltersStore.getState().filters;
  
    const payload = {
      groupFranchise: filters.product.groupFranchise,
      ppProducts: filters.product.ppProducts,
      isImProducts: filters.onlineStore.isIm, // из onlineStore
      subDivisionProducts: filters.product.subDivisionProducts,
      subGroups: filters.product.subGroups,
      subSubGroups: filters.product.subSubGroups,
      typeProducts: filters.product.typeProducts,
      teamProducts: filters.product.teamProducts,
      directionProducts: filters.product.directionProducts,
      groupsEconomist: filters.product.groupsEconomist,
      idGroupMain: filters.product.idGroupMain,
      idProduct: filters.product.idProduct,
      seasonalityProducts: filters.product.seasonalityProducts,
      managerAuto: filters.product.managerAuto,
    };
  
    console.log("Сохраняемый payload:", payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-xl border-none  w-fit max-w-none!">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="max-w-xs">
              {product.productName
                ? product.productName
                : "Имя продукта не задано"}
            </CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>
                Код номенклатуры: {product.productCode}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-2 w-full">
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
                              updateProductFilter("ppProducts", value);
                            }}
                          />
                        </FormItem>
                      )}
                    />
                   <FormField
                    control={form.control}
                    name="isIm"
                    render={({ field }) => (
                      <FormItem>
                        <CheckboxCard
                          label="Интернет магазин"
                          value={field.value as boolean}
                          onChange={(value: boolean) => {
                            field.onChange(value);
                            updateOnlineStoreFilter("isIm", value);
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
                        name="groupsFranchise"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Структура продаж</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={franchiseOptions}
                                isLoading={isFranchiseLoading}
                                onOpenChange={handleOpenFranchiseSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("groupFranchise", value);
                                }}
                                externalLabels={savedFranchiseLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите структуру продаж"
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsMain"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Группа</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={groupOptions}
                                isLoading={isGroupsLoading}
                                onOpenChange={handleOpenGroupsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("groupsMain", value);
                                }}
                                externalLabels={savedGroupLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите группу"
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="subGroups"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Подгруппа</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={subgroupOptions}
                                isLoading={isSubGroupsLoading}
                                onOpenChange={handleOpenSubgroupsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("subGroups", value);
                                }}
                                externalLabels={savedSubgroupLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите подгруппу"
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />

                      {/* Заблокировать */}
                      <FormField
                        control={form.control}
                        name="subSubGroups"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Подподгруппа</FormLabel>
                              <FormControl>
                              <MultiSelect
                              disabled
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={subsubgroupOptions}
                                isLoading={isSubsubgroupsLoading}
                                onOpenChange={handleOpenSubsubgroupsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("subSubGroups", value);
                                }}
                                externalLabels={savedSubsubgroupLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
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
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Номенклатура</FormLabel>
                              <FormControl>
                                <MultiSelect
                                disabled
                                  options={[]}
                                  placeholder="Выберите номенклатуру"
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
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Менеджер автозаказа</FormLabel>
                              <FormControl>
                              <MultiSelect
                              disabled
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={autoManagerOptions}
                                isLoading={isAutoManagerLoading}
                                onOpenChange={handleOpenAutoManagerSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("managerAuto", value);
                                }}
                                externalLabels={savedAutoManagerLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
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
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Структурное подразделение</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={subdivisionOptions}
                                isLoading={isSubdivisionsLoading}
                                onOpenChange={handleOpenSubdivisionsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("subDivisionProducts", value);
                                }}
                                externalLabels={savedSubdivisionLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите структурное ..."
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="teamProducts"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Команда</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={teamOptions}
                                isLoading={isTeamLoading}
                                onOpenChange={handleOpenTeamsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("teamProducts", value);
                                }}
                                externalLabels={savedTeamLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите команду"
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="directionProducts"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Направление</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={directionOptions}
                                isLoading={isDirectionLoading}
                                onOpenChange={handleOpenDirectionsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("directionProducts", value);
                                }}
                                externalLabels={savedDirectionLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите направление"
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="typeProducts"
                        disabled
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Тип поставщика</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите поставщика"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="seasonalityProducts"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Сезон</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={seasonsOptions}
                                isLoading={isSeasonsLoading}
                                onOpenChange={handleOpenSeasonsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("seasonalityProducts", value);
                                }}
                                externalLabels={savedSeasonLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите сезонность"
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="groupsEconomist"
                        render={({field}) => {
                          return (
                            <FormItem>
                              <FormLabel>Справочник экономиста</FormLabel>
                              <FormControl>
                              <MultiSelect
                              value={Array.isArray(field.value) ? field.value.map(String) : []}

                                options={economistOptions}
                                isLoading={isEconomistLoading}
                                onOpenChange={handleOpenEconomistsSelect}
                                onValueChange={(value) => {
                                  field.onChange(value.map(Number));
                                  updateProductFilter("groupsEconomist", value);
                                }}
                                externalLabels={savedEconomistLabels}
                                defaultValue={Array.isArray(field.value) ? field.value.map(String) : []}
                                placeholder="Выберите справочник ..."
                              />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-background">
  <CardContent className="grid grid-cols-2 gap-2">
    <Button variant="outline">Отмена</Button>
    <Button onClick={handleSave}>Сохранить</Button>
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

export default EditProduct;
