import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { PhoneInput } from "@shared/ui/phone-input";
import { Textarea } from "@shared/ui/textarea";
import { Header } from "@widgets/header";
import { Upload, User } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

const farmerSchema = z.object({
  photo: z.string().min(1),
  organizationName: z.string().min(1),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Неверный формат номера телефона")
    .refine(
      (value) => !value.includes("_"),
      "Номер телефона должен быть заполнен полностью",
    ),
  email: z.string().email(),
  inn: z.string().min(1),
  legalAddress: z.string().min(1),
  workshopAddress: z.string().min(1),
  periodDeclar: z.string().min(1),
  startDateCooper: z.string().min(1),
  dateFirstDelivery: z.string().min(1),
  personalization: z.string().min(1),
  companyHistory: z.string().min(1),
});

const Farmer: FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const photoUrl = photo ? URL.createObjectURL(photo) : "/farmer/photo.png";
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPhoto(selectedFile);
    }
  };

  const form = useForm<z.infer<typeof farmerSchema>>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      photo: "",
      organizationName: "",
      phoneNumber: "",
      email: "",
      inn: "",
      legalAddress: "",
      workshopAddress: "",
      periodDeclar: "",
      startDateCooper: "",
      dateFirstDelivery: "",
      personalization: "",
      companyHistory: "",
    },
  });

  return (
    <div className="bg-muted h-full w-full p-2 flex flex-col gap-2">
      <Header title="Фермер" />
      <div className="rounded-3xl bg-background flex flex-col h-full gap-4 max-md:gap-2 max-md:pb-4 max-md:*:px-4 max-md:*:first:px-0 max-md:*:last:px-0 md:p-4">
        <Card>
          <CardHeader>
            <CardTitle>Профиль</CardTitle>
            <CardDescription>
              Создайте профиль фермера для вашей компании
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-row gap-4">
              <Form {...form}>
                <div className="grid grid-cols-2 gap-4 w-full">
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
                        <FormMessage />
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
                            onValueChange={(value) => {
                              console.log(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
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
                        <FormMessage />
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
                          />
                        </FormControl>
                        <FormMessage />
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
                          <Input
                            placeholder="Введите юридический адрес"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="periodDeclar"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Срок действия декларации</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите срок действия декларации"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                          <Input
                            placeholder="Введите дату начала сотрудничества"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                          <Input
                            placeholder="Введите дату первой доставки"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="companyHistory"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>История компании</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Введите историю компании"
                            {...field}
                            className="!bg-background"
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 w-max">
                  <FormLabel>Фото</FormLabel>
                  <Card
                    style={{
                      backgroundImage: `url(${photoUrl})`,
                    }}
                    className="size-[300px] aspect-square bg-background bg-no-repeat bg-center bg-cover relative"
                  >
                    {!photo && (
                      <User className="absolute inset-0 size-full text-muted-foreground" />
                    )}
                  </Card>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center  w-full gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-background"
                    >
                      <Upload className="h-4 w-4" />
                      Выбрать фото
                    </label>
                    {photo && (
                      <span className="text-sm text-muted-foreground">
                        {photo.name}
                      </span>
                    )}
                  </div>
                </div>
              </Form>
            </form>
            <Button className="w-full mt-4">Сохранить</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Farmer;
