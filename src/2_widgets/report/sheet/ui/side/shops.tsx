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
  FormItem,
  FormLabel,
  FormControl,
} from "@shared/ui/form";
import { MultiSelect } from "@shared/ui/multiselect";

import {
  BarChart3,
  Cat,
  Dog,
  Eraser,
  Fish,
  KeySquare,
  Lock,
  LockOpen,
  Rabbit,
  ShoppingBag,
  Turtle,
} from "lucide-react";
const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
    icon: Dog,
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    icon: Cat,
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    icon: Turtle,
  },
  {
    value: "remix",
    label: "Remix",
    icon: Rabbit,
  },
  {
    value: "astro",
    label: "Astro",
    icon: Fish,
  },
];
import { FC } from "react";
import { useForm } from "react-hook-form";

const Shops: FC = () => {
  const form = useForm();
  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Магазины</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Фильтруйте данные по магазинам</CardDescription>
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
              <div className="flex flex-row gap-2 ">
                <Button className="w-full">
                  <KeySquare /> В аренду
                </Button>
                <Button className="w-full">
                  <BarChart3 />
                  Инвестиционная
                </Button>
                <Button className="w-full">
                  <ShoppingBag />
                  ФРС
                </Button>
              </div>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="">Статус</FormLabel>
              <div className="flex flex-row gap-2 ">
                <Button className="w-full">
                  <LockOpen /> Открытый
                </Button>
                <Button className="w-full">
                  <Lock />
                  Закрытый
                </Button>
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="frameworks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Партнеры</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={frameworksList}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Выберите партнеров"
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

export default Shops;
