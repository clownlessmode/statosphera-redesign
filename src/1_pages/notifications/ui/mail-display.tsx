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
    <div className="flex h-full flex-col">
      {mail ? (
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center px-4 h-[68px] gap-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="grid gap-1">
                <div className="font-semibold">{mail.title}</div>
                <div className="line-clamp-1 text-xs">{mail.description}</div>
              </div>
            </div>
            {mail.created_at && (
              <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                {format(new Date(mail.created_at), "PPp", { locale: ru })}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1  p-4 text-base w-full prose dark:prose-invert prose-base max-w-none">
            <ScrollArea className="h-full">
              <ReactMarkdown remarkPlugins={[remarkGfm]} unwrapDisallowed>
                {mail.message}
              </ReactMarkdown>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Выберите уведомление
        </div>
      )}
    </div>
  );
}
