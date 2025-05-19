import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../config";

const useForm = () => {
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    mode: "all",
  });

  return form;
};

export default useForm;
