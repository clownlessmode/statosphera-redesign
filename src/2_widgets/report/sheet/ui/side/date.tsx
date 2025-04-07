import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@shared/ui/form";

import {
  BarChart3,
  CalendarIcon,
  CalendarRange,
  Eraser,
  Flag,
  History,
  Sun,
  Sunrise,
  Sunset,
  Undo,
} from "lucide-react";

import { FC } from "react";
import { useForm } from "react-hook-form";
import DateRangePicker from "../../../../../5_shared/ui/date-range-picker";
import { TimePicker } from "@shared/ui/time-picker";

const DateFilter: FC = () => {
  const form = useForm({
    defaultValues: {
      end: new Date(),
    },
  });
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Дата</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по дате и времени</CardDescription>
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
          <form
            className="flex flex-col gap-4 w-full"
            // onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Промежуток даты</FormLabel>
                  <DateRangePicker {...field} className="w-full" />
                </FormItem>
              )}
            />
            <div className="w-full grid grid-cols-3 gap-2">
              <Button>
                <CalendarRange className="h-4 w-4" /> Полгода
              </Button>
              <Button>
                <Flag className="h-4 w-4" /> Начало года
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4" /> Текущий квартал
              </Button>
              <Button>
                <CalendarIcon className="h-4 w-4" /> Текущий месяц
              </Button>
              <Button>
                <Undo className="h-4 w-4" /> Прошлая неделя
              </Button>
              <Button>
                <History className="h-4 w-4" /> Прошлый месяц
              </Button>
            </div>
            <div className="flex flex-row gap-1 items-end w-full">
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="mt-4 w-full">
                    <FormLabel htmlFor={field.name}>
                      Промежуток времени
                    </FormLabel>
                    <TimePicker {...field} className="w-full" />
                  </FormItem>
                )}
              />
              <p className="pb-2 font-light text-muted-foreground">––––</p>
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="mt-4 w-full">
                    <FormLabel htmlFor={field.name} className="opacity-0">
                      Промежуток времени
                    </FormLabel>
                    <TimePicker {...field} className="w-full" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              <Button>
                Утро <Sunrise />
              </Button>
              <Button>
                День <Sun />
              </Button>
              <Button>
                Вечер <Sunset />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DateFilter;
