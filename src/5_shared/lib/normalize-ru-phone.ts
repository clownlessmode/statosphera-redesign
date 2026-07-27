/** Приводит российский номер к виду 7XXXXXXXXXX (без ведущей 8). */
export default function normalizeRuPhone(phone: string | null | undefined) {
  if (!phone?.trim()) return phone ?? "";

  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.length === 11 && digits.startsWith("8")) {
    return `7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `7${digits}`;
  }

  return digits;
}
