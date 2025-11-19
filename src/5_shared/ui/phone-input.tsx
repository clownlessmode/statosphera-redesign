import * as React from "react";
import { useIMask } from "react-imask";
import { Input } from "./input";
import { cn } from "@shared/lib/utils";
import { InputHTMLAttributes, useEffect, useImperativeHandle } from "react";

interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> {
  onValueChange?: (value: string) => void;
  value?: string;
  unmask?: boolean;
  mask?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      value,
      onValueChange,
      placeholder = "Введите номер телефона",
      mask = "+7 (000) 000-00-00",
      unmask = true,
      ...props
    },
    ref,
  ) => {
    const {
      ref: maskRef,
      value: maskedValue,
      typedValue,
    } = useIMask({
      mask: mask,
      lazy: true,
      overwrite: true,
      unmask: unmask,
    });

    useEffect(() => {
      if (typedValue !== undefined) {
        const result = unmask ? typedValue : maskedValue;
        onValueChange?.(result);
      }
    }, [maskedValue, onValueChange, unmask]);

    useImperativeHandle(ref, () => maskRef.current as HTMLInputElement, [
      value,
    ]);

    return (
      <Input
        ref={maskRef as React.RefObject<HTMLInputElement>}
        value={maskedValue}
        placeholder={placeholder}
        type="tel"
        className={cn("bg-background", className)}
        {...props}
      />
    );
  },
);
