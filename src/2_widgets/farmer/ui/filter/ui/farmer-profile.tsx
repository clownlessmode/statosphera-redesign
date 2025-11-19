import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import useForm from "../model/hook";
//import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import { Input } from "@shared/ui/input";
import { PhoneInput } from "@shared/ui/phone-input";
import { Textarea } from "@shared/ui/textarea";
import { DateInput } from "@shared/ui/date-input";
import { Button } from "@shared/ui/button";
import { Upload, User } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@shared/ui/label";
import { AddressInput } from "@shared/ui/adress-input";

export default function FarmerProfile() {
  //const { updateFilters, getApiPayload } = useFiltersStore();
  const form = useForm();
  console.log(form.getValues());
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Профиль</CardTitle>
        <CardDescription>
          Создайте профиль фермера для вашей компании
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-row gap-2 justify-center">
          <Form {...form}>
            <div className="flex flex-col gap-4 w-full">
              <FormField
                name="organizationName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название организации</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите название организации"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер телефона</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        unmask={false}
                        mask="+{7}-000-000-00-00"
                        onValueChange={(value) => {
                          console.log(form.getValues());
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите email"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="inn"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ИНН</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите ИНН"
                        className="bg-background"
                        {...field}
                        onChange={(e) => {
                          if (e.target.value.length > 12) {
                            return;
                          }
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="legalAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Юридический адрес</FormLabel>
                    <FormControl>
                      <AddressInput
                        placeholder="Введите юридический адрес"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="workshopAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес цеха</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите адрес цеха"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="periodDeclar"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата окончания действия декларации</FormLabel>
                    <FormControl>
                      <DateInput
                        placeholder="Введите срок действия декларации"
                        className="bg-background"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="startDateCooper"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата начала сотрудничества</FormLabel>
                    <FormControl>
                      <DateInput
                        placeholder="Введите дату начала сотрудничества"
                        className="bg-background"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="dateFirstDelivery"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата первой доставки</FormLabel>
                    <FormControl>
                      <DateInput
                        placeholder="Введите дату первой доставки"
                        className="bg-background"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="personalization"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Персонализация</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите персонализацию"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="companyHistory"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>История компании</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Введите историю компании"
                        {...field}
                        className="!bg-background"
                        rows={2}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full">Сохранить</Button>
            </div>
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem className="space-y-2 h-full w-max">
                  <FormLabel>Фото</FormLabel>
                  <Card
                    style={{
                      backgroundImage: `url(${
                        field.value?.[0]
                          ? URL.createObjectURL(field.value?.[0])
                          : "/farmer/photo.png"
                      })`,
                    }}
                    className="size-[300px] aspect-square bg-background bg-no-repeat bg-center bg-cover relative"
                  >
                    {!field.value?.[0] && (
                      <User className="absolute inset-0 size-full p-12 text-muted-foreground" />
                    )}
                  </Card>
                  <FormControl>
                    <div className="flex flex-col items-center gap-2">
                      <Label
                        htmlFor="photo-upload"
                        className="flex items-center w-full gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-background"
                      >
                        <Upload className="h-4 w-4" />
                        Выбрать фото
                      </Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        className="hidden"
                        onChange={(event) => {
                          if (
                            event.target.files?.[0]?.size &&
                            event.target.files?.[0]?.size > 10 * 1024 * 1024
                          ) {
                            toast.error("Файл слишком большой (максимум 10MB)");
                            return;
                          }
                          if (
                            event.target.files?.[0]?.type &&
                            !["image/jpeg", "image/png", "image/webp"].includes(
                              event.target.files?.[0]?.type,
                            )
                          ) {
                            toast.error("Неверный формат файла");
                            return;
                          }
                          field.onChange(event.target.files);
                        }}
                      />
                      {field.value?.[0] && (
                        <span className="text-sm text-muted-foreground">
                          {field.value?.[0]?.name}
                        </span>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}
