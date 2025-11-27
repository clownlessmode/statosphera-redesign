import { Header } from "@widgets/header";
import { useFarmers } from "../api/controller";
import { ShortProfile } from "./cards";
import PageSkeleton from "@shared/ui/page-skeleton";

export const Farmers = () => {
  const { farmers, isFarmersLoading } = useFarmers();

  if (isFarmersLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title={`Фермеры`} />
      <div className="rounded-3xl px-4 py-4 gap-4 h-[calc(100vh-64px)] flex flex-col w-full bg-background">
        <ul className="flex flex-col gap-2">
          {farmers?.map((farmer, index) => (
            <li key={index}>
              <ShortProfile farmer={farmer} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
