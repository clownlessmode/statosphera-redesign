import { z } from "zod";

export const ideaSchema = z.object({
  title: z
    .string()
    .min(1, "Заголовок не может быть пустым")
    .max(100, "Заголовок не должен превышать 100 символов"),
  description: z
    .string()
    .min(1, "Описание не может быть пустым")
    .max(1000, "Описание не должно превышать 1000 символов"),
});

export type IdeaFormValues = z.infer<typeof ideaSchema>;
