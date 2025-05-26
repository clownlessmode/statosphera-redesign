import { FC } from "react";
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
  FormItem,
  FormLabel,
  FormControl,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { DualRangeSlider } from "@shared/ui/dual-range-slider";
import { useForm, useLoyalAction, useLoyalBonus } from "../model";

import { GENDER, TYPE } from "../config";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
const LoyaltyFilter: FC = () => {
  const form = useForm();
  const { updateLoyalFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();
  const {
    savedLoyalActionLabels,
    loyalActionOptions,
    handleOpenLoyalActionSelect,
    isLoyalActionLoading,
  } = useLoyalAction(payload);

  const {
    savedLoyalBonusLabels,
    loyalBonusOptions,
    handleOpenLoyalBonusSelect,
    isLoyalBonusLoading,
  } = useLoyalBonus(payload);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Лояльность</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Фильтруйте данные по программе лояльности
          </CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="isLoyal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип</FormLabel>
                  <BooleanCheckboxCard
                    {...field}
                    options={TYPE}
                    className="grid-cols-3"
                    onChange={(vals) => {
                      field.onChange(vals);
                      updateLoyalFilter("isLoyal", vals);
                    }}
                  />
                </FormItem>
              )}
            />

            {/* Возраст */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Возраст</FormLabel>
                  <DualRangeSlider
                    className="pb-7 pt-1"
                    labelPosition="bottom"
                    label={(l) => l}
                    min={0}
                    max={100}
                    step={1}
                    value={field.value}
                    onValueChange={([min, max]) => {
                      field.onChange([min, max]);
                      updateLoyalFilter("ageStart", min);
                      updateLoyalFilter("ageEnd", max);
                    }}
                  />
                </FormItem>
              )}
            />

            {/* Пол */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пол</FormLabel>
                  <BooleanCheckboxCard
                    {...field}
                    options={GENDER}
                    className="grid-cols-3"
                    onChange={(vals) => {
                      field.onChange(vals);
                      updateLoyalFilter("sex", vals);
                    }}
                  />
                </FormItem>
              )}
            />

            {/* Акция */}
            <FormField
              control={form.control}
              name="guidDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Акция</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={loyalActionOptions}
                      isLoading={isLoyalActionLoading}
                      onOpenChange={handleOpenLoyalActionSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateLoyalFilter("guidDiscount", numeric);
                      }}
                      externalLabels={savedLoyalActionLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите акцию"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Бонус */}
            <FormField
              control={form.control}
              name="guidBonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бонус</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value?.map(String) || []}
                      options={loyalBonusOptions}
                      isLoading={isLoyalBonusLoading}
                      onOpenChange={handleOpenLoyalBonusSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateLoyalFilter("guidBonus", numeric);
                      }}
                      externalLabels={savedLoyalBonusLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите акцию"
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

export default LoyaltyFilter;
