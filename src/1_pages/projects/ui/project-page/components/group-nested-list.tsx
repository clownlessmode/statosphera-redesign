import type { ReactNode } from "react";

const listClass = "flex flex-col gap-2 pl-2 border-l-2 border-primary/25 ml-1";

export function GroupNestedList({ children }: { children: ReactNode }) {
  return <ul className={listClass}>{children}</ul>;
}
