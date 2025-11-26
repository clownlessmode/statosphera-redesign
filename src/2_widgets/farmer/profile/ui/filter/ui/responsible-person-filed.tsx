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

interface ResponsiblePersonFieldsProps {
  control: Control<any>;
}

export const ResponsiblePersonFields: FC<ResponsiblePersonFieldsProps> = ({
  control,
}) => {
  const { updateFilters } = useFarmerProfileStore();
  const { getValues } = useFormContext();

  return (
    <div className="grid grid-cols-3 gap-2 items-start">
      <span className="col-span-3 text-sm flex gap-0.5 leading-none font-medium select-none">
        Ответственное лицо<span className="text-destructive">*</span>
      </span>
      <FormField
        name="responsiblePerson.name"
        control={control}
        render={({ field }) => (
          <FormItem>
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
                  updateFilters("responsiblePerson", {
                    ...getValues("responsiblePerson"),
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
        name="responsiblePerson.phone"
        control={control}
        render={({ field }) => (
          <FormItem>
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
                  updateFilters("responsiblePerson", {
                    ...getValues("responsiblePerson"),
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
        name="responsiblePerson.email"
        control={control}
        render={({ field }) => (
          <FormItem>
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
                  updateFilters("responsiblePerson", {
                    ...getValues("responsiblePerson"),
                    email: e.target.value.trim(),
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
