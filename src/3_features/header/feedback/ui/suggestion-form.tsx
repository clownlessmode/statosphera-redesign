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
import { FormValues } from "../model/suggestion-form/types";
import useForm from "../model/suggestion-form/hook";

import { ROUTES } from "@app/router/routes";
import {
  ButtonGroup,
  ButtonGroupItem,
  RadioGroup,
} from "@shared/ui/radio-group";
import { Angry, Annoyed, Frown, Meh, ServerCrash } from "lucide-react";
import { Textarea } from "@shared/ui/textarea";
import MultipleSelector from "@shared/ui/multiple-selector";

const importance = [
  {
    text: "Минимальное",
    icon: <Meh />,
    value: "Минимальная",
  },
  {
    text: "Низкое",
    icon: <Annoyed />,
    value: "Низкая",
  },
  {
    text: "Среднее",
    icon: <Frown />,
    value: "Средняя",
  },
  {
    text: "Высокое",
    icon: <Angry />,
    value: "Высокая",
  },
  {
    text: "Критическое",
    icon: <ServerCrash />,
    value: "Критическая",
  },
];

const SuggestionForm: FC = () => {
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
              <FormControl>
                <MultipleSelector
                  value={
                    field.value
                      ? [{ label: field.value, value: field.value }]
                      : []
                  }
                  onChange={(options) => {
                    // Если выбран хотя бы один элемент, берем значение первого
                    if (options.length > 0) {
                      field.onChange(options[0].value);
                    } else {
                      field.onChange(undefined);
                    }
                  }}
                  defaultOptions={ROUTES.map((route) => ({
                    label: route.label || "",
                    value: route.label || "",
                  }))}
                  placeholder="Выберите раздел"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Ничего не найдено
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Важность предложения</FormLabel>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите проблему"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
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

export default SuggestionForm;
