import { z } from "zod";

export const farmerApprovalSchema = z.discriminatedUnion("decision", [
  z.object({
    decision: z.literal("accepted"),
    sampleReadyDate: z.date({ message: "Укажите дату готовности образца" }),
  }),
  z.object({
    decision: z.literal("rejected"),
  }),
]);

export const labelApprovalSchema = z.discriminatedUnion("decision", [
  z.object({
    decision: z.literal("approved"),
    deliveryDate: z.date({ message: "Укажите дату поставки" }),
  }),
  z.object({
    decision: z.literal("rejected"),
  }),
]);

export const mrpRevisionSchema = z.object({
  readiness: z
    .string()
    .min(1, "Опишите план доработки образца или причину отказа"),
});

export const ndRevisionSchema = z.object({
  readiness: z.string().min(1, "Опишите план доработки или причину отказа"),
});

const ndFillBaseSchema = z.object({
  declarationProductName: z.string().min(1, "Укажите название продукта"),
  declarationNameCheckResultUrl: z
    .string()
    .min(1, "Укажите ссылку на результат проверки названия"),
  productUnit: z.string().min(1, "Укажите единицу измерения"),
  netWeight: z.string().min(1, "Укажите вес нетто"),
  grossWeight: z.string().min(1, "Укажите вес брутто"),
  shelfLifeDays: z.number().min(1, "Укажите срок хранения"),
  shipmentQuant: z.number().min(1, "Укажите количество отгрузок"),
  vatPercent: z.number().min(1, "Укажите НДС"),
  shippingFrom: z.string().min(1, "Укажите страну отправления"),
  protein: z.string().min(1, "Укажите количество белка"),
  fat: z.string().min(1, "Укажите количество жира"),
  carbohydrates: z.string().min(1, "Укажите количество углеводов"),
  calories: z.string().min(1, "Укажите количество калорий"),
  normativeDocument: z
    .string()
    .min(1, "Укажите ссылку на нормативный документ"),
  composition: z.string().min(1, "Укажите состав продукта"),
  storageConditionsLabel: z.string().min(1, "Укажите условия хранения"),
  okpd2Code: z.string().min(1, "Укажите код ОКПД2"),
  purchasePrice: z.number().min(1, "Укажите цену закупки"),
  testProtocolUrl: z.string().min(1, "Укажите ссылку на протокол испытаний"),
  kj: z.string().min(1, "Укажите количество ккал"),
  consumptionRestrictions: z
    .string()
    .min(1, "Укажите ограничения на потребление"),
  declarationUrl: z.string().min(1, "Укажите ссылку на декларацию"),
  allergens: z.string().min(1, "Укажите аллергены"),
  cookingMethod: z.string().min(1, "Укажите метод приготовления"),
  usp: z.string().min(1, "Укажите уникальное предложение продукта"),
  mobiusLoop: z.string().min(1, "Укажите цикл Мобиуса"),
  fragileCargo: z
    .string()
    .min(1, "Укажите груз, требующий особых условий транспортировки"),
  temperatureRegime: z.string().min(1, "Укажите режим температуры"),
  estimatedVolume: z.string().min(1, "Укажите объем"),
  palletJackRequired: z
    .string()
    .min(1, "Укажите необходимость использования погрузчика с вилами"),
  palletJackType: z.string().min(1, "Укажите тип погрузчика с вилами"),
  loaderRequired: z
    .string()
    .min(1, "Укажите необходимость использования погрузчика"),
  transportPackagingType: z
    .string()
    .min(1, "Укажите тип упаковки для транспортировки"),
  pallets: z.string().min(1, "Укажите количество поддонов"),
  palletizing: z.string().min(1, "Укажите необходимость пакетирования"),
  parkingToLoadingDistance: z
    .string()
    .min(1, "Укажите расстояние от парковки до места загрузки"),
  loadingRamp: z
    .string()
    .min(1, "Укажите необходимость использования наклонной площадки"),
  fromFarmer: z.string().min(1, "Укажите необходимость доставки от поставщика"),
  supplierRegion: z.string().min(1, "Укажите регион поставщика"),
  labelSize: z.string().optional(),
});

const ndFillMarkingSchema = z.union([
  z.object({
    chzMarkingType: z.string().min(1, "Укажите тип маркировки"),
    gtin: z
      .number({ invalid_type_error: "Укажите целое число" })
      .int("Укажите целое число"),
    groupGtin: z
      .number({ invalid_type_error: "Укажите целое число" })
      .int("Укажите целое число"),
  }),
  z.object({
    chzMarkingType: z.undefined().optional(),
    gtin: z.undefined().optional(),
    groupGtin: z.undefined().optional(),
  }),
]);

const ndFillMercurySchema = z.discriminatedUnion("mercuryControlledProduct", [
  z.object({
    mercuryControlledProduct: z.literal("нет"),
  }),
  z.object({
    mercuryControlledProduct: z.literal("да"),
    mercuryNomenclatureGuid: z.string().min(1, "Обязательное поле"),
    tnvedCode: z.string().min(1, "Обязательное поле"),
  }),
]);

export const ndFillSchema = ndFillBaseSchema
  .and(ndFillMercurySchema)
  .and(ndFillMarkingSchema);
