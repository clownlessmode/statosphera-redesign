import { FC, useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { PhoneInput } from "@shared/ui/phone-input";
import { Label } from "@shared/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FormField, FormMessage } from "@shared/ui/form";
import { useFarmerProfileStore } from "@widgets/farmer/profile/model/profile-store";

interface AdditionalContactsFieldProps {
  control: Control<any>;
}

export const AdditionalContactsField: FC<AdditionalContactsFieldProps> = ({
  control,
}) => {
  const { updateFilters } = useFarmerProfileStore();

  // Локальное состояние для формы добавления нового контакта
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

  const validation =
    name.trim() &&
    phone.length >= 16 &&
    emailRegex.test(email) &&
    position.trim();

  return (
    <div className="grid grid-cols-2 gap-2 items-start">
      <span className="col-span-2 text-sm leading-none font-medium select-none">
        Дополнительные контакты
      </span>
      <FormField
        name="additionalContacts"
        control={control}
        render={({ field }) => {
          const handleAdd = () => {
            const currentValues = field.value || [];
            if (validation) {
              const newContact = { name, phone, email, position };
              const newValues = [...currentValues, newContact];

              // Обновляем форму и стор
              field.onChange(newValues);
              updateFilters("additionalContacts", newValues as any);

              // Сбрасываем поля
              setName("");
              setPhone("");
              setEmail("");
              setPosition("");
            } else {
              toast.error("Заполните все поля корректно");
            }
          };

          const handleRemove = (index: number) => {
            const newValues = (field.value || []).filter(
              (_: any, i: number) => i !== index,
            );
            field.onChange(newValues);
            updateFilters("additionalContacts", newValues as any);
          };

          return (
            <div className="col-span-2 flex flex-col gap-4">
              {/* Форма добавления */}
              <div className="grid grid-cols-2 gap-2 max-md:flex max-md:flex-col">
                <div className="space-y-1">
                  <Label
                    htmlFor="name-AdditionalСontact"
                    className="text-xs text-muted-foreground"
                  >
                    ФИО
                  </Label>
                  <Input
                    id="name-AdditionalСontact"
                    name="name-AdditionalСontact"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value.replace(/[^а-яА-ЯёЁ\s-]/g, ""))
                    }
                    placeholder="ФИО"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="phone-AdditionalСontact"
                    className="text-xs text-muted-foreground"
                  >
                    Телефон
                  </Label>
                  <PhoneInput
                    id="phone-AdditionalСontact"
                    name="phone-AdditionalСontact"
                    unmask={false}
                    value={phone}
                    onValueChange={setPhone}
                    mask="+{7}-000-000-00-00"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="email-AdditionalСontact"
                    className="text-xs text-muted-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email-AdditionalСontact"
                    name="email-AdditionalСontact"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="Email"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="position-AdditionalСontact"
                    className="text-xs text-muted-foreground"
                  >
                    Должность
                  </Label>
                  <Input
                    id="position-AdditionalСontact"
                    name="position-AdditionalСontact"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Должность"
                    className="bg-background"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAdd}
                  disabled={!validation}
                  className="col-span-2"
                >
                  Добавить контакт
                </Button>
              </div>

              {/* Список контактов */}
              <div className="flex flex-col gap-2">
                {(field.value || []).map((contact: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background gap-2 py-1.5 px-3 rounded-md border text-sm max-md:px-4 max-md:py-2"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full mr-2 max-md:grid-cols-1">
                      <span className="font-medium">{contact.name}</span>
                      <span className="text-muted-foreground">
                        {contact.phone}
                      </span>
                      {contact.email && (
                        <span className="text-xs text-muted-foreground">
                          {contact.email}
                        </span>
                      )}
                      {contact.position && (
                        <span className="text-xs text-muted-foreground">
                          {contact.position}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(index)}
                      className="size-4"
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </div>
          );
        }}
      />
    </div>
  );
};
