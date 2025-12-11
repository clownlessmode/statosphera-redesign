/**
 * Проверяет, является ли ОГРН или ОГРНИП корректным
 * @param ogrn ОГРН (13 цифр) или ОГРНИП (15 цифр) для проверки
 * @returns true, если корректный, false в противном случае
 */
export default function isValidOgrn(ogrn: string | number): boolean {
  if (typeof ogrn === "number") {
    ogrn = ogrn.toString();
  } else if (typeof ogrn !== "string") {
    ogrn = "";
  }

  if (/[^0-9]/.test(ogrn)) {
    return false;
  }

  // Проверка ОГРН (13 цифр)
  if (ogrn.length === 13) {
    const n13 = parseInt(
      (parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1),
    );
    return n13 === parseInt(ogrn[12]);
  }

  // Проверка ОГРНИП (15 цифр)
  if (ogrn.length === 15) {
    const n15 = parseInt(
      (parseInt(ogrn.slice(0, -1)) % 13).toString().slice(-1),
    );
    return n15 === parseInt(ogrn[14]);
  }

  return false;
}
