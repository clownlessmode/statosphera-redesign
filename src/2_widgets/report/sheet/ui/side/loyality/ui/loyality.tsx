import { FC, useEffect, useMemo } from "react";
import ClearFilters from "@features/clear-filters/ui/clear-filters";
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
import { MultiSelect, MultiSelectOption } from "@shared/ui/multiselect";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { DualRangeSlider } from "@shared/ui/dual-range-slider";
import useForm from "../model/hook";
import { useFiltersStore } from "../../../../model/filters-store";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { create } from "zustand";
import { gender, type, useLoyalAction, useLoyalBonus } from "../model/mock";

// Global store in same file
interface SelectedOptionsState {
  loyalAction: MultiSelectOption[];
  loyalBonus: MultiSelectOption[];
  setLoyalAction: (opts: MultiSelectOption[]) => void;
  setLoyalBonus: (opts: MultiSelectOption[]) => void;
}
export const useSelectedOptionsStore = create<SelectedOptionsState>((set) => ({
  loyalAction: [],
  loyalBonus: [],
  setLoyalAction: (opts) => set({ loyalAction: opts }),
  setLoyalBonus: (opts) => set({ loyalBonus: opts }),
}));

const Loyality: FC = () => {
  const form = useForm();
  const { loyalAction, loyalBonus, setLoyalAction, setLoyalBonus } =
    useSelectedOptionsStore();
  const addReset = useFormResetStore((s) => s.addReset);
  const removeReset = useFormResetStore((s) => s.removeReset);

  useEffect(() => {
    addReset(form.reset);
    return () => removeReset(form.reset);
  }, [form.reset, addReset, removeReset]);

  const { updateLoyalFilter, getApiPayload } = useFiltersStore();
  const allData = getApiPayload();

  // API hooks
  const {
    loyalActionOptions,
    handleOpenLoyalActionSelect,
    isLoyalActionLoading,
  } = useLoyalAction(allData);
  const { loyalBonusOptions, handleOpenLoyalBonusSelect, isLoyalBonusLoading } =
    useLoyalBonus(allData);

  // merge stored + api
  const mergeOpts = (
    api: MultiSelectOption[],
    stored: MultiSelectOption[]
  ): MultiSelectOption[] => {
    const map = new Map<string, MultiSelectOption>();
    api.forEach((o) => map.set(o.value, o));
    stored.forEach((o) => map.set(o.value, o));
    return Array.from(map.values());
  };

  const effLoyalAction = useMemo(
    () => mergeOpts(loyalActionOptions, loyalAction),
    [loyalActionOptions, loyalAction]
  );
  const effLoyalBonus = useMemo(
    () => mergeOpts(loyalBonusOptions, loyalBonus),
    [loyalBonusOptions, loyalBonus]
  );

  console.log(effLoyalAction, "----", loyalAction);

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
            {/* Тип */}
            <FormField
              control={form.control}
              name="isLoyal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип</FormLabel>
                  <BooleanCheckboxCard
                    {...field}
                    options={type}
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
                    options={gender}
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
                      options={effLoyalAction}
                      isLoading={isLoyalActionLoading}
                      onOpenChange={handleOpenLoyalActionSelect}
                      onValueChange={(vals) => {
                        const nums = vals.map(Number);
                        field.onChange(nums);
                        updateLoyalFilter("guidDiscount", nums);
                        setLoyalAction(
                          effLoyalAction.filter((o) => vals.includes(o.value))
                        );
                      }}
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
                      options={effLoyalBonus}
                      isLoading={isLoyalBonusLoading}
                      onOpenChange={handleOpenLoyalBonusSelect}
                      onValueChange={(vals) => {
                        const nums = vals.map(Number);
                        field.onChange(nums);
                        updateLoyalFilter("guidBonus", nums);
                        setLoyalBonus(
                          effLoyalBonus.filter((o) => vals.includes(o.value))
                        );
                      }}
                      placeholder="Выберите бонус"
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

export default Loyality;
