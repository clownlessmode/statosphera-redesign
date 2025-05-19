// schema.ts
import { z } from "zod";

export const schema = z.object({
  company: z.string().min(2),
  department: z.string().min(2),
  fullName: z.string().min(2),

  // Общие впечатления
  liked: z.string().min(2),
  questions: z.string().min(2),

  // Содержание
  commentsUseful: z.string().min(2),
  contentClarity: z.string().min(2),

  // Оформление и предложения
  designFeedback: z.string().min(2),
  futureContent: z.string().min(2),
  otherSuggestions: z.string().optional(),
});
