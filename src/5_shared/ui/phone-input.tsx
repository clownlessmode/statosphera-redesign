import { useIMask } from "react-imask";
import { Input } from "./input";
import { cn } from "@shared/lib/utils";
import normalizeRuPhone from "@shared/lib/normalize-ru-phone";
import {
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useImperativeHandle,
  forwardRef,
  ChangeEventHandler,
} from "react";

interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  onValueChange?: (value: string) => void;
  value?: string;
  unmask?: boolean;
  mask?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      value,
      onValueChange,
      placeholder = "Введите номер",
      mask = "+7 (000) 000-00-00",
      unmask = true,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { ref: maskRef, setValue } = useIMask(
      {
        mask: mask,
        lazy: true,
        overwrite: true,
        unmask: unmask,
      },
      {
        onAccept: (val) => {
          onValueChange?.(val);
        },
      },
    );

    useEffect(() => {
      if (value !== undefined) {
        setValue(normalizeRuPhone(value));
      }
    }, [value]);

    useImperativeHandle(ref, () => maskRef.current as HTMLInputElement, []);

    return (
      <Input
        ref={maskRef as RefObject<HTMLInputElement>}
        placeholder={placeholder}
        type="tel"
        className={cn("bg-background", className)}
        onChange={onChange}
        {...props}
      />
    );
  },
);
