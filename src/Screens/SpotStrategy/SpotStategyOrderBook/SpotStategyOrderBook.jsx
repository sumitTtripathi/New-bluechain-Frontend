import { memo, useState } from "react";
import { useGetOrderBookQuery } from "../../../Services/Transaction";
import { useGetHighLowPriceQuery } from "../../../Services/Market";
import OrderBook from "../../../Components/OrderBook/OrderBook";

const SpotStategyOrderBook = ({ baseAsset, quoteAsset }) => {
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

export default memo(SpotStategyOrderBook);
