import { Config } from "../Config";
import { MESSAGES } from "./Messages";
import { ROUTES } from "./Routes";

export const depositState = {
  0: "waiting",
  1: "deposit credited",
  2: "deposit successful",
  8: "Pending",
  11: "matching",
  12: "frozen",
  13: "interception",
  14: "KYC limit",
};

export const DefaultFilter = [
  {
    value: 2,
    label: "0.01",
  },
  {
    value: 1,
    label: "0.1",
  },
  {
    value: 10,
    label: "10",
  },
];

export const DefaultSymbol = "BTC";
export const getRoute = {
  spot: ROUTES?.SPOT,
  swap: ROUTES?.PERPETUAL,
  swapBot: ROUTES?.SWAP_STRATEGY,
  spotBot: ROUTES?.SPOT,
};

export const tradeType = {
  swap: "-SWAP",
  spot: "",
};
export const baseExtracter = {
  spot: "market-api",
  swap: "swap-market-api",
};
export const chartBaseUrl = {
  spot: Config.MARKET_API_BASE_URL,
  swap: Config.SWAP_BASE_URL,
};

export const leverages = [
  "1",
  "2",
  "3",
  "5",
  "10",
  "20",
  "30",
  "50",
  "75",
  "100",
  "125",
];

export const leverageDecimal = ".00";

export const priceTypeOption = [
  {
    value: "MARK",
    label: "MARK",
  },
  {
    value: "INDEX",
    label: "INDEX",
  },
  {
    value: "LAST",
    label: "LAST",
  },
];

export const SWAP_FEE = {
  category: "1",
  delivery: "",
  exercise: "",
  instType: "SWAP",
  level: "Lv1",
  maker: "0.02",
  makerU: "-0.0002",
  makerUSDC: "-0.0002",
  taker: "0.05",
  takerU: "-0.005",
  takerUSDC: "-0.0005",
  ts: "1691572037711",
};
export const SPOT_FEE = {
  category: "1",
  delivery: "",
  exercise: "",
  instType: "SPOT",
  level: "Lv1",
  maker: "-0.0008",
  makerU: "",
  makerUSDC: "0",
  taker: "-0.001",
  takerU: "",
  takerUSDC: "-0.0007",
  ts: "1691572090127",
};
export const AmountOption = (baseAsset, quoteAsset) => {
  return [
    {
      value: "Contract",
      label: "Cont",
      key: "cont",
    },
    {
      value: baseAsset,
      label: "Crypto",
      key: "crypto",
    },
    {
      value: quoteAsset,
      label: "USD",
      key: "usdt",
    },
  ];
};

export const getAsset = (asset, baseAsset, quoteAsset) => {
  const currency = {
    Cont: "Cont",
    Crypto: baseAsset,
    BTC: baseAsset,
    USD: quoteAsset,
  };
  return currency[asset];
};

export const OrderOption = [
  {
    label: "LIMIT",
    value: "LIMIT",
  },
  {
    label: "MARKET",
    value: "MARKET",
  },
];
export const INST_TYPE = {
  spot: "SPOT",
  swap: "SWAP",
};

export const TAB_OPTION = {
  limit: "Limit",
  market: "Market",
  advancedLimit: "Advanced Limit",
  trail: "Trail",
  TPSL: "TP/SL",
};

export const swapHeader = ["USDT", "USDC", "USD"];
export const spotHeader = [
  "USDT",
  "USDC",
  "BTC",
  "ETH",
  "DAI",
  "DOT",
  "OKB",
  "EURT",
];

export const marks = {
  0: "0",
  25: "25",
  50: "50",
  75: "75",
  100: "100",
};

export const amountPercentOption = [
  {
    value: "10%",
    label: "10%",
  },
  {
    value: "20%",
    label: "20%",
  },
  {
    value: "50%",
    label: "50%",
  },
  {
    value: "100%",
    label: "100%",
  },
];

export const DEFAULT_ALL = {
  value: "",
  label: "ALL",
};

export const MODE_OPTION = [
  {
    value: "Geometric",
    label: "Geometric",
  },
  {
    value: "Arithmetic",
    label: "Arithmetic",
  },
];

export const validInput = (required) => {
  return [
    { required: required, message: MESSAGES.ENTER_VALUE },
    {
      pattern: /^[+]?\d+(\.\d+)?$/,
      message: MESSAGES.VALID_NUMBER,
    },
  ];
};

export const InitialRSIValue = {
  thold: "10",
  timePeriod: "14",
  timeframe: "3m",
  triggerCond: "cross",
};

export const BOT_STATE_LABELS = {
  pending_signal: "Pending Signal",
  running: "Ongoing",
  stopped: "Stopped",
  stopping: "",
  no_close_position: "Pua",
};

export const indicatorsList = [
  "ROC",
  "RSI",
  "EMA",
  "MA",
  "SAR",
  "KDJ",
  "VOL",
  "MACD",
];
