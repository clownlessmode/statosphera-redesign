import { cn } from "@shared/lib/utils";
import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Header } from "@widgets/header";
import { Send, Eye } from "lucide-react";
import SingleNotification from "./single-notification";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";
import { useForm } from "react-hook-form";
import { MultiSelect } from "@shared/ui/multiselect";
import { useUsersService } from "@entities/users";
import { useAlertTypeService } from "@entities/alert-type";
import { ALERT_EMOTIONS } from "@entities/alert-emotions";

const stats = [
  {
    title: "Всего отправлено",
    value: 15420,
    icon: Send,
  },
  {
    title: "Прочитано",
    value: 8934,
    icon: Eye,
  },
];
export const AdminNotifications = () => {
  const form = useForm();
  const { users, isUsersLoading } = useUsersService();
  const { alertTypes, isAlertTypesLoading } = useAlertTypeService();
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Уведомления`}
        isAdmin={true}
        actions={{
          left: (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Button variant="outline" className="border-b-0 rounded-b-none">
                Отправка
              </Button>
            </div>
          ),
        }}
      />
      <div
        className={cn(
          "rounded-3xl px-4 py-4 gap-4 h-full flex flex-col flex-1 w-full bg-background",
        )}
      >
        <div className="flex flex-row w-full justify-between gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% с прошлого месяца
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col gap-4">
            <CardContent>
              <Form {...form}>
                <form className="flex flex-col gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="">Пользователь</FormLabel>
                          <MultiSelect
                            options={
                              users?.map((user) => ({
                                label: user.name,
                                value: user.id.toString(),
                              })) || []
                            }
                            isLoading={isUsersLoading}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Выберите пользователя"
                          />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="">Тип уведомления</FormLabel>
                          <MultiSelect
                            options={
                              alertTypes?.map((alertType) => ({
                                label: alertType.name,
                                value: alertType.id.toString(),
                              })) || []
                            }
                            isLoading={isAlertTypesLoading}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Выберите тип уведомления"
                          />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="channel"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="">Пользователь</FormLabel>
                          <MultiSelect
                            options={Object.entries(ALERT_EMOTIONS).map(
                              ([key, value]) => ({
                                label: value,
                                value: key,
                              }),
                            )}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Выберите пользователя"
                          />
                        </FormItem>
                      );
                    }}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
          <SingleNotification />
        </div>
      </div>
    </div>
  );
};
