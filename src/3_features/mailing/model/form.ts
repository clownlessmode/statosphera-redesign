import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { addChannelSchema, updateChannelSchema } from "../config/schema";
import { defaultValues } from "../config/default";
import { AddChannelFormValues, UpdateChannelFormValues } from "../config/types";

export const useAddChannelForm = () => {
  const form = useHookForm<AddChannelFormValues>({
    resolver: zodResolver(addChannelSchema),
    defaultValues: defaultValues,
    mode: "all",
  });

  return form;
};

export const useUpdateChannelForm = () => {
  const form = useHookForm<UpdateChannelFormValues>({
    resolver: zodResolver(updateChannelSchema),
    defaultValues: defaultValues,
    mode: "all",
  });

  return form;
};
