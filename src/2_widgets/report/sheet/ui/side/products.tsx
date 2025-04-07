import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";

import { Eraser } from "lucide-react";

import { FC } from "react";
import { useForm } from "react-hook-form";

const Products: FC = () => {
  const form = useForm();

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Продукты</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по продуктам</CardDescription>
          <Button
            size={"sm"}
            className="text-muted-foreground"
            variant={"outline"}
          >
            Очистить фильтры <Eraser className="text-primary/80" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="structura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структура продаж</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите структуру продаж"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="structura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Структурное подразделение</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите структурное подразделение"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Команда</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите команду"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="road"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Направление</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите направление"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="book"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Справочник экономиста</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите справочник экономиста"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="automanager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Менеджер автозаказа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите менеджера автозаказа"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Поставщик</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите поставщика"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="typeProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип продукта</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите тип продукта"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сезонность</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите сезонность"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Группа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите группу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subgroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите подгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subsubgroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подподгруппа</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите подподгруппу"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nomenklatura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номенклатура</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите номенклатуру"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Products;
