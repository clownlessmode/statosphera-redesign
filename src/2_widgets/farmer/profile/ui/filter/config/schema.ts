// schema.ts
import { z } from "zod";

export const schema = z.object({
  photo: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files.length === 1,
      "Можно загрузить только одну фотографию",
    )
    .refine(
      (files) => files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "Максимальный размер файла - 5 МБ.",
    )
    .refine(
      (files) =>
        files.length === 0 ||
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files[0].type,
        ),
      "Поддерживаются только .jpg, .jpeg, .png и .webp форматы.",
    )
    .optional(),
  organizationName: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  managerName: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  phoneOrganization: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  emailOrganization: z
    .string({ message: "Обязательное поле" })
    .email("Некорректный email"),
  inn: z
    .array(
      z.string({ message: "Обязательное поле" }).min(1, "Обязательное поле"),
    )
    .min(1, "Обязательное поле"),
  kpp: z.array(z.string({ message: "Обязательное поле" })),
  nds: z.string({ message: "Обязательное поле" }).min(1, "Обязательное поле"),
  bankDetails: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  companyHistory: z.string().optional(),
  legalAddress: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  postalAddress: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  workshopAddress: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  ogrn: z.string({ message: "Обязательное поле" }).min(1, "Обязательное поле"),
  okpo: z.string({ message: "Обязательное поле" }).min(1, "Обязательное поле"),
  okved: z.string({ message: "Обязательное поле" }).min(1, "Обязательное поле"),
  declarations: z.array(
    z.object({
      nameDeclaration: z.string(),
      dateEndDeclaration: z.string().nullable(),
    }),
  ),
  startDateOfCooperation: z
    .string()
    .refine((val) => val === "" || val.length === 10, {
      message: "Введите дату полностью",
    })
    .optional(),
  dateOfFirstDelivery: z
    .string()
    .refine((val) => val === "" || val.length === 10, {
      message: "Введите дату полностью",
    })
    .optional(),
  chiefAccountant: z
    .string({ message: "Обязательное поле" })
    .min(1, "Обязательное поле"),
  additionalContacts: z.array(
    z.object({
      name: z.string(),
      phone: z.string(),
      email: z.string(),
      position: z.string(),
    }),
  ),
});

export const schemaContacts = z.object({
  contacts: z.array(
    z.object({
      name: z.string().min(1, "Обязательное поле"),
      phone: z.string().length(16, "Введите номер полностью"),
      email: z.string().email("Некорректный email"),
      position: z.string().min(1, "Обязательное поле"),
    }),
  ),
});
