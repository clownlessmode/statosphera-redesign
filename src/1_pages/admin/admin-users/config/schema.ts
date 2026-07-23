import { z } from "zod";

import { NONE, USER_ROLE_VALUES } from "./constants";

export const adminUsersFiltersSchema = z.object({
  full_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  locked: z.enum([NONE, "true", "false"]),
  id_role: z.enum(USER_ROLE_VALUES),
  has_stores: z.enum([NONE, "true", "false"]),
});
