import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";

import { editStoreSchema } from "../config/schema";
import { z } from "zod";

export type StoreFormValues = z.infer<typeof editStoreSchema>;

export const useEditStoreForm = () => {
  return useHookForm<StoreFormValues>({
    resolver: zodResolver(editStoreSchema),
    mode: "all",
  });
};
