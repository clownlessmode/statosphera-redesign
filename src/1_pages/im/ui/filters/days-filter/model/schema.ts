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
  })
  .refine(
    (data) => {
      if (data.dateStart && data.dateEnd) {
        return new Date(data.dateStart) <= new Date(data.dateEnd);
      }
      return true;
    },
    { message: "Дата начала должна быть раньше или равна дате окончания" },
  );
