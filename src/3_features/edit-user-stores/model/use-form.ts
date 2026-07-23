import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { z } from "zod";

import { editUserStoresSchema } from "../config/schema";

export type UserStoresFormValues = z.infer<typeof editUserStoresSchema>;

export const useEditUserStoresForm = () => {
  return useHookForm<UserStoresFormValues>({
    resolver: zodResolver(editUserStoresSchema),
    defaultValues: {
      id_store: [],
    },
    mode: "all",
  });
};
