export const pnlCalculate = ({
  values,
  getContractValue,
  setUpdatedValues,

  active,
  perpAmountDropdown,
  value,
}) => {
  const {
    open,
    close,
    amount,
    pnl,
    leverage,
    pnlPercent,
    additionalMargin,
    price,
    marginMode,
  } = values;
  let sumOpenPrice = 0;
  let totalAmount = 0;

  let fieldAmount = 0;

  if (perpAmountDropdown?.key === "crypto") {
    fieldAmount = Number(amount);
  } else if (perpAmountDropdown?.key === "cont") {
    fieldAmount = Number(amount * getContractValue?.ctVal);
  } else {
    fieldAmount = Number(amount / open);
  }

  price?.forEach((item) => {
    sumOpenPrice += Number(item?.open) * Number(item?.amount);
    totalAmount += Number(item?.amount);
  });

  const avgOpenPrice = (sumOpenPrice / totalAmount).toFixed(2);
  setUpdatedValues((prev) => {
    return {
      ...prev,
      avgOpenPrice,
    };
  });
  if (active === "long") {
    const marginValue = Number(((fieldAmount * open) / leverage).toFixed(2));
    const pnlValue = ((close - open) * fieldAmount).toFixed(2);
    const pnlRatio = ((pnlValue / marginValue) * 100).toFixed(2);
    const makerPrice = ((fieldAmount * open * 0.02) / 100).toFixed(2);
    const takerPrice = `-${((fieldAmount * open * 0.05) / 100).toFixed(2)}`;
    const closePrice = (
      Number(pnl) / Number(fieldAmount) +
      Number(open)
    ).toFixed(2);
    const closePricePercent = (
      Number(open) -
      (Number(pnlPercent) * Number(open)) / (Number(leverage) * 100)
    ).toFixed(2);
    let liquidationPrice;
    if (marginMode === "isolated") {
      const margin = Number(marginValue) + Number(additionalMargin);
      liquidationPrice = (
        (margin - Number(fieldAmount) * Number(open)) /
        (Number(fieldAmount) * -0.9993)
      ).toFixed(2);
    } else {
      liquidationPrice = (
        (Number(additionalMargin) - Number(fieldAmount) * Number(open)) /
        (Number(fieldAmount) * ((0.02 + 0.05) / 100 - 1))
      ).toFixed(2);
    }
    if (liquidationPrice < 0) {
      liquidationPrice = 0;
    }
    setUpdatedValues((prev) => {
      return {
        ...prev,
        closePrice,
        marginValue,
        pnlValue,
        pnlRatio,
        makerPrice,
        takerPrice,
        closePricePercent,
        liquidationPrice,
      };
    });
  } else if (active === "short") {
    const marginValue = ((fieldAmount * open) / leverage).toFixed(2);
    const pnlValue = ((open - close) * fieldAmount).toFixed(2);
    const pnlRatio = ((pnlValue / marginValue) * 100).toFixed(2);
    const makerPrice = ((fieldAmount * open * 0.02) / 100).toFixed(2);
    const takerPrice = `-${((fieldAmount * open * 0.05) / 100).toFixed(2)}`;
    const closePrice = (
      Number(open) -
      Number(pnl) / Number(fieldAmount)
    ).toFixed(2);
    const closePricePercent = (
      Number(open) -
      (Number(pnlPercent) * Number(open)) / (Number(leverage) * 100)
    ).toFixed(2);

    let liquidationPrice;
    if (marginMode === "isolated") {
      const margin = Number(marginValue) + Number(additionalMargin);
      liquidationPrice = (
        (margin + Number(fieldAmount) * Number(open)) /
        (Number(fieldAmount) * -0.9993)
      ).toFixed(2);
    } else {
      liquidationPrice = (
        (Number(additionalMargin) - Number(fieldAmount) * Number(open)) /
        (Number(fieldAmount) * ((0.02 + 0.05) / 100 + 1))
      ).toFixed(2);
    }
    if (liquidationPrice < 0) {
      liquidationPrice = 0;
    }
    setUpdatedValues((prev) => {
      return {
        ...prev,
        closePrice,
        marginValue,
        pnlValue,
        pnlRatio,
        makerPrice,
        takerPrice,
        closePricePercent,
        liquidationPrice,
      };
    });
  }
};
