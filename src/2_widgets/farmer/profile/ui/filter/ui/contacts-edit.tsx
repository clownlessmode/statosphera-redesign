import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Form, FormField, FormMessage } from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { PhoneInput } from "@shared/ui/phone-input";
import { useContactsEdit } from "../model/hook";
import { useContactsStore } from "@widgets/farmer/profile/model/profile-store";
import { Button } from "@shared/ui/button";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Label } from "@shared/ui/label";
import { toast } from "sonner";
import { FarmersResponse } from "@pages/farmers/config";

const ContactsEdit: FC<{
  contacts: FarmersResponse["kmContacts"];
}> = ({ contacts }) => {
  const form = useContactsEdit();
  const { updateContacts } = useContactsStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (contacts) {
      form.setValue("contacts", contacts);
      updateContacts("contacts", contacts);
    }
  }, [contacts]);

  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

  const validation =
    name.trim() &&
    phone.length >= 16 &&
    emailRegex.test(email) &&
    position.trim();

  return (
    <Card className="max-md:max-h-[calc(100vh-256px)] max-md:overflow-y-auto scrollbar-hide">
      <CardHeader>
        <CardTitle>Редактировать контакты КМ</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <span className="col-span-2 text-sm leading-none font-medium select-none">
              Дополнительные контакты
            </span>
            <FormField
              name="contacts"
              control={form.control}
              render={({ field }) => {
                const handleAdd = () => {
                  const currentValues = field.value || [];
                  if (validation) {
                    const newContact = { name, phone, email, position };
                    const newValues = [...currentValues, newContact];

                    field.onChange(newValues);
                    updateContacts("contacts", newValues);

                    setName("");
                    setPhone("");
                    setEmail("");
                    setPosition("");
                  } else {
                    toast.error("Заполните все поля корректно");
                  }
                };

                const handleRemove = (index: number) => {
                  const currentValues = field.value || [];
                  const newValues = currentValues.filter((_, i) => i !== index);
                  field.onChange(newValues);
                  updateContacts("contacts", newValues);
                };

                return (
                  <div className="col-span-2 flex flex-col gap-4">
                    {/* Форма добавления */}
                    <div className="grid grid-cols-2 gap-2 max-md:flex max-md:flex-col">
                      <div className="space-y-1">
                        <Label
                          htmlFor="name-AdditionalContact"
                          className="text-xs text-muted-foreground"
                        >
                          ФИО
                        </Label>
                        <Input
                          id="name-AdditionalContact"
                          name="name-AdditionalContact"
                          value={name}
                          onChange={(e) =>
                            setName(
                              e.target.value.replace(/[^а-яА-ЯёЁ\s-]/g, ""),
                            )
                          }
                          placeholder="ФИО"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="phone-AdditionalContact"
                          className="text-xs text-muted-foreground"
                        >
                          Телефон
                        </Label>
                        <PhoneInput
                          id="phone-AdditionalContact"
                          name="phone-AdditionalContact"
                          unmask={false}
                          value={phone}
                          onValueChange={setPhone}
                          mask="+{7}-000-000-00-00"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="email-AdditionalContact"
                          className="text-xs text-muted-foreground"
                        >
                          Email
                        </Label>
                        <Input
                          id="email-AdditionalContact"
                          name="email-AdditionalContact"
                          value={email}
                          onChange={(e) => setEmail(e.target.value.trim())}
                          placeholder="Email"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="position-AdditionalContact"
                          className="text-xs text-muted-foreground"
                        >
                          Должность
                        </Label>
                        <Input
                          id="position-AdditionalContact"
                          name="position-AdditionalContact"
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
                      {(field.value || []).map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-background gap-2 py-1.5 px-3 rounded-md border text-sm"
                        >
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full mr-2">
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactsEdit;
