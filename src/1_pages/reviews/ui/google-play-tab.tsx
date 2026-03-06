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

  return (
    <div className="flex flex-col gap-4">
      <Filters value={filters} onChange={setFilters} />
      <ReviewsCards
        data={googlePlay.data || []}
        isLoading={googlePlay.isLoading}
      />
    </div>
  );
};
