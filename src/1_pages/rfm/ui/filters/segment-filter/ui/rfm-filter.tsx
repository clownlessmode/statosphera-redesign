import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { Funnel } from "lucide-react";
import { useState } from "react";
import useForm, { useSegments } from "../model/hook";

import { MultiSelect } from "@shared/ui/multiselect";
//import { useIsMobile } from "@shared/hooks/use-mobile";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import {
  DYNAMICS_PERIOD_HEATTMAP,
  DYNAMICS_PERIOD_SANKEY,
  PERIOD,
} from "../model/constants";
import { useRfmFiltersStore } from "../../filters-store";
import { ClearFilters } from "./clear-filters";

const ShopsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateFilters } = useRfmFiltersStore();
  const { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading } =
    useSegments();
  const form = useForm();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Изменить фильтры <Funnel />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-md:overflow-y-auto scrollbar-hide max-xxs:h-[calc(100vh-96px)] max-md:h-max rounded-xl border-none">
        <Card className="w-full mr-4">
          <CardHeader>
            <CardTitle>Фильтры</CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>
                Фильтруйте данные по сегментам и периоду
              </CardDescription>
              <ClearFilters form={form} />
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="rfmList"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Сегменты</FormLabel>
                        <FormControl>
                          <MultiSelect
                            value={field.value?.map(String) || []}
                            options={nameSegmentOptions}
                            isLoading={isNameSegmentLoading}
                            onOpenChange={(open) => handleOpenNameSegment(open)}
                            onValueChange={(value) => {
                              const numericValues = value.map(Number);
                              field.onChange(numericValues);
                              updateFilters("rfmList", numericValues);
                            }}
                            defaultValue={field.value?.map(String)}
                            placeholder="Выберите партнеров"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Период</FormLabel>
                      <FormControl>
                        <BooleanCheckboxCard
                          {...field}
                          options={PERIOD}
                          onChange={(value) => {
                            field.onChange(value);
                            updateFilters("period", value);
                          }}
                          className="grid-cols-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sankey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Динамика периода (Санки)</FormLabel>
                      <FormControl>
                        <BooleanCheckboxCard
                          {...field}
                          options={DYNAMICS_PERIOD_SANKEY}
                          onChange={(value) => {
                            field.onChange(value);
                            updateFilters("sankey", value);
                          }}
                          className="grid-cols-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heatmap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Динамика периода (Тепловая карта)</FormLabel>
                      <FormControl>
                        <BooleanCheckboxCard
                          {...field}
                          options={DYNAMICS_PERIOD_HEATTMAP}
                          onChange={(value) => {
                            field.onChange(value);
                            updateFilters("heatmap", value);
                          }}
                          className="grid-cols-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ShopsFilter;
