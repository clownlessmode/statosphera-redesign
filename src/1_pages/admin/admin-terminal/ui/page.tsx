import { Header } from "@widgets/header";
import { ShoppingBasket, Tv } from "lucide-react";
import { useState } from "react";
import { Product } from "./product";
import { Advertising } from "./advertising";

type ActiveTab = "products" | "advertising";

export const AdminTerminalPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Терминал`}
        // isAdmin={true}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-1 w-full bg-background">
        <div className="flex flex-col gap-6 pt-4 border-r items-center min-w-48">
          <div
            className={`flex flex-row gap-2 items-center w-fit px-4 rounded-sm cursor-pointer transition-colors ${
              activeTab === "products"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setActiveTab("products")}
          >
            <p className="text-lg">Товары</p>
            <ShoppingBasket className="w-4 h-4" />
          </div>
          <div
            className={`flex flex-row gap-2 items-center w-fit px-4 rounded-sm cursor-pointer transition-colors ${
              activeTab === "advertising"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setActiveTab("advertising")}
          >
            <p className="text-lg">Реклама</p>
            <Tv className="w-4 h-4" />
          </div>
        </div>
        <div className="flex-1 p-4">
          {activeTab === "products" && <Product />}
          {activeTab === "advertising" && <Advertising />}
        </div>
      </div>
    </div>
  );
};
