import { BOT } from "../Enums/Enums";
import { useGetHighLowPriceQuery } from "../Services/Market";

function useSwapCoinPrice(baseAsset, quoteAsset, orderType) {
  const { data: swapCoinData } = useGetHighLowPriceQuery(
    {
      id: baseAsset,
      filter: quoteAsset,
    },
    {
      skip: !baseAsset || !quoteAsset || orderType !== BOT.FUTURE_GRID,
    }
  );

  return {
    swapCoinData,
  };
}

export default useSwapCoinPrice;
