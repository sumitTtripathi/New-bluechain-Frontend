import { isJwtExpired } from "jwt-check-expiration";

// A utility function to check if token is present and valid.
export const checkIfLogin = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return !!token && !isJwtExpired(token);
};


export const formatNumber = (number) => {
  return number
    .toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
    })
    .replace(/[, ]+/g, "");
};
export const formatNumberDecimal = (number, decimal) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: decimal });
};

export const convertToMillionFormat = (number) => {
  // Divide the number by one million
  let result = formatNumber(Number(number / 1000000).toFixed(0));

  // Append "M" to the converted number
  result += " M";

  return result;
};
