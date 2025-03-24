import { Button } from "@shared/ui/button";
import { DialogFooter } from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { FC } from "react";
import { FormValues } from "../model/error-form/types";
import useForm from "../model/error-form/hook";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { ROUTES } from "@app/router/routes";
import { RouteConfig } from "@app/router/types";
import {
  ButtonGroup,
  ButtonGroupItem,
  RadioGroup,
  RadioGroupItem,
} from "@shared/ui/radio-group";
import { FrownIcon, Meh, MehIcon, SmileIcon } from "lucide-react";

const importance = [
  {
    text: "Минимальная",
    icon: <MehIcon className="size-6" />,
    value: "Минимальная",
  },
  {
    text: "Низкая",
    icon: <FrownIcon className="size-6" />,
    value: "Низкая",
  },
  {
    text: "Средняя",
    icon: <FrownIcon className="size-6" />,
    value: "Средняя",
  },
  {
    text: "Высокая",
    icon: <FrownIcon className="size-6" />,
    value: "Высокая",
  },
  {
    text: "Критическая",
    icon: <FrownIcon className="size-6" />,
    value: "Критическая",
  },
];

const ErrorForm: FC = () => {
  const form = useForm();
  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Раздел</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Выберите раздел"
                      className="w-full"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(
                    ROUTES.reduce<Record<string, RouteConfig[]>>(
                      (groups, route) => {
                        const groupName = route.group || "Другое";
                        if (!groups[groupName]) {
                          groups[groupName] = [];
                        }
                        groups[groupName].push(route);
                        return groups;
                      },
                      {}
                    )
                  ).map(([groupName, routes]) => (
                    <SelectGroup key={groupName}>
                      <SelectLabel>{groupName}</SelectLabel>
                      {routes.map((route) => (
                        <SelectItem key={route.path} value={route.path}>
                          {route.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Важность ошибки</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row  justify-between w-full"
                >
                  <FormItem className="flex items-center justufy-center flex-col text-center w-full">
                    <FormControl className="w-full">
                      <ButtonGroup
                        defaultValue="neutral"
                        className="w-full flex flex-wrap justify-center gap-full"
                      >
                        {importance.map((item) => (
                          <ButtonGroupItem
                            className={
                              "text-[8px] p-2 w-full  max-w-[85px]! min-w-[80px]!"
                            }
                            value={item.value}
                            icon={item.icon}
                            label={item.text}
                          />
                        ))}
                      </ButtonGroup>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage />
        <DialogFooter>
          <Button className="w-full" disabled={!form.formState.isValid}>
            Отправить
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ErrorForm;
