import { Badge } from "@shared/ui/badge";
import { Card } from "@shared/ui/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar, ClockIcon } from "lucide-react";
import { FC } from "react";
import { DigestPagesPreview } from "./digest-pages-preview";

interface DigestPreviewProps {
  title: string;
  description: string;
  type: string;
  cover?: File | null;
  filesCount: number;
  files: File[];
}

const DigestPreview: FC<DigestPreviewProps> = ({
  title,
  description,
  type,
  cover,
  filesCount,
  files,
}) => {
  const typeMap: Record<string, string> = {
    analytics: "Аналитика",
    director: "Совет директоров",
    franchise: "Франчайзинг",
    groupCompany: "Группа компаний",
  };

  const coverUrl = cover ? URL.createObjectURL(cover) : "/digest/cover.png";

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Карточка дайджеста */}
      <div className="flex flex-row gap-6 items-center flex-shrink-0">
        <Card
          style={{
            backgroundImage: `url(${coverUrl})`,
          }}
          className="size-[150px] md:size-[190px] aspect-square bg-accent bg-no-repeat bg-center bg-cover"
        />
        <div className="flex flex-col gap-2 justify-between py-4">
          <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
            {typeMap[type] ? typeMap[type] : type}
          </Badge>
          <div>
            <h3 className="text-lg md:text-2xl font-semibold tracking-tight leading-none">
              {title || "Заголовок дайджеста"}
            </h3>
            <p className="mt-1 text-muted-foreground line-clamp-1 md:line-clamp-3 text-ellipsis">
              {description ? (
                description
              ) : (
                <span className="min-h-[72px]">Описание отсутствует</span>
              )}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center items-start gap-1.5 md:gap-6 text-muted-foreground text-xs md:text-sm font-medium leading-tight">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              {(() => {
                const minutes = Math.round((filesCount * 15) / 60);
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
              <Calendar className="h-4 w-4" />
              {format(new Date(), "dd MMMM yyyy", {
                locale: ru,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Предпросмотр страниц */}
      <div className="flex-1 min-h-0">
        <DigestPagesPreview files={files} />
      </div>
    </div>
  );
};

export default DigestPreview;
