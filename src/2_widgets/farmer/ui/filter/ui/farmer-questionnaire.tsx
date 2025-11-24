import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";

import { Input } from "@shared/ui/input";
import { PhoneInput } from "@shared/ui/phone-input";
import { Textarea } from "@shared/ui/textarea";
import DateInput from "@shared/ui/date-input";
import { Upload, User, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@shared/ui/label";
import AddressInput from "@shared/ui/address-input";
import { useFarmerProfileStore } from "@widgets/farmer/model/filters-store";
import { cn } from "@shared/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../config/types";
import { Button } from "@shared/ui/button";
import { useState } from "react";
import isValidInn from "@shared/lib/check-inn";
import isValidKpp from "@shared/lib/check-kpp";
import { DeclarationsField } from "./declaration-field";
import { ResponsiblePersonFields } from "./responsible-person-filed";
import { ChiefAccountantFields } from "./chief-accountant-field";
import { MainContactFields } from "./main-contact-fields";
import { AdditionalContactsFields } from "./additional-contacts-fields";

interface FarmerQuestionnaireProps {
  level: number;
  form: UseFormReturn<FormValues>;
}

export default function FarmerQuestionnaire({
  level,
  form,
}: FarmerQuestionnaireProps) {
  const { updateFilters } = useFarmerProfileStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {level === 0
            ? "Основная информация"
            : level === 1
              ? "Дополнительная информация"
              : "Контакты"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-row gap-2 justify-center w-150">
          <Form {...form}>
            <div
              className={cn(
                "grid-cols-[1fr_min-content] gap-4 w-full",
                level === 0 ? "grid" : "hidden",
              )}
            >
              <div className="flex flex-col gap-4">
                <FormField
                  name="organizationName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        Название организации
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Введите название организации"
                          className="bg-background"
                          onChange={(e) => {
                            if (e.target.value.startsWith(" ")) {
                              e.target.value = e.target.value.trimStart();
                            }
                            field.onChange(e.target.value);
                          }}
                          onBlur={(e) => {
                            updateFilters(
                              "organizationName",
                              e.target.value.trim(),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="managerName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        ФИО руководителя{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="tel"
                          placeholder="Введите ФИО руководителя"
                          className="bg-background"
                          onChange={(e) => {
                            let value = e.target.value.replace(
                              /[^а-яА-ЯёЁ\s-]/g,
                              "",
                            );
                            if (value.startsWith(" ")) {
                              value = value.trimStart();
                            }
                            field.onChange(value);
                          }}
                          onBlur={(e) => {
                            updateFilters("managerName", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phoneOrganization"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        Номер телефона
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          value={field.value || ""}
                          unmask={false}
                          mask="+{7}-000-000-00-00"
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          onBlur={(e) => {
                            updateFilters("phoneOrganization", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="emailOrganization"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        Email<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Введите email"
                          className="bg-background"
                          onChange={(e) => {
                            field.onChange(e.target.value.trim());
                          }}
                          onBlur={(e) => {
                            updateFilters("emailOrganization", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="inn"
                  control={form.control}
                  render={({ field }) => {
                    const [currentInn, setCurrentInn] = useState("");

                    const handleAdd = () => {
                      const currentValues = field.value || [];

                      if (currentInn && isValidInn(currentInn)) {
                        if (currentValues.includes(currentInn)) {
                          toast.error("Такой ИНН уже есть");
                          return;
                        }
                        const newValues = [...currentValues, currentInn];
                        field.onChange(newValues);
                        updateFilters("inn", newValues as string[]);
                        setCurrentInn("");
                      } else {
                        toast.error("Некорректный формат ИНН");
                        return;
                      }
                    };

                    const handleRemove = (index: number) => {
                      const newValues = (field.value || []).filter(
                        (_, i) => i !== index,
                      );
                      field.onChange(newValues);
                      updateFilters("inn", newValues);
                    };

                    return (
                      <FormItem>
                        <FormLabel className="gap-0.5">
                          ИНН<span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              value={currentInn}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                if (val.length <= 12) setCurrentInn(val);
                              }}
                              placeholder="Введите ИНН"
                              className="bg-background"
                              type="tel"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAdd();
                                }
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAdd}
                            disabled={!currentInn || !isValidInn(currentInn)}
                          >
                            Сохранить
                          </Button>
                        </div>
                        {/* Список добавленных ИНН */}
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2">
                            {(field.value || []).map(
                              (inn: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex flex-wrap items-center gap-2 bg-background py-1.5 px-3 rounded-md text-xs"
                                >
                                  <span>{inn}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemove(index)}
                                    className="size-2"
                                  >
                                    <X />
                                  </Button>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name="kpp"
                  control={form.control}
                  render={({ field }) => {
                    const [currentKpp, setCurrentKpp] = useState("");

                    const handleAdd = () => {
                      const currentValues = field.value || [];

                      if (currentKpp && isValidKpp(currentKpp)) {
                        if (currentValues.includes(currentKpp)) {
                          toast.error("Такой КПП уже есть");
                          return;
                        }
                        const newValues = [...currentValues, currentKpp];
                        field.onChange(newValues);
                        updateFilters("kpp", newValues as string[]);
                        setCurrentKpp("");
                      } else {
                        toast.error("Некорректный формат КПП");
                        return;
                      }
                    };

                    const handleRemove = (index: number) => {
                      const newValues = (field.value || []).filter(
                        (_, i) => i !== index,
                      );
                      field.onChange(newValues);
                      updateFilters("kpp", newValues);
                    };

                    return (
                      <FormItem>
                        <FormLabel>КПП</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              value={currentKpp}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                if (val.length <= 9) setCurrentKpp(val);
                              }}
                              placeholder="Введите КПП"
                              className="bg-background"
                              type="tel"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAdd();
                                }
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAdd}
                            disabled={!currentKpp || !isValidKpp(currentKpp)}
                          >
                            Сохранить
                          </Button>
                        </div>
                        {/* Список добавленных КПП */}
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2">
                            {(field.value || []).map(
                              (kpp: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex flex-wrap items-center gap-2 bg-background py-1.5 px-3 rounded-md text-xs"
                                >
                                  <span>{kpp}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemove(index)}
                                    className="size-2"
                                  >
                                    <X />
                                  </Button>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name="nds"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>НДС</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          maxLength={2}
                          value={field.value || ""}
                          placeholder="Введите кол-во процентов"
                          className="bg-background"
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .replace(/^0+/, "");
                            field.onChange(value);
                          }}
                          onBlur={(e) => {
                            updateFilters("nds", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="personalization"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        Персонализация
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Введите персонализацию"
                          className="bg-background"
                          onChange={(e) => {
                            let value = e.target.value.replace(
                              /[^а-яА-ЯёЁ\s-]/g,
                              "",
                            );
                            if (value.startsWith(" ")) {
                              value = value.trimStart();
                            }
                            field.onChange(value);
                          }}
                          onBlur={(e) => {
                            updateFilters(
                              "personalization",
                              e.target.value.trim(),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="bankDetails"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        Банковские реквизиты
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          placeholder="Введите банковские реквизиты"
                          className="!bg-background resize-none"
                          rows={2}
                          onChange={(e) => {
                            if (e.target.value.startsWith(" ")) {
                              e.target.value = e.target.value.trimStart();
                            }
                            field.onChange(e.target.value);
                          }}
                          onBlur={(e) => {
                            updateFilters("bankDetails", e.target.value.trim());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="companyHistory"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">
                        История компании
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          placeholder="Введите историю компании"
                          className="!bg-background resize-none"
                          rows={2}
                          onChange={(e) => {
                            if (e.target.value.startsWith(" ")) {
                              e.target.value = e.target.value.trimStart();
                            }
                            field.onChange(e.target.value);
                          }}
                          onBlur={(e) => {
                            updateFilters(
                              "companyHistory",
                              e.target.value.trim(),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => {
                  const hasError = !!form.formState.errors.photo;
                  const showPreview = field.value?.[0] && !hasError;

                  return (
                    <FormItem className="h-full w-max flex flex-col gap-2">
                      <FormLabel className="gap-0.5">
                        Фото <span className="text-destructive">*</span>
                      </FormLabel>
                      <Card
                        style={{
                          backgroundImage: showPreview
                            ? `url(${URL.createObjectURL(field.value[0])})`
                            : "none",
                        }}
                        className={cn(
                          "size-[300px] aspect-square bg-background bg-no-repeat bg-center bg-cover relative",
                          hasError && "border-destructive border-2",
                        )}
                      >
                        {!showPreview && (
                          <User className="absolute inset-0 size-full p-12 text-muted-foreground" />
                        )}
                      </Card>
                      <FormControl>
                        <div className="flex flex-col items-center gap-2">
                          <Label
                            htmlFor="photo-upload"
                            className="flex items-center w-full gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-background"
                          >
                            <Upload className="h-4 w-4" />
                            Выбрать фото
                          </Label>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            className="hidden"
                            onChange={(event) => {
                              if (
                                event.target.files?.[0]?.size &&
                                event.target.files?.[0]?.size > 10 * 1024 * 1024
                              ) {
                                toast.error(
                                  "Файл слишком большой (максимум 10MB)",
                                );
                                return;
                              }
                              if (
                                event.target.files?.[0]?.type &&
                                ![
                                  "image/jpeg",
                                  "image/png",
                                  "image/webp",
                                ].includes(event.target.files?.[0]?.type)
                              ) {
                                toast.error("Неверный формат файла");
                                return;
                              }
                              if (
                                event.target.files &&
                                event.target.files.length > 0
                              ) {
                                field.onChange(event.target.files);
                                updateFilters("photo", event.target.files);
                              }
                            }}
                          />
                          {showPreview && (
                            <span className="text-sm text-muted-foreground">
                              {field.value?.[0]?.name}
                            </span>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div
              className={cn(
                "flex-col gap-4 w-full",
                level === 1 ? "flex" : "hidden",
              )}
            >
              <FormField
                name="legalAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-0.5">
                      Юридический адрес{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <AddressInput
                        {...field}
                        placeholder="Введите адрес"
                        className="bg-background"
                        onValueChange={(value) => {
                          field.onChange(value);
                          updateFilters("legalAddress", value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="postalAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-0.5">
                      Почтовый адрес <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <AddressInput
                        {...field}
                        value={field.value || ""}
                        placeholder="Введите адрес"
                        className="bg-background"
                        onValueChange={(value) => {
                          field.onChange(value);
                          updateFilters("postalAddress", value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="workshopAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-0.5">
                      Адрес цеха <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <AddressInput
                        {...field}
                        value={field.value || ""}
                        placeholder="Введите адрес"
                        className="bg-background"
                        onValueChange={(value) => {
                          field.onChange(value);
                          updateFilters("workshopAddress", value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="ogrn"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-0.5">
                      ОГРН <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="tel"
                        placeholder="Введите ОГРН"
                        className="bg-background"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        onBlur={(e) => {
                          updateFilters("ogrn", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="okpo"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ОКПО</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="tel"
                        placeholder="Введите ОКПО"
                        className="bg-background"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        onBlur={(e) => {
                          updateFilters("okpo", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="okved"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-0.5">
                      ОКВЭД <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="tel"
                        placeholder="Введите ОКВЭД"
                        className="bg-background"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d.]/g, "");
                          field.onChange(value);
                        }}
                        onBlur={(e) => {
                          updateFilters("okved", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DeclarationsField control={form.control} />
              <FormField
                name="startDateCooper"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата начала сотрудничества</FormLabel>
                    <FormControl>
                      <DateInput
                        {...field}
                        value={field.value || ""}
                        placeholder="Введите дату"
                        className="bg-background"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        onBlur={(e) => {
                          updateFilters("startDateCooper", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dateFirstDelivery"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата первой доставки</FormLabel>
                    <FormControl>
                      <DateInput
                        {...field}
                        value={field.value || ""}
                        placeholder="Введите дату"
                        className="bg-background"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        onBlur={(e) => {
                          updateFilters("dateFirstDelivery", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn(
                "flex-col gap-4 w-full",
                level === 2 ? "flex" : "hidden",
              )}
            >
              <ChiefAccountantFields control={form.control} />
              <ResponsiblePersonFields control={form.control} />
              <MainContactFields control={form.control} />
              <AdditionalContactsFields control={form.control} />
            </div>
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}
