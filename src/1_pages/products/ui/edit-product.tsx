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
  const form = useForm(product);

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
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <CheckboxCard
                              label="ПП  Продукт"
                              onChange={field.onChange}
                              value={field.value as boolean}
                            />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="isIm"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <CheckboxCard
                              label="Интернет магазин"
                              onChange={field.onChange}
                              value={field.value as boolean}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-2">
                  <Card className="bg-background gap-2">
                    <CardContent className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Структура продаж</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите структуру продаж"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Группа</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите группу"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Подгруппа</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите подгруппу"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        disabled
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Подподгруппа</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите подподгруппу"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Номенклатура</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите номенклатуру"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Менеджер автозаказа</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
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
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Структурное подразделение</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите структурное..."
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Команда</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите команду"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Направление</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите направление"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="groupsFranchise"
                        disabled
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Тип поставщика</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите тип поставщика"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Сезон</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите сезон"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        disabled
                        name="groupsFranchise"
                        render={() => {
                          return (
                            <FormItem>
                              <FormLabel>Справочник экономиста</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={[]}
                                  placeholder="Выберите справочник..."
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
                    <Button variant={"outline"}>Отмена</Button>
                    <Button>Сохранить</Button>
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
