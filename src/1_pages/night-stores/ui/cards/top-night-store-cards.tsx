import { List } from "@shared/ui/list";
import { useSession } from "@entities/session";
import { cn } from "@shared/lib/utils";
import { FC } from "react";

interface TopNightStoreProps {
  data: TopNightStore[];
  isLoading: boolean;
  indicatorValue: string;
}

interface TopNightStore {
  idStore: number;
  store: string;
  [key: string]: string | number;
}

export const TopNightStoreCards: FC<TopNightStoreProps> = ({
  data,
  isLoading,
  indicatorValue,
}) => {
  const { session } = useSession();
  const top = data.slice(0, 5);
  const bottom = data.slice(-5).reverse();

  // Находим индексы магазинов пользователя в списке
  const userStoreIndexes = data
    .map((store, index) =>
      session?.idStore?.includes(store.idStore) ? index : -1,
    )
    .filter((index) => index !== -1);

  // Центрируем магазины пользователя в списке из 5 элементов
  function getCenteredList(
    arr: TopNightStore[],
    userIndexes: number[],
    minTotal = 5,
  ) {
    if (userIndexes.length === 0) return arr.slice(0, minTotal);

    // Ограничиваем количество пользовательских магазинов до minTotal
    const limitedUserIndexes = userIndexes.slice(0, minTotal);
    const userCount = limitedUserIndexes.length;
    const total = minTotal; // Всегда используем minTotal

    // Собираем пользовательские магазины (ограниченные)
    const userStores = limitedUserIndexes.map((i) => arr[i]);
    // Сколько нужно добавить сверху и снизу
    const before = Math.floor((total - userCount) / 2);
    const after = total - userCount - before;
    // Верхние соседи
    let topStart = Math.max(0, limitedUserIndexes[0] - before);
    const topEnd = limitedUserIndexes[0];
    let topNeighbors = arr.slice(topStart, topEnd);
    // Нижние соседи
    const bottomStart = limitedUserIndexes[limitedUserIndexes.length - 1] + 1;
    let bottomEnd = Math.min(arr.length, bottomStart + after);
    let bottomNeighbors = arr.slice(bottomStart, bottomEnd);
    // Если не хватает сверху
    while (topNeighbors.length < before && bottomEnd < arr.length) {
      bottomNeighbors = arr.slice(bottomStart, ++bottomEnd);
    }
    // Если не хватает снизу
    while (bottomNeighbors.length < after && topStart > 0) {
      topNeighbors = arr.slice(--topStart, topEnd);
    }
    // Собираем итоговый список и обрезаем до minTotal для гарантии
    const result = [...topNeighbors, ...userStores, ...bottomNeighbors];
    return result.slice(0, minTotal);
  }

  const my = getCenteredList(data, userStoreIndexes, 5);

  return (
    <div
      className={cn(
        "grid gap-2 max-md:grid-cols-1",
        data.some((store) => session?.idStore?.includes(store.idStore))
          ? "grid-cols-3"
          : "grid-cols-2",
      )}
    >
      <List
        title="Топ магазинов по выручке"
        className="max-2xl:text-xs"
        isLoading={isLoading}
        suffix={indicatorValue === "percentageProceedsNight" ? " %" : " ₽"}
        options={top.map((store, index) => ({
          name: store.store,
          count: `${store[indicatorValue as keyof typeof store].toLocaleString()}`,
          index: index + 1,
        }))}
      />
      {data.some((store) => session?.idStore?.includes(store.idStore)) && (
        <List
          title="Позиции ваших магазинов в топе"
          className="max-2xl:text-xs"
          isLoading={isLoading}
          suffix={indicatorValue === "percentageProceedsNight" ? " %" : " ₽"}
          options={my.map((store) => {
            const realIndex = data.findIndex(
              (s) => s.idStore === store.idStore,
            );
            const isUserStore = session?.idStore?.includes(store.idStore);
            return {
              name: store.store,
              count: `${store[indicatorValue as keyof typeof store].toLocaleString()}`,
              index: realIndex + 1,
              isHighlighted: isUserStore,
            };
          })}
        />
      )}
      <List
        title="Анти-топ магазинов по выручке"
        className="max-2xl:text-xs"
        isLoading={isLoading}
        suffix={indicatorValue === "percentageProceedsNight" ? " %" : " ₽"}
        options={bottom.map((store, index) => {
          return {
            name: store.store,
            count: `${store[indicatorValue as keyof typeof store].toLocaleString()}`,
            index: index + 1,
          };
        })}
      />
    </div>
  );
};
