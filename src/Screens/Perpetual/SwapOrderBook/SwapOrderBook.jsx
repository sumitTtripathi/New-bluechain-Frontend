import { useState } from "react";
import { useGetOrderBookQuery } from "../../../Services/Transaction";
import { tradeType } from "../../../Constants/state";
import { useGetHighLowPriceQuery } from "../../../Services/Swap";
import OrderBook from "../../../Components/OrderBook/OrderBook";

const SwapOrderBook = ({ baseAsset, quoteAsset }) => {
  const [limit, setLimit] = useState(16);
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const { data: orderBook } = useGetOrderBookQuery({
    symbol: `${baseAsset?.toUpperCase()}${quoteAsset}`,
    limit: limit,
  });


  return (
    <OrderBook
      baseAsset={baseAsset}
      quoteAsset={quoteAsset}
      hlCoinPriceData={hlCoinPriceData}
      orderBook={orderBook}
      limit={limit}
      setLimit={setLimit}
    />
  );
};

export default SwapOrderBook;
