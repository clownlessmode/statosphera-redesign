import { Filters, FiltersValues } from "./filters";
import { use2GISReviews, use2GISStores } from "../api/controller";
import { ReviewsCards } from "./cards";
import { useState } from "react";

const defaultFilters: FiltersValues = {
  order: "desc",
  is_replied: undefined,
};

export const TwoGISTab = () => {
  const [filters, setFilters] = useState<FiltersValues>(defaultFilters);
  const storesQuery = use2GISStores();
  const twoGIS = use2GISReviews({
    order: filters.order,
    rating: filters.rating,
    is_replied: filters.is_replied,
    idStore: filters.idStore,
  });

  const reviews = twoGIS.data?.pages.flat() ?? [];

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
        platform="2gis"
        data={reviews}
        isLoading={twoGIS.isPending}
        hasNextPage={twoGIS.hasNextPage}
        isFetchingNextPage={twoGIS.isFetchingNextPage}
        fetchNextPage={twoGIS.fetchNextPage}
      />
    </div>
  );
};
