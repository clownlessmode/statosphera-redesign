import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { Product } from "../ui/edit-product";

const useForm = (product: Product) => {
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ppProducts: product.ppProducts || defaultValues.ppProducts,
      isIm: product.isIm || defaultValues.isIm,
    },
    mode: "all",
  });

  return form;
};

export default useForm;
