import { Filters, FiltersValues } from "./filters";
import { useYandexReviews, useYandexStores } from "../api/controller";
import { ReviewsCards } from "./cards";
import { useState } from "react";

const defaultFilters: FiltersValues = {
  order: "desc",
  is_replied: undefined,
};

export const YandexTab = () => {
  const [filters, setFilters] = useState<FiltersValues>(defaultFilters);
  const storesQuery = useYandexStores();
  const yandex = useYandexReviews({
    order: filters.order,
    rating: filters.rating,
    is_replied: filters.is_replied,
    idStore: filters.idStore,
  });

  const reviews = yandex.data?.pages.flat() ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Filters
        value={filters}
        onChange={setFilters}
        stores={
          storesQuery.data?.map((store) => ({
            id: store.id,
            name: store.name,
          })) || []
        }
      />
      <ReviewsCards
        data={reviews}
        isLoading={yandex.isPending}
        hasNextPage={yandex.hasNextPage}
        isFetchingNextPage={yandex.isFetchingNextPage}
        fetchNextPage={yandex.fetchNextPage}
      />
    </div>
  );
};
