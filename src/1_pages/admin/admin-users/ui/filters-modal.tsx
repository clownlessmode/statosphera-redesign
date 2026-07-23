import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import { ClearFilters } from "@features/clear-filters";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { cn } from "@shared/lib/utils";

import { NONE, USER_ROLE_OPTIONS } from "../config/constants";
import { AdminUsersFilterFields } from "../model/use-form";
import { useAdminUsersFiltersStore } from "../model/filters-store";
import { useAdminUsersFiltersForm } from "../model/use-form";

export const FiltersModal = () => {
  const form = useAdminUsersFiltersForm();
  const [open, setOpen] = useState(false);

  const filters = useAdminUsersFiltersStore((state) => state.filters);
  const setFilters = useAdminUsersFiltersStore((state) => state.setFilters);

  const filtersCount = useMemo(() => {
    return Object.values(filters).filter(
      (value) =>
        typeof value === "string" && value.trim() !== "" && value !== NONE,
    ).length;
  }, [filters]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      form.reset(filters, { keepDefaultValues: true });
    }
  };

  const handleSubmit = (values: AdminUsersFilterFields) => {
    setFilters(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="size-4" />
          Фильтры
          {filtersCount > 0 ? (
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-medium",
                filtersCount &&
                  "bg-primary-foreground/20 text-primary-foreground",
              )}
            >
              {filtersCount}
            </span>
          ) : null}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-md:h-[calc(100vh-128px)] sm:max-w-lg"
        aria-describedby={undefined}
      >
        <Card>
          <CardHeader>
            <CardTitle>Фильтры пользователей</CardTitle>
            <div className="flex flex-row gap-2 justify-between items-center w-full">
              <CardDescription>
                Фильтруйте данные по пользователям
              </CardDescription>
              <ClearFilters form={form} />
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ФИО</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="ФИО"
                          className="bg-background!"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="bg-background!"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Номер телефона"
                          className="bg-background!"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locked"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Статус</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background! w-full">
                            <SelectValue placeholder="Не выбрано" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={NONE}>Не выбрано</SelectItem>
                          <SelectItem value="false">Активные</SelectItem>
                          <SelectItem value="true">Заблокированные</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="id_role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Роль пользователя</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background! w-full">
                            <SelectValue placeholder="Не выбрано" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={NONE}>Не выбрано</SelectItem>
                          {USER_ROLE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="has_stores"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Магазины</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background! w-full">
                            <SelectValue placeholder="Не выбрано" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={NONE}>Не выбрано</SelectItem>
                          <SelectItem value="true">Прикреплены</SelectItem>
                          <SelectItem value="false">Не прикреплены</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
        </Card>
        <Button onClick={form.handleSubmit(handleSubmit)}>Сохранить</Button>
      </DialogContent>
    </Dialog>
  );
};
