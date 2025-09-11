import { HomeAdvertising } from "./home-advertising";
import { LoyalAdvertising } from "./loyal-advertising";

export const Advertising = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Управление рекламой</h2>
        <div className="flex flex-col gap-14">
          <HomeAdvertising />
          <LoyalAdvertising />
        </div>
      </div>
    </div>
  );
};
