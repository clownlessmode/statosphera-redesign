import { z } from "zod";
import { STORE_CHANNEL, STORE_STATUS } from "@entities/store/config";

export const editStoreSchema = z.object({
  storeCondition: z.nativeEnum(STORE_STATUS),
  channel: z.nativeEnum(STORE_CHANNEL),
});
