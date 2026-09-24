import React from "react";
import { format, isValid, parse } from "date-fns";
import { ru } from "date-fns/locale";
import {
  AlertCircle,
  Barcode,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  FileCheck,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  Package,
  Phone,
  Scale,
  Tag,
  Truck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import { FarmerApplicationDetail, FarmerApplication } from "@entities/farmer";
import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { Card } from "@shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";

interface ApplicationTabsProps {
  application: FarmerApplicationDetail;
  summaryApp?: FarmerApplication;
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return null;

  const dotted = parse(dateString, "dd.MM.yyyy", new Date());
  const date = isValid(dotted) ? dotted : new Date(dateString);
  if (!isValid(date)) return dateString;

  return format(date, "d MMMM yyyy", { locale: ru });
};

interface DetailItemProps {
  label: string;
  value?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

const DetailItem = ({
  label,
  value,
  placeholder = "Не указано",
  className,
}: DetailItemProps) => {
  const isEmpty = value === undefined || value === null || value === "";

  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <div
        className={cn(
          "break-words text-sm leading-5",
          isEmpty ? "text-muted-foreground" : "font-medium text-foreground",
        )}
      >
        {isEmpty ? placeholder : value}
      </div>
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) => (
  <div className="flex items-center gap-2.5">
    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="size-4" />
    </div>
    <h3 className="text-sm font-semibold tracking-tight text-foreground">
      {title}
    </h3>
  </div>
);

const FileLink = ({
  href,
  title,
  icon: Icon = FileText,
}: {
  href?: string | null;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}) => {
  if (!href) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-muted px-4 py-2.5 text-muted-foreground">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/70">
          <Icon className="size-4" />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{title}</span>
          <span className="text-xs">Файл не прикреплён</span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-2 transition-all hover:border-primary/15 hover:bg-primary/[0.03]"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {title}
          </span>
          <span className="text-xs text-muted-foreground">Открыть файл</span>
        </div>
      </div>
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
        <ExternalLink className="size-3.5" />
      </div>
    </a>
  );
};

const PriceMetric = ({
  label,
  value,
  emptyLabel,
}: {
  label: string;
  value?: number | null;
  emptyLabel: string;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-4 p-4">
    <span className="text-xs font-medium text-muted-foreground">{label}</span>
    <div className="flex shrink-0 items-baseline gap-1.5 text-right">
      {value != null ? (
        <>
          <span className="text-2xl font-semibold text-foreground tabular-nums">
            {value.toLocaleString("ru-RU")}
          </span>
          <span className="text-2xl font-semibold text-muted-foreground">
            ₽
          </span>
        </>
      ) : (
        <span className="text-sm font-normal text-muted-foreground">
          {emptyLabel}
        </span>
      )}
    </div>
  </div>
);

const TastingBadge = ({ result }: { result?: string | null }) => {
  switch (result) {
    case "approved":
      return (
        <Badge variant="positive" className="gap-1.5">
          <CheckCircle2 className="size-3.5" />
          Одобрено
        </Badge>
      );
    case "needsRevision":
      return (
        <Badge variant="secondary" className="gap-1.5">
          <AlertCircle className="size-3.5" />
          Требуется доработка
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive" className="gap-1.5">
          <XCircle className="size-3.5" />
          Отклонено
        </Badge>
      );
    default:
      return <Badge variant="muted">Не проводилась</Badge>;
  }
};

const DocumentStatusBadge = ({ status }: { status?: string | null }) => {
  switch (status) {
    case "approved":
      return <Badge variant="positive">Согласовано</Badge>;
    case "needsRevision":
      return <Badge variant="destructive">Требуется доработка</Badge>;
    case "rejected":
      return <Badge variant="destructive">Отклонено</Badge>;
    default:
      return <Badge variant="muted">Не проводилась</Badge>;
  }
};

const ReviewSummary = ({
  statusLabel,
  status,
  feedbackLabel,
  feedback,
  feedbackPlaceholder,
}: {
  statusLabel: string;
  status: React.ReactNode;
  feedbackLabel: string;
  feedback?: React.ReactNode;
  feedbackPlaceholder: string;
}) => (
  <div className="overflow-hidden rounded-xl border border-border bg-background">
    <div className="flex flex-wrap items-center justify-between gap-4 p-4">
      <span className="text-xs font-medium text-muted-foreground">
        {statusLabel}
      </span>
      {status}
    </div>
    <div className="border-t border-border bg-background p-4">
      <DetailItem
        label={feedbackLabel}
        value={feedback}
        placeholder={feedbackPlaceholder}
        className="whitespace-pre-wrap"
      />
    </div>
  </div>
);

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
  const tastingStage = tastingStageRevision?.tasting_result
    ? tastingStageRevision
    : tastingStageNew;

  const purchasePrice =
    priceStage?.purchase_price ??
    docRev2?.purchase_price ??
    docRev1?.purchase_price;
  const finalShelfPrice =
    priceStage?.final_shelf_price ??
    docRev2?.final_shelf_price ??
    docRev1?.final_shelf_price;

  const docStatus =
    docRev2?.farmer_data_check_status ??
    docRev1?.farmer_data_check_status ??
    docCheckStage?.farmer_data_check_status;
  const docFeedback =
    docRev2?.nd_check_feedback ||
    docRev1?.nd_check_feedback ||
    docCheckStage?.nd_check_feedback;

  const hasMarking = Boolean(normativeStage?.chz_marking_type);
  const isMercury = normativeStage?.mercury_controlled_product === "да";

  return (
    <Tabs defaultValue="common" className="w-full">
      <TabsList className="h-auto w-full flex-nowrap justify-start overflow-x-auto rounded-xl bg-muted/60 p-1">
        <TabsTrigger value="common" className="px-3 py-2 text-xs">
          Общие сведения
        </TabsTrigger>
        <TabsTrigger value="sample" className="px-3 py-2 text-xs">
          Образец и дегустация
        </TabsTrigger>
        <TabsTrigger value="documents" className="px-3 py-2 text-xs">
          Документы и НД
        </TabsTrigger>
        <TabsTrigger value="price" className="px-3 py-2 text-xs">
          Цены и этикетка
        </TabsTrigger>
        <TabsTrigger value="distribution" className="px-3 py-2 text-xs">
          Поставка и запуск
        </TabsTrigger>
      </TabsList>

      <TabsContent value="common" className="mt-3 flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader icon={FileText} title="Техническое задание" />
          <div
            className={cn(
              "rounded-lg bg-background px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
              technicalTask ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {technicalTask || "Техническое задание пока не заполнено"}
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader icon={Package} title="Параметры новинки" />
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
            <DetailItem
              label="Рабочее наименование"
              value={common?.working_name}
            />
            <DetailItem
              label="Маркетинговое наименование"
              value={common?.marketing_name}
            />
            <DetailItem
              label="Телефон ответственного"
              placeholder="Не указан"
              value={
                common?.responsible_phone ? (
                  <a
                    href={`tel:${common.responsible_phone}`}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <Phone className="size-3.5" />
                    {common.responsible_phone}
                  </a>
                ) : null
              }
            />
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="sample" className="mt-3 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-4 p-5">
            <SectionHeader
              icon={FlaskConical}
              title="Подготовка образца (МРП)"
            />
            <div className="flex flex-col gap-5">
              <DetailItem
                label="Желаемая дата разработки"
                placeholder="Не указана"
                value={formatDate(sampleStage?.mvp_desired_development_date)}
              />
              <DetailItem
                label="Дата готовности образца"
                placeholder="Не указана"
                value={formatDate(sampleStage?.farmer_sample_ready_date)}
              />
              <DetailItem
                label="План доработки или причина отказа"
                value={sampleStage?.farmer_mvp_readiness}
              />
            </div>
          </Card>

          <Card className="flex flex-col gap-4 p-5">
            <SectionHeader
              icon={UtensilsCrossed}
              title="Результаты дегустации"
            />
            <div className="flex flex-col gap-5">
              <ReviewSummary
                statusLabel="Решение комиссии"
                status={<TastingBadge result={tastingStage?.tasting_result} />}
                feedbackLabel="Отзыв комиссии"
                feedback={tastingStage?.tasting_feedback}
                feedbackPlaceholder="Отзыва пока нет"
              />
              <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                <FileLink
                  href={tastingStage?.tasting_product_url}
                  title="Фото продукта"
                  icon={ImageIcon}
                />
                <FileLink
                  href={tastingStage?.novelty_example_public_url}
                  title="Пример новинки"
                />
              </div>
            </div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="documents" className="mt-3 flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader icon={FileCheck} title="Статус проверки документов" />
          <ReviewSummary
            statusLabel="Результат проверки"
            status={<DocumentStatusBadge status={docStatus} />}
            feedbackLabel="Замечания"
            feedback={docFeedback}
            feedbackPlaceholder={
              docStatus ? "Замечаний нет" : "Появятся после проверки"
            }
          />
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader
            icon={Scale}
            title="Характеристики и состав продукта"
          />
          <div className="flex flex-col gap-5">
            <DetailItem
              label="Название продукта из декларации"
              value={normativeStage?.declaration_product_name}
            />
            <DetailItem label="Состав" value={normativeStage?.composition} />
          </div>
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              label="Срок годности, дней"
              value={normativeStage?.shelf_life_days}
            />
            <DetailItem
              label="Единица измерения"
              value={normativeStage?.product_unit}
            />
            <DetailItem
              label="Количество штук в упаковке"
              value={normativeStage?.shipment_quant}
            />
            <DetailItem label="НДС, %" value={normativeStage?.vat_percent} />
            <DetailItem label="Вес НЕТТО" value={normativeStage?.net_weight} />
            <DetailItem
              label="Вес БРУТТО"
              value={normativeStage?.gross_weight}
            />
            <DetailItem
              label="Белки (с базой расчёта)"
              value={normativeStage?.protein}
            />
            <DetailItem
              label="Жиры (с базой расчёта)"
              value={normativeStage?.fat}
            />
            <DetailItem
              label="Углеводы (с базой расчёта)"
              value={normativeStage?.carbohydrates}
            />
            <DetailItem
              label="Калорийность (с базой расчёта)"
              value={normativeStage?.calories}
            />
            <DetailItem
              label="Энергетическая ценность (с базой расчёта)"
              value={normativeStage?.kj}
            />
            <DetailItem
              label="Регион поставщика"
              value={normativeStage?.supplier_region}
            />
          </div>
          <div className="flex flex-col gap-5">
            <DetailItem
              label="Условия хранения и срок годности"
              value={normativeStage?.storage_conditions_label}
            />
            <DetailItem
              label="Нормативный документ (ГОСТ/ТУ)"
              value={normativeStage?.normative_document}
            />
            <DetailItem label="Аллергены" value={normativeStage?.allergens} />
            <DetailItem
              label="Ограничения к употреблению"
              value={normativeStage?.consumption_restrictions}
            />
            <DetailItem
              label="Уникальное торговое предложение"
              value={normativeStage?.usp}
            />
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader icon={Barcode} title="Коды и маркировка" />
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
              label='Тип маркировки "Честный Знак"'
              value={normativeStage?.chz_marking_type}
            />
            {hasMarking && (
              <>
                <DetailItem label="GTIN" value={normativeStage?.gtin} />
                <DetailItem
                  label="Групповой GTIN"
                  value={normativeStage?.group_gtin}
                />
              </>
            )}
            <DetailItem label="ОКПД2" value={normativeStage?.okpd2_code} />
            <DetailItem
              label='Подконтрольный товар в системе "Меркурий"'
              value={
                normativeStage?.mercury_controlled_product === "да"
                  ? "Да"
                  : normativeStage?.mercury_controlled_product === "нет"
                    ? "Нет"
                    : null
              }
            />
            {isMercury && (
              <DetailItem
                label="Код ТН ВЭД"
                value={normativeStage?.tnved_code}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
            <FileLink
              href={normativeStage?.declaration_url}
              title="Декларация"
            />
            <FileLink
              href={normativeStage?.test_protocol_url}
              title="Протокол испытаний"
            />
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="price" className="mt-3 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-4 p-5">
            <SectionHeader icon={DollarSign} title="Стоимость и цены" />
            <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
              <PriceMetric
                label="Цена продажи «Калине-Малине»"
                value={purchasePrice}
                emptyLabel="Не указана"
              />
              <PriceMetric
                label="Итоговая цена на полке"
                value={finalShelfPrice}
                emptyLabel="Не рассчитана"
              />
            </div>
          </Card>

          <Card className="flex flex-col gap-4 p-5">
            <SectionHeader icon={Tag} title="Этикетка" />
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Статус согласования макета
                </span>
                <span
                  className={cn(
                    "text-sm",
                    labelApprovalStage?.design_layout_approval_status
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {labelApprovalStage?.design_layout_approval_status ||
                    "Ещё не согласован"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Размер этикетки
                </span>
                <span
                  className={cn(
                    "text-sm",
                    labelDesignStage?.label_size
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {labelDesignStage?.label_size || "Не указан"}
                </span>
              </div>
            </div>
            <FileLink
              href={
                labelApprovalStage?.approved_label_design_url ||
                labelDesignStage?.approved_label_design_url
              }
              title="Согласованный макет этикетки"
              icon={ImageIcon}
            />
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="distribution" className="mt-3 flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <SectionHeader icon={Truck} title="Распределение и поставки" />
          <DetailItem
            label="График поставок"
            value={distStage?.delivery_schedule}
          />
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-5 sm:grid-cols-3">
            <DetailItem
              label="Согласованная дата поставки"
              placeholder="Не указана"
              value={formatDate(
                distStage?.approved_delivery_date ||
                  labelApprovalStage?.approved_delivery_date,
              )}
            />
            <DetailItem
              label="Согласование графика РЦ"
              value={distStage?.rc_delivery_schedule_approval_status}
              placeholder="Ещё не согласован"
            />
            <DetailItem
              label="Планируемая дата запуска"
              placeholder="Не указана"
              value={formatDate(
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
