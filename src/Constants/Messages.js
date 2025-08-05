export const MESSAGES = {
  COMPLETE_VERIFICATION_FIRST: "Please complete verification first!",
  ENTER_VALUE: "Please enter the value.",
  VALID_NUMBER: "Please enter a valid number.",
  VALIDATE_ZERO: "Value cannot be zero.",
  VALID_UPPER_LIMIT: "Upper limit must be higher than lower limit.",
  VALID_TP: "TP price must be greater than the upper price",
  VALID_SL: "SL price must be lower than the lower price",
  TP_LARGER: "TP trigger price must be larger than the last price",
  SL_LOWER: "SL trigger price must be lower than the last price",
  VALID_GRID: "Quantity must be 2 - 300",
};

export const SWAP = {
  limit:
    "Use a limit order to open or close a position at a specific price. When a limit order is placed, it'll be added to the order book. ",
  market:
    "Buy and sell immediately at the current market price. Final filled amount and price depend on market availability. ",
  TPSL: "Predefine the price you want the order to trigger a market order to execute immediately or it will place a limit order. This type of order will not freeze your free margin in advance.",
  trail:
    "A trailing stop order is a stop order that tracks the market price. Its trigger price changes with the market price. Once the trigger price is reached, a market order is placed.",
  advancedLimit:
    "Set rules for your limit orders with three advanced limit order types: post only, fill or kill, and immediate or cancel.",
  reduceOnly:
    "Reduce-only orders are designed solely to decrease your existing position size. Any order that could potentially increase your position will be automatically adjusted or canceled.",
  cost: "The estimated margin required to open a position",
  tpslCheckInfo:
    "You can preset the stop order price for the current order. After the order is completely filled, the system will open the stop order according to its preset price and the amount.",
  stop: "In a fast-moving market, it is not advised to set the SL trigger price close to the estimated liquidation price",
};
