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

import { COLORS } from "../config";
import ClearFilters from "./clear-filter";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Input } from "@shared/ui/input";
//import { SEX } from "@widgets/rfm/ui/filter/config/constants";

const ClientsFilter: FC = () => {
  const form = useForm();
  const { updateLoyalFilter, getApiPayload } = useFiltersStore();
  const payload = getApiPayload();
  const {
    savedLoyalActionLabels,
    loyalActionOptions,
    handleOpenLoyalActionSelect,
    isLoyalActionLoading,
  } = useLoyalAction(payload);

  const {
    savedLoyalBonusLabels,
    loyalBonusOptions,
    handleOpenLoyalBonusSelect,
    isLoyalBonusLoading,
  } = useLoyalBonus(payload);

  return (
    <Card className="w-full mr-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 **:[appearance:textfield] **:[&::-webkit-outer-spin-button]:appearance-none **:[&::-webkit-inner-spin-button]:appearance-none">
              {/* Возраст */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => {
                  const [minVal, maxVal] = field.value ?? [];
                  const displayedMin =
                    minVal === undefined
                      ? ""
                      : String(minVal).replace(/^0+(?=\d)/, "");
                  const displayedMax =
                    maxVal === undefined
                      ? ""
                      : String(maxVal).replace(/^0+(?=\d)/, "");

                  return (
                    <FormItem>
                      <FormLabel>Возраст</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm text-muted-foreground">
                              от
                            </span>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              step={1}
                              className="flex-1"
                              value={displayedMin}
                              onChange={(e) => {
                                const sanitized = e.target.value.replace(
                                  /^0+(?=\d)/,
                                  "",
                                );
                                const currentMax = field.value?.[1] ?? 100;
                                const inputValue =
                                  sanitized === "" ? 0 : Number(sanitized) || 0;

                                const min = Math.max(
                                  0,
                                  Math.min(
                                    currentMax,
                                    Math.min(100, inputValue),
                                  ),
                                );
                                const max = currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter("ageEnd", max);
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm text-muted-foreground">
                              до
                            </span>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              step={1}
                              className="flex-1"
                              value={displayedMax}
                              onChange={(e) => {
                                const sanitized = e.target.value.replace(
                                  /^0+(?=\d)/,
                                  "",
                                );
                                const currentMin = field.value?.[0] ?? 0;
                                const inputValue =
                                  sanitized === ""
                                    ? currentMin
                                    : Number(sanitized) || currentMin;

                                const min = currentMin;
                                const max = Math.max(
                                  currentMin,
                                  Math.min(100, inputValue),
                                );
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter("ageEnd", max);
                              }}
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              {/* Частота покупок */}
              {/*<FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Частота покупок</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[1] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMin = field.value?.[0];
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = currentMin;
                                const max = undefined;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter("ageEnd", undefined);
                                return;
                              }
                              // Если минимум не задан, используем 0 как минимальное ограничение
                              const minLimit = currentMin ?? 0;
                              // Ограничиваем максимальное значение: не меньше текущего минимума
                              const min = currentMin;
                              const max = Math.max(minLimit, inputValue);
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter("ageEnd", max);
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />*/}
              {/* Средняя длина чека */}
              {/*<FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Средняя длина чека</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[1] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMin = field.value?.[0];
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = currentMin;
                                const max = undefined;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter("ageEnd", undefined);
                                return;
                              }
                              // Если минимум не задан, используем 0 как минимальное ограничение
                              const minLimit = currentMin ?? 0;
                              // Ограничиваем максимальное значение: не меньше текущего минимума
                              const min = currentMin;
                              const max = Math.max(minLimit, inputValue);
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter("ageEnd", max);
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalPurchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Средний чек</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[1] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMin = field.value?.[0] ?? 0;
                              const inputValue = Number(e.target.value);
                              // Ограничиваем максимальное значение: не меньше текущего минимума
                              const min = currentMin;
                              const max = isNaN(inputValue)
                                ? Infinity
                                : Math.max(currentMin, inputValue);
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Общая выручка пользователя */}
              {/*<FormField
                control={form.control}
                name="totalPurchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Общая выручка пользователя</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[1] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMin = field.value?.[0] ?? 0;
                              const inputValue = Number(e.target.value);
                              // Ограничиваем максимальное значение: не меньше текущего минимума
                              const min = currentMin;
                              const max = isNaN(inputValue)
                                ? Infinity
                                : Math.max(currentMin, inputValue);
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Бонусы у пользователя */}
              {/*                               <FormField
                control={form.control}
                name="countBonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Бонусов у пользователя</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            от
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-muted-foreground">
                            до
                          </span>
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1"
                            value={field.value?.[1] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMin = field.value?.[0] ?? 0;
                              const inputValue = Number(e.target.value);
                              // Ограничиваем максимальное значение: не меньше текущего минимума
                              const min = currentMin;
                              const max = isNaN(inputValue)
                                ? Infinity
                                : Math.max(currentMin, inputValue);
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Время жизни аккаунта*/}
              {/*<FormField
                control={form.control}
                name="countBonus"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Время жизни аккаунта</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-sm text-muted-foreground">
                          от
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            placeholder="дней"
                            className="flex-1 placeholder:text-center"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />

                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1 placeholder:text-center"
                            placeholder="месяцев"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            className="flex-1 placeholder:text-center"
                            placeholder="лет"
                            value={field.value?.[0] ?? ""}
                            onKeyDown={(e) => {
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
                            }}
                            onChange={(e) => {
                              const currentMax = field.value?.[1] ?? Infinity;
                              const inputValue = Number(e.target.value);
                              // Обрабатываем пустое значение
                              if (isNaN(inputValue) || e.target.value === "") {
                                const min = undefined;
                                const max =
                                  currentMax === Infinity
                                    ? undefined
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", undefined);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity || max === undefined
                                    ? undefined
                                    : max
                                );
                                return;
                              }
                              // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                              const min = Math.max(
                                0,
                                Math.min(currentMax, inputValue)
                              );
                              const max =
                                currentMax === Infinity
                                  ? inputValue
                                  : currentMax;
                              const newValue = [min, max];
                              field.onChange(newValue);
                              updateLoyalFilter("ageStart", min);
                              updateLoyalFilter(
                                "ageEnd",
                                max === Infinity ? min : max
                              );
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          до
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              placeholder="дней"
                              className="flex-1 placeholder:text-center"
                              value={field.value?.[0] ?? ""}
                              onKeyDown={(e) => {
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
                                  !(
                                    e.key === "a" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(
                                    e.key === "c" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(
                                    e.key === "v" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(e.key === "x" && (e.ctrlKey || e.metaKey))
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                const currentMax = field.value?.[1] ?? Infinity;
                                const inputValue = Number(e.target.value);
                                // Обрабатываем пустое значение
                                if (
                                  isNaN(inputValue) ||
                                  e.target.value === ""
                                ) {
                                  const min = undefined;
                                  const max =
                                    currentMax === Infinity
                                      ? undefined
                                      : currentMax;
                                  const newValue = [min, max];
                                  field.onChange(newValue);
                                  updateLoyalFilter("ageStart", undefined);
                                  updateLoyalFilter(
                                    "ageEnd",
                                    max === Infinity || max === undefined
                                      ? undefined
                                      : max
                                  );
                                  return;
                                }
                                // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                                const min = Math.max(
                                  0,
                                  Math.min(currentMax, inputValue)
                                );
                                const max =
                                  currentMax === Infinity
                                    ? inputValue
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity ? min : max
                                );
                              }}
                            />
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              placeholder="месяцев"
                              className="flex-1 placeholder:text-center"
                              value={field.value?.[0] ?? ""}
                              onKeyDown={(e) => {
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
                                  !(
                                    e.key === "a" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(
                                    e.key === "c" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(
                                    e.key === "v" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(e.key === "x" && (e.ctrlKey || e.metaKey))
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                const currentMax = field.value?.[1] ?? Infinity;
                                const inputValue = Number(e.target.value);
                                // Обрабатываем пустое значение
                                if (
                                  isNaN(inputValue) ||
                                  e.target.value === ""
                                ) {
                                  const min = undefined;
                                  const max =
                                    currentMax === Infinity
                                      ? undefined
                                      : currentMax;
                                  const newValue = [min, max];
                                  field.onChange(newValue);
                                  updateLoyalFilter("ageStart", undefined);
                                  updateLoyalFilter(
                                    "ageEnd",
                                    max === Infinity || max === undefined
                                      ? undefined
                                      : max
                                  );
                                  return;
                                }
                                // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                                const min = Math.max(
                                  0,
                                  Math.min(currentMax, inputValue)
                                );
                                const max =
                                  currentMax === Infinity
                                    ? inputValue
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity ? min : max
                                );
                              }}
                            />
                            <Input
                              type="number"
                              min={0}
                              step={1}
                              placeholder="лет"
                              className="flex-1 placeholder:text-center"
                              value={field.value?.[0] ?? ""}
                              onKeyDown={(e) => {
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
                                  !(
                                    e.key === "a" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(
                                    e.key === "c" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(
                                    e.key === "v" &&
                                    (e.ctrlKey || e.metaKey)
                                  ) &&
                                  !(e.key === "x" && (e.ctrlKey || e.metaKey))
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                const currentMax = field.value?.[1] ?? Infinity;
                                const inputValue = Number(e.target.value);
                                // Обрабатываем пустое значение
                                if (
                                  isNaN(inputValue) ||
                                  e.target.value === ""
                                ) {
                                  const min = undefined;
                                  const max =
                                    currentMax === Infinity
                                      ? undefined
                                      : currentMax;
                                  const newValue = [min, max];
                                  field.onChange(newValue);
                                  updateLoyalFilter("ageStart", undefined);
                                  updateLoyalFilter(
                                    "ageEnd",
                                    max === Infinity || max === undefined
                                      ? undefined
                                      : max
                                  );
                                  return;
                                }
                                // Ограничиваем минимальное значение: не меньше 0, не больше текущего максимума
                                const min = Math.max(
                                  0,
                                  Math.min(currentMax, inputValue)
                                );
                                const max =
                                  currentMax === Infinity
                                    ? inputValue
                                    : currentMax;
                                const newValue = [min, max];
                                field.onChange(newValue);
                                updateLoyalFilter("ageStart", min);
                                updateLoyalFilter(
                                  "ageEnd",
                                  max === Infinity ? min : max
                                );
                              }}
                            />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />*/}
            </div>
            {/* Пол */}
            {/*<FormField
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
                        updateLoyalFilter("sex", values);
                      }}
                      className="grid-cols-3 max-md:grid-cols-1"
                    />
                  </FormControl>
                </FormItem>
              )}
            />*/}
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
                      updateLoyalFilter("colorsDiscount", value);
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
                        updateLoyalFilter("guidDiscount", numeric);
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
                        updateLoyalFilter("guidBonus", numeric);
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
