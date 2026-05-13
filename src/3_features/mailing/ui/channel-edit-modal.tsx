import { Button } from "@shared/ui/button";
import { CardContent } from "@shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Pencil } from "lucide-react";
import { FC, useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { useUpdateChannelForm } from "../model/form";
import { UpdateChannelFormValues } from "../config/types";
import { MailingChannel, useAdminMailing } from "@entities/mailing";
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

interface Props {
  channel: MailingChannel;
}

export const ChannelEditModal: FC<Props> = ({ channel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateChannel } = useAdminMailing();
  const form = useUpdateChannelForm();
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

  useEffect(() => {
    form.reset({
      name: channel.name,
      type: channel.type,
      active: channel.active,
      id_store: Number(channel.idStore),
    });
  }, [channel, form]);

  const handleSubmit = (data: UpdateChannelFormValues) => {
    updateChannel({ id: Number(channel.id), data });
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
        <Button variant="ghost" size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать канал</DialogTitle>
        </DialogHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
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
