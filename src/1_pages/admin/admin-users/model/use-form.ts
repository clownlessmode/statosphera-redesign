import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { NONE } from "../config/constants";
import { adminUsersFiltersSchema } from "../config/schema";

export type AdminUsersFilterFields = z.infer<typeof adminUsersFiltersSchema>;

export const INITIAL_ADMIN_USERS_FILTERS: AdminUsersFilterFields = {
  full_name: "",
  email: "",
  phone_number: "",
  locked: NONE,
  id_role: NONE,
  has_stores: NONE,
};

export const useAdminUsersFiltersForm = () => {
  return useForm<AdminUsersFilterFields>({
    resolver: zodResolver(adminUsersFiltersSchema),
    defaultValues: INITIAL_ADMIN_USERS_FILTERS,
    mode: "all",
  });
};
