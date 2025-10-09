import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "@app/providers/theme-provider";
import { ru } from "@blocknote/core/locales";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { ALERT_EMOTIONS } from "@entities/alert-emotions";
import { getBadgeVariantFromLabel } from "@pages/notifications/ui/mail-list";

interface MessageEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  title?: string;
  description?: string;
  emotion?: string;
  isImportant?: boolean;
}

export function MessageEditor({
  value,
  onChange,
  title = "Заголовок уведомления",
  description = "Описание уведомления",
  emotion = "positive",
  isImportant = false,
}: MessageEditorProps) {
  const [editorContent, setEditorContent] = useState(value || "");

  const editor = useCreateBlockNote({
    dictionary: ru,
    initialContent: value ? JSON.parse(value) : undefined,
  });

  const { theme, customThemeMode } = useTheme();
  // Для BlockNoteView используем только light/dark
  const editorTheme = theme === "custom" ? customThemeMode : theme;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (onChangeRef.current) {
      const handleChange = () => {
        const content = editor.document;
        const contentString = JSON.stringify(content);
        setEditorContent(contentString);
        onChangeRef.current?.(contentString);
      };

      editor.onChange(handleChange);

      return () => {
        // BlockNote doesn't have offChange, so we don't need to clean up
        // The editor instance will be cleaned up when the component unmounts
      };
    }
  }, [editor]);

  // Функция для рендеринга предпросмотра карточки уведомления
  const renderNotificationPreview = () => {
    return (
      <div className="space-y-4">
        {/* Карточка уведомления */}
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm bg-background">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{title}</div>
                {isImportant && (
                  <Badge variant="destructive" className="text-xs">
                    Важное
                  </Badge>
                )}
                <span className="flex h-2 w-2 rounded-full bg-blue-500" />
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                {new Date().toLocaleString("ru-RU")}
              </div>
            </div>
            <div className="text-xs font-medium line-clamp-1">
              {description}
            </div>
          </div>

          {emotion && (
            <div className="flex items-center gap-2">
              <Badge variant={getBadgeVariantFromLabel(emotion)}>
                {ALERT_EMOTIONS[emotion] ?? emotion}
              </Badge>
            </div>
          )}
        </div>

        {/* Предпросмотр содержимого сообщения */}
        <div className="rounded-lg border p-3 bg-muted/30">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Содержимое сообщения:
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {renderMessageContent()}
          </div>
        </div>
      </div>
    );
  };

  // Функция для рендеринга содержимого сообщения
  const renderMessageContent = () => {
    try {
      const content = JSON.parse(editorContent);
      return content.map((block: any, index: number) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-2">
                {block.content?.map((item: any, itemIndex: number) => (
                  <span key={itemIndex}>{item.text}</span>
                ))}
              </p>
            );
          case "heading": {
            const level = block.props?.level || 1;
            const HeadingComponent =
              level === 1
                ? "h1"
                : level === 2
                  ? "h2"
                  : level === 3
                    ? "h3"
                    : level === 4
                      ? "h4"
                      : level === 5
                        ? "h5"
                        : "h6";
            return (
              <HeadingComponent key={index} className="font-semibold mb-2">
                {block.content?.map((item: any, itemIndex: number) => (
                  <span key={itemIndex}>{item.text}</span>
                ))}
              </HeadingComponent>
            );
          }
          case "bulletListItem":
            return (
              <ul key={index} className="list-disc list-inside mb-2">
                <li>
                  {block.content?.map((item: any, itemIndex: number) => (
                    <span key={itemIndex}>{item.text}</span>
                  ))}
                </li>
              </ul>
            );
          case "numberedListItem":
            return (
              <ol key={index} className="list-decimal list-inside mb-2">
                <li>
                  {block.content?.map((item: any, itemIndex: number) => (
                    <span key={itemIndex}>{item.text}</span>
                  ))}
                </li>
              </ol>
            );
          default:
            return (
              <div key={index} className="mb-2">
                {block.content?.map((item: any, itemIndex: number) => (
                  <span key={itemIndex}>{item.text}</span>
                ))}
              </div>
            );
        }
      });
    } catch {
      return (
        <div className="text-muted-foreground text-sm">
          Начните писать сообщение...
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Редактор */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Редактирование сообщения
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="min-h-[200px]">
            <BlockNoteView
              editor={editor}
              editable={true}
              theme={editorTheme}
            />
          </div>
        </CardContent>
      </Card>

      {/* Предпросмотр */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Предпросмотр</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px] p-4">
          {renderNotificationPreview()}
        </CardContent>
      </Card>
    </div>
  );
}
