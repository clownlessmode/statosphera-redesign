import { z } from "zod";
import { schema, schemaContacts } from "./schema";

export type FormValues = z.infer<typeof schema>;

export type ContactsValues = z.infer<typeof schemaContacts>;
