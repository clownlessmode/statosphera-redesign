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
import { Save, Upload, User, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@shared/ui/label";
import AddressInput from "@shared/ui/address-input";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";
import { cn } from "@shared/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../config/types";
import { Button } from "@shared/ui/button";
import { useEffect, useState } from "react";
import { DeclarationField } from "./fields/declaration-field";
import { AdditionalContactsField } from "./fields/additional-contacts-field";
import { ProfileResponse } from "@entities/farmer/config";
import { useFarmer } from "@entities/farmer";
import { useSession } from "@entities/session";
import formatDateIso from "@shared/lib/format-date-iso";
import normalizeRuPhone from "@shared/lib/normalize-ru-phone";
import { useIsMobile } from "@shared/hooks";
import { useSessionController } from "@entities/session/api/controller";
import { CropAvatarDialog } from "./crop-avatar-dialog";

interface FarmerQuestionnaireProps {
  data?: ProfileResponse;
  form: UseFormReturn<FormValues>;
  handleCancel?: () => void;
}

export default function FarmerQuestionnaire({
  form,
  data,
  handleCancel,
}: FarmerQuestionnaireProps) {
  const { updateFilters } = useFarmerProfileStore();
  const { session, setSession } = useSession();
  const { updateProfile, uploadPhoto } = useFarmer(session?.idUser);
  const isMobile = useIsMobile();
  const { getUpdatedSession } = useSessionController();
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        photo: undefined,
        phoneOrganization: normalizeRuPhone(data.phoneOrganization),
        additionalContacts: data.additionalContacts?.map((contact) => ({
          ...contact,
          phone: normalizeRuPhone(contact.phone),
        })),
      });
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
    const isValid = await form.trigger();
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
              companyHistory: payloadWithoutPhoto.companyHistory
                ? payloadWithoutPhoto.companyHistory
                : null,
              startDateOfCooperation: payloadWithoutPhoto.startDateOfCooperation
                ? formatDateIso(payloadWithoutPhoto.startDateOfCooperation)
                : null,
              dateOfFirstDelivery: payloadWithoutPhoto.dateOfFirstDelivery
                ? formatDateIso(payloadWithoutPhoto.dateOfFirstDelivery)
                : null,
              declarations: payloadWithoutPhoto.declarations?.map((d: any) => ({
                ...d,
                dateEndDeclaration: d.dateEndDeclaration
                  ? formatDateIso(d.dateEndDeclaration)
                  : null,
              })),
              idUser: session?.idUser,
            });
          }

          if (changedPhoto && changedPhoto.length > 0 && photo?.[0]) {
            await uploadPhoto({ photo: photo[0] });
          }

          toast.success("Профиль успешно обновлен");
          const { data: newSession } = await getUpdatedSession();
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

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой (максимум 5MB)");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Неверный формат файла");
      return;
    }

    setImageSrc(URL.createObjectURL(file));
    setImageName(file.name);
    setIsCropOpen(true);
  };

  const handleCropSave = (croppedFile: File) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(croppedFile);
    const fileList = dataTransfer.files;
    form.setValue("photo", fileList, { shouldValidate: true });
    updateFilters("photo", fileList);
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    setIsCropOpen(false);
  };

  const handleCropClose = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    setIsCropOpen(false);
  };

  return (
    <Card className={cn(data && "gap-1 p-4 max-md:mb-14 max-md:content-box")}>
      <CropAvatarDialog
        open={isCropOpen}
        imageSrc={imageSrc}
        imageName={imageName}
        onClose={handleCropClose}
        onSave={handleCropSave}
      />
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
            <div className="grid grid-cols-[1fr_min-content] gap-4 w-full max-md:grid-cols-1">
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
                          <FormLabel>Фото</FormLabel>
                          <Card
                            style={{
                              backgroundImage:
                                showPreview && field.value?.[0]
                                  ? `url(${URL.createObjectURL(field.value[0])})`
                                  : data?.photo
                                    ? `url("${data.photo}")`
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
                                onChange={handlePhotoSelect}
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
                          className="bg-background!"
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
                          className="bg-background!"
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
                          className="bg-background!"
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
                          className="bg-background!"
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
                  name="nds"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          НДС
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Введите НДС"
                          className="bg-background!"
                          onChange={field.onChange}
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
                  name="ogrn"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          ОГРН / ОГРНИП
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="tel"
                          placeholder="Введите ОГРН / ОГРНИП"
                          className="bg-background!"
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
                      <FormLabel>
                        <span>
                          ОКПО
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="tel"
                          placeholder="Введите ОКПО"
                          className="bg-background!"
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
                      <FormLabel>
                        <span>
                          ОКВЭД
                          <span className="text-destructive ml-0.5">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Введите ОКВЭД"
                          className="bg-background!"
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
                          className="bg-background!"
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
                          className="bg-background!"
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
                          className="bg-background! resize-none"
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
                  name="inn"
                  control={form.control}
                  render={({ field }) => {
                    const [currentInn, setCurrentInn] = useState("");

                    const handleAdd = () => {
                      const currentValues = field.value || [];

                      if (currentInn.trim()) {
                        if (currentValues.includes(currentInn)) {
                          toast.error("Такой ИНН уже есть");
                          return;
                        }
                        const newValues = [...currentValues, currentInn];
                        field.onChange(newValues);
                        updateFilters("inn", newValues as string[]);
                        setCurrentInn("");
                      } else {
                        toast.error("Заполните ИНН");
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
                              className="bg-background!"
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
                            disabled={!currentInn.trim()}
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
                <FormField
                  name="kpp"
                  control={form.control}
                  render={({ field }) => {
                    const [currentKpp, setCurrentKpp] = useState("");

                    const handleAdd = () => {
                      const currentValues = field.value || [];

                      if (currentKpp.trim()) {
                        if (currentValues.includes(currentKpp)) {
                          toast.error("Такой КПП уже есть");
                          return;
                        }
                        const newValues = [...currentValues, currentKpp];
                        field.onChange(newValues);
                        updateFilters("kpp", newValues as string[]);
                        setCurrentKpp("");
                      } else {
                        toast.error("Заполните КПП");
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
                              className="bg-background!"
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
                            disabled={!currentKpp.trim()}
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
                        <FormLabel>Фото</FormLabel>
                        <Card
                          style={{
                            backgroundImage:
                              showPreview && field.value?.[0]
                                ? `url(${URL.createObjectURL(field.value[0])})`
                                : data?.photo
                                  ? `url("${data.photo}")`
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
                              onChange={handlePhotoSelect}
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
            <FormField
              name="chiefAccountant"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      Главный бухгалтер
                      <span className="text-destructive ml-0.5">*</span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Введите ФИО"
                      className="bg-background!"
                      onChange={(e) => {
                        let value = e.target.value.replace(
                          /[^а-яА-ЯёЁ\s-]/g,
                          "",
                        );
                        if (value.startsWith(" ")) value = value.trimStart();
                        field.onChange(value);
                      }}
                      onBlur={(e) => {
                        updateFilters("chiefAccountant", e.target.value.trim());
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4 w-full">
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
                        className="bg-background!"
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
                        className="bg-background!"
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
                        className="bg-background!"
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
              <AdditionalContactsField control={form.control} />
              <DeclarationField control={form.control} />
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
