import { Control, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { PhoneInput } from "@shared/ui/phone-input";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";
import { FC } from "react";

interface MainContactFieldsProps {
  control: Control<any>;
  children?: React.ReactNode;
}

export const MainContactFields: FC<MainContactFieldsProps> = ({
  control,
  children,
}) => {
  const { updateFilters } = useFarmerProfileStore();
  const { getValues } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-2 items-start max-md:flex max-md:flex-col">
      <div className="col-span-2 flex items-center justify-between gap-2 w-full max-xxs:gap-0">
        <span className="text-sm flex gap-0.5 leading-none font-medium select-none">
          <span>
            Основной контакт<span className="text-destructive ml-0.5">*</span>
          </span>
        </span>
        {children}
      </div>
      <FormField
        name="mainContact.name"
        control={control}
        render={({ field }) => (
          <FormItem className="max-md:w-full">
            <FormLabel className="text-xs text-muted-foreground">ФИО</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="Введите ФИО"
                className="bg-background"
                onChange={(e) => {
                  let value = e.target.value.replace(/[^а-яА-ЯёЁ\s-]/g, "");
                  if (value.startsWith(" ")) value = value.trimStart();
                  field.onChange(value);
                }}
                onBlur={(e) => {
                  updateFilters("mainContact", {
                    ...getValues("mainContact"),
                    name: e.target.value.trim(),
                  });
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="mainContact.phone"
        control={control}
        render={({ field }) => (
          <FormItem className="max-md:w-full">
            <FormLabel className="text-xs text-muted-foreground">
              Номер телефона
            </FormLabel>
            <FormControl>
              <PhoneInput
                {...field}
                value={field.value || ""}
                unmask={false}
                mask="+{7}-000-000-00-00"
                onValueChange={(value) => field.onChange(value)}
                onBlur={(e) => {
                  updateFilters("mainContact", {
                    ...getValues("mainContact"),
                    phone: e.target.value,
                  });
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="mainContact.email"
        control={control}
        render={({ field }) => (
          <FormItem className="max-md:w-full">
            <FormLabel className="text-xs text-muted-foreground">
              Email
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="Введите email"
                className="bg-background"
                onChange={(e) => {
                  if (e.target.value.startsWith(" "))
                    e.target.value = e.target.value.trimStart();
                  field.onChange(e.target.value);
                }}
                onBlur={(e) => {
                  updateFilters("mainContact", {
                    ...getValues("mainContact"),
                    email: e.target.value.trim(),
                  });
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="mainContact.position"
        control={control}
        render={({ field }) => (
          <FormItem className="max-md:w-full">
            <FormLabel className="text-xs text-muted-foreground">
              Должность
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="Введите должность"
                className="bg-background"
                onChange={(e) => {
                  if (e.target.value.startsWith(" "))
                    e.target.value = e.target.value.trimStart();
                  field.onChange(e.target.value);
                }}
                onBlur={(e) => {
                  updateFilters("mainContact", {
                    ...getValues("mainContact"),
                    position: e.target.value.trim(),
                  });
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
