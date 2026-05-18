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
import { FC, useCallback, useEffect, useRef } from "react";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import {
  useForm,
  useShops,
} from "@widgets/write-off/sheet/ui/side/shops-filter/model";
import { SelectMyShops } from "@widgets/write-off/sheet/ui/side/shops-filter/ui/select-my-shops";
import { useMyShopsStore } from "@widgets/write-off/sheet/ui/side/shops-filter/model/stores/use-my-shops";
import { useSession } from "@entities/session";
import { PartnerShopsClearFilter } from "./partner-shops-clear-filter";

export const PartnerShopsFilter: FC = () => {
  const form = useForm();
  const { updateStoreFilter, getApiPayload } = useFiltersStore();
  const { isMyShopsMode } = useMyShopsStore();
  const { session } = useSession();
  const payload = getApiPayload();
  const isShopsLoadedRef = useRef(false);

  const {
    savedShopLabels,
    shopsOptions,
    handleOpenShopsSelect,
    isShopsLoading,
  } = useShops(payload);

  const loadShops = useCallback(() => {
    if (!isShopsLoadedRef.current) {
      handleOpenShopsSelect(true);
      isShopsLoadedRef.current = true;
    }
  }, [handleOpenShopsSelect]);

  useEffect(() => {
    if (isMyShopsMode && !savedShopLabels.length && !isShopsLoading) {
      loadShops();
    }
    if (!isMyShopsMode) {
      isShopsLoadedRef.current = false;
    }
  }, [isMyShopsMode, savedShopLabels.length, isShopsLoading, loadShops]);

  useEffect(() => {
    if (isMyShopsMode && session?.idStore?.length) {
      const storeValues = session.idStore.map((id) => JSON.stringify([id]));
      form.setValue("idStore", storeValues);
      updateStoreFilter("idStore", storeValues);
    } else if (!isMyShopsMode) {
      const currentValues = form.getValues("idStore");
      if (currentValues?.length) return;
      form.setValue("idStore", []);
      updateStoreFilter("idStore", []);
    }
  }, [isMyShopsMode, session?.idStore, form, updateStoreFilter]);

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Магазины</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по магазинам</CardDescription>
          <PartnerShopsClearFilter form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <SelectMyShops />
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="idStore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Магазины</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled={isMyShopsMode}
                      value={field.value || []}
                      options={shopsOptions}
                      isLoading={isShopsLoading}
                      onOpenChange={(isOpen) => {
                        if (!isMyShopsMode) {
                          handleOpenShopsSelect(isOpen);
                        }
                      }}
                      onValueChange={(value) => {
                        if (!isMyShopsMode) {
                          field.onChange(value);
                          updateStoreFilter("idStore", value);
                        }
                      }}
                      externalLabels={savedShopLabels}
                      defaultValue={field.value}
                      placeholder="Выберите магазины"
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
