/**
 * Проверяет, является ли КПП корректным
 * @param kpp КПП для проверки
 * @returns true, если КПП корректный, false в противном случае
 */
export default function isValidKpp(kpp: string | number): boolean {
  if (typeof kpp === "number") {
    kpp = kpp.toString();
  } else if (typeof kpp !== "string") {
    kpp = "";
  }

  if (kpp.length !== 9) {
    return false;
  }

  if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
    return false;
  }

  return true;
}
