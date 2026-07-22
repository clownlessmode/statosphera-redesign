import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import {
  Store,
  STORE_CHANNEL,
  STORE_CHANNEL_OPTIONS,
  STORE_STATUS,
  STORE_STATUS_OPTIONS,
} from "@entities/store/config";

import { useEditStoreController } from "../api/controller";
import { StoreFormValues } from "../model/use-form";
import { useEditStoreForm } from "../model/use-form";

interface EditStoreProps {
  store: Store;
}

export const EditStore = ({ store }: EditStoreProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: updateStore, isPending } = useEditStoreController();
  const form = useEditStoreForm();

  useEffect(() => {
    if (open) {
      form.reset({
        storeCondition: store.storeCondition as STORE_STATUS,
        channel: store.channel as STORE_CHANNEL,
      });
    }
  }, [open, store]);

  const handleSubmit = (values: StoreFormValues) => {
    updateStore({
      idStore: store.idStore,
      storeCondition: values.storeCondition,
      channel: values.channel,
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Редактирование магазина</DialogTitle>
            <DialogDescription>{store.storeName}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="storeCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          {STORE_STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Канал</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите канал" />
                        </SelectTrigger>
                        <SelectContent>
                          {STORE_CHANNEL_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
