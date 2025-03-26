import { ComponentProps } from "react";

import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { ScrollArea } from "@shared/ui/scroll-area";

import { Mail } from "../data";
import useMail from "../use-mail";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MailListProps {
  items: Mail[];
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
              selected === item.id && "bg-muted"
            )}
            onClick={() => setSelected(item.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-accent" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-xs font-medium line-clamp-1">
                {item.subject}
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              <ReactMarkdown>{item.text.substring(0, 250)}</ReactMarkdown>
            </div>

            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
