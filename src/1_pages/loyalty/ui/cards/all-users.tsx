import { Card, CardTitle, CardHeader, CardContent } from "@shared/ui/card";
import { NoSales30DaysUserResponse } from "../../config";
import { Skeleton } from "@shared/ui/skeleton";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const AllUsers = ({
  noSales30DaysUser,
  isNoSales30DaysUserLoading,
}: {
  noSales30DaysUser: NoSales30DaysUserResponse;
  isNoSales30DaysUserLoading: boolean;
}) => {
  if (isNoSales30DaysUserLoading) return <AllUsersSkeleton />;

  const isMobile = useIsMobile();
  // if () return <AllUsersSkeleton />;
  return (
    <Card className="w-full h-full gap-1 ">
      <CardHeader className="flex flex-row justify-center items-center flex-grow"></CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-center items-center p-2 bg-background rounded-2xl gap-1 w-full">
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            {isMobile ? (
              <div className="w-full bg-primary mb-1 text-primary-foreground border-border border rounded-lg flex items-center justify-center h-12">
                <CardTitle>
                  Всего клиентов:{" "}
                  {noSales30DaysUser?.total_users.toLocaleString()}
                </CardTitle>{" "}
              </div>
            ) : (
              <>
                <div className="text-xs font-semibold w-full bg-muted-foreground border-border border rounded-lg flex items-center justify-center h-8">
                  {noSales30DaysUser?.no_30d.toLocaleString()}
                </div>
                <p className="text-xs text-nowrap">
                  Не совершали покупок &gt;30 дней
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 items-center justify-center w-full ">
            {!isMobile ? (
              <div className="flex flex-col gap-2 items-center justify-center w-full ">
                <div className="w-full bg-primary text-primary-foreground border-border border rounded-lg flex items-center justify-center h-12">
                  <CardTitle>
                    Всего клиентов:{" "}
                    {noSales30DaysUser?.total_users.toLocaleString()}
                  </CardTitle>{" "}
                </div>
                <p className="text-xs text-nowrap invisible">
                  Не совершали покупок &gt;30 дней
                </p>
              </div>
            ) : (
              <>
                <div className="text-xs font-semibold w-full bg-muted-foreground border-border border rounded-lg flex items-center justify-center h-8">
                  {noSales30DaysUser?.no_30d.toLocaleString()}
                </div>
                <p className="text-xs text-nowrap">
                  Не совершали покупок &gt;30 дней
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <div className=" text-xs font-semibold w-full bg-muted-foreground text-primary-foreground border-border border rounded-lg flex items-center justify-center h-8">
              {noSales30DaysUser?.yes_30d.toLocaleString()} (
              {noSales30DaysUser?.yes_30d &&
              noSales30DaysUser?.total_users &&
              noSales30DaysUser.total_users > 0
                ? (
                    (noSales30DaysUser.yes_30d /
                      noSales30DaysUser.total_users) *
                    100
                  ).toFixed()
                : "0"}
              %)
            </div>
            <p className="text-xs text-nowrap">За посл. 30 дней</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AllUsersSkeleton = () => {
  return (
    <Card className="w-full h-full gap-1 ">
      <CardContent>
        <div className="flex flex-row justify-center items-center p-2 bg-background rounded-2xl gap-1 w-full">
          <div
            className="flex flex-col gap-2 items-center justify-center"
            style={{
              width: `100%`,
            }}
          >
            <div className="text-xs font-semibold w-full  bg-muted animate-pulse border-border border rounded-lg flex items-center justify-center h-8"></div>
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div
            className="flex flex-col gap-2 items-center justify-center"
            style={{
              width: `100%`,
            }}
          >
            <div className="text-xs font-semibold w-full  bg-muted animate-pulse border-border border rounded-lg flex items-center justify-center h-12"></div>
            <Skeleton className="h-4 w-1/2 invisible" />
          </div>
          <div
            className="flex flex-col gap-2 items-center justify-center"
            style={{
              width: `100%`,
            }}
          >
            <div className=" text-xs font-semibold w-full bg-muted animate-pulse border-border border rounded-lg flex items-center justify-center h-8"></div>
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
