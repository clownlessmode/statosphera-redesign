import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FarmerApplicationDetail, FarmerApplication } from "@entities/farmer";
import { Card } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import {
  FileText,
  Calendar,
  Phone,
  Tag,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Layers,
  FileCheck,
  Scale,
  Sparkles,
  Truck,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react";

interface ApplicationTabsProps {
  application: FarmerApplicationDetail;
  summaryApp?: FarmerApplication;
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return format(d, "d MMMM yyyy, HH:mm", { locale: ru });
  } catch {
    return dateString;
  }
};

const formatDateShort = (dateString?: string | null) => {
  if (!dateString) return null;
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return format(d, "d MMMM yyyy", { locale: ru });
  } catch {
    return dateString;
  }
};

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const InfoRow = ({ label, value, icon, fullWidth }: InfoRowProps) => {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div
      className={`flex flex-col gap-1 p-3 rounded-xl bg-muted/40 border border-border/40 ${
        fullWidth ? "col-span-full" : ""
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm font-medium text-foreground break-words">
        {value}
      </div>
    </div>
  );
};

export const ApplicationTabs = ({
  application,
  summaryApp,
}: ApplicationTabsProps) => {
  const {
    common,
    stage_UC_HRKJ5S: sampleStage,
    stage_NEW: tastingStageNew,
    stage_UC_XA4NH4: tastingStageRevision,
    stage_UC_1B20Z0: normativeStage,
    stage_UC_C8Z9PM: docCheckStage,
    stage_UC_21AWKG: docRev1,
    stage_UC_70T9OA: docRev2,
    stage_UC_2JOKXY: priceStage,
    stage_UC_ICBDGO: labelDesignStage,
    stage_UC_1BO6E2: labelApprovalStage,
    stage_UC_4R5U06: distStage,
    stage_SUCCESS: successStage,
  } = application;

  const technicalTask =
    common?.technical_task || summaryApp?.technical_task || null;

  // Combine tasting stage data
  const tastingStage = tastingStageRevision?.tasting_result
    ? tastingStageRevision
    : tastingStageNew;

  // Combine price stage data
  const purchasePrice =
    priceStage?.purchase_price ??
    docRev1?.purchase_price ??
    docRev2?.purchase_price;
  const finalShelfPrice =
    priceStage?.final_shelf_price ??
    docRev1?.final_shelf_price ??
    docRev2?.final_shelf_price;

  return (
    <Tabs defaultValue="common" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 bg-muted/60 rounded-xl">
        <TabsTrigger value="common" className="text-xs py-2 px-3">
          Общие сведения
        </TabsTrigger>
        <TabsTrigger value="sample" className="text-xs py-2 px-3">
          Образец и дегустация
        </TabsTrigger>
        <TabsTrigger value="documents" className="text-xs py-2 px-3">
          Документы и НД
        </TabsTrigger>
        <TabsTrigger value="price" className="text-xs py-2 px-3">
          Цены и этикетка
        </TabsTrigger>
        <TabsTrigger value="distribution" className="text-xs py-2 px-3">
          Поставка и запуск
        </TabsTrigger>
      </TabsList>

      {/* 1. ОБЩИЕ СВЕДЕНИЯ */}
      <TabsContent value="common" className="flex flex-col gap-4 mt-3">
        <Card className="p-5 flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            Техническое задание
          </h3>
          <div className="rounded-xl bg-muted/30 p-4 border border-border/40 text-sm leading-relaxed whitespace-pre-wrap">
            {technicalTask || (
              <span className="italic text-muted-foreground">
                Техническое задание не заполнено
              </span>
            )}
          </div>
        </Card>

        <Card className="p-5 flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
            <Tag className="size-4 text-primary" />
            Параметры новинки
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InfoRow
              label="Рабочее наименование"
              value={common?.working_name}
              icon={<Tag className="size-3.5" />}
            />
            <InfoRow
              label="Маркетинговое наименование"
              value={common?.marketing_name}
              icon={<Sparkles className="size-3.5" />}
            />
            <InfoRow
              label="Телефон ответственного"
              value={
                common?.responsible_phone ? (
                  <a
                    href={`tel:${common.responsible_phone}`}
                    className="text-primary hover:underline"
                  >
                    {common.responsible_phone}
                  </a>
                ) : null
              }
              icon={<Phone className="size-3.5" />}
            />
            <InfoRow
              label="Создана"
              value={formatDate(common?.created_time)}
              icon={<Calendar className="size-3.5" />}
            />
            <InfoRow
              label="Последнее обновление"
              value={formatDate(common?.updated_time)}
              icon={<Calendar className="size-3.5" />}
            />
            <InfoRow
              label="Смена этапа"
              value={formatDate(common?.moved_time)}
              icon={<Calendar className="size-3.5" />}
            />
          </div>
        </Card>
      </TabsContent>

      {/* 2. ОБРАЗЕЦ И ДЕГУСТАЦИЯ */}
      <TabsContent value="sample" className="flex flex-col gap-4 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              Подготовка образца (МРП)
            </h3>
            <div className="flex flex-col gap-3">
              <InfoRow
                label="Желаемая дата разработки MVP"
                value={formatDateShort(
                  sampleStage?.mvp_desired_development_date,
                )}
              />
              <InfoRow
                label="Дата готовности образца фермером"
                value={formatDateShort(sampleStage?.farmer_sample_ready_date)}
              />
              <InfoRow
                label="Готовность фермера к MVP"
                value={sampleStage?.farmer_mvp_readiness}
              />
            </div>
          </Card>

          <Card className="p-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Результаты дегустации
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-muted/40 border border-border/40">
                <span className="text-xs text-muted-foreground font-medium">
                  Решение дегустационной комиссии
                </span>
                <div className="pt-1">
                  {tastingStage?.tasting_result === "approved" && (
                    <Badge variant="positive" className="gap-1.5">
                      <CheckCircle2 className="size-3.5" />
                      Одобрено
                    </Badge>
                  )}
                  {tastingStage?.tasting_result === "needsRevision" && (
                    <Badge variant="secondary" className="gap-1.5">
                      <AlertCircle className="size-3.5" />
                      Требуется доработка
                    </Badge>
                  )}
                  {tastingStage?.tasting_result === "rejected" && (
                    <Badge variant="destructive" className="gap-1.5">
                      <XCircle className="size-3.5" />
                      Отклонено
                    </Badge>
                  )}
                  {!tastingStage?.tasting_result && (
                    <span className="text-xs text-muted-foreground italic">
                      Дегустация еще не проведена
                    </span>
                  )}
                </div>
              </div>

              <InfoRow
                label="Отзыв дегустационной комиссии"
                value={tastingStage?.tasting_feedback}
                fullWidth
              />

              {tastingStage?.tasting_product_url && (
                <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                  <span className="text-xs text-muted-foreground font-medium block mb-1">
                    Фотография продукта с дегустации
                  </span>
                  <a
                    href={tastingStage.tasting_product_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                  >
                    <ImageIcon className="size-3.5" />
                    Посмотреть фото
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              )}

              {tastingStage?.novelty_example_public_url && (
                <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                  <span className="text-xs text-muted-foreground font-medium block mb-1">
                    Пример новинки
                  </span>
                  <a
                    href={tastingStage.novelty_example_public_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                  >
                    <ExternalLink className="size-3.5" />
                    Открыть пример новинки
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      </TabsContent>

      {/* 3. ДОКУМЕНТЫ И НД */}
      <TabsContent value="documents" className="flex flex-col gap-4 mt-3">
        {/* Проверка документов */}
        {(docCheckStage?.farmer_data_check_status ||
          docRev1?.farmer_data_check_status) && (
          <Card className="p-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <FileCheck className="size-4 text-primary" />
              Статус проверки документов
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-muted/40 border border-border/40">
                <span className="text-xs text-muted-foreground font-medium">
                  Результат проверки НД
                </span>
                <div className="pt-1">
                  {(docCheckStage?.farmer_data_check_status === "approved" ||
                    docRev1?.farmer_data_check_status === "approved") && (
                    <Badge variant="positive">Документы согласованы</Badge>
                  )}
                  {(docCheckStage?.farmer_data_check_status ===
                    "needsRevision" ||
                    docRev1?.farmer_data_check_status === "needsRevision") && (
                    <Badge variant="destructive">Требуется доработка НД</Badge>
                  )}
                </div>
              </div>
              <InfoRow
                label="Замечания к документам"
                value={
                  docRev1?.nd_check_feedback || docCheckStage?.nd_check_feedback
                }
              />
            </div>
          </Card>
        )}

        {/* Характеристики продукта из НД */}
        <Card className="p-5 flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scale className="size-4 text-primary" />
            Характеристики и состав продукта
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InfoRow
              label="Наименование по декларации"
              value={normativeStage?.declaration_product_name}
              fullWidth
            />
            <InfoRow
              label="Состав"
              value={normativeStage?.composition}
              fullWidth
            />
            <InfoRow
              label="Срок годности (дней)"
              value={normativeStage?.shelf_life_days}
            />
            <InfoRow
              label="Единица измерения"
              value={normativeStage?.product_unit}
            />
            <InfoRow
              label="Квант поставки"
              value={normativeStage?.shipment_quant}
            />
            <InfoRow
              label="Ставка НДС"
              value={
                normativeStage?.vat_percent
                  ? `${normativeStage.vat_percent}%`
                  : null
              }
            />
            <InfoRow label="Вес нетто" value={normativeStage?.net_weight} />
            <InfoRow label="Вес брутто" value={normativeStage?.gross_weight} />
            <InfoRow
              label="Энергетическая ценность (ккал / кДж)"
              value={
                normativeStage?.calories
                  ? `${normativeStage.calories} ккал ${
                      normativeStage.kj ? `(${normativeStage.kj} кДж)` : ""
                    }`
                  : null
              }
            />
            <InfoRow
              label="БЖУ (Белки / Жиры / Углеводы)"
              value={
                normativeStage?.protein || normativeStage?.fat
                  ? `${normativeStage.protein || 0}г / ${
                      normativeStage.fat || 0
                    }г / ${normativeStage.carbohydrates || 0}г`
                  : null
              }
            />
            <InfoRow
              label="Условия хранения"
              value={normativeStage?.storage_conditions_label}
            />
            <InfoRow
              label="Нормативный документ (ГОСТ/ТУ)"
              value={normativeStage?.normative_document}
            />
            <InfoRow
              label="Регион поставщика"
              value={normativeStage?.supplier_region}
            />
            <InfoRow label="Аллергены" value={normativeStage?.allergens} />
            <InfoRow
              label="Ограничения потребления"
              value={normativeStage?.consumption_restrictions}
            />
            <InfoRow
              label="УТП (Уникальные свойства)"
              value={normativeStage?.usp}
              fullWidth
            />
          </div>
        </Card>

        {/* Дополнительные коды и маркировка */}
        <Card className="p-5 flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            Коды классификации и маркировка
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InfoRow label="GTIN" value={normativeStage?.gtin} />
            <InfoRow
              label="Групповой GTIN"
              value={normativeStage?.group_gtin}
            />
            <InfoRow
              label="Тип маркировки «Честный Знак»"
              value={normativeStage?.chz_marking_type}
            />
            <InfoRow label="Код ТН ВЭД" value={normativeStage?.tnved_code} />
            <InfoRow label="Код ОКПД2" value={normativeStage?.okpd2_code} />
            <InfoRow
              label="Меркурий (подконтрольный)"
              value={normativeStage?.mercury_controlled_product}
            />
            <InfoRow
              label="GUID номенклатуры Меркурий"
              value={normativeStage?.mercury_nomenclature_guid}
            />
          </div>

          {/* Ссылки на документы */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-border/40">
            {normativeStage?.declaration_url && (
              <a
                href={normativeStage.declaration_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/60 hover:bg-muted text-xs font-medium text-foreground transition-colors border"
              >
                <FileCheck className="size-3.5 text-primary" />
                Декларация о соответствии
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            )}
            {normativeStage?.test_protocol_url && (
              <a
                href={normativeStage.test_protocol_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/60 hover:bg-muted text-xs font-medium text-foreground transition-colors border"
              >
                <FileText className="size-3.5 text-primary" />
                Протокол испытаний
                <ExternalLink className="size-3 text-muted-foreground" />
              </a>
            )}
          </div>
        </Card>
      </TabsContent>

      {/* 4. ЦЕНЫ И ЭТИКЕТКА */}
      <TabsContent value="price" className="flex flex-col gap-4 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="size-4 text-primary" />
              Стоимость и цены
            </h3>
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Закупочная цена (без НДС)
                </span>
                <span className="text-base font-bold text-foreground">
                  {purchasePrice != null ? `${purchasePrice} ₽` : "Не указана"}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Итоговая цена на полке
                </span>
                <span className="text-base font-bold text-foreground">
                  {finalShelfPrice != null
                    ? `${finalShelfPrice} ₽`
                    : "Не рассчитана"}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <Tag className="size-4 text-primary" />
              Дизайн и согласование этикетки
            </h3>
            <div className="flex flex-col gap-3">
              <InfoRow
                label="Размер этикетки"
                value={labelDesignStage?.label_size}
              />
              <InfoRow
                label="Объем сырья для фасовки"
                value={labelDesignStage?.label_package_raw_volume}
              />
              <InfoRow
                label="Статус согласования макета"
                value={labelApprovalStage?.design_layout_approval_status}
              />
              {(labelApprovalStage?.approved_label_design_url ||
                labelDesignStage?.approved_label_design_url) && (
                <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                  <span className="text-xs text-muted-foreground font-medium block mb-1">
                    Макет этикетки
                  </span>
                  <a
                    href={
                      labelApprovalStage?.approved_label_design_url ||
                      labelDesignStage?.approved_label_design_url ||
                      "#"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                  >
                    <ExternalLink className="size-3.5" />
                    Открыть согласованный макет этикетки
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      </TabsContent>

      {/* 5. ПОСТАВКА И ЗАПУСК */}
      <TabsContent value="distribution" className="flex flex-col gap-4 mt-3">
        <Card className="p-5 flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            Распределение и поставки
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InfoRow
              label="График поставок"
              value={distStage?.delivery_schedule}
            />
            <InfoRow
              label="Согласованная дата поставки"
              value={formatDateShort(
                distStage?.approved_delivery_date ||
                  labelApprovalStage?.approved_delivery_date,
              )}
            />
            <InfoRow
              label="Согласование графика РЦ"
              value={distStage?.rc_delivery_schedule_approval_status}
            />
            <InfoRow
              label="Планируемая дата запуска"
              value={formatDateShort(
                distStage?.planned_launch_date ||
                  successStage?.planned_launch_date,
              )}
            />
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
