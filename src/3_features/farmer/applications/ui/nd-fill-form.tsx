import { useState } from "react";
import { FilePenLine } from "lucide-react";
import { useWatch } from "react-hook-form";
import { useCompleteFarmerNdFill } from "@entities/farmer";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Textarea } from "@shared/ui/textarea";
import { NdFillFormValues, useNdFillForm } from "../model/hook";

export const NdFillForm = ({ itemId }: { itemId: string }) => {
  const form = useNdFillForm();
  const mercuryControlledProduct = useWatch({
    control: form.control,
    name: "mercuryControlledProduct",
  });
  const chzMarkingType = useWatch({
    control: form.control,
    name: "chzMarkingType",
  });
  const [open, setOpen] = useState(false);
  const { mutate: completeNdFill, isPending } = useCompleteFarmerNdFill(itemId);

  const onSubmit = (data: NdFillFormValues) => {
    completeNdFill(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <Card className="p-5 gap-4 border-primary/25 bg-primary/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Badge className="size-max p-2 max-md:hidden">
              <FilePenLine className="size-6!" />
            </Badge>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">
                Заполните нормативную документацию
              </span>
              <span className="text-sm text-muted-foreground">
                Внесите характеристики, маркировку, логистические параметры и
                документы продукта.
              </span>
            </div>
          </div>
          <Button
            onClick={() => {
              form.reset();
              setOpen(true);
            }}
          >
            Заполнить НД
          </Button>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-2xl lg:max-w-4xl">
          <DialogHeader className="shrink-0">
            <DialogTitle>Заполните нормативную документацию</DialogTitle>
            <DialogDescription>
              Внесите характеристики, маркировку, логистические параметры и
              документы продукта.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex min-h-0 flex-1 flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col min-h-0 flex-1 gap-4 overflow-y-auto">
                <FormField
                  control={form.control}
                  name="declarationProductName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Название продукта из декларации
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="declarationNameCheckResultUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Результат проверки наименования
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="declarationUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Декларация
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="testProtocolUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Протокол испытаний
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                  <FormField
                    control={form.control}
                    name="productUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Единица измерения
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="netWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Вес НЕТТО
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="grossWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Вес БРУТТО
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shelfLifeDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Срок годности, дней
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value ?? ""}
                            onChange={(event) =>
                              field.onChange(event.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipmentQuant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Количество штук в упаковке
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            value={field.value ?? ""}
                            onChange={(event) =>
                              field.onChange(event.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vatPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          НДС, %
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            value={field.value ?? ""}
                            onChange={(event) =>
                              field.onChange(event.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="okpd2Code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          ОКПД2
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="normativeDocument"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Нормативный документ (ГОСТ/ТУ)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Цена продажи Калине-Малине, руб.
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            value={field.value ?? ""}
                            onChange={(event) =>
                              field.onChange(event.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="labelSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Размер этикетки</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobiusLoop"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Маркировка "Петля Мебиуса"
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supplierRegion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Регион поставщика
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="shippingFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Путь доставки продукции до торговой точки
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                  <FormField
                    control={form.control}
                    name="protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Белки (с базой расчёта)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Жиры (с базой расчёта)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carbohydrates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Углеводы (с базой расчёта)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Калорийность (с базой расчёта)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Энергетическая ценность (с базой расчёта)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="composition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Состав
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storageConditionsLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Условия хранения и срок годности
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allergens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Аллергены
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consumptionRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Ограничения к употреблению
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cookingMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Способ приготовления
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Уникальное торговое предложение
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fromFarmer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Подпись "От фермера"
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          className="max-h-40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                  <FormField
                    control={form.control}
                    name="fragileCargo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Хрупкий груз
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="нет">Нет</SelectItem>
                            <SelectItem value="да">Да</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="temperatureRegime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Температурный режим
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimatedVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Предполагаемый объём, кг
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="palletJackRequired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Требуется рохля
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="нет">Нет</SelectItem>
                            <SelectItem value="да">Да</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="palletJackType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Тип рохли
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loaderRequired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Требуется грузчик
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transportPackagingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Тип транспортной упаковки
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pallets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Паллеты
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="palletizing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Опаллечивание
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parkingToLoadingDistance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Расстояние от парковки до погрузки
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loadingRamp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                          Перегрузочный мост или пандус
                        </FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chzMarkingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Тип маркировки "Честный Знак"</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            onChange={(event) => {
                              const value = event.target.value || undefined;
                              field.onChange(value);
                              if (!value) {
                                form.setValue("gtin", undefined);
                                form.setValue("groupGtin", undefined);
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {chzMarkingType && (
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <FormField
                      control={form.control}
                      name="gtin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                            GTIN
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min={0}
                              value={field.value ?? ""}
                              onChange={(event) =>
                                field.onChange(event.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="groupGtin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                            Групповой GTIN
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min={0}
                              value={field.value ?? ""}
                              onChange={(event) =>
                                field.onChange(event.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="mercuryControlledProduct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                        Подконтрольный товар в системе "Меркурий"
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="нет">Нет</SelectItem>
                          <SelectItem value="да">Да</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {mercuryControlledProduct === "да" && (
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <FormField
                      control={form.control}
                      name="mercuryNomenclatureGuid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                            GUID номенклатуры
                          </FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ""} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tnvedCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="gap-0.5 after:text-destructive after:content-['*']">
                            Код ТН ВЭД
                          </FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ""} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <DialogFooter className="shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit" loading={isPending}>
                  Отправить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
