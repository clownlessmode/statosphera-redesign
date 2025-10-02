import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useNpsController } from "@widgets/dashboard/nps/api";
import Spinner from "@shared/ui/spinner";
import { Store, Star } from "lucide-react";
import { getNPSColor } from "@widgets/dashboard/nps/model";
import { Badge } from "@shared/ui/badge";
import { useSession } from "@entities/session";
import { Separator } from "@shared/ui/separator";

interface StoresProps {
  tv?: boolean;
  best?: boolean;
  worst?: boolean;
}

export const Stores = ({ tv, best, worst }: StoresProps) => {
  const { allNps, isAllNpsLoading } = useNpsController();
  const { session } = useSession();

  if (isAllNpsLoading || !allNps) {
    return (
      <Card className="animate-pulse h-full flex justify-center items-center ">
        <Spinner />
      </Card>
    );
  }

  // Разделяем магазины на "ваши" и "все остальные"
  const userStores = allNps.all_stores.filter((store) =>
    session?.idStore?.includes(store.id_store),
  );
  const otherStores = allNps.all_stores.filter(
    (store) => !session?.idStore?.includes(store.id_store),
  );

  const bestStores = otherStores.slice(0, 5);
  const worstStores = otherStores.slice(-5).reverse();

  const StoreCard = ({
    store,
    isUserStore = false,
  }: {
    store: any;
    isUserStore?: boolean;
  }) => (
    <Card
      key={store.id_store}
      className={cn(
        "md:w-max-content gap-2",
        isUserStore && "border-muted-foreground border-2",
        tv && "border-0 pt-2 pb-2",
      )}
    >
      <CardHeader className="justify-between w-full flex items-center">
        <CardTitle className="flex flex-row gap-2 items-center">
          <div
            className={cn(
              "rounded-md p-1.5 flex items-center justify-center",
              getNPSColor(store.nps_card).bg,
              getNPSColor(store.nps_card).text,
            )}
          >
            <Store className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{store.store}</span>
            {isUserStore && (
              <span className="text-xs text-muted-foreground font-medium">
                Ваш магазин
              </span>
            )}
          </div>
        </CardTitle>
        <CardTitle
          className={cn(
            "text-sm flex flex-row gap-1 items-center",
            getNPSColor(store.nps_card).text,
          )}
        >
          <Star fill="currentColor" className="w-4 h-4" />
          {store.nps_card}
        </CardTitle>
      </CardHeader>
      {!tv && (
        <CardContent>
          <Badge
            className={cn(
              "w-full",
              getNPSColor(store.nps_card).bg,
              getNPSColor(store.nps_card).text,
            )}
          >
            {getNPSColor(store.nps_card).label}
          </Badge>
        </CardContent>
      )}
    </Card>
  );

  //Лучшие магазины

  if (best) {
    return (
      <div className="grid grid-cols-1 gap-2 w-full h-full pb-6">
        <div className="col-span-full">
          <h3 className="font-semibold text-center">Лучшие магазины</h3>
        </div>
        {bestStores.length > 0 && (
          <>
            {bestStores.map((store) => (
              <StoreCard key={store.id_store} store={store} />
            ))}
          </>
        )}
      </div>
    );
  }

  // Худшие магазины

  if (worst) {
    return (
      <div className="grid grid-cols-1 gap-2 w-full h-full pb-6">
        <div className="col-span-full">
          <h3 className="font-semibold text-center">Худшие магазины</h3>
        </div>
        {worstStores.length > 0 && (
          <>
            {worstStores.map((store) => (
              <StoreCard key={store.id_store} store={store} />
            ))}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto h-full max-h-[450px] scrollbar-hide pb-6 space-y-4">
      {userStores.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold ">Ваши магазины</h3>
            <Badge variant="secondary">{userStores.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md::grid-cols-2 gap-2">
            {userStores.map((store) => (
              <StoreCard
                key={store.id_store}
                store={store}
                isUserStore={true}
              />
            ))}
          </div>
          {otherStores.length > 0 && <Separator className="my-4" />}
        </div>
      )}

      {/* Все остальные магазины */}
      {otherStores.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Все магазины</h3>
            <Badge variant="outline">{otherStores.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {otherStores.map((store) => (
              <StoreCard key={store.id_store} store={store} />
            ))}
          </div>
        </div>
      )}

      {/* Если нет магазинов */}
      {allNps.all_stores.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Нет данных о магазинах</p>
        </div>
      )}
    </div>
  );
};
