import { useEffect, useRef } from "react";
import { Skeleton } from "@shared/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Star } from "lucide-react";
import { Checkbox } from "@shared/ui/checkbox";
import {
  useUpdateRepliedAppStore,
  useUpdateRepliedGooglePlay,
} from "../api/controller";

interface ReviewsCardsProps {
  data: any;
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

export const ReviewsCards = ({
  data,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ReviewsCardsProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { mutate: updateRepliedGooglePlay } = useUpdateRepliedGooglePlay();
  const { mutate: updateRepliedAppStore } = useUpdateRepliedAppStore();

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage || isFetchingNextPage) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-full" />
            </div>
          ))
        : data.map((review: any) => {
            const reviewDate =
              "review_date_parsed" in review && review.review_date_parsed
                ? review.review_date_parsed
                : review.review_date;

            return (
              <Card key={review.id} className="gap-2">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-row items-center gap-4">
                        <CardTitle className="font-bold text-md">
                          {review.author_name}
                        </CardTitle>
                        <p className="font-light text-sm">
                          {new Date(reviewDate).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`size-4 ${
                            index < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    {review.is_replied ? (
                      <div>
                        <p className="text-green-500 text-[14px] font-light">
                          Ответили
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-red-500 text-[14px] font-light">
                          Не ответили
                        </p>
                        <Checkbox
                          checked={review.is_replied}
                          className="border-gray-500"
                          onCheckedChange={() => {
                            // если есть поле thumbs_up то это Google Play, иначе App Store
                            if ("thumbs_up" in review) {
                              updateRepliedGooglePlay({
                                id: review.id,
                                is_replied: true,
                              });
                            } else {
                              updateRepliedAppStore({
                                id: review.id,
                                is_replied: true,
                              });
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {"store_name" in review && review.store_name && (
                    <div className="flex flex-col">
                      <p className="text-muted-foreground text-md">Магазин</p>
                      <a
                        href={
                          "store_url" in review && review.store_url
                            ? review.store_url
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium w-fit"
                      >
                        {review.store_name}
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col">
                    {review.title ? (
                      <>
                        <p className="text-muted-foreground text-md">
                          Заголовок
                        </p>
                        <p>{review.title}</p>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-muted-foreground text-md">Отзыв</p>
                    <p>{review.review_text}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      {hasNextPage && <div ref={sentinelRef} className="h-4" />}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Skeleton className="h-8 w-48" />
        </div>
      )}
    </div>
  );
};
