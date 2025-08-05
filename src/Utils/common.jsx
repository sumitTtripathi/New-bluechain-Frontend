// Function to return captialize string
export const capitalizeWord = (word) => {
  const wordsArr = word?.split(" ");

  return wordsArr
    ?.map(
      (item) => item?.slice(0, 1)?.toUpperCase() + item?.slice(1)?.toLowerCase()
    )
    ?.join(" ");
};

export default function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

// export function convertExponentialToDecimal(exponentialNumber) {
//   // sanity check - is it exponential number
//   const str = exponentialNumber?.toString();
//   if (str?.indexOf("e") !== -1) {
//     const exponent = parseInt(str?.split("-")?.[1], 10);
//     // Unfortunately I can not return 1e-8 as 0.00000001, because even if I call parseFloat() on it,
//     // it will still return the exponential representation
//     // So I have to use .toFixed()
//     // const result = exponentialNumber?.toFixed(exponent);
//     const result = exponentialNumber?.toFixed(2);
//     console.log("result", result)
//     return result;
//   } else {
//     return exponentialNumber;
//   }
// }

export function convertExponentialToDecimal(exponentialNumber) {
  if (exponentialNumber == null) return "";

  const str = exponentialNumber.toString();

  // If it's in exponential form (contains "e" or "E")
  if (str.includes("e") || str.includes("E")) {
    const [base, exponent] = str.split("e");
    const decimals = Math.abs(parseInt(exponent));
    return Number(exponentialNumber).toFixed(decimals);
  }

  // Return as-is for non-exponential values (preserves full precision)
  return exponentialNumber;
}


export function convertIntoDecimal(n) {
  const sign = +n < 0 ? "-" : "",
    toStr = n.toString();
  if (!/e/i.test(toStr)) {
    return n;
  }
  const [lead, decimal, pow] = n
    .toString()
    .replace(/^-/, "")
    .replace(/^([0-9]+)(e.*)/, "$1.$2")
    .split(/e|\./);
  return +pow < 0
    ? sign +
        "0." +
        "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
        lead +
        decimal
    : sign +
        lead +
        (+pow >= decimal.length
          ? decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))
          : decimal.slice(0, +pow) + "." + decimal.slice(+pow));
}

export const getDecimalFromLength = (length) => {
  let number = 0;
  if (length <= 0) {
    return "1";
  } else if (length === 1) {
    return `0.1`;
  }
  number = `${number.toFixed(length - 1)}1`;
  return number;
};
const AssetFunction = {
  cont: (value) => {
    return value;
  },
  usd: (value, ctVal) => {
    return value * ctVal;
  },
  crypto: (value, ctVal, markPrice) => {
    return (value / markPrice) * ctVal;
  },
};
export const maxBuy = (value, asset, ctVal, markPrice) => {
  return AssetFunction[asset](value, ctVal, markPrice)
    ? Number(AssetFunction[asset](value, ctVal, markPrice)).toFixed(2)
    : "";
};

const AssetEvaluate = {
  cont: (amount) => {
    return parseInt(amount);
  },
  usd: (amount, ctVal, price) => {
    const baseValue = amount / price;
    return parseInt(baseValue / ctVal);
  },
  crypto: (amount, ctVal) => {
    return parseInt(amount / ctVal);
  },
};

export const evaluateValue = (amount, ctVal, currency, price) => {
  return AssetEvaluate[currency](amount, ctVal, price);
};

export const isValidAmount = (percent, amount) => {
  const value = (amount * percent) / 100;
  return { value: parseInt(value), isValid: parseInt(value) > 0 };
};

export const ValidateNumber = (value, lowerLimit, upperLimit) => {
  if (
    parseFloat(value) > parseFloat(upperLimit) ||
    parseFloat(value) < parseFloat(lowerLimit)
  ) {
    return {
      status: true,
      message: `Quantity must be no greater than ${upperLimit} or less than ${lowerLimit}`,
    };
  }
  return {
    status: false,
    message: ``,
  };
};
