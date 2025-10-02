import { ComponentProps } from "react";

import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { ScrollArea } from "@shared/ui/scroll-area";

import useMail from "../use-mail";

import { Notification } from "@entities/notifications/model/api/types";
import { ALERT_EMOTIONS } from "@entities/alert-emotions";

interface MailListProps {
  items: Notification[];
}

export function MailList({ items }: MailListProps) {
  const { selected, setSelected } = useMail();

  return (
    <ScrollArea className="max-md:h-[calc(100vh-180px)] h-[calc(100vh-218px)]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted hover:cursor-pointer",
              selected === String(item.id) && "bg-muted",
            )}
            onClick={() => setSelected(String(item.id))}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.is_read && (
                    <span className="flex h-2 w-2 rounded-full bg-accent" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs max-md:text-right",
                    selected === String(item.id)
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {new Date(item.created_at).toLocaleString("ru-RU")}
                </div>
              </div>
              <div className="text-xs font-medium line-clamp-1">
                {item.description.replace(/[#_*`~>()!|\\[\]+-]/g, "")}
              </div>
            </div>
            {/* <div className="line-clamp-2 text-xs text-muted-foreground">
              <ReactMarkdown>{item.message?.substring(0, 250)}</ReactMarkdown>
            </div> */}

            {item.emotion?.length ? (
              <div className="flex items-center gap-2">
                <Badge
                  key={item.emotion}
                  variant={getBadgeVariantFromLabel(item.emotion)}
                >
                  {ALERT_EMOTIONS[item.emotion] ?? item.emotion}
                </Badge>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

export function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["neutral"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
