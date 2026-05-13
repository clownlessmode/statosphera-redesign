import { Button } from "@shared/ui/button";
import { CardContent } from "@shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { useAddChannelForm } from "../model/form";
import { useAdminMailing } from "@entities/mailing";
import { AddChannelFormValues } from "../config/types";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { MultiSelect } from "@shared/ui/multiselect";
import { useStoresController } from "@pages/stores/model/api/controller";
import { Store } from "@entities/store/config";

export const ChannelAddModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addChannel } = useAdminMailing();
  const form = useAddChannelForm();
  const { stores } = useStoresController(undefined, {
    idStore: [],
    idCity: [],
    idRegion: [],
    idManager: [],
    ageGroup: [],
    idLegalEntity: [],
    channel: [],
    district: [],
    storeCondition: [],
    nightStore: null,
    shopOnAuto: null,
    deliveryIm: null,
    walkingDelivery: null,
    grill: null,
    dopeki: null,
    bakehouse: null,
    brazier: null,
    camera: null,
    coffee: null,
    typeCoffee: [],
    ownershipCoffee: [],
    milkRefrigerator: null,
    pizzaCm: [],
    pizzaDaysSchedule: [],
    pizzaHoursSchedule: [],
    maxPower: [],
    format: [],
    discountTime: [],
    startDate: "1800-01-01",
    endDate: "2030-06-10",
  });

  const storesOptions = useMemo(() => {
    return (
      stores?.map((store: Store) => ({
        label: store.storeName,
        value: String(store.idStore),
      })) || []
    );
  }, [stores]);

  const handleSubmit = (data: AddChannelFormValues) => {
    addChannel(data);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Добавить канал
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить канал</DialogTitle>
        </DialogHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value?.toString() || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="Введите ID канала/чата"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите название" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id_store"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Магазин</FormLabel>
                    <FormControl>
                      <MultiSelect
                        maxCount={1}
                        singleSelect
                        options={storesOptions}
                        className="bg-background"
                        value={field.value ? [field.value.toString()] : []}
                        onValueChange={(values) =>
                          field.onChange(values?.[0] ? Number(values[0]) : 0)
                        }
                        placeholder="Выберите магазин"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="store">Магазин</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-2 pt-4 justify-end">
                <Button type="button" variant="outline">
                  Отменить
                </Button>
                <Button type="submit">Сохранить</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};
