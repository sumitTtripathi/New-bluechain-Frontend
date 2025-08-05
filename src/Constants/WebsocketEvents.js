export const WebsocketEvent = {
  CURRENT_PRICE: "tickers",
  ORDER_BOOK: "order_book@",
  LATEST_EXECUTION: "trades@",
  TICKERS: "tickers",
  SINGLE_COIN_CURRENT_PRICE: (symbol) => `tickers@${symbol}USDT`,
  MARKPRICE: "mark-price@",
  botSocketData: "botSocketData",
  CANDLE: "candle@" 
};
