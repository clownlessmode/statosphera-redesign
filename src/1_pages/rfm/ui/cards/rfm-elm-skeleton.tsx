import { Card, CardContent, CardHeader } from "@shared/ui/card";
import { FC } from "react";
import { Skeleton } from "@shared/ui/skeleton";

export const RfmElmSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <div className="flex flex-row">
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="w-[360px] h-[40px] bg-muted-foreground rounded-md" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-8 pt-2 w-full">
        <div className="grid grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-2">
            Основная информация
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md font-semibold">Клиенты</span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md font-semibold">Выручка</span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md font-semibold">Средний чек</span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <div className="flex flex-row items-center">
              <span className="text-md font-semibold">В опасной зоне</span>
            </div>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-2">
            Клиентская база
          </span>
          <div className="flex flex-col my-2">
            <div className="flex flex-row items-center">
              <span className="text-md text-muted-foreground font-semibold">
                Кол-во чеков клиента
              </span>
            </div>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <div className="flex flex-row items-center">
              <span className="text-md text-muted-foreground font-semibold">
                Кол-во магазинов
              </span>
            </div>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Возраст клиентов
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Время жизни аккаунта
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Период между покупками
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Пол
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-lg text-primary/90 font-bold col-span-3">
            Интернет магазин
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Способ заказа
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Способ доставки
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-lg text-primary/90 font-bold col-span-3">
            Ночные магазины
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Прибыль
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-2">
            Продажи и акции
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Популярная группа
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный бонус
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-lg text-primary/90 font-bold col-span-3">
            Микромаркеты
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Клиенты
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Выручка
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Прибыль
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-lg text-primary/90 font-bold col-span-2">
            География и время
          </span>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный регион
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный город
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Популярный магазин
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              Время покупок
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
          <div className="flex flex-col my-2">
            <span className="text-md text-muted-foreground font-semibold">
              День недели
            </span>
            <Skeleton className="w-[100px] h-[35px] bg-muted-foreground rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
