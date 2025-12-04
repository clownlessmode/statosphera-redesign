/**
 * Проверяет, является ли ОГРН корректным
 * @param ogrn ОГРН для проверки (13 цифр)
 * @returns true, если ОГРН корректный, false в противном случае
 */
export default function isValidOgrn(ogrn: string | number): boolean {
  if (typeof ogrn === "number") {
    ogrn = ogrn.toString();
  } else if (typeof ogrn !== "string") {
    ogrn = "";
  }

  if (ogrn.length !== 13) {
    return false;
  }

  if (/[^0-9]/.test(ogrn)) {
    return false;
  }

  const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));

  if (n13 === parseInt(ogrn[12])) {
    return true;
  }

  return false;
}
