import { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { useStoresController } from "@pages/stores/model/api/controller";
import { Store } from "@entities/store/config";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";

import { useEditUserStores } from "../api/controller";
import { EMPTY_STORE_FILTERS } from "../config/defaults";
import { UserStoresFormValues, useEditUserStoresForm } from "../model/use-form";

interface EditUserStoresProps {
  id_user: number;
  id_store: number[];
  onSuccess?: () => void;
}

export const EditUserStores = ({
  id_user,
  id_store,
  onSuccess,
}: EditUserStoresProps) => {
  const form = useEditUserStoresForm();
  const [open, setOpen] = useState(false);
  const { stores, isStoresLoading } = useStoresController(
    undefined,
    EMPTY_STORE_FILTERS,
  );

  const { mutate: updateUserStores, isPending } = useEditUserStores();

  useEffect(() => {
    if (open) {
      form.reset({ id_store });
    }
  }, [open, id_user, form]);

  const handleSubmit = (data: UserStoresFormValues) => {
    updateUserStores(
      {
        id_user,
        data: { id_store: data.id_store },
      },
      {
        onSuccess: () => {
          setOpen(false);
          onSuccess?.();
        },
      },
    );
  };

  const optionsMap = useCallback(
    (data: Store[]) =>
      data?.map((store: Store) => ({
        label: store.storeName,
        value: String(store.idStore),
      })),
    [],
  );

  return (
    <>
      <button
        className="flex items-center justify-center size-9 cursor-pointer text-muted-foreground hover:text-foreground"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <Pencil className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование пользователя</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="id_store"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Магазины</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value?.map(String) || []}
                        options={optionsMap(stores ?? [])}
                        onValueChange={(values) =>
                          field.onChange(values.map(Number))
                        }
                        placeholder="Выберите магазины"
                        isLoading={isStoresLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Отменить
                </Button>
                <Button type="submit" loading={isPending}>
                  Сохранить
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
