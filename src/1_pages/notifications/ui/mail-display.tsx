import { Separator } from "@shared/ui/separator";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@shared/ui/scroll-area";
import { Notification } from "@entities/notifications/model/api/types";
import { useNotifications } from "@entities/notifications/model/api/controller";
import { useEffect } from "react";

interface MailDisplayProps {
  mail: Notification | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const { readNotification } = useNotifications();

  useEffect(() => {
    if (mail?.id && !mail.is_read) {
      readNotification(mail.id);
    }
  }, [mail]);

  return (
    <div className="flex md:h-full flex-col">
      {mail ? (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
          <div className="flex items-center px-4 max-md:mb-2 md:h-[68px] gap-4 shrink-0">
            <div className="flex items-center gap-4 text-sm">
              <div className="grid gap-1">
                <div className="font-semibold">{mail.title}</div>
                <div className="md:line-clamp-1 text-xs">
                  {mail.description}
                </div>
              </div>
            </div>
            {mail.created_at && (
              <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                {format(new Date(mail.created_at), "PPp", { locale: ru })}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="prose dark:prose-invert prose-base max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} unwrapDisallowed>
                  {mail.message
                    .replace(/^ +/gm, "")
                    .replace(/([^\n])\n([^\n])/g, "$1  \n$2")
                    .trim()}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground overflow-y-auto scrollbar-hide">
          Выберите уведомление
        </div>
      )}
    </div>
  );
}
