import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "@app/providers/theme-provider";
import { ru } from "@blocknote/core/locales";

export function MessageEditor() {
  const editor = useCreateBlockNote({
    dictionary: ru,
  });

  const { theme } = useTheme();
  return <BlockNoteView editor={editor} editable={true} theme={theme} />;
}
