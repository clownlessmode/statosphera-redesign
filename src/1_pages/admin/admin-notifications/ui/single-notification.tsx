import { ALERT_EMOTIONS } from "@entities/alert-emotions";
import { getBadgeVariantFromLabel } from "@pages/notifications/ui/mail-list";
import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent } from "@shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { MessageEditor } from "@shared/ui/message-editor";
import { useState } from "react";

const SingleNotification = () => {
  const [title, setTitle] = useState("Заголовок");
  const [description, setDescription] = useState("Описание сообщения");
  return (
    <div className=" h-full w-full gap-4">
      <Card className="flex flex-1 shrink-0">
        <CardContent className="w-full flex flex-col gap-4 min-h-[calc(100vh-18rem)]">
          <button
            className={cn(
              "flex flex-col w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all  hover:cursor-pointer",
              "bg-background",
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="min-w-0 w-[1px] box-content active:outline-none! active:ring-0! active:border-none! focus:outline-none! focus:ring-0! focus:border-none!"
                      style={{ width: `${title.length}ch` }}
                    />
                  </div>

                  <span className="flex h-2 w-2 rounded-full bg-accent" />
                </div>
                <div className={cn("ml-auto text-xs", "text-muted-foreground")}>
                  {new Date().toLocaleString()}
                </div>
              </div>
              <div className="text-xs font-medium line-clamp-1">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-w-0 w-[1px] box-content active:outline-none! active:ring-0! active:border-none! focus:outline-none! focus:ring-0! focus:border-none!"
                  style={{ width: `${description?.length}ch` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge
                    key={"emotion"}
                    variant={getBadgeVariantFromLabel("positive")}
                  >
                    {ALERT_EMOTIONS["positive"] ?? "positive"}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.entries(ALERT_EMOTIONS).map(([key, value]) => (
                    <DropdownMenuItem key={key} className="hover:bg-muted!">
                      <Badge key={key} variant={getBadgeVariantFromLabel(key)}>
                        {value}
                      </Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </button>
          <MessageEditor />
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleNotification;
