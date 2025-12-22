import { Card, CardContent, CardHeader } from "@shared/ui/card";
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
import { ClipboardPaste, Save, Upload, User, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@shared/ui/label";
import AddressInput from "@shared/ui/address-input";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";
import { cn } from "@shared/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../config/types";
import { Button } from "@shared/ui/button";
import { useEffect, useState } from "react";
import isValidInn from "@shared/lib/check-inn";
import isValidKpp from "@shared/lib/check-kpp";
import { DeclarationField } from "./fields/declaration-field";
import { ResponsiblePersonField } from "./fields/responsible-person-filed";
import { ChiefAccountantField } from "./fields/chief-accountant-field";
import { MainContactField } from "./fields/main-contact-field";
import { AdditionalContactsField } from "./fields/additional-contacts-field";
import { ProfileResponse } from "@entities/farmer/config";
import { useFarmer } from "@entities/farmer";
import { useSession } from "@entities/session";
import formatDateIso from "@shared/lib/format-date-iso";
import { STEPS_FIELDS } from "../config/constant";
import { useIsMobile } from "@shared/hooks";
import { Separator } from "@shared/ui/separator";
import { useSessionController } from "@entities/session/api/controller";

interface FarmerQuestionnaireProps {
  level?: number;
  data?: ProfileResponse;
  form: UseFormReturn<FormValues>;
  handleCancel?: () => void;
}

export default function FarmerQuestionnaire({
  level,
  form,
  data,
  handleCancel,
}: FarmerQuestionnaireProps) {
  const { updateFilters } = useFarmerProfileStore();
  const { session, setSession } = useSession();
  const { updateProfile, uploadPhoto } = useFarmer(session?.idUser);
  const isMobile = useIsMobile();
  const { getUpdatedSession } = useSessionController();
  // Эффект для инициализации формы данными, если включен режим редактирования
  useEffect(() => {
    if (data) {
      // Сбрасываем форму значениями из data, исключая поле photo,
      // так как оно требует FileList, а с сервера приходит строка URL
      form.reset({
        ...data,
        photo: undefined,
      } as unknown as FormValues);
    }
  }, [data, form]);

  // Функция для сравнения исходных данных и текущих значений формы
  const getChangedFields = (data: ProfileResponse, formValues: FormValues) => {
    const changes: Record<string, any> = {};
    const allKeys = new Set([
      ...Object.keys(data || {}),
      ...Object.keys(formValues || {}),
    ]);

    allKeys.forEach((key) => {
      // Пропускаем проверку фото, если новое фото не выбрано (массив пуст или undefined)
      if (
        key === "photo" &&
        (!formValues.photo || formValues.photo.length === 0)
      )
        return;

      const val1 = data?.[key as keyof ProfileResponse];
      const val2 = formValues?.[key as keyof FormValues];

      const isDifferent =
        typeof val1 === "object" && val1 !== null && val2 !== null
          ? JSON.stringify(val1) !== JSON.stringify(val2)
          : val1 != val2;

      if (isDifferent) {
        changes[key] = val2;
      }
    });

    return Object.keys(changes).length > 0 ? changes : null;
  };

  const handleSave = async () => {
    if (!data || !form.getValues()) return;
    // Фильтруем массив, исключая "photo"
    const fieldsToValidate = STEPS_FIELDS.flat().filter(
      (field) => field !== "photo",
    ) as (keyof FormValues)[];
    // Запускаем валидацию
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      const changes = getChangedFields(data, form.getValues());
      if (changes && session?.idUser) {
        const { photo: changedPhoto, ...changesFields } = changes as {
          photo?: FileList;
        } & Record<string, any>;
        const { photo, ...payloadWithoutPhoto } = form.getValues();
        try {
          if (Object.keys(changesFields).length > 0) {
            await updateProfile({
              ...payloadWithoutPhoto,
              startDateOfCooperation: payloadWithoutPhoto.startDateOfCooperation
                ? formatDateIso(payloadWithoutPhoto.startDateOfCooperation)
                : null,
              dateOfFirstDelivery: payloadWithoutPhoto.dateOfFirstDelivery
                ? formatDateIso(payloadWithoutPhoto.dateOfFirstDelivery)
                : null,
              declarations: payloadWithoutPhoto.declarations?.map((d: any) => ({
                ...d,
                dateEndDeclaration: formatDateIso(d.dateEndDeclaration),
              })),
              idUser: session?.idUser,
            });
          }

          if (changedPhoto && changedPhoto.length > 0) {
            await uploadPhoto({ photo: photo[0] });
          }

          toast.success("Профиль успешно обновлен");
          const { data: newSession } = await getUpdatedSession(); // Исправлено здесь
          if (newSession && newSession.idUser === session?.idUser) {
            setSession(newSession);
          }
          handleCancel?.();
        } catch (error: any) {
          console.error(error);
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Обязательные поля не могут быть пустыми");
    }
  };

  const handleAutoFill = (
    section: "chiefAccountant" | "responsiblePerson" | "mainContact",
  ) => {
    const { managerName, phoneOrganization, emailOrganization } =
      form.getValues();

    if (!managerName && !phoneOrganization && !emailOrganization) {
      toast.error("Сначала заполните данные руководителя");
      return;
    }

    const commonData = {
      name: managerName,
      phone: phoneOrganization,
      email: emailOrganization,
    };

    let dataToSet: any;

    switch (section) {
      case "chiefAccountant":
        dataToSet = {
          ...commonData,
          position: "Главный бухгалтер" as const,
        };
        break;
      case "responsiblePerson":
        dataToSet = {
          ...commonData,
          position: "Ответственное лицо" as const,
        };
        break;
      case "mainContact":
        dataToSet = {
          ...commonData,
          position: "Руководитель",
        };
        break;
    }

    if (dataToSet) {
      form.setValue(section, dataToSet, { shouldValidate: true });
      updateFilters(section, dataToSet);
    }
  };

  return (
    <Card className={cn(data && "gap-1 p-4 max-md:mb-14 max-md:content-box")}>
      {data && (
        <CardHeader className="flex flex-row justify-end py-1.5 max-md:fixed max-md:bottom-0 max-md:inset-x-0 max-md:z-10 max-md:px-6 max-md:mb-4">
          <Button
            className="w-max max-md:w-full max-md:h-10"
            variant="outline"
            onClick={handleCancel}
          >
            Отменить
          </Button>
          <Button
            className="w-max max-md:w-full max-md:h-10"
            disabled={!getChangedFields(data, form.getValues())}
            onClick={handleSave}
          >
            <Save />
            Сохранить
          </Button>
        </CardHeader>
      )}
      <CardContent className="py-2 max-md:p-0">
        <form
          className={cn(
            "flex flex-row gap-4 justify-center w-150 max-md:w-full",
            data && "w-full flex-col",
          )}
        >
          <Form {...form}>
            <div
              className={cn(
                "grid-cols-[1fr_min-content] gap-4 w-full max-md:grid-cols-1",
                level === 0
                  ? "grid max-md:flex max-md:flex-col max-md:px-4"
                  : "hidden",
                data && "grid",
              )}
            >
              <div
                className={cn(
                  "flex flex-col gap-4",
                  data && "grid grid-cols-3 max-md:flex max-md:flex-col",
                )}
              >
                {isMobile && (
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => {
                      const hasError = !!form.formState.errors.photo;
                      const showPreview = field.value?.[0] && !hasError;

                      return (
                        <FormItem className="h-full w-max flex flex-col gap-2 max-md:w-full max-md:items-center max-md:justify-center max-md:gap-4 max-md:py-2">
                          <FormLabel>
                            <span>
                              Фото
                              <span className="text-destructive ml-0.5">*</span>
                            </span>
                          </FormLabel>
                          <Card
                            style={{
                              backgroundImage: showPreview
                                ? `url(${URL.createObjectURL(field.value[0])})`
                                : data?.photo
                                  ? `url(${data.photo})`
                                  : "none",
                            }}
                            className={cn(
                              "size-[300px] aspect-square bg-background bg-no-repeat bg-center bg-cover relative max-md:size-[150px] max-md:rounded-full",
                              hasError && "border-destructive border-2",
                            )}
                          >
                            {!showPreview && !data?.photo && (
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
                                    event.target.files?.[0]?.size >
                                      10 * 1024 * 1024
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
                                <span className="text-sm text-muted-foreground max-md:hidden">
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
                )}
                <FormField
                  name="organizationName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={cn(data && "col-span-3")}>
                      <FormLabel>
                        <span>
                          Название организации
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
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
                {level !== undefined && <Separator />}
                <FormField
                  name="managerName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          ФИО руководителя
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
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
                {level !== undefined && <Separator />}
                <FormField
                  name="phoneOrganization"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          Телефон организации
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
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
                {level !== undefined && <Separator />}
                <FormField
                  name="emailOrganization"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          Email организации
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
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
                {level !== undefined && <Separator />}
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
                {level !== undefined && <Separator />}
                <FormField
                  name="ogrn"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ОГРН / ОГРНИП</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="tel"
                          placeholder="Введите ОГРН / ОГРНИП"
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
                {level !== undefined && <Separator />}
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
                {level !== undefined && <Separator />}
                <FormField
                  name="okved"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5">ОКВЭД</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
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
                {level !== undefined && <Separator />}
                <FormField
                  name="startDateOfCooperation"
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
                            updateFilters(
                              "startDateOfCooperation",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {level !== undefined && <Separator />}
                <FormField
                  name="dateOfFirstDelivery"
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
                            updateFilters(
                              "dateOfFirstDelivery",
                              e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {level !== undefined && <Separator />}
                <FormField
                  name="bankDetails"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={cn(data && "col-span-3")}>
                      <FormLabel>
                        <span>
                          Банковские реквизиты
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
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
                {level !== undefined && <Separator />}
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
                      <FormItem className={cn(data && "col-span-3")}>
                        <FormLabel>
                          <span>
                            ИНН
                            <span className="text-destructive ml-0.5">*</span>
                          </span>
                        </FormLabel>
                        <div className="flex gap-0.5">
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
                                    type="button"
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
                {level !== undefined && <Separator />}
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
                      <FormItem className={cn(data && "col-span-3")}>
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
                                    type="button"
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
              </div>
              {!isMobile && (
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => {
                    const hasError = !!form.formState.errors.photo;
                    const showPreview = field.value?.[0] && !hasError;

                    return (
                      <FormItem className="h-full w-max flex flex-col gap-2">
                        <FormLabel>
                          <span>
                            Фото
                            <span className="text-destructive ml-0.5">*</span>
                          </span>
                        </FormLabel>
                        <Card
                          style={{
                            backgroundImage: showPreview
                              ? `url(${URL.createObjectURL(field.value[0])})`
                              : data?.photo
                                ? `url(${data.photo})`
                                : "none",
                          }}
                          className={cn(
                            "size-[300px] aspect-square bg-background bg-no-repeat bg-center bg-cover relative",
                            hasError && "border-destructive border-2",
                          )}
                        >
                          {!showPreview && !data?.photo && (
                            <User className="absolute inset-0 size-full p-12 text-muted-foreground" />
                          )}
                        </Card>
                        <FormControl>
                          <div className="flex flex-col items-center gap-2">
                            <Label
                              htmlFor="photo-upload"
                              className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-background"
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
                                  event.target.files?.[0]?.size >
                                    5 * 1024 * 1024
                                ) {
                                  toast.error(
                                    "Файл слишком большой (максимум 5MB)",
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
              )}
            </div>
            <div
              className={cn(
                "flex-col gap-4 w-full",
                level === 1 ? "flex max-md:flex-col max-md:px-4" : "hidden",
                data && "flex",
              )}
            >
              <FormField
                name="legalAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        Юридический адрес / место жительства
                        <span className="text-destructive ml-0.5">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <AddressInput
                        {...field}
                        value={field.value || ""}
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
              {level !== undefined && <Separator />}
              <FormField
                name="postalAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        Почтовый адрес
                        <span className="text-destructive ml-0.5">*</span>
                      </span>
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
              {level !== undefined && <Separator />}
              <FormField
                name="workshopAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        Адрес цеха
                        <span className="text-destructive ml-0.5">*</span>
                      </span>
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
              {level !== undefined && <Separator />}
              <ChiefAccountantField control={form.control}>
                {level && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="max-md:px-0!"
                      onClick={() => handleAutoFill("chiefAccountant")}
                    >
                      Данные руководителя
                      <ClipboardPaste />
                    </Button>
                  </div>
                )}
              </ChiefAccountantField>
              {level !== undefined && <Separator />}
              <ResponsiblePersonField control={form.control}>
                {level && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="max-md:px-0!"
                      onClick={() => handleAutoFill("responsiblePerson")}
                    >
                      Данные руководителя
                      <ClipboardPaste />
                    </Button>
                  </div>
                )}
              </ResponsiblePersonField>
              {level !== undefined && <Separator />}
              <MainContactField control={form.control}>
                {level && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="max-md:px-0!"
                      onClick={() => handleAutoFill("mainContact")}
                    >
                      Данные руководителя
                      <ClipboardPaste />
                    </Button>
                  </div>
                )}
              </MainContactField>
              {level !== undefined && <Separator />}
              <AdditionalContactsField control={form.control} />
              {level !== undefined && <Separator />}
              <DeclarationField control={form.control} />
              {level !== undefined && <Separator />}
              <FormField
                name="companyHistory"
                control={form.control}
                render={({ field }) => (
                  <FormItem className={cn(data && "col-span-3")}>
                    <FormLabel>
                      <span>История компании</span>
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
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}
