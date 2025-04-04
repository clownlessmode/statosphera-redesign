import { Button } from "@shared/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Form, FormItem, FormLabel } from "@shared/ui/form";

import { Eraser } from "lucide-react";

import { FC } from "react";
import { useForm } from "react-hook-form";

const Unique: FC = () => {
  const form = useForm();
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Уникальные значения</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Группируйте данные по нужным столбцам
          </CardDescription>
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
            <FormItem>
              <FormLabel htmlFor="">Канал</FormLabel>
              <div className="flex flex-row gap-2">
                <Button>В аренду</Button>
                <Button>Инвестиционная</Button>
                <Button>ФРС</Button>
              </div>
            </FormItem>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Unique;
