// types.ts
import { z } from "zod";
import { schema } from "../config/schema";

export type FormValues = z.infer<typeof schema>;
