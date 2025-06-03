import { ComponentProps } from "react";

import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { ScrollArea } from "@shared/ui/scroll-area";

import useMail from "../use-mail";

import { Notification } from "@entities/notifications/model/api/types";

interface MailListProps {
  items: Notification[];
}

export function MailList({ items }: MailListProps) {
  const { selected, setSelected } = useMail();

  return (
    <ScrollArea className="h-[calc(100vh-218px)]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted hover:cursor-pointer",
              selected === String(item.id) && "bg-muted"
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
                    "ml-auto text-xs",
                    selected === String(item.id)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
              <div className="text-xs font-medium line-clamp-1">
                {item.description.replace(/[#_*`~>\[\]()\-+!|\\]/g, "")}
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
                  {EMOTION_LABELS[item.emotion] ?? item.emotion}
                </Badge>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

// где‑то рядом с вашим компонентом
const EMOTION_LABELS: Record<string, string> = {
  positive: "Положительное",
  neutral: "Нейтральное",
  negative: "Отрицательное",
};

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["neutral"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
