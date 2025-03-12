// schema.ts
import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Введите корректный адрес электронной почты"),
});
