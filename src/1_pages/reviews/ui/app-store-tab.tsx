import { useState } from "react";
import { useAppStoreReviews } from "../api/controller";
import { ReviewsCards } from "./cards";
import { Filters, type FiltersValues } from "./filters";

const defaultFilters: FiltersValues = {
  order: "desc",
  is_replied: undefined,
};

export const AppStoreTab = () => {
  const [filters, setFilters] = useState<FiltersValues>(defaultFilters);
  const appStore = useAppStoreReviews({
    order: filters.order,
    rating: filters.rating,
    is_replied: filters.is_replied,
  });

  const reviews = appStore.data?.pages.flat() ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Filters value={filters} onChange={setFilters} />
      <ReviewsCards
        platform="app-store"
        data={reviews}
        isLoading={appStore.isPending}
        hasNextPage={appStore.hasNextPage}
        isFetchingNextPage={appStore.isFetchingNextPage}
        fetchNextPage={appStore.fetchNextPage}
      />
    </div>
  );
};
