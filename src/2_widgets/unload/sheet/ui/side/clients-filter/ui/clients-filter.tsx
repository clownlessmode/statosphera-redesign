import { FC } from "react";
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
import { MultiSelect } from "@shared/ui/multiselect";
import { useForm, useLoyalAction, useLoyalBonus } from "../model";

import { COLORS, FormValues, SEX } from "../config";
import ClearFilters from "./clear-filter";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Input } from "@shared/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

interface AgeAccountRange {
  from: Record<"years" | "months" | "days", number | null>;
  to: Record<"years" | "months" | "days", number | null>;
}

const ClientsFilter: FC = () => {
  const form = useForm();
  const { updateClientsFilter } = useUnloadFilterStore();
  const { getApiPayload } = useFiltersStore();

  const {
    savedLoyalActionLabels,
    loyalActionOptions,
    handleOpenLoyalActionSelect,
    isLoyalActionLoading,
  } = useLoyalAction(getApiPayload());

  const {
    savedLoyalBonusLabels,
    loyalBonusOptions,
    handleOpenLoyalBonusSelect,
    isLoyalBonusLoading,
  } = useLoyalBonus(getApiPayload());

  // Приводит числовое значение к строке:
  // удаляет ведущие нули и возвращает пустую строку, если данные очищены.
  const formatNumberValue = (value: number | undefined) => {
    if (value === undefined || value === null) return "";
    return String(value).replace(/^0+(?=\d)/, "");
  };

  // Ограничивает ввод только цифрами и базовыми служебными клавишами,
  // чтобы не допустить появления недопустимых символов до валидации.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем: цифры, Backspace, Delete, Tab, Escape, Enter, стрелки
    if (
      !/[0-9]/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(e.key) &&
      !(e.ctrlKey || e.metaKey) && // Разрешаем Ctrl/Cmd + A, C, V, X
      !(e.key === "a" && (e.ctrlKey || e.metaKey)) &&
      !(e.key === "c" && (e.ctrlKey || e.metaKey)) &&
      !(e.key === "v" && (e.ctrlKey || e.metaKey)) &&
      !(e.key === "x" && (e.ctrlKey || e.metaKey))
    ) {
      e.preventDefault();
    }
  };

  // Блокирует вставку любого нечислового текста.
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d*$/.test(pasted)) {
      e.preventDefault();
    }
  };

  const normalizeAgeAccount = (
    value?: Partial<AgeAccountRange>,
  ): AgeAccountRange => ({
    from: {
      years: value?.from?.years ?? null,
      months: value?.from?.months ?? null,
      days: value?.from?.days ?? null,
    },
    to: {
      years: value?.to?.years ?? null,
      months: value?.to?.months ?? null,
      days: value?.to?.days ?? null,
    },
  });

  // Переводит (годы/месяцы/дни) в общее число дней, чтобы проще сравнивать границы диапазона.
  const toTotalDays = (
    range: Record<"years" | "months" | "days", number | null>,
  ) => (range.years ?? 0) * 365 + (range.months ?? 0) * 30 + (range.days ?? 0);

  const fromTotalDays = (
    total: number,
  ): Record<"years" | "months" | "days", number> => {
    const years = Math.floor(total / 365);
    const remainingAfterYears = total - years * 365;
    const months = Math.floor(remainingAfterYears / 30);
    const days = remainingAfterYears - months * 30;

    return { years, months, days };
  };

  // Обрабатывает изменение одного из полей возраста аккаунта, следит чтобы
  // `from` не превышал `to`, и возвращает обновлённую структуру диапазона.
  const handleAgeAccountChange = (
    field: ControllerRenderProps<FormValues, "ageAccount">,
    part: "from" | "to",
    unit: "years" | "months" | "days",
    raw: string,
  ) => {
    const sanitized = raw.replace(/\D/g, "");
    const nextValue = sanitized === "" ? null : Number(sanitized);

    const current = normalizeAgeAccount(
      field.value as AgeAccountRange | undefined,
    );

    const updated: AgeAccountRange = {
      from: { ...current.from },
      to: { ...current.to },
    };

    updated[part][unit] = nextValue;

    const hasFrom = Object.values(updated.from).some((v) => v !== null);
    const hasTo = Object.values(updated.to).some((v) => v !== null);

    const fromTotal = toTotalDays(updated.from);
    const toTotal = toTotalDays(updated.to);

    if (part === "from" && hasTo && nextValue !== null && fromTotal > toTotal) {
      updated.from = fromTotalDays(Math.max(0, toTotal));
    }

    if (part === "to" && hasFrom && nextValue !== null && toTotal < fromTotal) {
      updated.to = fromTotalDays(Math.max(fromTotal, 0));
    }

    return updated;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Клиенты</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по клиентам</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 col-span-full lg:grid-cols-2 xl:grid-cols-3 gap-4 **:[appearance:textfield] **:[&::-webkit-outer-spin-button]:appearance-none **:[&::-webkit-inner-spin-button]:appearance-none">
              {/* Возраст */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="age-label">Возраст</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            step={1}
                            className="border-foreground/10 text-foreground bg-background"
                            value={String(
                              Math.max(0, Math.min(100, field.value?.[0] ?? 0)),
                            )}
                            onPaste={handlePaste}
                            onKeyDown={handleKeyDown}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => {
                              const sanitized = e.target.value.replace(
                                /^0+(?=\d)/,
                                "",
                              );
                              const raw = sanitized === "" ? "0" : sanitized;
                              const min = Math.max(
                                0,
                                Math.min(100, Number(raw)),
                              );
                              const currentMax = field.value?.[1] ?? 100;
                              const max = Math.max(
                                min,
                                Math.max(0, Math.min(100, currentMax)),
                              );
                              field.onChange([min, max]);
                              updateClientsFilter("ageStart", min);
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-2 w-full">
                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            step={1}
                            className="border-foreground/10 text-foreground bg-background"
                            value={String(
                              Math.max(
                                0,
                                Math.min(100, field.value?.[1] ?? 100),
                              ),
                            )}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => {
                              const sanitized = e.target.value.replace(
                                /^0+(?=\d)/,
                                "",
                              );
                              const raw = sanitized === "" ? "0" : sanitized;
                              const max = Math.max(
                                0,
                                Math.min(100, Number(raw)),
                              );
                              const currentMin = field.value?.[0] ?? 0;
                              const min = Math.min(currentMin, max);

                              field.onChange([min, max]);
                              updateClientsFilter("ageEnd", max);
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Частота покупок */}
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="frequency-label">
                      Количество покупок
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;
                                    field.onChange({ from: min, to: max });
                                    updateClientsFilter("frequency", {
                                      ...form.getValues("frequency"),
                                      from: min,
                                    });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;
                                    field.onChange({ from: min, to: max });
                                    updateClientsFilter("frequency", {
                                      ...form.getValues("frequency"),
                                      to: max,
                                    });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Общая выручка пользователя */}
              <FormField
                control={form.control}
                name="totalPurchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="totalPurchase-label">
                      Общая сумма покупок
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;

                                    field.onChange({ from: min, to: max });
                                    updateClientsFilter("totalPurchase", {
                                      ...form.getValues("totalPurchase"),
                                      from: min,
                                    });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;

                                    field.onChange({ from: min, to: max });
                                    updateClientsFilter("totalPurchase", {
                                      ...form.getValues("totalPurchase"),
                                      to: max,
                                    });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Сумма чека */}
              <FormField
                control={form.control}
                name="proceedPerCheck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="proceedPerCheck-label">
                      Выручка на чек
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full **:[appearance:textfield] **:[&::-webkit-outer-spin-button]:appearance-none **:[&::-webkit-inner-spin-button]:appearance-none">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          return (
                            <>
                              <span className="text-sm text-muted-foreground">
                                от
                              </span>
                              <Input
                                type="number"
                                step={1}
                                className="border-foreground/10 text-foreground bg-background"
                                value={formatNumberValue(
                                  currentFrom ?? undefined,
                                )}
                                onKeyDown={handleKeyDown}
                                onWheel={(e) => e.currentTarget.blur()}
                                onChange={(e) => {
                                  const sanitized = e.target.value.replace(
                                    /^0+(?=\d)/,
                                    "",
                                  );
                                  const min =
                                    sanitized === "" ? null : Number(sanitized);
                                  const max =
                                    currentTo !== null && min !== null
                                      ? Math.max(min, currentTo)
                                      : currentTo;

                                  field.onChange({ from: min, to: max });
                                  updateClientsFilter("proceedPerCheck", {
                                    ...form.getValues("proceedPerCheck"),
                                    from: min,
                                  });
                                }}
                              />

                              <span className="text-sm text-muted-foreground">
                                до
                              </span>
                              <Input
                                type="number"
                                step={1}
                                className="border-foreground/10 text-foreground bg-background"
                                value={formatNumberValue(
                                  currentTo ?? undefined,
                                )}
                                onKeyDown={handleKeyDown}
                                onWheel={(e) => e.currentTarget.blur()}
                                onChange={(e) => {
                                  const sanitized = e.target.value.replace(
                                    /^0+(?=\d)/,
                                    "",
                                  );
                                  const max =
                                    sanitized === "" ? null : Number(sanitized);
                                  const min =
                                    currentFrom !== null && max !== null
                                      ? Math.min(currentFrom, max)
                                      : currentFrom;

                                  field.onChange({ from: min, to: max });
                                  updateClientsFilter("proceedPerCheck", {
                                    ...form.getValues("proceedPerCheck"),
                                    to: max,
                                  });
                                }}
                              />
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Средняя длина чека */}
              <FormField
                control={form.control}
                name="avgCheckLen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="avgCheckLen-label">
                      Средняя длина чека
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;

                                    field.onChange({ from: min, to: max });
                                    updateClientsFilter("avgCheckLen", {
                                      ...form.getValues("avgCheckLen"),
                                      from: min,
                                    });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;

                                    field.onChange({ from: min, to: max });
                                    updateClientsFilter("avgCheckLen", {
                                      ...form.getValues("avgCheckLen"),
                                      to: max,
                                    });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Средний чек */}
              <FormField
                control={form.control}
                name="avg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="avg-label">Средний чек</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;

                                    const newValue = { from: min, to: max };
                                    field.onChange(newValue);
                                    updateClientsFilter("avg", {
                                      ...form.getValues("avg"),
                                      from: min,
                                      to: max,
                                    });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;

                                    const newValue = { from: min, to: max };
                                    field.onChange(newValue);
                                    updateClientsFilter("avg", {
                                      ...form.getValues("avg"),
                                      from: min,
                                      to: max,
                                    });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Бонусы у пользователя */}
              <FormField
                control={form.control}
                name="countBonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="countBonus-label">
                      Количество бонусов
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          const handleUpdate = (next: {
                            from: number | null;
                            to: number | null;
                          }) => {
                            field.onChange(next);
                            updateClientsFilter("countBonus", {
                              ...form.getValues("countBonus"),
                              ...next,
                            });
                          };

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;

                                    handleUpdate({ from: min, to: max });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;

                                    handleUpdate({ from: min, to: max });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Потрачено бонусов у пользователя */}
              <FormField
                control={form.control}
                name="bonusWriteoff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Списано бонусов за период</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          const handleUpdate = (next: {
                            from: number | null;
                            to: number | null;
                          }) => {
                            field.onChange(next);
                            updateClientsFilter("bonusWriteoff", {
                              ...form.getValues("bonusWriteoff"),
                              ...next,
                            });
                          };

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;

                                    handleUpdate({ from: min, to: max });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;

                                    handleUpdate({ from: min, to: max });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Начислено бонусов у пользователя */}
              <FormField
                control={form.control}
                name="bonusAccrual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Начислено бонусов за период</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const value = field.value ?? { from: null, to: null };
                          const currentFrom = value.from ?? null;
                          const currentTo = value.to ?? null;

                          const handleUpdate = (next: {
                            from: number | null;
                            to: number | null;
                          }) => {
                            field.onChange(next);
                            updateClientsFilter("bonusAccrual", {
                              ...form.getValues("bonusAccrual"),
                              ...next,
                            });
                          };

                          return (
                            <>
                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  от
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentFrom ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const min =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const max =
                                      currentTo !== null && min !== null
                                        ? Math.max(min, currentTo)
                                        : currentTo;

                                    handleUpdate({ from: min, to: max });
                                  }}
                                />
                              </div>

                              <div className="flex items-center gap-2 w-full">
                                <span className="text-sm text-muted-foreground">
                                  до
                                </span>
                                <Input
                                  type="number"
                                  step={1}
                                  className="border-foreground/10 text-foreground bg-background"
                                  value={formatNumberValue(
                                    currentTo ?? undefined,
                                  )}
                                  onKeyDown={handleKeyDown}
                                  onPaste={handlePaste}
                                  onWheel={(e) => e.currentTarget.blur()}
                                  onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                      /^0+(?=\d)/,
                                      "",
                                    );
                                    const max =
                                      sanitized === ""
                                        ? null
                                        : Number(sanitized);
                                    const min =
                                      currentFrom !== null && max !== null
                                        ? Math.min(currentFrom, max)
                                        : currentFrom;

                                    handleUpdate({ from: min, to: max });
                                  }}
                                />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Время жизни аккаунта*/}
              <FormField
                control={form.control}
                name="ageAccount"
                render={({ field }) => {
                  const value = normalizeAgeAccount(
                    field.value as AgeAccountRange | undefined,
                  );
                  const bindInput = (
                    part: "from" | "to",
                    unit: "years" | "months" | "days",
                  ) => ({
                    value:
                      value[part][unit] === null ||
                      value[part][unit] === undefined
                        ? ""
                        : String(value[part][unit]),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      const updated = handleAgeAccountChange(
                        field,
                        part,
                        unit,
                        e.target.value,
                      );
                      field.onChange(updated);
                      updateClientsFilter("ageAccount", {
                        ...form.getValues("ageAccount"),
                        ...updated,
                      });
                    },
                    onKeyDown: handleKeyDown,
                    onPaste: handlePaste,
                    onWheel: (e: React.WheelEvent<HTMLInputElement>) =>
                      e.currentTarget.blur(),
                  });

                  return (
                    <FormItem className="col-span-full">
                      <FormLabel>Время жизни аккаунта</FormLabel>
                      <FormControl>
                        <div className="flex max-md:grid max-md:grid-cols-[min-content_1fr] items-center gap-2 w-full">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              type="number"
                              placeholder="дней"
                              className="placeholder:text-center border-foreground/10 text-foreground bg-background"
                              {...bindInput("from", "days")}
                            />
                            <Input
                              type="number"
                              placeholder="месяцев"
                              className="placeholder:text-center border-foreground/10 text-foreground bg-background"
                              {...bindInput("from", "months")}
                            />
                            <Input
                              type="number"
                              placeholder="лет"
                              className="placeholder:text-center border-foreground/10 text-foreground bg-background"
                              {...bindInput("from", "years")}
                            />
                          </div>

                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              type="number"
                              placeholder="дней"
                              className="placeholder:text-center border-foreground/10 text-foreground bg-background"
                              {...bindInput("to", "days")}
                            />
                            <Input
                              type="number"
                              placeholder="месяцев"
                              className="placeholder:text-center border-foreground/10 text-foreground bg-background"
                              {...bindInput("to", "months")}
                            />
                            <Input
                              type="number"
                              placeholder="лет"
                              className="placeholder:text-center border-foreground/10 text-foreground bg-background"
                              {...bindInput("to", "years")}
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            {/* Пол */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пол</FormLabel>
                  <FormControl>
                    <CheckboxCards
                      {...field}
                      options={SEX}
                      disableCheck
                      onChange={(values) => {
                        field.onChange(values);
                        updateClientsFilter("sex", values);
                      }}
                      className="grid-cols-3 max-md:grid-cols-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Цвет */}
            <FormField
              control={form.control}
              name="colorsDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет</FormLabel>
                  <CheckboxCards
                    {...field}
                    selectAll
                    options={COLORS}
                    className="grid-cols-1 md:grid-cols-3"
                    onChange={(value) => {
                      field.onChange(value);
                      updateClientsFilter("colorsDiscount", value);
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
                      options={loyalActionOptions}
                      isLoading={isLoyalActionLoading}
                      onOpenChange={handleOpenLoyalActionSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateClientsFilter("guidDiscount", numeric);
                      }}
                      externalLabels={savedLoyalActionLabels}
                      defaultValue={field.value?.map(String)}
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
                      options={loyalBonusOptions}
                      isLoading={isLoyalBonusLoading}
                      onOpenChange={handleOpenLoyalBonusSelect}
                      onValueChange={(value) => {
                        const numeric = value.map(String);
                        field.onChange(numeric);
                        updateClientsFilter("guidBonus", numeric);
                      }}
                      externalLabels={savedLoyalBonusLabels}
                      defaultValue={field.value?.map(String)}
                      placeholder="Выберите акцию"
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

export default ClientsFilter;
