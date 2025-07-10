import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@shared/ui/form";
import { Receipt, BarChart3 } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "../model";
import {
  HOUSEHOLD_GOODS_FILTER,
  WRITE_OFF_ARTICLES,
  ARTICLE_WRITE_OFF,
} from "../config/constants";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { useTabStore } from "@widgets/write-off/sheet/model/url-store";
import { ClearFilters } from "@features/clear-filters";

export const WriteOffFilter: FC = () => {
  const form = useForm();
  const { updateWriteoffFilter, filters } = useFiltersStore();
  const { tab } = useTabStore();

  // Синхронизация формы с zustand store при маунте/открытии
  useEffect(() => {
    form.setValue("article", filters.writeoff.article);
    form.setValue("includeHouseholdGoods", filters.writeoff.household);
  }, [form, filters.writeoff.article, filters.writeoff.household]);

  // Получаем значение фильтра хозяйственных товаров
  const includeHouseholdGoods = form.watch("includeHouseholdGoods");

  // Создаем опции статей с учетом активности кнопки хозяйственных товаров
  const articlesWithDisabled = WRITE_OFF_ARTICLES.map((option) => ({
    ...option,
    disabled:
      option.value === ARTICLE_WRITE_OFF.HOUSEHOLD_GOODS &&
      includeHouseholdGoods === false,
  }));

  // Не показываем фильтр на табе "Списания по поломкам"
  if (tab === "write-off-equip") {
    return null;
  }

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Типы списаний</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>Выберите типы списаний для анализа</CardDescription>
          <ClearFilters form={form} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="includeHouseholdGoods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <BarChart3 className="inline mr-2" />
                    Хозяйственные товары
                  </FormLabel>
                  <FormControl>
                    <BooleanCheckboxCard
                      {...field}
                      options={HOUSEHOLD_GOODS_FILTER}
                      className="grid-cols-2"
                      onChange={(value) => {
                        field.onChange(value);

                        updateWriteoffFilter("household", value);

                        // Если выбрано "Нет", убираем хозяйственные товары из выбранных статей
                        if (value === false) {
                          const currentArticles = form.getValues("article");
                          const filteredArticles = currentArticles.filter(
                            (article: ARTICLE_WRITE_OFF) =>
                              article !== ARTICLE_WRITE_OFF.HOUSEHOLD_GOODS,
                          );
                          form.setValue("article", filteredArticles);
                          updateWriteoffFilter("article", filteredArticles);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="article"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <Receipt className="inline mr-2" />
                      Причины списания
                    </FormLabel>
                    <CheckboxCards
                      {...field}
                      onChange={(values) => {
                        field.onChange(values);

                        updateWriteoffFilter(
                          "article",
                          values as ARTICLE_WRITE_OFF[],
                        );
                      }}
                      options={articlesWithDisabled}
                      className="grid-cols-1"
                    />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
