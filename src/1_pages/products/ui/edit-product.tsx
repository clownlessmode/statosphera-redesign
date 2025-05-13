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
import { FC } from "react";

import ClearFilters from "@features/clear-filters/ui/clear-filters";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Button } from "@shared/ui/button";
import { Settings } from "lucide-react";
import useForm from "../model/hook";
import CheckboxCards from "@shared/ui/checkbox-cards";

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
  ppProducts: any; // при необходимости уточните тип
  isIm: any; // при необходимости уточните тип
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
  const form = useForm();
  return (
    <Dialog open={true}>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-xl border-none">
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
              <ClearFilters form={form} />
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="subSubGroups"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <CheckboxCards
                          {...field}
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          options={[{ label: "ПП Продукт", value: "true" }]}
                          className="col-span-4"
                        />
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
