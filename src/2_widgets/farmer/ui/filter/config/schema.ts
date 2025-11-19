// schema.ts
import { z } from "zod";
import { isValid, parse } from "date-fns";
import isValidInn from "@shared/lib/check-inn";

export const schema = z.object({
  photo: z
    .any()
    .refine((files) => files?.length === 1, "Фотография обязательна.")
    .refine(
      (files) => files?.[0]?.size <= 10 * 1024 * 1024,
      `Максимальный размер файла - 10 МБ.`,
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type,
        ),
      "Поддерживаются только .jpg, .jpeg, .png и .webp форматы.",
    ),
  organizationName: z.string().min(2, {
    message: "Название организации должно содержать минимум 2 символа",
  }),
  phoneNumber: z
    .string()
    .length(16, { message: "Некорректный номера телефона" }),
  email: z.string().email({ message: "Некорректный email" }),
  inn: z.array(z.string()).refine((inn) => inn.every((i) => isValidInn(i)), {
    message: "Некорректный ИНН",
  }),
  legalAddress: z.string().min(2),
  workshopAddress: z.string().min(2),
  periodDeclar: z
    .string()
    .min(10, "Введите полную дату")
    .refine((val) => isValid(parse(val, "dd.MM.yyyy", new Date())), {
      message: "Некорректная дата",
    }),
  startDateCooper: z
    .string()
    .min(10, "Введите полную дату")
    .refine((val) => isValid(parse(val, "dd.MM.yyyy", new Date())), {
      message: "Некорректная дата",
    }),
  dateFirstDelivery: z
    .string()
    .min(10, "Введите полную дату")
    .refine((val) => isValid(parse(val, "dd.MM.yyyy", new Date())), {
      message: "Некорректная дата",
    }),
  personalization: z.string().min(2),
  companyHistory: z.string().min(2),
});
