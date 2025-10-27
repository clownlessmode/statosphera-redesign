import { z } from "zod";
import { schema, schemaComparision } from "./schema";

export type FormValues = z.infer<typeof schema>;
export type FormComparisionValues = z.infer<typeof schemaComparision>;
