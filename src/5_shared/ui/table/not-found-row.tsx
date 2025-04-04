import React from "react";

interface NotFoundRowProps<T> {
  value: T;
  fallback?: React.ReactNode;
  children?: (value: T) => React.ReactNode;
  className?: string;
}

export function NotFoundRow<T>({
  value,
  fallback = "Нет данных",
  children,
  className,
}: NotFoundRowProps<T>) {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    value === "null" ||
    value === "undefined";

  if (isEmpty) {
    return <p className={className}>{fallback}</p>;
  }

  return (
    <p className={className}>
      {children ? children(value) : (value as React.ReactNode)}
    </p>
  );
}
