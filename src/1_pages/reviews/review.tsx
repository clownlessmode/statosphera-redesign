import { Header } from "@widgets/header";
import { TabsReviews } from "./ui/tabs";

export const Review = () => {
  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Отзывы" />
      <div className="rounded-3xl px-4 py-4 h-full bg-background overflow-y-auto">
        <TabsReviews />
      </div>
    </div>
  );
};
