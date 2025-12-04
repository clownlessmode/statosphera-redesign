/**
 * Проверяет, является ли ИНН корректным
 * @param inn ИНН для проверки
 * @returns true, если ИНН корректный, false в противном случае
 */

export default function isValidInn(inn: string | number): boolean {
  if (typeof inn === "number") {
    inn = inn.toString();
  } else if (typeof inn !== "string") {
    inn = "";
  }

  if (/[^0-9]/.test(inn)) {
    return false;
  }

  if ([10, 12].indexOf(inn.length) === -1) {
    return false;
  }

  const checkDigit = (inn: string, coefficients: number[]): number => {
    let n = 0;
    for (const i in coefficients) {
      n += coefficients[i] * parseInt(inn[i], 10);
    }
    return (n % 11) % 10;
  };

  switch (inn.length) {
    case 10: {
      const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
      if (n10 === parseInt(inn[9], 10)) {
        return true;
      }
      break;
    }
    case 12: {
      const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      if (n11 === parseInt(inn[10], 10) && n12 === parseInt(inn[11], 10)) {
        return true;
      }
      break;
    }
  }

  return false;
}
