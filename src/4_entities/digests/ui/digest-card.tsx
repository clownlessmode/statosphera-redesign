import { Badge } from "@shared/ui/badge";
import { Card } from "@shared/ui/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { ClockIcon } from "lucide-react";
import { FC } from "react";
import { Digest } from "../model/types";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";

const DigestCard: FC<Digest> = ({ date_add, pach_cdn, title, type, id }) => {
  return (
    <Link to={`${ROUTES_PATH.DIGESTS}/${id}`}>
      <div className="flex flex-row gap-6 items-center hover:scale-[0.98] transition-all duration-300 cursor-pointer origin-left active:scale-[0.96]">
        <Card
          style={{
            backgroundImage: `linear-gradient(var(--accent), transparent 42%, transparent 57%, var(--accent)), url(${pach_cdn[0]})`,
          }}
          className="size-[150px] md:size-[190px] aspect-square bg-accent bg-no-repeat bg-center bg-[length:auto_60%] transform translate-z-0 bg-clip-padding"
        />
        <div className="flex flex-col gap-2 justify-between py-4 ">
          <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
            {type}
          </Badge>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight leading-none">
              {title}
            </h3>
            <p className="mt-1 text-muted-foreground line-clamp-1 md:line-clamp-3 text-ellipsis ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              consequatur minus dicta accusantium quos, ratione suscipit id
              adipisci voluptatibus. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Ipsa consequatur minus dicta accusantium quos,
              ratione suscipit id adipisci voluptatibus.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center items-start gap-1.5 md:gap-6 text-muted-foreground text-sm font-medium leading-tight">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />{" "}
              {(() => {
                const minutes = Math.round((pach_cdn.length * 15) / 60);
                if (minutes % 10 === 1 && minutes !== 11) {
                  return `${minutes} минута`;
                } else if (
                  [2, 3, 4].includes(minutes % 10) &&
                  ![12, 13, 14].includes(minutes)
                ) {
                  return `${minutes} минуты`;
                } else {
                  return `${minutes} минут`;
                }
              })()}{" "}
              на чтение
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />{" "}
              {format(new Date(date_add), "dd MMMM yyyy", {
                locale: ru,
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DigestCard;
