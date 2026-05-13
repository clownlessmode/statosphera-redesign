import { z } from "zod";
import { addChannelSchema, updateChannelSchema } from "./schema";

export type AddChannelFormValues = z.infer<typeof addChannelSchema>;
export type UpdateChannelFormValues = z.infer<typeof updateChannelSchema>;
