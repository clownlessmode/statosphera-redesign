import * as React from "react";
import { useIMask } from "react-imask";
import { Input } from "./input";
import { cn } from "@shared/lib/utils";
import { InputHTMLAttributes, useEffect } from "react";

interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> {
  onValueChange?: (value: string) => void;
  value?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      onValueChange,
      value,
      placeholder = "Ведите номер телефона",
      ...props
    },
    ref,
  ) => {
    const { ref: maskRef, setValue } = useIMask(
      {
        mask: "+7 (000) 000-00-00",
        lazy: false,
        overwrite: true,
        unmask: "typed",
      },
      {
        onAccept: (value) => {
          onValueChange?.(value);
        },
      },
    );

    useEffect(() => {
      if (value !== undefined) {
        setValue(value);
      }
    }, [value, setValue]);

    // Передаём ref наружу (для react-hook-form)
    React.useImperativeHandle(
      ref,
      () => maskRef.current as HTMLInputElement,
      [],
    );

    return (
      <Input
        ref={maskRef as React.RefObject<HTMLInputElement>}
        placeholder={placeholder}
        type="tel"
        className={cn("bg-background", className)}
        {...props}
      />
    );
  },
);
