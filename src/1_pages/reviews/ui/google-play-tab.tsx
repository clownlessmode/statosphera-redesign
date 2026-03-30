import { useState } from "react";
import { useGooglePlayReviews } from "../api/controller";
import { ReviewsCards } from "./cards";
import { Filters, type FiltersValues } from "./filters";

const defaultFilters: FiltersValues = {
  order: "desc",
  is_replied: undefined,
};

export const GooglePlayTab = () => {
  const [filters, setFilters] = useState<FiltersValues>(defaultFilters);
  const googlePlay = useGooglePlayReviews({
    order: filters.order,
    rating: filters.rating,
    is_replied: filters.is_replied,
  });

  const reviews = googlePlay.data?.pages.flat() ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Filters value={filters} onChange={setFilters} />
      <ReviewsCards
        platform="google-play"
        data={reviews}
        isLoading={googlePlay.isPending}
        hasNextPage={googlePlay.hasNextPage}
        isFetchingNextPage={googlePlay.isFetchingNextPage}
        fetchNextPage={googlePlay.fetchNextPage}
      />
    </div>
  );
};
