import { cn } from "@shared/lib/utils";
import { Upload } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";

function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept.split(",").map((s) => s.trim());
  for (const token of tokens) {
    if (token.startsWith(".")) {
      if (file.name.toLowerCase().endsWith(token.toLowerCase())) {
        return true;
      }
    } else if (file.type === token) {
      return true;
    }
  }
  return false;
}

export type InputUploadFileProps = {
  accept: string;
  primaryText: string;
  secondaryText: string;
  ariaLabel?: string;
  /** Если задан — используется вместо проверки по `accept` */
  validateFile?: (file: File) => boolean;
  onFileChange?: (file: File | null) => void;
  className?: string;
};

export const InputUploadFile = ({
  accept,
  primaryText,
  secondaryText,
  ariaLabel = "Выберите файл",
  validateFile,
  onFileChange,
  className,
}: InputUploadFileProps) => {
  const id = useId();
  const inputId = `upload-file-${id}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const isValidFile = useCallback(
    (f: File) => {
      if (validateFile) return validateFile(f);
      return matchesAccept(f, accept);
    },
    [accept, validateFile],
  );

  const assignToInput = useCallback(
    (f: File) => {
      setFile(f);
      onFileChange?.(f);
      const input = inputRef.current;
      if (!input) return;
      const dt = new DataTransfer();
      dt.items.add(f);
      input.files = dt.files;
    },
    [onFileChange],
  );

  const handleFile = useCallback(
    (f: File | undefined) => {
      if (!f) return;
      if (!isValidFile(f)) return;
      assignToInput(f);
    },
    [assignToInput, isValidFile],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragActive(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={cn(
        "rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors",
        "hover:border-primary/50 hover:bg-muted/50",
        isDragActive && "border-primary bg-primary/10",
        className,
      )}
    >
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={onInputChange}
        aria-label={ariaLabel}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 px-6 py-10 text-center outline-none",
          "focus-within:ring-ring/50 focus-within:ring-[3px] rounded-lg",
        )}
      >
        <Upload
          className="size-10 shrink-0 text-muted-foreground"
          aria-hidden
        />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{primaryText}</p>
          <p className="text-xs text-muted-foreground">{secondaryText}</p>
        </div>
        {file ? (
          <p className="mt-1 max-w-full truncate text-sm">
            <span className="font-medium text-foreground">{file.name}</span>
          </p>
        ) : null}
      </label>
    </div>
  );
};
