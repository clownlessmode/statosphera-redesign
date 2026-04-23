import type { UsersResponse } from "@pages/projects/api/types/response";

export function formatUserLastNameInitials(user: UsersResponse): string {
  const last = (user.last_name ?? "").trim();
  const first = (user.first_name ?? "").trim();
  const middle = (user.middle_name ?? "").trim();

  const letter = (s: string) => (s.length ? `${s[0].toUpperCase()}.` : "");
  const initials = `${letter(first)}${letter(middle)}`;

  if (last && initials) {
    return `${last} ${initials}`;
  }
  if (last) {
    return last;
  }
  const full = [first, middle].filter(Boolean).join(" ");
  return full || user.email || "—";
}
