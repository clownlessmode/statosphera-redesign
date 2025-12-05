// schema.ts
import { z } from "zod";
import { isValid, parse } from "date-fns";
import validateOgrn from "@shared/lib/check-orgn";
import isValidOkpo from "@shared/lib/check-okpo";

export const schema = z.object({
  photo: z
    .instanceof(FileList, { message: "Фотография обязательна" })
    .refine((files) => files.length === 1, "Фотография обязательна")
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024,
      `Максимальный размер файла - 5 МБ.`,
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type,
        ),
      "Поддерживаются только .jpg, .jpeg, .png и .webp форматы.",
    ),
  organizationName: z.string().min(1, "Обязательное поле"),
  managerName: z.string().min(1, "Обязательное поле"),
  phoneOrganization: z
    .string()
    .length(16, { message: "Введите номер полностью" }),
  emailOrganization: z.string().email({ message: "Некорректный email" }),
  inn: z.array(z.string().min(10)).min(1, "Обязательное поле"),
  kpp: z.array(z.string().min(9)),
  nds: z.string(),
  bankDetails: z
    .string({
      required_error: "Обязательное поле",
      invalid_type_error: "Обязательное поле",
    })
    .min(1, "Обязательное поле"),
  companyHistory: z.string().min(1, "Обязательное поле"),
  legalAddress: z.string().min(1, "Обязательное поле"),
  postalAddress: z.string().min(1, "Обязательное поле"),
  workshopAddress: z.string().min(1, "Обязательное поле"),
  ogrn: z.union([
    z.literal(""),
    z.string().refine((val) => validateOgrn(val), {
      message: "Некорректный ОГРН",
    }),
  ]),
  okpo: z.union([
    z.literal(""),
    z.string().refine((val) => isValidOkpo(val), {
      message: "Некорректный ОКПО",
    }),
  ]),
  okved: z.union([
    z.literal(""),
    z.string().refine((val) => /^(\d{2}(\.\d{1,2})?(\.\d{1,2})?)$/.test(val), {
      message: "Некорректный ОКВЭД",
    }),
  ]),
  declarations: z.array(
    z.object({
      nameDeclaration: z.string().min(1),
      dateEndDeclaration: z
        .string()
        .min(10)
        .refine((val) => isValid(parse(val, "dd.MM.yyyy", new Date()))),
    }),
  ),
  startDateOfCooperation: z.union([
    z.literal(""),
    z
      .string()
      .min(10, "Введите дату полностью")
      .refine((val) => isValid(parse(val, "dd.MM.yyyy", new Date())), {
        message: "Некорректная дата",
      }),
  ]),
  dateOfFirstDelivery: z.union([
    z.literal(""),
    z
      .string()
      .min(10, "Введите дату полностью")
      .refine((val) => isValid(parse(val, "dd.MM.yyyy", new Date())), {
        message: "Некорректная дата",
      }),
  ]),
  chiefAccountant: z.object({
    name: z.string().min(1, "Обязательное поле"),
    phone: z.string().length(16, { message: "Введите номер полностью" }),
    email: z.string().email({ message: "Некорректный email" }),
    position: z.literal("Главный бухгалтер"),
  }),
  responsiblePerson: z.object({
    name: z.string().min(1, "Обязательное поле"),
    phone: z.string().length(16, { message: "Введите номер полностью" }),
    email: z.string().email({ message: "Некорректный email" }),
    position: z.literal("Ответственное лицо"),
  }),
  mainContact: z.object({
    name: z.string().min(1, "Обязательное поле"),
    phone: z.string().length(16, { message: "Введите номер полностью" }),
    email: z.string().email({ message: "Некорректный email" }),
    position: z.string().min(1, "Обязательное поле"),
  }),
  additionalContacts: z.array(
    z.object({
      name: z.string().min(1),
      phone: z.string().length(16),
      email: z.string().email(),
      position: z.string().min(1),
    }),
  ),
});

export const schemaContacts = z.object({
  contacts: z.array(
    z.object({
      name: z.string().min(1, "Обязательное поле"),
      phone: z.string().length(16, { message: "Введите номер полностью" }),
      email: z.string().email({ message: "Некорректный email" }),
      position: z.string().min(1, "Обязательное поле"),
    }),
  ),
});
