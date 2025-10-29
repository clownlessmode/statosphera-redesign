import { List } from "@shared/ui/list";
import { TopStoreLoyalResponse } from "../../config";
import { useSession } from "@entities/session";

export const TopLoyalStoreCards = ({
  topStoreLoyal,
  isLoading,
}: {
  topStoreLoyal: TopStoreLoyalResponse[];
  isLoading: boolean;
}) => {
  const { session } = useSession();
  const top = topStoreLoyal.slice(0, 5);
  const bottom = topStoreLoyal.slice(-5);

  // Находим индексы магазинов пользователя в списке
  const userStoreIndexes = topStoreLoyal
    .map((store, index) =>
      session?.idStore?.includes(store.id_store) ? index : -1,
    )
    .filter((index) => index !== -1);

  // Центрируем магазины пользователя в списке из 5 элементов
  function getCenteredList(
    arr: TopStoreLoyalResponse[],
    userIndexes: number[],
    minTotal = 5,
  ) {
    if (userIndexes.length === 0) return arr.slice(0, minTotal);
    const userCount = userIndexes.length;
    const total = userCount > minTotal ? userCount + 2 : minTotal;
    // Собираем пользовательские магазины
    const userStores = userIndexes.map((i) => arr[i]);
    // Сколько нужно добавить сверху и снизу
    const before = Math.floor((total - userCount) / 2);
    const after = total - userCount - before;
    // Верхние соседи
    let topStart = Math.max(0, userIndexes[0] - before);
    const topEnd = userIndexes[0];
    let topNeighbors = arr.slice(topStart, topEnd);
    // Нижние соседи
    const bottomStart = userIndexes[userIndexes.length - 1] + 1;
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
    // Собираем итоговый список
    return [...topNeighbors, ...userStores, ...bottomNeighbors];
  }

  const my = getCenteredList(topStoreLoyal, userStoreIndexes, 5);

  return (
    <>
      <List
        title="Топ 5 магазинов по лояльности"
        isLoading={isLoading}
        suffix={" %"}
        options={top.map((store, index) => ({
          name: store.store,
          count: `${store.appLoyalPercent}`,
          index: index + 1,
        }))}
      />
      <List
        title="Ваша позиция"
        isLoading={isLoading}
        suffix={" %"}
        options={my.map((store) => {
          const realIndex = topStoreLoyal.findIndex(
            (s) => s.id_store === store.id_store,
          );
          const isUserStore = session?.idStore?.includes(store.id_store);
          return {
            name: store.store,
            count: `${store.appLoyalPercent}`,
            index: realIndex + 1,
            isHighlighted: isUserStore,
          };
        })}
      />
      <List
        title="5 магазинов аутсайдеров по лояльности"
        isLoading={isLoading}
        suffix={" %"}
        options={bottom.map((store, index) => {
          const indexFromEnd = topStoreLoyal.length - 5 + index + 1;
          return {
            name: store.store,
            count: `${store.appLoyalPercent}`,
            index: indexFromEnd,
          };
        })}
      />
    </>
  );
};
