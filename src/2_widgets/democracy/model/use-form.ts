import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { ideaSchema, IdeaFormValues, defaultValues } from "../config";

export const useIdeaForm = () => {
  const form = useReactHookForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues,
    mode: "all",
  });

  return form;
};
