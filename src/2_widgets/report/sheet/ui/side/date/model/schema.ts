// schema.ts
import { z } from "zod";

export const schema = z
  .object({
    dateStart: z
      .string()
      .min(1, { message: "Дата начала обязательна" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Неверный формат даты. Используйте YYYY-MM-DD",
      }),

    dateEnd: z
      .string()
      .min(1, { message: "Дата окончания обязательна" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Неверный формат даты. Используйте YYYY-MM-DD",
      }),

    timeStart: z
      .string()
      .regex(/^$|^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message:
          "Неверный формат времени. Используйте HH:MM или оставьте пустым",
      })
      .optional(),

    timeEnd: z
      .string()
      .regex(/^$|^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message:
          "Неверный формат времени. Используйте HH:MM или оставьте пустым",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.dateStart && data.dateEnd) {
        return new Date(data.dateStart) <= new Date(data.dateEnd);
      }
      return true;
    },
    { message: "Дата начала должна быть раньше или равна дате окончания" }
  );
