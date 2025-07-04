import {
  Card as CardUI,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Mail, Phone } from "lucide-react";

import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { Separator } from "@shared/ui/separator";
import { Link } from "react-router";
import { Store } from "../config";

interface Props {
  store: Store;
  action?: React.ReactNode;
}

export const Card = ({ store, action }: Props) => {
  return (
    <CardUI
      className={cn(
        store.storeCondition !== "ЗАКРЫТЫЕ"
          ? "group hover:scale-[1.02] transition-all duration-300 hover:border-foreground/20"
          : "opacity-40",
      )}
    >
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <p className="flex flex-row items-center gap-2">
            {store.storeName}
            <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              ID: {store.idStore}
            </span>
          </p>
          <div className="flex flex-row items-center gap-2">
            {store.storeCondition == "ЗАКРЫТЫЕ" && <Badge>Закрыт</Badge>}
            {store.storeCondition !== "ЗАКРЫТЫЕ" && (
              <Badge
                className={cn({
                  "bg-green-500/10 text-green-500":
                    store.channel === "Франшиза в аренду",
                  "bg-yellow-500/10 text-yellow-500":
                    store.channel === "Франшиза инвестиционная",
                  "bg-blue-500/10 text-blue-500": store.channel === "Вендинг",
                  "bg-purple-500/10 text-purple-500":
                    store.channel === "Микромаркет",
                  "bg-orange-500/10 text-orange-500": store.channel === "ФРС",
                  "bg-cyan-500/10 text-cyan-500": store.channel === "Фудтрак",
                  "bg-emerald-500/10 text-emerald-500":
                    store.channel === "Экопункт",
                })}
              >
                {store.channel}
              </Badge>
            )}
            {action}
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-1">
          {store.partners.join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <Link
            to={`tel:${store.phoneManager}`}
            className="flex flex-row gap-1 items-center"
          >
            <Phone className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {store.phoneManager}
            </p>
          </Link>
          <Link
            to={`mailto:${store.emailStoreManager}`}
            className="flex flex-row gap-1 items-center"
          >
            <Mail className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {store.emailStoreManager}
            </p>
          </Link>
        </div>
        <Separator className="my-2 max-w-[95%] mx-auto col-span-2" />
        <div className="grid grid-cols-2 gap-4">
          <Link
            to={`tel:${store.phoneStore}`}
            className="flex flex-row gap-1 items-center"
          >
            <Phone className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{store.phoneStore}</p>
          </Link>
          <Link
            to={`mailto:${store.emailStore}`}
            className="flex flex-row gap-1 items-center"
          >
            <Mail className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{store.emailStore}</p>
          </Link>
        </div>
      </CardContent>
    </CardUI>
  );
};
