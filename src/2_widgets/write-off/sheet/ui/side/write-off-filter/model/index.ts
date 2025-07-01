import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { writeOffFilterSchema } from "../config/schema";

export const useForm = (defaultValues?: any) => {
  return useReactHookForm({
    resolver: zodResolver(writeOffFilterSchema),
    defaultValues: {
      includeHouseholdGoods: false,
      article: [],
      ...defaultValues,
    },
  });
};
