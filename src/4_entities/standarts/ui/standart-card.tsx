import { Badge } from "@shared/ui/badge";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar, Camera, File, Video } from "lucide-react";

import { FC } from "react";

import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Standart } from "../model/types";
import pluralize from "@shared/lib/pluralize";
import { Card, CardFooter, CardHeader } from "@shared/ui/card";

const StandartCard: FC<Standart> = ({
  nameteg,
  id,
  name_standard,
  datestart,
  attachedFiles,
  attachedPhoto,
  attachedVideo,
}) => {
  return (
    <Link to={`${ROUTES_PATH.STANDARTS}/${id}`}>
      <Card className="h-full justify-between">
        <CardHeader>
          <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
            {nameteg}
          </Badge>
          <h3 className="text-2xl font-semibold tracking-tight leading-none">
            {name_standard}
          </h3>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-col md:flex-row md:items-center items-start gap-1.5 md:gap-6 text-muted-foreground text-sm font-medium leading-tight">
            {attachedFiles > 0 && (
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                {pluralize(attachedFiles, ["файл", "файла", "файлов"])}
              </div>
            )}
            {attachedPhoto > 0 && (
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {attachedPhoto} фото
              </div>
            )}
            {attachedVideo > 0 && (
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                {attachedVideo} видео
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />{" "}
              {format(new Date(datestart), "dd MMMM yyyy", {
                locale: ru,
              })}
            </div>
          </div>
        </CardFooter>
      </Card>
      {/* <div className="flex flex-row gap-6 items-center hover:scale-[0.98] transition-all duration-300 cursor-pointer origin-left active:scale-[0.96]">
        <div className="flex flex-col gap-2 justify-between py-4 ">
          <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
            {nameteg}
          </Badge>
          <h3 className="text-2xl font-semibold tracking-tight leading-none">
            {name_standard}
          </h3>
          <div className="flex flex-col md:flex-row md:items-center items-start gap-1.5 md:gap-6 text-muted-foreground text-sm font-medium leading-tight">
            {attachedFiles > 0 && (
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                {pluralize(attachedFiles, ["файл", "файла", "файлов"])}
              </div>
            )}
            {attachedPhoto > 0 && (
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {attachedPhoto} фото
              </div>
            )}
            {attachedVideo > 0 && (
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                {attachedVideo} видео
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />{" "}
              {format(new Date(datestart), "dd MMMM yyyy", {
                locale: ru,
              })}
            </div>
          </div>
        </div>
      </div> */}
    </Link>
  );
};

export default StandartCard;
